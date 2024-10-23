import { ConfidentialClientApplication } from "@azure/msal-node";


const clientId = process.env.AZURE_CLIENT_ID;
const authority = process.env.AUTHORITY;
const clientSecret = process.env.CLIENT_SECRET;
const scopes = process.env.SCOPES

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
    console.log(ReturnAccess)
    return ReturnAccess
  } catch (error) {
    console.error("Error al extrar access token:", error);
    throw new Error("Error access token");
  }
};

export default authToken;
