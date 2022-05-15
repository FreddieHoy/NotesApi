import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { pool, secret } from "../dbPool";
import { AuthRequest } from "./types";

export const secureRoute = (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  if (!request.cookies.token) {
    return response.sendStatus(401);
  }

  const token: string = request.cookies.token;
  console.log("token ", request.cookies);

  jwt.verify(token, secret, (err, payload) => {
    if (err) return response.sendStatus(401);

    if (!payload) throw new Error("No payload on request");

    if (token && isJWTPayload(payload)) {
      pool.query(
        "SELECT * FROM users WHERE token = $1",
        [token],
        (error, results) => {
          if (error) {
            throw error;
          }

          const user = results.rows[0];

          if (!user) return response.sendStatus(401);

          request.user = payload;

          next();
        }
      );
    } else {
      response.sendStatus(404).json("No user found please login again");
    }
  });
};

const isJWTPayload = (payload: string | JwtPayload): payload is JwtPayload => {
  return typeof payload === "object";
};
