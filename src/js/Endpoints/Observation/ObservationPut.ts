import ObservationTable from "./ObservationTable";
import { v4 as uuid } from "uuid";
import StockGet from "../Stock/StockGet";
import { Request } from "express";

class ObservationPut {
   static route = async (req: Request) => {
      const observationUUID = req.params.uuid
         ? String(req.params.uuid).toUpperCase()
         : uuid().toUpperCase();
      const stockUUID = req.query.stockUUID
         ? String(req.query.stockUUID).toUpperCase()
         : undefined;
      const dateTime = req.query.dateTime
         ? String(new Date(String(req.query.dateTime)).toISOString())
         : undefined;

      if (!stockUUID || !dateTime)
         throw new Error("A stockUUID and a dateTime must be provided.");

      const observation = await ObservationTable.findOne({
         where: { observationUUID: observationUUID },
      });

      if (observation) {
         return await ObservationPut.update(
            observationUUID,
            stockUUID,
            dateTime
         );
      } else {
         return await ObservationPut.create(
            observationUUID,
            stockUUID,
            dateTime
         );
      }
   };

   static update = async (
      observationUUID: string,
      stockUUID: string,
      dateTime: string
   ) => {
      const stockID = await StockGet.getByUUID(stockUUID.toUpperCase());

      return await ObservationTable.update(
         {
            stockID: stockID?.getDataValue("stockID"),
            dateTime: dateTime,
         },
         {
            where: { observationUUID: observationUUID.toUpperCase() },
            returning: true,
         }
      );
   };

   static create = async (
      observationUUID: string,
      stockUUID: string,
      dateTime: string
   ) => {
      const stockID = await StockGet.getByUUID(stockUUID.toUpperCase());

      return await ObservationTable.create({
         observationUUID: observationUUID.toUpperCase(),
         stockID: stockID?.getDataValue("stockID"),
         dateTime: dateTime,
      });
   };
}

export default ObservationPut;
