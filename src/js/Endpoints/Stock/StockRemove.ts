import StockGet from "./StockGet";
import { Request } from "express";
import StockAttributeRemove from "../StockAttribute/StockAttributeRemove";

class StockRemove {
   static route = async (req: Request) => {
      if (!req.params.uuid) throw new Error("UUID must be provided.");

      return await StockRemove.removeByUUID(
         String(req.params.uuid).toUpperCase()
      );
   };

   static removeByUUID = async (uuid: string) => {
      await StockAttributeRemove.removeByStockUUID(uuid.toUpperCase());

      const stock = await StockGet.getByUUID(uuid.toUpperCase());

      return !!(await stock?.destroy());
   };
}

export default StockRemove;
