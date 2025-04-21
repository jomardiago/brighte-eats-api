import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { EnvConfigService } from "./env-config/env-config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfigService = app.get(EnvConfigService);

  await app.listen(envConfigService.getPort() || 5000);
}

bootstrap();
