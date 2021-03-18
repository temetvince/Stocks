import { DataTypes } from "sequelize";
import DB from "../../Common/Database";

const ObservationTable = DB.define("Observation", {
   observationID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
   },
   observationUUID: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
   },
   stockID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "stockID_dateTime",
   },
   dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: "stockID_dateTime",
   },
});

export default ObservationTable;
