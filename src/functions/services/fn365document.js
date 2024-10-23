import axios from "axios";
import authToken from "../auth/auth.js";
import logblob from "../Logblob/logblob.js"

const Fn365document = async (json) => {
  try {
    const accessToken = await authToken();
    // console.log("Access Token:", accessToken);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };

    const odataQuery = `https://gamaleasinguat.sandbox.operations.dynamics.com/data/GMDevicesBIV2(dataAreaId='glo',DeviceId='${json.Device}')?$select=MasterId`;
    console.log(odataQuery);
    const responseDeviceMasterid = await axios.get(odataQuery,config);

    console.log(responseDeviceMasterid.data.MasterId)

    const data = {
    "DeviceMasterId": responseDeviceMasterid.data.MasterId,
    "TypeId": "Archivo",
    "dataAreaId": "glo",
    "FileName": json.FileName,
    "DefaultAttachment": "No",
    "FileType": "pdf",
    "Name": json.FileName,
    "Notes": "",
    "FileContents": json.Document
  }
    const response = await axios.post(
      "https://gamaleasinguat.sandbox.operations.dynamics.com/data/GMDeviceMasterAttachments",
      data,
      config
    );
    
    console.log("Response data:", response.data);
    return {
      status: 200,
      mensaje: "ÉXITO: Se ha creado el documento",
    };
  } catch (error) {
    console.error("Error al procesar documento:",error.message);
    return {
      status: 500,
      mensaje: error.message,
    };
  }
};

const Document365  = async (json) => {
  try { 
    const respuesta = await Fn365document(json);
    if (respuesta.status !== 200) { 
      await logblob(json)
    }
    return {
      respuesta
    };
  } catch (error) {
    console.error("Error al procesar documento:",error.message);
      return {
      respuesta
    };
  }
};

export default Document365;
  