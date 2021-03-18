import ObservationTable from "./ObservationTable";
import StockGet from "../Stock/StockGet";
import { Request } from "express";

class ObservationGet {
   static route = async (req: Request) => {
      const observationUUID = req.params.observationUUID
         ? String(req.params.observationUUID).toUpperCase()
         : undefined;
      const stockUUID = req.query.stockUUID
         ? String(req.query.stockUUID).toUpperCase()
         : undefined;
      const dateTime = req.query.dateTime
         ? String(req.query.dateTime)
         : undefined;

      if (observationUUID) {
         return await ObservationGet.getByUUID(observationUUID);
      } else if (stockUUID && dateTime) {
         return await ObservationGet.getByStockUUIDAndDateTime(
            stockUUID,
            dateTime
         );
      } else {
         return null;
      }
   };

   static getByUUID = async (observationUUID: string) => {
      return await ObservationTable.findOne({
         where: { observationUUID: observationUUID.toUpperCase() },
      });
   };

   static getByStockUUIDAndDateTime = async (
      stockUUID: string,
      dateTime: string
   ) => {
      const stock = await StockGet.getByUUID(stockUUID.toUpperCase());

      return await ObservationTable.findOne({
         where: { stockID: stock?.getDataValue("stockID"), dateTime: dateTime },
      });
   };
}

export default ObservationGet;
