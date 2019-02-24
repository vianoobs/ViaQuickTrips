"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("../utils/rest");
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
            .then(res => res.result.slice(maxNumberOfStops))
            .catch(err => err);
    }
    areStopsOnSameRoute(stop1, stop2) {
        return rest_1.Rest.get(this.baseApiUrl + `/api/v1/stops/routes/${stop1.stopId}`, this.accessToken)
            .then(res => {
            return res.result.filter(routeId => rest_1.Rest.get(this.baseApiUrl + `/api/v1/stops/route/${routeId}`, this.accessToken)
                .then(res => {
                return res.result.find(stop => stop.stopId === stop2.stopId);
            })
                .catch(err => err)).length > 0;
        })
            .catch(err => err);
    }
    //
    // private findSourceLocationTripsAtCurrentTime(stopId: number): Trip[] {
    //
    // }
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
    // private distanceToTime(distance: number): number {
    //
    // }
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