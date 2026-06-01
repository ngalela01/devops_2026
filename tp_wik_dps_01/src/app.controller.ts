import { All, Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
@Controller()
export class AppController {
  @Get('ping')
  ping(@Req() req: Request) {
    return req.headers;
  }
  @All('*')
  all(@Res() res: Response) {
    return res.status(404).end();
  }
}
