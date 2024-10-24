# Usa una imagen base de Node.js compatible con Azure Functions
FROM mcr.microsoft.com/azure-functions/node:4-node20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala las dependencias necesarias y agrega el repositorio de Microsoft para instalar Azure Functions Core Tools
RUN apt-get update && \
    apt-get install -y curl apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/microsoft-prod.list && \
    apt-get update && \
    apt-get install -y azure-functions-core-tools-4

# Copia todos los archivos de tu proyecto al contenedor
COPY . .

# Instala las dependencias de Node.js
RUN npm install

# Expone el puerto que usa Azure Functions
EXPOSE 7071

# Comando para iniciar Azure Functions
CMD ["func", "start", "--javascript"]