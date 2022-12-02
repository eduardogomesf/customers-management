import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common"
import { ServiceUnavailableException } from "../../src/exceptions/http/service-unavailable.exception"
import { GetCustomerByIdRepository } from "../../src/useCases/protocols/get-customer-by-id.repository"
import { UpdateCustomerRepository } from "../../src/useCases/protocols/update-customer-repository"
import { UpdateCustomerUseCase } from "../../src/useCases/update-customer.use-case"
import { GetCustomerByIdRepositoryStub } from "./stubs/get-customer-by-id.repository.stub"
import { UpdateCustomerRepositoryStub } from "./stubs/update-customer.repository.stub"

describe('UpdaterCustomerUseCase', () => {
  let getCustomerByIdRepository: GetCustomerByIdRepository
  let updateCustomerRepository: UpdateCustomerRepository
  let updateCustomerUseCase: UpdateCustomerUseCase

  beforeEach(() => {
    getCustomerByIdRepository = new GetCustomerByIdRepositoryStub()
    updateCustomerRepository = new UpdateCustomerRepositoryStub()
    updateCustomerUseCase = new UpdateCustomerUseCase(
      getCustomerByIdRepository,
      updateCustomerRepository
    )
  })

  it('should update an existing customer', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve(null))

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    const result = await updateCustomerUseCase.update('any-id', payload)

    expect(result).toEqual(payload)
  })

  it('should call getCustomerRepository with correct value in the first call', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve(null))

    const getByIdSpy = jest.spyOn(getCustomerByIdRepository, 'getById')

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    await updateCustomerUseCase.update('any-id', payload)

    expect(getByIdSpy.mock.calls[0]).toEqual(['any-id'])
  })

  it('should call getCustomerRepository with correct value in the second call', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve(null))

    const getByIdSpy = jest.spyOn(getCustomerByIdRepository, 'getById')

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    await updateCustomerUseCase.update('any-id', payload)

    expect(getByIdSpy.mock.calls[1]).toEqual(['new-id'])
  })

  it('should call updateCustomerRepository with correct values', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve(null))

    const updateByIdSpy = jest.spyOn(updateCustomerRepository, 'updateById')

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    await updateCustomerUseCase.update('any-id', payload)

    expect(updateByIdSpy).toHaveBeenCalledWith('any-id', payload)
  })

  it('should throw a not found exception if the customer is not found', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValue(Promise.resolve(null))

    const payload = {
      id: 'wrong-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(
      new NotFoundException({
        error: 'Customer not found'
      })
    )
  })

  it('should throw a conflict exception if the new provided id is already in use', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'new-id',
      document: 70343273004,
      name: 'A random customer'
    }))

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(
      new ConflictException({
        error: 'Id already in use'
      })
    )
  })

  it('should throw a bad request exception if the name is not provided', async () => {
    const payload = {
      id: 'new-id',
      document: 47693077056,
    } as any

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(
      new BadRequestException({
        error: 'Invalid params'
      })
    )
  })

  it('should throw a bad request exception if the new id is not provided', async () => {
    const payload = {
      document: 47693077056,
      name: 'A new name for me'
    } as any

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(
      new BadRequestException({
        error: 'Invalid params'
      })
    )
  })

  it('should throw a bad request exception if the document is not provided', async () => {
    const payload = {
      id: 'new-id',
      name: 'A new name for me'
    } as any

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(
      new BadRequestException({
        error: 'Invalid params'
      })
    )
  })

  it('should throw a bad gateway exception if any problem occur when trying to retrieve the customer', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.reject(new Error('any_error')))

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(new ServiceUnavailableException())
  })

  it('should throw a bad gateway exception if any problem occur when trying to retrieve a customer with the new provided id', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.reject(new Error('any_error')))

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(new ServiceUnavailableException())
  })

  it('should throw a bad gateway exception if any problem occur when trying to update an existing customer', async () => {
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve({
      id: 'any-id',
      document: 47693077057,
      name: 'Test Customer'
    }))
    jest.spyOn(getCustomerByIdRepository, 'getById').mockReturnValueOnce(Promise.resolve(null))
    jest.spyOn(updateCustomerRepository, 'updateById').mockReturnValueOnce(Promise.reject(new Error('any_error')))

    const payload = {
      id: 'new-id',
      document: 47693077056,
      name: 'A new name for me'
    }

    const promise = updateCustomerUseCase.update('any-id', payload)

    await expect(promise).rejects.toThrowError(new ServiceUnavailableException())

  })
})
