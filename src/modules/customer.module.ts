import { Module } from '@nestjs/common';
import { CreateCustomerController } from '../controllers/create-customer.controller';
import { GetCustomerByIdController } from '../controllers/get-customer-by-id.controller';
import { UpdateCustomerController } from '../controllers/update-customer.controller';
import { RedisCustomerRepository } from '../repositories/redis/redis-customer.repository';
import { CreateCustomerUseCase } from '../useCases/create-customer.use-case';
import { GetCustomerByIdUseCase } from '../useCases/get-customer-by-id.use-case';
import { CreateCustomerRepository } from '../useCases/protocols/create-customer.repository';
import { GetCustomerByIdRepository } from '../useCases/protocols/get-customer-by-id.repository';
import { UpdateCustomerRepository } from '../useCases/protocols/update-customer-repository';
import { UpdateCustomerUseCase } from '../useCases/update-customer.use-case';

@Module({
  controllers: [CreateCustomerController, GetCustomerByIdController, UpdateCustomerController],
  providers: [
    RedisCustomerRepository,
    {
      provide: CreateCustomerUseCase,
      useFactory: (createCustomerRepository: CreateCustomerRepository) => {
        return new CreateCustomerUseCase(createCustomerRepository);
      },
      inject: [RedisCustomerRepository],
    },
    {
      provide: GetCustomerByIdUseCase,
      useFactory: (getCustomerByIdRepository: GetCustomerByIdRepository) => {
        return new GetCustomerByIdUseCase(getCustomerByIdRepository);
      },
      inject: [RedisCustomerRepository],
    },
    {
      provide: UpdateCustomerUseCase,
      useFactory: (
        getCustomerByIdRepository: GetCustomerByIdRepository,
        updateCustomerRepository: UpdateCustomerRepository
      ) => {
        return new UpdateCustomerUseCase(getCustomerByIdRepository, updateCustomerRepository);
      },
      inject: [RedisCustomerRepository, RedisCustomerRepository],
    },
  ],
})
export class CustomerModule {}
