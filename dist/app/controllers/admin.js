"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * General purpose for api server healthcheck used by system admin
 */
function healthCheck(req, res) {
    return res.status(200).send('OK');
}
exports.healthCheck = healthCheck;
//# sourceMappingURL=admin.js.map