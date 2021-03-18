import { DataTypes } from "sequelize";
import DB from "../../Common/Database";

const StockAttributeTable = DB.define("StockAttribute", {
   stockAttributeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
   },
   stockAttributeUUID: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
   },
   stockID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "stockID_type",
   },
   type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "stockID_type",
   },
   value: {
      type: DataTypes.STRING,
      allowNull: true,
   },
});

export default StockAttributeTable;
