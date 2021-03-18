import express from "express";
import DB from "./Common/Database";
import SetupDB from "./SetupDB";
import StockEndpoint from "./Endpoints/Stock/StockEndpoint";
import StockAttributeEndpoint from "./Endpoints/StockAttribute/StockAttributeEndpoint";
import ObservationEndpoint from "./Endpoints/Observation/ObservationEndpoint";
import ObservationAttributeEndpoint from "./Endpoints/ObservationAttribute/ObservationAttributeEndpoint";
import UnitTypeEndpoint from "./Endpoints/UnitType/UnitTypeEndpoint";

SetupDB(DB);

const app = express();
const port = 4000;

app.listen(port, () => {
   console.info(`Server listening on ${port}`);
});

new StockEndpoint().route(app, "stock");
new StockAttributeEndpoint().route(app, "stockAttribute");
new ObservationEndpoint().route(app, "observation");
new ObservationAttributeEndpoint().route(app, "observationAttribute");
new UnitTypeEndpoint().route(app, "unitType");
