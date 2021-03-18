import StockTable from "./StockTable";
import { Request } from "express";

class StockGet {
   static route = async (req: Request) => {
      const stockUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : undefined;
      const symbol = req.query.symbol
         ? String(req.query.symbol).toUpperCase()
         : undefined;

      if (stockUUID) {
         return await StockGet.getByUUID(stockUUID);
      } else if (symbol) {
         return await StockGet.getBySymbol(symbol);
      } else {
         return null;
      }
   };

   static getByUUID = async (uuid: string) => {
      return await StockTable.findOne({
         where: { stockUUID: uuid.toUpperCase() },
      });
   };

   static getBySymbol = async (symbol: string) => {
      return await StockTable.findOne({
         where: { symbol: symbol.toUpperCase() },
      });
   };
}

export default StockGet;
