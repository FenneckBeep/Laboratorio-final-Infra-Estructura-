# Base Python
FROM python:3.11-slim


# Crear directorio de trabajo
WORKDIR /app


# Copiar requirements e instalar
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt


# Copiar todo el código
COPY . /app/


# Exponer el puerto donde corre Flask
EXPOSE 5000


# Comando para correr la app
CMD ["python", "app.py"]
