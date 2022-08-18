# RBAC

Los modelos RBAC recomiendan mínimo 3 entidades.

Usuarios, roles, privilegios/funciones (requisitos funcionales)

## Roles

### Usuarios

- login
- password

### Rol

- idRol (identificador del rol)
- NombreRol (descripción)

### Funciones

- idFuncion
- nombreFuncion

## Asociaciones

N:N de usuarios a roles
N:N de roles a Funciones

Se establecen mínimo 5 tablas, pues hay 3 entidades y sus asociaciones son tablas.

