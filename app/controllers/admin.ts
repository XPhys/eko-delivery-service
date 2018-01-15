import { Request, Response } from 'express';

/**
 * General purpose for api server healthcheck used by system admin
 */
export function healthCheck(req: Request, res: Response) {
    return res.status(200).send('OK');
}