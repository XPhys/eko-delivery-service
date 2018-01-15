import { Express } from 'express';
import * as adminCtrl from './controllers/admin';
import * as deliveryCtrl from './controllers/delivery';

/**
 * Construct route of controllers
 */
class ControllerRouter {
    constructor(private app: Express) {
        this.initRoutes();
    }

    initRoutes = () => {
        // admin controller
        this.app.get('/healthcheck', adminCtrl.healthCheck);

        // business controller
        this.app.get('/delivery/route/cost', deliveryCtrl.calculateRouteCost);
        this.app.get('/delivery/route/possible', deliveryCtrl.calculatePossibleRoutes);
        this.app.get('/delivery/route/cheapest', deliveryCtrl.calculateShortedRoute);
    }
}

export { ControllerRouter }