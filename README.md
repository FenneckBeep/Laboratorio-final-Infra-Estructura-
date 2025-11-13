# Laboratorio-final-Infra-Estructura-.

# Users API - Ejercicio 1

Proyecto Full-Stack para el registro de usuarios con Django y React.

## Dependencias
- Python 3.x
- Django
- React
- ...

## Ejecución local
1. Clonar el repositorio
2. Instalar dependencias: `pip install -r requirements.txt`
3. Ejecutar backend: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` y `.venv\Scripts\Activate.ps1` finalmente `python manage.py runserver`
4. Ejecutar frontend: `npm start` (o `yarn start`)
5. Abrir http://localhost:3000

## Dentro de las respectivas carpetas en la terminal:

# Backend:
1. docker build -t users-api-service .     
2. docker run -p 8000:8000 users-api-service

# Notification-service:
3. docker build -t notification-service . 
4. docker run -p 5000:5000 notification-service

# Frontend:
5. docker build -t frontend-service .   (Con 1 vez basta)
6. docker run -p 5173:80 frontend-service
   

## Ejecución por Docker
7. docker-compose up --build
