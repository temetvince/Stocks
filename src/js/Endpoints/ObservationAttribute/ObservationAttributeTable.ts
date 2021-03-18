import DB from "../../Common/Database";
import { DataTypes } from "sequelize";

const ObservationAttributeTable = DB.define("ObservationAttribute", {
   observationAttributeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
   },
   observationAttributeUUID: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
   },
   observationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "observationID_type",
   },
   type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "observationID_type",
   },
   value: {
      type: DataTypes.STRING,
      allowNull: true,
   },
});

export default ObservationAttributeTable;
