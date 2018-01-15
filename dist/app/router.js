"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminCtrl = require("./controllers/admin");
const deliveryCtrl = require("./controllers/delivery");
/**
 * Construct route of controllers
 */
class ControllerRouter {
    constructor(app) {
        this.app = app;
        this.initRoutes = () => {
            // admin controller
            this.app.get('/healthcheck', adminCtrl.healthCheck);
            // business controller
            this.app.get('/delivery/route/cost', deliveryCtrl.calculateRouteCost);
            this.app.get('/delivery/route/possible', deliveryCtrl.calculatePossibleRoutes);
            this.app.get('/delivery/route/cheapest', deliveryCtrl.calculateShortedRoute);
        };
        this.initRoutes();
    }
}
exports.ControllerRouter = ControllerRouter;
//# sourceMappingURL=router.js.map