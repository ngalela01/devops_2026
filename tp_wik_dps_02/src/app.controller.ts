import { All, Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { hostname } from 'node:os';
import { InMemoryCounterStore } from './in-memory-counter-store';

@Controller()
export class AppController {
  private readonly counterStore = new InMemoryCounterStore();

  @Get('ping')
  ping(@Req() req: Request) {
    this.counterStore.increment();
    return req.headers;
  }

  @Get('stats')
  stats() {
    this.counterStore.increment();

    return {
      totalRequests: this.counterStore.getCount(),
      uptime: process.uptime(),
      instanceId: process.env.INSTANCE_ID ?? hostname(),
    };
  }

  @All('*')
  all(@Res() res: Response) {
    this.counterStore.increment();
    return res.status(404).end();
  }
}
