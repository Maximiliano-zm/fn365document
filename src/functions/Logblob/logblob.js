import { BlobServiceClient } from "@azure/storage-blob";
import { Buffer } from "buffer";
import uniqid from 'uniqid';

// Conexión a Azure Blob Storage
const AZURE_STORAGE_CONNECTION_STRING =
  "DefaultEndpointsProtocol=https;AccountName=almacenamientodpp;AccountKey=8f+yUYVXkoyXidFLh+hWx7sWCxc6zQWkMBhIzFSolGA6jQGm0NOvxgqKjzrguzMXT7SZPvG3m7wl+ASt/pJM0A==;EndpointSuffix=core.windows.net"; 
const containerName = "fn365documentlog"; // Nombre del contenedor en Blob Storage

// Función para crear un archivo (subir un blob)
const createBlob = async (json) => {
  try {
    // console.log(json);
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Crear el nombre del archivo basado en la fecha, hora, Device y TipoDocumento
    const fileName = `${uniqid()}_${json.Device}_LOG_ERROR.txt`;

   // Convertir el JSON recibido a una cadena de texto para almacenarlo en el archivo
    const content = JSON.stringify(json, null, 2);  // Indentado para mejorar legibilidad
    const contentBuffer = Buffer.from(content, "utf-8");  // Convertir el texto a buffer

    // Subir el archivo (blob)
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(contentBuffer);

  } catch (error) {
    console.error("Error al crear el blob:", error);
    throw new Error("Error en el servicio de almacenamiento de blobs");
  }
};

export default createBlob;