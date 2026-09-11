# Financial Risk Challenge

MVP para consultar un score financiero por RUT chileno. Incluye autenticación JWT, autorización por roles, validación de RUT mediante Módulo 11 y un score determinístico entre 0 y 100.

## Tecnologías

- **Backend:** Node.js, TypeScript, NestJS, JWT, class-validator, Jest y Supertest.
- **Frontend:** React, TypeScript, Vite y Fetch API.

## Ejecución local

Requisitos: Node.js 22.13+ y pnpm.

### Backend

```bash
cd backend
pnpm install
pnpm run start:dev
```

Crear `backend/.env` a partir de `backend/.env.example`:

```env
PORT=3000
JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRES_IN=3600
FRONTEND_ORIGIN=http://localhost:5173
```

La API queda disponible en `http://localhost:3000`.

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

La interfaz queda disponible en `http://localhost:5173`. La URL de la API puede configurarse en `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Usuarios de prueba

| Rol | Usuario | Contraseña | RUT permitido |
| --- | --- | --- | --- |
| `admin` | `admin` | `admin123` | Cualquier RUT válido |
| `user` | `user` | `user123` | `12.345.678-5` |

## API

### `POST /login`

```json
{
  "username": "user",
  "password": "user123"
}
```

Respuesta `200 OK`:

```json
{
  "accessToken": "..."
}
```

### `GET /score/:rut`

Requiere el encabezado `Authorization: Bearer <token>`.

Respuesta `200 OK`:

```json
{
  "rut": "12.345.678-5",
  "score": 12,
  "fecha": "2026-09-11T12:00:00.000Z"
}
```

Respuestas de error principales:

- `400 Bad Request`: RUT inválido o entrada incorrecta.
- `401 Unauthorized`: credenciales o token inválidos.
- `403 Forbidden`: el usuario intenta consultar un RUT que no le pertenece.

## Reglas de negocio

- Un usuario `admin` puede consultar cualquier RUT válido.
- Un usuario `user` solo puede consultar el RUT incluido en su JWT.
- Los RUT se normalizan y su dígito verificador se valida mediante Módulo 11.
- El score se obtiene de forma determinística a partir del RUT normalizado mediante SHA-256. Es una simulación y no representa un modelo real de riesgo financiero.

### Referencias para la validación de RUT

El SII utiliza Módulo 11 para validar el RUT y su dígito verificador. La implementación TypeScript de la regla matemática es propia de este proyecto.

- [SII — Formulario 3500 y validaciones de formato para RUT](https://www.sii.cl/declaraciones_juradas/ingreso_upload_f3500.html)
- [Guía complementaria no oficial sobre el dígito verificador](https://rutificadorenchile.cl/guias/digito-verificador-rut/)

## Pruebas

```bash
cd backend
pnpm test
pnpm run test:e2e
pnpm run build

cd ../frontend
pnpm run lint
pnpm run build
```

Los flujos manuales están documentados en [docs/requests.md](docs/requests.md). Se utilizó [Insomnia](https://insomnia.rest/) como cliente HTTP y [JWT.io](https://www.jwt.io/) para inspeccionar la estructura y los claims de los tokens. La firma y expiración se validan en el backend.

## Decisiones de diseño

Esta sección describe elecciones de implementación, no requisitos del desafío.

### Validación adicional del RUT

El enunciado no exige validar el dígito verificador y utiliza `12.345.678-9` como ejemplo, aunque no es válido según Módulo 11. Se decidió validar antes de calcular el score porque una consulta financiera solo debería procesar identificadores válidos.

### Repositorio de usuarios

`AuthService` depende de `UserRepository`, no de una fuente de datos concreta. El MVP inyecta `MockUserRepository`, pero podría sustituirse por un repositorio conectado a PostgreSQL mediante Prisma o TypeORM sin modificar la lógica de autenticación.

### Guards separados

`JwtAuthGuard` valida el token y adjunta su payload a la solicitud; `RutAccessGuard` aplica la regla de acceso por rol. Así, identidad y permisos se mantienen como responsabilidades independientes.

### Algoritmo del score

El requisito pide un resultado determinístico. Se eligió SHA-256 sobre el RUT normalizado y se limitó el valor al rango de 0 a 100 para obtener un resultado reproducible sin persistencia.

### Validación de entradas

Un `ValidationPipe` global aplica lista blanca y rechaza propiedades no declaradas, manteniendo explícito el contrato de entrada del login.

## Uso de inteligencia artificial

Se utilizaron ChatGPT y Codex como herramientas de apoyo. Las directrices técnicas, decisiones finales, revisiones y ajustes fueron realizados por el autor del proyecto. El detalle se encuentra en [ai_interactions.md](ai_interactions.md).
