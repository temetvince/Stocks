import Logger from "./Logger";
import { Response } from "express";

const handler = async (handle: () => Promise<any>, res: Response) => {
   try {
      const result = await handle();

      if (!result) res.status(404).send("{}");
      else res.status(200).send(result);
   } catch (e) {
      Logger.logError(e);

      res.status(400).send(e);
   }
};

export default handler;
