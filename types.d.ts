import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  export interface Request {
    user: JwtPayload;
  }
  export interface Response {
    user: JwtPayload;
  }
}
