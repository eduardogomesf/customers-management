import { NotFoundException } from "@nestjs/common";

export class CustomerNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: 'Customer not found'
    })
  }
}
