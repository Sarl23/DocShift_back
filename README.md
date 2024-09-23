# Project Overview

Este proyecto es una API construida con Node.js y Firebase Firestore que gestiona información de empresas y sus turnos de trabajo. A través de esta API, se pueden crear, leer, actualizar y eliminar información 
relacionada con **companies** y sus **shifts**. Las APIs estan diseñadas para ser escalables y flexibles, permitiendo añadir nuevos tipos de turnos para diferentes empresas.

## Endpoints Clave:

- **Crear Tipo de Turno**: Se puede crear un nuevo turno asociado a una empresa con datos como el nombre del turno, la hora de inicio, la hora de fin, la descripción y el número máximo de trabajadores. Los campos de fecha y hora se almacenan en formato `Timestamp` de Firestore.
  
- **Estructura de Colecciones**: La colección principal es `companies`, dentro de la cual se manejan subcolecciones como `shifts` para organizar los turnos de cada empresa.

## Ejemplo de Request:

```json
POST /companies/:companyId/shift_types
{
  "name": "Morning Shift",
  "description": "Shift for morning hours",
  "start_time": "2024-09-18T08:00:00.000Z",
  "end_time": "2024-09-18T14:00:00.000Z",
  "isActive": true,
  "maxWorkers": 10
}
