import { Module } from '@nestjs/common';
import { CreateCustomerController } from '../controllers/create-customer.controller';
import { RedisCustomerRepository } from '../repositories/redis/redis-customer.repository';
import { CreateCustomerUseCase } from '../useCases/create-customer.use-case';
import { CreateCustomerRepository } from '../useCases/protocols/create-customer.repository';

@Module({
  controllers: [CreateCustomerController],
  providers: [
    RedisCustomerRepository,
    {
      provide: CreateCustomerUseCase,
      useFactory: (createCustomerRepository: CreateCustomerRepository) => {
        return new CreateCustomerUseCase(createCustomerRepository);
      },
      inject: [RedisCustomerRepository],
    },
  ],
})
export class CustomerModule {}
