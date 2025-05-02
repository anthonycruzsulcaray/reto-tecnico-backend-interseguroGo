# Utilizar la imagen base de Go (Alpine)
FROM golang:1.23-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache bash git make

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos go.mod y go.sum al contenedor
COPY go.mod go.sum ./

# Copiar el archivo .env al contenedor
COPY .env .env

# Eliminar dependencias no utilizadas
RUN go mod tidy

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Exponer el puerto 8080 para que sea accesible desde fuera del contenedor
EXPOSE 8080

# Ejecutar la aplicación Go
CMD ["go", "run", "main.go"]