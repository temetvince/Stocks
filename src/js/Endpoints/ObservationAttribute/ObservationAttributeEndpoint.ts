import { Express, Request, Response } from "express";
import Handle from "../../Common/Handle";
import ObservationAttributePut from "./ObservationAttributePut";
import ObservationAttributeRemove from "./ObservationAttributeRemove";
import ObservationAttributeGet from "./ObservationAttributeGet";

class ObservationAttributeEndpoint {
   route(express: Express, endpoint: string) {
      //?observationUUID=&type=
      express.get(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(
            async () => await ObservationAttributeGet.route(req),
            res
         );
      });

      express.get(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(
            async () => await ObservationAttributeGet.route(req),
            res
         );
      });

      //?observationUUID=&type=&value=
      express.put(`/${endpoint}/`, async (req: Request, res: Response) => {
         await Handle(
            async () => await ObservationAttributePut.route(req),
            res
         );
      });

      //?observationUUID=&type=&value=
      express.put(`/${endpoint}/:uuid`, async (req: Request, res: Response) => {
         await Handle(
            async () => await ObservationAttributePut.route(req),
            res
         );
      });

      express.delete(
         `/${endpoint}/:uuid`,
         async (req: Request, res: Response) => {
            await Handle(
               async () => await ObservationAttributeRemove.route(req),
               res
            );
         }
      );
   }
}

export default ObservationAttributeEndpoint;
