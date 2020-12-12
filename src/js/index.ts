import express, { Request, Response } from "express";
import type { IncomingHttpHeaders } from "http";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

const app = express();
const port = 4000;

interface RequestInfo {
   request: string;
   uri: string;
   query?: ParsedQs;
   parameters?: ParamsDictionary;
   headers: IncomingHttpHeaders;
   body?: any;
}

const getRequestInfo = (req: Request): RequestInfo => {
   return {
      request: req.method,
      uri: req.url,
      query: req.query,
      parameters: req.params,
      headers: req.headers,
      body: req.body,
   };
};

app.get("/", (req: Request, res: Response) => {
   console.info(getRequestInfo(req));

   res.send("Hello, World!");
});

app.listen(port, () => {
   console.info(`Server listening on ${port}`);
});
