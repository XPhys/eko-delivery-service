"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Data access layer of town repository
 */
class TownDAL {
    /**
     * Get town data as a graph structure from file
     */
    static getTownGraphAsync() {
        return new Promise((resolve, reject) => {
            fs.readFile('./town-graph.database.json', (err, data) => {
                if (err)
                    return reject(err);
                return resolve(JSON.parse(data.toString()));
            });
        });
    }
}
exports.TownDAL = TownDAL;
//# sourceMappingURL=town.js.map