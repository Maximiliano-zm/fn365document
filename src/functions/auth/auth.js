import { ConfidentialClientApplication } from "@azure/msal-node";
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.AZURE_CLIENT_ID;
const authority = process.env.AUTHORITY;
const clientSecret = process.env.CLIENT_SECRET;
const scopes = process.env.SCOPES

// console.log('AZURE_CLIENT_ID:', process.env.AZURE_CLIENT_ID);
// console.log('AUTHORITY:', process.env.AUTHORITY);
// console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
// console.log('SCOPES:', process.env.SCOPES);
// console.log('AZURE_STORAGE_CONNECTION_STRING:', process.env.AZURE_STORAGE_CONNECTION_STRING);
// console.log('CONTAINER_NAME_BLOB:', process.env.CONTAINER_NAME_BLOB);

const getAccessToken = async (cca) => {
  try {
    const result = await cca.acquireTokenByClientCredential({
      scopes: [
        scopes]
    });
    return result.accessToken;
  } catch (error) {
    console.error("Error al extraer archivos ZIP:", error);
    throw new Error("Error al extraer archivos ZIP");
  }
};

const authToken = async () => {
  const config = {
    auth: {
      clientId: clientId,
      authority: authority,
      clientSecret: clientSecret
    }
  };
  const cca = new ConfidentialClientApplication(config);
  try {
    const ReturnAccess = await getAccessToken(cca);
     return ReturnAccess
  } catch (error) {
    console.error("Error al extrar access token:", error);
    throw new Error("Error access token");
  }
};

export default authToken;
