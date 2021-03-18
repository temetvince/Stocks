import StockTable from "./StockTable";
import { v4 as uuid } from "uuid";
import { Request } from "express";

class StockPut {
   static route = async (req: Request) => {
      const stockUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : uuid().toUpperCase();
      const symbol = req.query.symbol
         ? String(req.query.symbol).toUpperCase()
         : undefined;

      if (!symbol) throw new Error("A symbol must be provided.");

      const stock = await StockTable.findOne({
         where: { stockUUID: stockUUID },
      });

      if (stock) {
         return await StockPut.update(stockUUID, symbol);
      } else {
         return await StockPut.create(stockUUID, symbol);
      }
   };

   static update = async (stockUUID: string, symbol: string) => {
      return await StockTable.update(
         {
            symbol: symbol.toUpperCase(),
         },
         {
            where: { stockUUID: stockUUID.toUpperCase() },
            returning: true,
         }
      );
   };

   static create = async (stockUUID: string, symbol: string) => {
      return await StockTable.create({
         stockUUID: stockUUID.toUpperCase(),
         symbol: symbol.toUpperCase(),
      });
   };
}

export default StockPut;
