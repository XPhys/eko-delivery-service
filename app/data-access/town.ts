import * as fs from 'fs';
import * as path from 'path';

/**
 * Data access layer of town repository
 */
class TownDAL {
    /**
     * Get town data as a graph structure from file
     */
    public static getTownGraphAsync(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile('./town-graph.database.json',
                (err, data) => {
                    if (err) return reject(err);
                    return resolve(JSON.parse(data.toString()));
                });
        });
    }
}

export { TownDAL }