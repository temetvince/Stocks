import { Express, Request, Response } from "express";
import Handle from "../../Common/Handle";
import UnitTypeGet from "./UnitTypeGet";
import UnitTypePut from "./UnitTypePut";
import UnitTypeRemove from "./UnitTypeRemove";

class UnitTypeEndpoint {
   route(express: Express, endpoint: string) {
      //?type=
      express.get(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await UnitTypeGet.route(req), res);
      });

      express.get(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await UnitTypeGet.route(req), res);
      });

      //?type=&value=
      express.put(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await UnitTypePut.route(req), res);
      });

      //?stockUUID=&type=&value
      express.put(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await UnitTypePut.route(req), res);
      });

      express.delete(
         `/${endpoint}/:uuid`,
         async (req: Request, res: Response) => {
            await Handle(async () => await UnitTypeRemove.route(req), res);
         }
      );
   }
}

export default UnitTypeEndpoint;
