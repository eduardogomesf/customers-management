import { BadGatewayException } from "@nestjs/common";

export class ServiceUnavailableException extends BadGatewayException {
  constructor() {
    super({
      error: 'Service unavailable'
    })
  }
}
