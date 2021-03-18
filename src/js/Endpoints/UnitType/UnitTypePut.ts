import { v4 as uuid } from "uuid";
import { Request } from "express";
import UnitTypeTable from "./UnitTypeTable";

class UnitTypePut {
   static route = async (req: Request) => {
      const unitTypeUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : uuid().toUpperCase();
      const type = req.query.type
         ? String(req.query.type).toUpperCase()
         : undefined;
      const description = req.query.description
         ? String(req.query.description)
         : undefined;

      if (!type) throw new Error("A type must be provided.");

      const unitType = await UnitTypeTable.findOne({
         where: { unitTypeUUID: unitTypeUUID },
      });

      if (unitType) {
         return await UnitTypePut.update(unitTypeUUID, type, description);
      } else {
         return await UnitTypePut.create(unitTypeUUID, type, description);
      }
   };

   static update = async (
      unitTypeUUID: string,
      type: string,
      description: string | undefined
   ) => {
      return await UnitTypeTable.update(
         {
            type: type.toUpperCase(),
            description: description ? description : null,
         },
         {
            where: { unitTypeUUID: unitTypeUUID.toUpperCase() },
            returning: true,
         }
      );
   };

   static create = async (
      unitTypeUUID: string,
      type: string,
      description: string | undefined
   ) => {
      return await UnitTypeTable.create({
         unitTypeUUID: unitTypeUUID.toUpperCase(),
         type: type.toUpperCase(),
         description: description ? description : null,
      });
   };
}

export default UnitTypePut;
