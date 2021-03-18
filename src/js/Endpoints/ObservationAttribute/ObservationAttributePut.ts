import { v4 as uuid } from "uuid";
import { Request } from "express";
import ObservationAttributeTable from "./ObservationAttributeTable";
import ObservationGet from "../Observation/ObservationGet";

class ObservationAttributePut {
   static route = async (req: Request) => {
      const observationAttributeUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : uuid().toUpperCase();
      const observationUUID = req.query.observationUUID
         ? String(req.query.observationUUID).toUpperCase()
         : undefined;
      const type = req.query.type
         ? String(req.query.type).toUpperCase()
         : undefined;
      const value = req.query.value ? String(req.query.value) : undefined;

      if (!observationUUID || !type)
         throw new Error("An observationUUID and type must be provided.");

      const observationAttribute = await ObservationAttributeTable.findOne({
         where: { observationAttributeUUID: observationAttributeUUID },
      });

      if (observationAttribute) {
         return await ObservationAttributePut.update(
            observationAttributeUUID,
            observationUUID,
            type,
            value
         );
      } else {
         return await ObservationAttributePut.create(
            observationAttributeUUID,
            observationUUID,
            type,
            value
         );
      }
   };

   static update = async (
      observationAttributeUUID: string,
      observationUUID: string,
      type: string,
      value: string | undefined
   ) => {
      const observation = await ObservationGet.getByUUID(
         observationUUID.toUpperCase()
      );

      return await ObservationAttributeTable.update(
         {
            observationID: observation?.getDataValue("observationID"),
            type: type.toUpperCase(),
            value: value ? value : null,
         },
         {
            where: {
               observationAttributeUUID: observationAttributeUUID.toUpperCase(),
            },
            returning: true,
         }
      );
   };

   static create = async (
      observationAttributeUUID: string,
      observationUUID: string,
      type: string,
      value: string | undefined
   ) => {
      const observation = await ObservationGet.getByUUID(
         observationUUID.toUpperCase()
      );
      return await ObservationAttributeTable.create({
         observationAttributeUUID: observationAttributeUUID.toUpperCase(),
         observationID: observation?.getDataValue("observationID"),
         type: type.toUpperCase(),
         value: value ? value : null,
      });
   };
}

export default ObservationAttributePut;
