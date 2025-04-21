import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { join } from "path";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EnvironmentVariables, envSchema } from "./env-config/env-config";
import { EnvConfigModule } from "./env-config/env-config.module";
import { LeadModule } from "./leads/lead.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        const result = envSchema.safeParse(config);

        if (!result.success) {
          throw new Error(
            `Config validation error: ${result.error.toString()}`
          );
        }

        return result.data as EnvironmentVariables;
      },
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        console.error("GraphQL Error:", error);
        return error;
      },
    }),
    EnvConfigModule,
    LeadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
