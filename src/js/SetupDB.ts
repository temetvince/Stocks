import { Sequelize } from "sequelize";
import Logger from "./Common/Logger";
import StockTable from "./Endpoints/Stock/StockTable";
import StockAttributeTable from "./Endpoints/StockAttribute/StockAttributeTable";
import ObservationTable from "./Endpoints/Observation/ObservationTable";
import ObservationAttributeTable from "./Endpoints/ObservationAttribute/ObservationAttributeTable";
import UnitTypeTable from "./Endpoints/UnitType/UnitTypeTable";

const SetupDB = (database: Sequelize) => {
   try {
      database
         .authenticate()
         .then((r) =>
            console.log("Connection has been established successfully.")
         );
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }

   (async () => {
      Logger.log(await StockTable.sync());
   })();

   (async () => {
      Logger.log(await StockAttributeTable.sync());
   })();

   (async () => {
      Logger.log(await ObservationTable.sync());
   })();

   (async () => {
      Logger.log(await ObservationAttributeTable.sync());
   })();

   (async () => {
      Logger.log(await UnitTypeTable.sync());
   })();
};

export default SetupDB;
