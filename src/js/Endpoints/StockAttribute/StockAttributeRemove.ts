import StockAttributeGet from "./StockAttributeGet";
import { Request } from "express";
import StockGet from "../Stock/StockGet";
import StockAttributeTable from "./StockAttributeTable";

class StockAttributeRemove {
   static route = async (req: Request) => {
      if (!req.params.uuid) throw new Error("UUID must be provided.");

      return await StockAttributeRemove.removeByUUID(
         String(req.params.uuid).toUpperCase()
      );
   };

   static removeByUUID = async (uuid: string) => {
      const stockAttribute = await StockAttributeGet.getByUUID(
         uuid.toUpperCase()
      );

      return !!(await stockAttribute?.destroy());
   };

   static removeByStockUUID = async (stockUUID: string) => {
      const stockID = await StockGet.getByUUID(stockUUID.toUpperCase());
      const stockAttributes = await StockAttributeTable.findAll({
         where: { stockID: stockID?.getDataValue("stockID") },
      });

      for (const stockAttribute of stockAttributes) {
         await stockAttribute.destroy();
      }

      return true;
   };
}

export default StockAttributeRemove;
