"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Api standard response
 * Entire api response must be followed
 */
class ApiResponse {
    constructor(code, message, data) {
        this.code = code || 0;
        this.message = message || '';
        this.data = data || undefined;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=standard.js.map