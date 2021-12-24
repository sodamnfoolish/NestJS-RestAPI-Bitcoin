import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
export declare class WalletAddressValidator implements ValidatorConstraintInterface {
    validate(address: string, args: ValidationArguments): any;
}
export declare function IsWalletAddress(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
