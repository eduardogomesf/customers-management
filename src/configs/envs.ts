import * as env from 'dotenv';

env.config();

export const CONFIGS = {
  APP: {
    PORT: process.env.APP_PORT
  },
  KEYCLOAK: {
    AUTH_SERVER_URL: process.env.KEYCLOAK_AUTH_SERVER_URL,
    REALM: process.env.KEYCLOAK_REALM,
    CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    SECRET: process.env.KEYCLOAK_SECRET
  }
} as const
