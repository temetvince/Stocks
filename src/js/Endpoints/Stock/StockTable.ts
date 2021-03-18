import { DataTypes } from "sequelize";
import DB from "../../Common/Database";

const StockTable = DB.define("Stock", {
   stockID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
   },
   stockUUID: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
   },
   symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
});

export default StockTable;
