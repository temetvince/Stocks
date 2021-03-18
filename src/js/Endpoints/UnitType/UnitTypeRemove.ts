import { Request } from "express";
import UnitTypeGet from "./UnitTypeGet";

class UnitTypeRemove {
   static route = async (req: Request) => {
      if (!req.params.uuid) throw new Error("UUID must be provided.");

      return await UnitTypeRemove.removeByUUID(
         String(req.params.uuid).toUpperCase()
      );
   };

   static removeByUUID = async (uuid: string) => {
      const unitType = await UnitTypeGet.getByUUID(uuid.toUpperCase());

      return !!(await unitType?.destroy());
   };
}

export default UnitTypeRemove;
