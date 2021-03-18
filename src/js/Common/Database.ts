import { Sequelize } from "sequelize";

const DB = new Sequelize("Stock", "postgres", "Twertle1234", {
   dialect: "postgres",
   host: "localhost",
});

export default DB;
