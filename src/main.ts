import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import helmet from "helmet";

import { AppModule } from "./app.module";
import { EnvConfigService } from "./env-config/env-config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfigService = app.get(EnvConfigService);

  app.setGlobalPrefix("api");
  app.enableCors();

  if (process.env.NODE_ENV === "production") {
    app.use(helmet());
  }

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "v",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  await app.listen(envConfigService.getPort() || 5000);
}

bootstrap();
