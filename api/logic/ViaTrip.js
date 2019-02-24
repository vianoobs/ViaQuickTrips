"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("../utils/rest");
const moment_1 = __importDefault(require("moment"));
class ViaTrip {
    constructor(sourceLocation, destinationLocation, baseApiUrl, accessToken) {
        this.sourceLocation = sourceLocation;
        this.desinationLocation = destinationLocation;
        this.accessToken = accessToken;
        this.baseApiUrl = baseApiUrl;
    }
    findCloseStops(maxNumberOfStops, location) {
        const url = this.baseApiUrl + `/api/v1/stops/closest/${location.lat}/${location.lon}/3`;
        return rest_1.Rest.get(url, this.accessToken)
            .then(res => res.result.slice(maxNumberOfStops));
    }
    areStopsOnSameRoute(stop1, stop2) {
        return rest_1.Rest.get(this.baseApiUrl + `/api/v1/stops/routes/${stop1.stopId}`, this.accessToken)
            .then(res => {
            return res.result.filter(routeId => rest_1.Rest.get(this.baseApiUrl + `/api/v1/stops/route/${routeId}`, this.accessToken)
                .then(res => {
                return res.result.find(stop => stop.stopId === stop2.stopId);
            })).length > 0;
        })
            .catch(err => {
            console.log(err);
            return false;
        });
    }
    findSourceLocationTripsAtCurrentTime(stop) {
        const url = this.baseApiUrl + `/api/v1/stop-times/stop/${stop.stopId}`;
        const stopLocation = this.getStopLocation(stop);
        return rest_1.Rest.get(url, this.accessToken)
            .then(res => {
            const stopTimes = res.result;
            const trips = [];
            const time = moment_1.default();
            const forward = time.hour() <= 12;
            const start = forward ? 0 : stopTimes.length - 1;
            const end = forward ? stopTimes.length - 1 : 0;
            function addOrSub(forward, val) {
                forward ? val += 1 : val -= 1;
                return val;
            }
            for (let i = start; end; addOrSub(forward, i)) {
                const stopTime = stopTimes[i];
                const minutesUntilStop = this.findMinutesBewtweenNowAndApiTime(stopTime.arrivalTime, time);
                const distance = this.calculateDistance(this.sourceLocation, stopLocation, true);
                const walkingTime = this.distanceInKmToWalkingTimeInMin(distance);
                if (minutesUntilStop >= 0 && minutesUntilStop < 45 && walkingTime < minutesUntilStop) {
                    trips.push({ tripId: stopTime.tripId });
                }
                if (forward) {
                    if (minutesUntilStop >= 45) {
                        break;
                    }
                }
                else if (!forward) {
                    if (minutesUntilStop < 0) {
                        break;
                    }
                }
            }
            return trips;
        });
    }
    findAllStopsForTrip(trip) {
        const url = this.baseApiUrl + `/api/v1/stop-times/trip/${trip.tripId}`;
        return rest_1.Rest.get(url, this.accessToken)
            .then(res => res.result);
    }
    isDestinationStopAfterSourceForTrip(trip, sourceStop, destinationStop) {
        return this.findAllStopsForTrip(trip).then(stopTimes => {
            const sourceSequence = this.findStopSequence(stopTimes, sourceStop);
            const destSequence = this.findStopSequence(stopTimes, destinationStop);
            return destSequence > sourceSequence;
        });
    }
    findStopArrivalTimeForTripStop(stop, trip) {
        return this.findAllStopsForTrip(trip).then(stopTimes => moment_1.default(stopTimes.find(stopTime => stopTime.tripId === stop.stopId).arrivalTime));
    }
    findStopDepartureTimeForTripStop(stop, trip) {
        return this.findAllStopsForTrip(trip).then(stopTimes => moment_1.default(stopTimes.find(stopTime => stopTime.tripId === stop.stopId).departureTime));
    }
    findStopSequence(stopTimes, stop) {
        return stopTimes.find(stopTime => stopTime.tripId === stop.stopId).stopSequence;
    }
    calculateTotalTripTime(stop1, stop2, trip) {
        return __awaiter(this, void 0, void 0, function* () {
            const stop1Location = this.getStopLocation(stop1);
            const stop2Location = this.getStopLocation(stop2);
            const walkingDistanceToStop1 = this.calculateDistance(this.sourceLocation, stop1Location, true);
            const walkingDistanceFromStop2 = this.calculateDistance(stop2Location, this.desinationLocation, true);
            const walkingTimeToStop1 = this.distanceInKmToWalkingTimeInMin(walkingDistanceToStop1);
            const walkingTimeFromStop2 = this.distanceInKmToWalkingTimeInMin(walkingDistanceFromStop2);
            const stop1DepartureTime = yield this.findStopDepartureTimeForTripStop(stop1, trip);
            const stop2ArrivalTime = yield this.findStopArrivalTimeForTripStop(stop2, trip);
            const rideTime = this.findMinutesBewtweenTimes(stop1DepartureTime, stop2ArrivalTime);
            return {
                stop1WalkingTime: walkingTimeToStop1,
                stop2WalkingTime: walkingTimeFromStop2,
                rideTime: rideTime,
                totalTime: walkingTimeToStop1 + walkingTimeFromStop2 + rideTime
            };
        });
    }
    getStopLocation(stop) {
        return { lat: stop.latitude.toString(), lon: stop.longitude.toString() };
    }
    distanceInKmToWalkingTimeInMin(distance) {
        return distance * 20;
    }
    findMinutesBewtweenNowAndApiTime(apiTime, currentDate) {
        const apiFullTime = `${currentDate.year()}-${currentDate.month() + 1}-${currentDate.date()}T${apiTime}`;
        const apiDate = moment_1.default(apiFullTime);
        const duration = moment_1.default.duration(apiDate.diff(currentDate));
        return duration.minutes();
    }
    findMinutesBewtweenTimes(time1, time2) {
        const duration = moment_1.default.duration(time2.diff(time1));
        return duration.minutes();
    }
    calculateDistance(location1, location2, returnKm = false, decimals = 2) {
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
exports.ViaTrip = ViaTrip;
//# sourceMappingURL=ViaTrip.js.map