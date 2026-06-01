import type { Request, Response } from 'express';
export declare class AppController {
    ping(req: Request): import("http").IncomingHttpHeaders;
    all(res: Response): Response<any, Record<string, any>>;
}
