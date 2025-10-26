# Imagen base oficial de Python
FROM python:3.11-slim


# Evita que Python guarde archivos .pyc y use buffer
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


# Crear y definir directorio de trabajo
WORKDIR /app


# Instalar dependencias del sistema (por si necesitás compilar librerías)
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*


# Copiar requirements (si no lo tenés, te muestro cómo generarlo)
COPY requirements.txt /app/


# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt


# Copiar el resto del proyecto
COPY . /app/


# Exponer el puerto donde corre Django
EXPOSE 8000


# Comando de inicio
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]