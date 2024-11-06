import axios from "axios";
import authToken from "../auth/auth.js";
import logblob from "../Logblob/logblob.js";

const Fn365document = async (json) => {
  try {
    const accessToken = await authToken();

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };

    const odataQueryUAT = `https://gamaleasinguat.sandbox.operations.dynamics.com/data/GMDevicesBIV2(dataAreaId='glo',DeviceId='${json.Device}')?$select=MasterId`;
    const odataQueryUAT = `https://gamaleasinguat.sandbox.operations.dynamics.com/data/GMDevicesBIV2(dataAreaId='glo',DeviceId='${json.Device}')?$select=MasterId`;

    
    let responseDeviceMasterid;
    try {
      responseDeviceMasterid = await axios.get(odataQueryUAT, config);
    } catch (error) {
      if (error.response && error.response.status === 404) {
       
        await axios.post("https://prod-06.brazilsouth.logic.azure.com:443/workflows/45a6490df0744275ab45b9097287aaaa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UJRjWM4vFA6x_W4u_coRdKFsUJY43vKi_xG0juvWdis",json);
        return {
          status: 404,
          mensaje: "Unidad en cola de ejecución posterior",
        };
      } else {
        throw error;
      }
    }

    const data = {
      DeviceMasterId: responseDeviceMasterid.data.MasterId,
      TypeId: "PrimeraInscripcion",
      dataAreaId: "glo",
      FileName: json.itemName,
      DefaultAttachment: "No",
      FileType: "pdf",
      Name: json.itemName,
      Notes: "",
      FileContents: json.Document,
    };
    console.log("Data to send to GMDeviceMasterAttachments:", data);

    const response = await axios.post(
      "https://gamaleasinguat.sandbox.operations.dynamics.com/data/GMDeviceMasterAttachments",
      data,
      config
    );
    console.log("Response data from GMDeviceMasterAttachments:", response.data);

    return {
      status: 200,
      mensaje: "ÉXITO: Se ha creado el documento",
    };

  } catch (error) {
    console.error("Error al procesar documento:", error);

    // Registrar el error en logblob para revisión
    await logblob(json);

    return {
      status: 500,
      mensaje: "Error interno del servidor",
    };
  }
};

const Document365 = async (json) => {
  const respuesta = await Fn365document(json);
  return { respuesta };
};

export default Document365;
