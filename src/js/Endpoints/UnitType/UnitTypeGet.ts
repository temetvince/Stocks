import { Request } from "express";
import UnitTypeTable from "./UnitTypeTable";

class UnitTypeGet {
   static route = async (req: Request) => {
      const unitTypeUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : undefined;
      const type = req.query.type
         ? String(req.query.type).toUpperCase()
         : undefined;

      if (unitTypeUUID) {
         return await UnitTypeGet.getByUUID(unitTypeUUID);
      } else if (type) {
         return await UnitTypeGet.getByType(type);
      } else {
         return null;
      }
   };

   static getByUUID = async (uuid: string) => {
      return await UnitTypeTable.findOne({
         where: { unitTypeUUID: uuid.toUpperCase() },
      });
   };

   static getByType = async (type: string) => {
      return await UnitTypeTable.findOne({
         where: {
            type: type.toUpperCase(),
         },
      });
   };
}

export default UnitTypeGet;
