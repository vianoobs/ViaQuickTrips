import {Rest} from "../utils/rest";
import moment, {Moment} from 'moment';

export interface ILocation {
    lat: string;
    lon: string;
}

export interface IStop {
    stopId: number;
    latitude?: number
    longitude?: number;
    wheelchairBoarding?: boolean;
    stopCode?: number;
    stopDescription?: any;
    stopName?: string
}

export interface IStopTime {
    id: number;
    arrivalTime: string;
    arrivalTimeIsNextDay: boolean;
    departureTime: string;
    departureTimeIsNextDay: boolean;
    stopId: number;
    stopSequence: number;
    stopHeadsign: string;
    pickupType: number;
    dropoffType: number;
    shapeDistTraveled: number;
    tripId: number;
}

export interface ITrip {
    tripId: number;
}

export interface IViaResponse<T> {
    result: T;
    statuscode: number;
}

export class ViaTrip {
    sourceLocation: ILocation;
    desinationLocation: ILocation;
    baseApiUrl: string;
    accessToken: string;

    constructor(sourceLocation: ILocation, destinationLocation: ILocation, baseApiUrl: string, accessToken: string) {
        this.sourceLocation = sourceLocation;
        this.desinationLocation = destinationLocation;
        this.accessToken = accessToken;
        this.baseApiUrl = baseApiUrl;
    }

    public findCloseStops(maxNumberOfStops: number, location: ILocation): Promise<IStop[]> {
        const url = this.baseApiUrl + `/api/v1/stops/closest/${location.lat}/${location.lon}/3`;
        return Rest.get<IViaResponse<IStop[]>>(url, this.accessToken)
            .then(res => res.result.slice(maxNumberOfStops));
    }


    public areStopsOnSameRoute(stop1: IStop, stop2: IStop): Promise<boolean> {
        return Rest.get<IViaResponse<number[]>>(this.baseApiUrl + `/api/v1/stops/routes/${stop1.stopId}`, this.accessToken)
            .then(res => {
                return res.result.filter(routeId =>
                    Rest.get<IViaResponse<IStop[]>>(this.baseApiUrl + `/api/v1/stops/route/${routeId}`, this.accessToken)
                    .then(res => {
                        return res.result.find(stop => stop.stopId === stop2.stopId);
                    })).length > 0
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    private findSourceLocationTripsAtCurrentTime(stop: IStop): Promise<ITrip[]> {
    const url = this.baseApiUrl + `/api/v1/stop-times/stop/${stop.stopId}`;
        return Rest.get<IViaResponse<IStopTime[]>>(url, this.accessToken)
            .then(res => {
                const stopTimes: IStopTime[] = res.result;
                const trips: ITrip[] = [];
                const time = moment();
                const forward = time.hour() <= 12;
                const start = forward ? 0 : stopTimes.length - 1;
                const end = forward ? stopTimes.length - 1 : 0;
                function addOrSub(forward: boolean, val: number): number {
                    return forward ? val++ : val--;
                }
                for (let i = start; end; addOrSub(forward, i)) {
                    const stopTime = stopTimes[i];
                    const minutesUntilStop = this.findMinutesBewtweenNowAndApiTime(stopTime.arrivalTime, time);
                    const distance = this.calculateDistance(this.sourceLocation, this.desinationLocation, true);
                    const walkingTime = this.distanceInKmToWalkingTimeInMin(distance);
                    if (minutesUntilStop >= 0 && minutesUntilStop < 45 && walkingTime < minutesUntilStop) {
                        trips.push({tripId: stopTime.tripId});
                    }
                    if (forward) {
                        if (minutesUntilStop >= 45) {
                            break;
                        }
                    } else if(!forward) {
                        if (minutesUntilStop < 0) {
                            break;
                        }
                    }
                }
                return trips;
            });
    }
    //
    // private findAllStopsForTrip(trip: Trip): IStop[] {
    //
    // }
    //
    // private isDestinationStopAfterSourceForTrip(trip: Trip): boolean {
    //
    // }
    //
    // private findStopTimeForTrip(stop: IStop, trip: Trip): number {
    //
    // }
    //
    private distanceInKmToWalkingTimeInMin(distance: number): number {
        return distance * 20;
    }

    private findMinutesBewtweenNowAndApiTime(apiTime: string, currentDate: Moment) {
        const apiFullTime = `${currentDate.year()}-${currentDate.month()+1}-${currentDate.date()}T${apiTime}`;
        const apiDate = moment(apiFullTime);
        const duration = moment.duration(apiDate.diff(currentDate));
        const hours = duration.asHours();
        const minutes = duration.asMinutes();
        console.log(hours + ' hour and '+ minutes+' minutes.');
        return minutes;
    }

    private calculateDistance(location1: ILocation, location2: ILocation, returnKm: boolean = false, decimals: number = 2): number {
        const lat1 = parseFloat(location1.lat);
        const lon1 = parseFloat(location1.lon);
        const lat2 = parseFloat(location2.lat);
        const lon2 = parseFloat(location2.lon);
        const R = returnKm ? 6378.1 : 3958.756; // Radius of the earth in km | mi
        const dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
        const dLon = (lon2 - lon1) * Math.PI / 180;
        let phi1 = lat1 * Math.PI / 180;
        let phi2 = lat2 * Math.PI / 180;
        let x = dLon * Math.cos((phi1 + phi2) / 2);
        let y = dLat;
        let d = Math.sqrt(x * x + y * y) * R; // km | mi
        let round = parseFloat(d.toString() + 'e' + decimals.toString());
        return Number(Math.round(round) + 'e-' + decimals);
    }
}
