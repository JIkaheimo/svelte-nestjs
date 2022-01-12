import {
  BadRequestException,
  Injectable,
  ValidationPipe as BaseValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

/**
 * Wrapper around the default validation pipe to display more meaningful and
 * consistent error messages.
 */
@Injectable()
export class ValidationPipe extends BaseValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException({ error: this.formatErrors(errors) });
      },
      whitelist: true,
      ...options,
    });
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.reduce(
      (formattedErrors, { property, constraints }) => ({
        ...formattedErrors,
        [property]: Object.values(constraints).map(
          ([firstChar, ...rest]) =>
            firstChar.toUpperCase() + rest.join('') + '.',
        ),
      }),
      {},
    );
  }
}
