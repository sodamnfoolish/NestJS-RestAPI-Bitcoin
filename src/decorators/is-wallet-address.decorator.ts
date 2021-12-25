import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
import { NETWORK } from '../config';
import * as wav from 'wallet-address-validator';

@ValidatorConstraint({ async: true })
export class WalletAddressValidator implements ValidatorConstraintInterface {
  validate(address: string, args: ValidationArguments) {
    if (address == undefined || address == null || typeof address != 'string') return false; // пришлось добавить эту исключение, т.к. stopAtFirstError работает некорректно в ValidationPipe

    return wav.validate(address, 'BTC', NETWORK);
  }
}

export function IsWalletAddress(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsWalletAddress',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: WalletAddressValidator,
    });
  };
}