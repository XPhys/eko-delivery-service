import { Request, Response } from 'express';
import { TownDAL } from '../data-access/index';
import { ApiResponse } from '../models/index';
import * as calculator from '../libs/index';

/**
 * Route cost calculation Api
 */
export async function calculateRouteCost(req: Request, res: Response) {
    try {
        if (!req.query['r']) return res.status(400).json();

        // extract data from query
        const route = req.query['r'];
        const routes = route.split('-');

        // load data
        const townGraph = await TownDAL.getTownGraphAsync();

        // perform calculation
        const result = calculator.calcRouteCost(townGraph, routes)

        return res.status(200).json(
            new ApiResponse<any>(
                1,
                'OK',
                {
                    input: route,
                    result: {
                        cost: result
                    }
                })
        );
    }
    catch (err) {
        // ## this should not do on real-world production code
        return res.status(200).json(new ApiResponse<any>(0, err.message));
    }
}

/**
 * Possible routes calculation Api
 */
export async function calculatePossibleRoutes(req: Request, res: Response) {
    try {
        // extract data from query
        const route1 = req.query['r1'];
        const route2 = req.query['r2'];
        const maxStop = req.query['maxStop'] ? Number(req.query['maxStop']) : undefined;

        // load data
        const townGraph = await TownDAL.getTownGraphAsync();

        // reconstruc data in array form to best fit the calculation
        const townGraphArray = calculator.convertGraphToGraphArray(townGraph);

        // perform calculation
        const result = calculator.calcPossibleRoutes(townGraphArray, route1, route2);

        // formalize output
        let foundRoutes = [];
        for (let i = 0; i < result.length; i++) {
            const foundRoute = result[i];
            if (maxStop && foundRoute.length - 1 > maxStop) continue;
            foundRoutes.push(foundRoute.join('-'));
        }

        return res.status(200).json(
            new ApiResponse<any>(
                1,
                'OK',
                {
                    input: route1 + '-' + route2,
                    result: {
                        count: foundRoutes.length,
                        routes: foundRoutes
                    }
                })
        );
    }
    catch (err) {
        // ## this should not do on real-world production code
        return res.status(200).json(new ApiResponse<any>(0, err.message));
    }
}

/**
 * Shorted route calculation Api
 */
export async function calculateShortedRoute(req: Request, res: Response) {
    try {
        // extract data from query
        const route1 = req.query['r1'];
        const route2 = req.query['r2'];

        // load data
        const townGraph = await TownDAL.getTownGraphAsync();

        // perform calculation
        const result = calculator.calcShortestRoute(townGraph, route1, route2);

        return res.status(200).json(
            new ApiResponse<any>(
                1,
                'OK',
                {
                    input: route1 + '-' + route2,
                    result: {
                        route: result.path.join('-'),
                        cost: result.cost
                    }
                })
        );
    }
    catch (err) {
        // ## this should not do on real-world production code
        return res.status(200).json(new ApiResponse<any>(0, err.message));
    }
}