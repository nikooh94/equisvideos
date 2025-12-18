import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../users/domain/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Obtenemos el rol requerido para la ruta
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // Verificamos si el usuario tiene el rol necesario
        const hasRole = requiredRoles.some((role) => user.role?.includes(role));

        if (!hasRole) {
            throw new ForbiddenException('No tienes permisos para realizar esta acción');
        }

        return true;
    }
}