import { Request } from "express";
import ObservationGet from "./ObservationGet";

class ObservationRemove {
   static route = async (req: Request) => {
      if (!req.params.uuid) throw new Error("UUID must be provided.");

      return await ObservationRemove.removeByUUID(
         String(req.params.uuid).toUpperCase()
      );
   };

   static removeByUUID = async (uuid: string) => {
      const observation = await ObservationGet.getByUUID(uuid.toUpperCase());

      return !!(await observation?.destroy());
   };
}

export default ObservationRemove;
