import { Express, Request, Response } from "express";
import Handle from "../../Common/Handle";
import StockAttributeGet from "./StockAttributeGet";
import StockAttributePut from "./StockAttributePut";
import StockAttributeRemove from "./StockAttributeRemove";

class StockAttributeEndpoint {
   route(express: Express, endpoint: string) {
      //?stockUUID=&type=
      express.get(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await StockAttributeGet.route(req), res);
      });

      express.get(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await StockAttributeGet.route(req), res);
      });

      //?stockUUID=&type=&value=
      express.put(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await StockAttributePut.route(req), res);
      });

      //?stockUUID=&type=&value=
      express.put(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await StockAttributePut.route(req), res);
      });

      express.delete(
         `/${endpoint}/:uuid`,
         async (req: Request, res: Response) => {
            await Handle(
               async () => await StockAttributeRemove.route(req),
               res
            );
         }
      );
   }
}

export default StockAttributeEndpoint;
