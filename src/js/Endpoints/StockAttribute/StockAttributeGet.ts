import StockAttributeTable from "./StockAttributeTable";
import StockGet from "../Stock/StockGet";
import { Request } from "express";

class StockAttributeGet {
   static route = async (req: Request) => {
      const stockAttributeUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : undefined;
      const stockUUID = req.query.stockUUID
         ? String(req.query.stockUUID).toUpperCase()
         : undefined;
      const type = req.query.type
         ? String(req.query.type).toUpperCase()
         : undefined;

      if (stockAttributeUUID) {
         return await StockAttributeGet.getByUUID(stockAttributeUUID);
      } else if (stockUUID && type) {
         return await StockAttributeGet.getByStockUUIDAndType(stockUUID, type);
      } else {
         return null;
      }
   };

   static getByUUID = async (uuid: string) => {
      return await StockAttributeTable.findOne({
         where: { stockAttributeUUID: uuid.toUpperCase() },
      });
   };

   static getByStockUUIDAndType = async (stockUUID: string, type: string) => {
      const stockID = await StockGet.getByUUID(stockUUID.toUpperCase());

      return await StockAttributeTable.findOne({
         where: {
            stockID: stockID?.getDataValue("stockID"),
            type: type.toUpperCase(),
         },
      });
   };
}

export default StockAttributeGet;
