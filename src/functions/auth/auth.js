import { ConfidentialClientApplication } from "@azure/msal-node";

const getAccessToken = async (cca) => {
  try {
    const result = await cca.acquireTokenByClientCredential({
      scopes: [
        "https://gamaleasinguat.sandbox.operations.dynamics.com/.default"]
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
      clientId: "99a76fe9-eba8-43d9-8493-fc53d51a5721",
      authority:"https://login.microsoftonline.com/b144de9c-24dd-462b-b82f-e94de9183f99",
      clientSecret: "E-j8Q~PhiKfsxtQnF~LxkBL5KJnnh_L5nuHMfcrJ"
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
