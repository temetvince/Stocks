import { ParsedQs } from "qs";
import { ParamsDictionary } from "express-serve-static-core";
import { IncomingHttpHeaders } from "http";
import { Request } from "express";

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

class Logger {
   static log(toLog: any) {
      console.info(toLog);
   }

   static logRequest(req: Request) {
      console.info(getRequestInfo(req));
   }

   static logError(error: Error) {
      console.error(String(error));
   }
}

export default Logger;
