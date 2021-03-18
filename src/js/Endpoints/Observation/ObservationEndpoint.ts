import { Express, Request, Response } from "express";
import Handle from "../../Common/Handle";
import ObservationRemove from "./ObservationRemove";
import ObservationPut from "./ObservationPut";
import ObservationGet from "./ObservationGet";

class ObservationEndpoint {
   route(express: Express, endpoint: string) {
      //?stockUUID=&dateTime=
      express.get(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await ObservationGet.route(req), res);
      });

      express.get(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await ObservationGet.route(req), res);
      });

      //?stockUUID=&dateTime=
      express.put(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(async () => await ObservationPut.route(req), res);
      });

      //?stockUUID=&dateTime=
      express.put(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(async () => await ObservationPut.route(req), res);
      });

      express.delete(
         `/${endpoint}/:uuid`,
         async (req: Request, res: Response) => {
            await Handle(async () => await ObservationRemove.route(req), res);
         }
      );
   }
}

export default ObservationEndpoint;
