import { Sequelize } from "sequelize";

const DB = new Sequelize(
   process.env.DATABASE as string,
   process.env.USER as string,
   process.env.PASSWORD as string,
   {
      dialect: "postgres",
      host: "localhost",
   }
);

export default DB;
