import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];
    const manager = getManager();
    const count = await manager.count(entity, { [args.property]: value });
    return count === 0;
  }
}

export const UniqueOnDatabase =
  (entity: unknown, validationOptions?: ValidationOptions) =>
  (object: unknown, propertyName: string) => {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: '$property already exist',
        ...validationOptions,
      },
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
