import { Request } from "express";
import ObservationAttributeTable from "./ObservationAttributeTable";
import ObservationGet from "../Observation/ObservationGet";

class ObservationAttributeGet {
   static route = async (req: Request) => {
      const observationAttributeUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : undefined;
      const observationUUID = req.query.observationUUID
         ? String(req.query.observationUUID).toUpperCase()
         : undefined;
      const type = req.query.type
         ? String(req.query.type).toUpperCase()
         : undefined;

      if (observationAttributeUUID) {
         return await ObservationAttributeGet.getByUUID(
            observationAttributeUUID
         );
      } else if (observationUUID && type) {
         return await ObservationAttributeGet.getByObservationUUIDAndType(
            observationUUID,
            type
         );
      } else {
         return null;
      }
   };

   static getByUUID = async (uuid: string) => {
      return await ObservationAttributeTable.findOne({
         where: { observationAttributeUUID: uuid.toUpperCase() },
      });
   };

   static getByObservationUUIDAndType = async (
      observationUUID: string,
      type: string
   ) => {
      const observation = await ObservationGet.getByUUID(
         observationUUID.toUpperCase()
      );

      return await ObservationAttributeTable.findOne({
         where: {
            observationID: observation?.getDataValue("observationID"),
            type: type.toUpperCase(),
         },
      });
   };
}

export default ObservationAttributeGet;
