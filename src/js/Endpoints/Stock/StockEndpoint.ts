import { Express, Request, Response } from "express";
import Handle from "../../Common/Handle";
import StockGet from "./StockGet";
import StockPut from "./StockPut";
import StockRemove from "./StockRemove";

class StockEndpoint {
   route(express: Express, endpoint: string) {
      //?symbol=
      express.get(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await StockGet.route(req), res);
      });

      express.get(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await StockGet.route(req), res);
      });

      //?symbol=
      express.put(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await StockPut.route(req), res);
      });

      //?symbol=
      express.put(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await StockPut.route(req), res);
      });

      express.delete(
         `/${endpoint}/:uuid`,
         async (req: Request, res: Response) => {
            await Handle(async () => await StockRemove.route(req), res);
         }
      );
   }
}

export default StockEndpoint;
