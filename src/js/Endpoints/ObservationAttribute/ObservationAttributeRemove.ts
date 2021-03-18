import { Request } from "express";
import ObservationAttributeGet from "./ObservationAttributeGet";

class ObservationAttributeRemove {
   static route = async (req: Request) => {
      if (!req.params.uuid) throw new Error("UUID must be provided");

      return await ObservationAttributeRemove.removeByUUID(
         String(req.params.uuid).toUpperCase()
      );
   };

   static removeByUUID = async (uuid: string) => {
      const observationAttribute = await ObservationAttributeGet.getByUUID(
         uuid.toUpperCase()
      );

      return !!(await observationAttribute?.destroy());
   };
}

export default ObservationAttributeRemove;
