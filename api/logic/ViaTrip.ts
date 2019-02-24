import {Rest} from "../utils/rest";

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

export interface ITripTimes {
    stop1WalkingTime: number;
    stop2WalkingTime: number;
    rideTime: number;
    totalTime: number;
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
    const stopLocation = this.getStopLocation(stop);
        return Rest.get<IViaResponse<IStopTime[]>>(url, this.accessToken)
            .then(res => {
                const stopTimes: IStopTime[] = res.result;
                const trips: ITrip[] = [];
                const time = moment();
                const forward = time.hour() <= 12;
                const start = forward ? 0 : stopTimes.length - 1;
                const end = forward ? stopTimes.length - 1 : 0;
                function addOrSub(forward: boolean, val: number): number {
                    forward ? val+=1 : val-=1;
                    return val;
                }
                for (let i = start; end; addOrSub(forward, i)) {
                    const stopTime = stopTimes[i];
                    const minutesUntilStop = this.findMinutesBewtweenNowAndApiTime(stopTime.arrivalTime, time);
                    const distance = this.calculateDistance(this.sourceLocation, stopLocation, true);
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

    private findAllStopsForTrip(trip: ITrip): Promise<IStopTime[]> {
        const url = this.baseApiUrl + `/api/v1/stop-times/trip/${trip.tripId}`;
        return Rest.get<IViaResponse<IStopTime[]>>(url, this.accessToken)
            .then(res => res.result);
    }

    private isDestinationStopAfterSourceForTrip(trip: ITrip, sourceStop: IStop, destinationStop: IStop): Promise<boolean> {
        return this.findAllStopsForTrip(trip).then(stopTimes => {
            const sourceSequence = this.findStopSequence(stopTimes, sourceStop);
            const destSequence = this.findStopSequence(stopTimes, destinationStop);
            return destSequence > sourceSequence;
        });
    }

    private findStopArrivalTimeForTripStop(stop: IStop, trip: ITrip): Promise<Moment> {
        return this.findAllStopsForTrip(trip).then(stopTimes =>
            moment(stopTimes.find(stopTime => stopTime.tripId === stop.stopId).arrivalTime));
    }

    private findStopDepartureTimeForTripStop(stop: IStop, trip: ITrip): Promise<Moment> {
        return this.findAllStopsForTrip(trip).then(stopTimes =>
            moment(stopTimes.find(stopTime => stopTime.tripId === stop.stopId).departureTime));
    }

    private findStopSequence(stopTimes: IStopTime[], stop: IStop): number {
        return stopTimes.find(stopTime => stopTime.tripId === stop.stopId).stopSequence;
    }

    public async calculateTotalTripTime(stop1: IStop, stop2: IStop, trip: ITrip): Promise<ITripTimes> {
        const stop1Location = this.getStopLocation(stop1);
        const stop2Location = this.getStopLocation(stop2);
        const walkingDistanceToStop1 = this.calculateDistance(this.sourceLocation, stop1Location, true);
        const walkingDistanceFromStop2 = this.calculateDistance(stop2Location, this.desinationLocation, true);
        const walkingTimeToStop1 = this.distanceInKmToWalkingTimeInMin(walkingDistanceToStop1);
        const walkingTimeFromStop2 = this.distanceInKmToWalkingTimeInMin(walkingDistanceFromStop2);
        const stop1DepartureTime = await this.findStopDepartureTimeForTripStop(stop1, trip);
        const stop2ArrivalTime = await this.findStopArrivalTimeForTripStop(stop2, trip);
        const rideTime = this.findMinutesBewtweenTimes(stop1DepartureTime, stop2ArrivalTime);
        return {
            stop1WalkingTime: walkingTimeToStop1,
            stop2WalkingTime: walkingTimeFromStop2,
            rideTime: rideTime,
            totalTime: walkingTimeToStop1 + walkingTimeFromStop2 + rideTime
        }
    }

    private getStopLocation(stop: IStop): ILocation {
        return {lat: stop.latitude.toString(), lon: stop.longitude.toString()};
    }
    private distanceInKmToWalkingTimeInMin(distance: number): number {
        return distance * 20;
    }

    private findMinutesBewtweenNowAndApiTime(apiTime: string, currentDate: Moment): number {
        const apiFullTime = `${currentDate.year()}-${currentDate.month()+1}-${currentDate.date()}T${apiTime}`;
        const apiDate = moment(apiFullTime);
        const duration = moment.duration(apiDate.diff(currentDate));
        return duration.minutes();
    }

    private findMinutesBewtweenTimes(time1: Moment, time2: Moment): number {
        const duration = moment.duration(time2.diff(time1));
        return duration.minutes();
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
