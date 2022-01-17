import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthenticationGuard } from '.';
import { Role } from '../enums';
import { AuthenticatedRequest } from '../types';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
      const user = request.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
