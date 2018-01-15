"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../data-access/index");
const index_2 = require("../models/index");
const calculator = require("../libs/index");
/**
 * Route cost calculation Api
 */
function calculateRouteCost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.query['r'])
                return res.status(400).json();
            // extract data from query
            const route = req.query['r'];
            const routes = route.split('-');
            // load data
            const townGraph = yield index_1.TownDAL.getTownGraphAsync();
            // perform calculation
            const result = calculator.calcRouteCost(townGraph, routes);
            return res.status(200).json(new index_2.ApiResponse(1, 'OK', {
                input: route,
                result: {
                    cost: result
                }
            }));
        }
        catch (err) {
            // ## this should not do on real-world production code
            return res.status(200).json(new index_2.ApiResponse(0, err.message));
        }
    });
}
exports.calculateRouteCost = calculateRouteCost;
/**
 * Possible routes calculation Api
 */
function calculatePossibleRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // extract data from query
            const route1 = req.query['r1'];
            const route2 = req.query['r2'];
            const maxStop = req.query['maxStop'] ? Number(req.query['maxStop']) : undefined;
            // load data
            const townGraph = yield index_1.TownDAL.getTownGraphAsync();
            // reconstruc data in array form to best fit the calculation
            const townGraphArray = calculator.convertGraphToGraphArray(townGraph);
            // perform calculation
            const result = calculator.calcPossibleRoutes(townGraphArray, route1, route2);
            // formalize output
            let foundRoutes = [];
            for (let i = 0; i < result.length; i++) {
                const foundRoute = result[i];
                if (maxStop && foundRoute.length - 1 > maxStop)
                    continue;
                foundRoutes.push(foundRoute.join('-'));
            }
            return res.status(200).json(new index_2.ApiResponse(1, 'OK', {
                input: route1 + '-' + route2,
                result: {
                    count: foundRoutes.length,
                    routes: foundRoutes
                }
            }));
        }
        catch (err) {
            // ## this should not do on real-world production code
            return res.status(200).json(new index_2.ApiResponse(0, err.message));
        }
    });
}
exports.calculatePossibleRoutes = calculatePossibleRoutes;
/**
 * Shorted route calculation Api
 */
function calculateShortedRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // extract data from query
            const route1 = req.query['r1'];
            const route2 = req.query['r2'];
            // load data
            const townGraph = yield index_1.TownDAL.getTownGraphAsync();
            // perform calculation
            const result = calculator.calcShortestRoute(townGraph, route1, route2);
            return res.status(200).json(new index_2.ApiResponse(1, 'OK', {
                input: route1 + '-' + route2,
                result: {
                    route: result.path.join('-'),
                    cost: result.cost
                }
            }));
        }
        catch (err) {
            // ## this should not do on real-world production code
            return res.status(200).json(new index_2.ApiResponse(0, err.message));
        }
    });
}
exports.calculateShortedRoute = calculateShortedRoute;
//# sourceMappingURL=delivery.js.map