"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const config_1 = require("./config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser(config_1.default.cookie_s));
        app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
        app.setViewEngine('hbs');
        await app.listen(3333);
        common_1.Logger.log('Server started on 3333 port', 'Bootstrap');
    }
    catch (error) {
        common_1.Logger.log(error, 'Bootstrap');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map