# Nombre del Proyecto

Descripción concisa del proyecto.

## Requisitos

Para usar este repositorio, necesitas tener las siguientes variables de entorno configuradas:

- `APP_DB_HOST`: Host de la base de datos.
- `APP_DB_PORT`: Puerto de la base de datos.
- `APP_DB_DATABASE`: Nombre de la base de datos.
- `APP_DB_USERNAME`: Usuario de la base de datos.
- `APP_DB_PASSWORD`: Contraseña de la base de datos.
- `TYPEORM_ENTITIES`: Patrón para las entidades de TypeORM.
- `TYPEORM_SYNCHRONIZE`: Sincronización de TypeORM (true/false).
- `TYPEORM_MIGRATIONS`: Ruta de las migraciones de TypeORM.
- `TYPEORM_MIGRATIONS_DIR`: Directorio de las migraciones de TypeORM.
- `TYPEORM_LOGGING`: Habilitar o deshabilitar el registro de TypeORM.

## Iniciar Sesión

Puedes iniciar sesión con las siguientes credenciales de usuario:

- **Email**: admin@gmail.com
- **Contraseña**: admin1234

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno como se describe arriba.
4. Ejecuta la aplicación con `npm start`.

## Contribución

Cualquier contribución es bienvenida. Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función (`git checkout -b feature/nueva-funcion`).
3. Haz tus cambios y haz commit (`git commit -am 'Añade nueva función'`).
4. Sube tus cambios a tu repositorio remoto (`git push origin feature/nueva-funcion`).
5. Haz un pull request en el repositorio original.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](https://opensource.org/licenses/MIT).

-------

APP_DB_HOST=aws-0-us-west-1.pooler.supabase.com

APP_DB_PORT=5432

APP_DB_DATABASE=postgres

APP_DB_USERNAME=postgres.rwzbkffduyxsblcqkhso

APP_DB_PASSWORD=CvdRphkiItCORVqP

TYPEORM_ENTITIES=**/*.entity.ts,src/**/*.entity.ts

TYPEORM_SYNCHRONIZE=false

TYPEORM_MIGRATIONS=dist/migrations/*.js

TYPEORM_MIGRATIONS_DIR=src/migrations

TYPEORM_LOGGING=true


