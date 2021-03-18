import DB from "../../Common/Database";
import { DataTypes } from "sequelize";

const UnitTypeTable = DB.define("UnitType", {
   unitTypeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
   },
   unitTypeUUID: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
   },
   type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: true,
   },
});

export default UnitTypeTable;
