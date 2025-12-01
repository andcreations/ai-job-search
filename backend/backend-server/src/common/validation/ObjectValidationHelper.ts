import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync, ValidationError } from 'class-validator'

import { ObjectValidationError } from './ObjectValidationError';
import { InvalidObjectError } from './InvalidObjectError';

export class ObjectValidationHelper {
  private static buildValidationErrors(
    errors: ValidationError[],
    property = '',
    objErrors: ObjectValidationError[] = []
  ): ObjectValidationError[] {
    errors.forEach((error) => {
      Object.keys(error.constraints ?? {}).forEach((constraintKey) => {
        objErrors.push({
          property: property + '/' + error.property,
          error: error.constraints![constraintKey]!
        })
      })
      if (error.children) {
        ObjectValidationHelper.buildValidationErrors(
          error.children,
          property + '/' + error.property,
          objErrors
        )
      }
    })
    return objErrors
  }

  public static validateObject(
    obj: any,
    clazz: ClassConstructor<any>,
    errorMessage?: string,
  ): void {
    if (obj === null || obj === undefined) {
      throw new InvalidObjectError('Null or empty object', []);
    }

    const objOfClazz = plainToInstance(clazz, obj)
    const errors = validateSync(objOfClazz, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
    if (errors.length > 0) {
      throw new InvalidObjectError(
        errorMessage ?? 'Invalid object',
        ObjectValidationHelper.buildValidationErrors(errors),
      )
    }
  }
}
