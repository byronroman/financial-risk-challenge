# Pruebas manuales de la API

Ejemplos de requests utilizados para validar los principales flujos de la API.

## Login administrador

```bash
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "admin",
    "password": "admin123"
  }'
```

Resultado esperado: `200 OK`.

## Login usuario

```bash
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "user",
    "password": "user123"
  }'
```

Resultado esperado: `200 OK`.

## Credenciales incorrectas

```bash
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "admin",
    "password": "cualquiercosa"
  }'
```

Resultado esperado: `401 Unauthorized`.

## Consulta sin JWT

```bash
curl --request GET \
  --url http://localhost:3000/score/12.345.678-5
```

Resultado esperado: `401 Unauthorized`.

## Usuario consulta su propio RUT

Reemplazar `USER_TOKEN` por el token obtenido en el login del usuario.

```bash
curl --request GET \
  --url http://localhost:3000/score/12.345.678-5 \
  --header 'Authorization: Bearer USER_TOKEN'
```

Resultado esperado: `200 OK`.

## Usuario consulta otro RUT

```bash
curl --request GET \
  --url http://localhost:3000/score/11.111.111-1 \
  --header 'Authorization: Bearer USER_TOKEN'
```

Resultado esperado: `403 Forbidden`.

## Administrador consulta un RUT

Reemplazar `ADMIN_TOKEN` por el token obtenido en el login del administrador.

```bash
curl --request GET \
  --url http://localhost:3000/score/11.111.111-1 \
  --header 'Authorization: Bearer ADMIN_TOKEN'
```

Resultado esperado: `200 OK`.

## Administrador consulta un RUT inválido

```bash
curl --request GET \
  --url http://localhost:3000/score/12.345.678-9 \
  --header 'Authorization: Bearer ADMIN_TOKEN'
```

Resultado esperado: `400 Bad Request`.
