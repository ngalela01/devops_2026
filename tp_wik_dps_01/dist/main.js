"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = Number(process.env.PING_LISTEN_PORT ?? process.env.PORT ?? 8080);
    await app.listen(port);
}
bootstrap();
console.log('http://localhost:8080/ping');
//# sourceMappingURL=main.js.map