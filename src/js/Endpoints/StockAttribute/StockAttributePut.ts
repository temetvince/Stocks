import { v4 as uuid } from "uuid";
import StockAttributeTable from "./StockAttributeTable";
import StockGet from "../Stock/StockGet";
import { Request } from "express";

class StockAttributePut {
   static route = async (req: Request) => {
      const stockAttributeUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : uuid().toUpperCase();
      const stockUUID = req.query.stockUUID
         ? String(req.query.stockUUID).toUpperCase()
         : undefined;
      const type = req.query.type
         ? String(req.query.type).toUpperCase()
         : undefined;
      const value = req.query.value ? String(req.query.value) : undefined;

      if (!stockUUID || !type)
         throw new Error("A stockUUID and type must be provided.");

      const stockAttribute = await StockAttributeTable.findOne({
         where: { stockAttributeUUID: stockAttributeUUID },
      });

      if (stockAttribute) {
         return await StockAttributePut.update(
            stockAttributeUUID,
            stockUUID,
            type,
            value
         );
      } else {
         return await StockAttributePut.create(
            stockAttributeUUID,
            stockUUID,
            type,
            value
         );
      }
   };

   static update = async (
      stockAttributeUUID: string,
      stockUUID: string,
      type: string,
      value: string | undefined
   ) => {
      const stockID = await StockGet.getByUUID(stockUUID.toUpperCase());

      return await StockAttributeTable.update(
         {
            stockID: stockID?.getDataValue("stockID"),
            type: type.toUpperCase(),
            value: value ? value : null,
         },
         {
            where: { stockAttributeUUID: stockAttributeUUID.toUpperCase() },
            returning: true,
         }
      );
   };

   static create = async (
      stockAttributeUUID: string,
      stockUUID: string,
      type: string,
      value: string | undefined
   ) => {
      const stockID = await StockGet.getByUUID(stockUUID.toUpperCase());

      return await StockAttributeTable.create({
         stockAttributeUUID: stockAttributeUUID.toUpperCase(),
         stockID: stockID?.getDataValue("stockID"),
         type: type.toUpperCase(),
         value: value ? value : null,
      });
   };
}

export default StockAttributePut;
