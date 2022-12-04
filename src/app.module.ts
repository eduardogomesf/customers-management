import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { CONFIGS } from './configs/envs';
import { CustomerModule } from './modules/customer.module';
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: CONFIGS.KEYCLOAK.AUTH_SERVER_URL,
      realm: CONFIGS.KEYCLOAK.REALM,
      clientId: CONFIGS.KEYCLOAK.CLIENT_ID,
      secret: CONFIGS.KEYCLOAK.SECRET,
    }),
    CustomerModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
