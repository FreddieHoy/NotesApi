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
  if (
    !request.headers.authorization ||
    !request.headers.authorization.startsWith("Bearer")
  ) {
    return response.sendStatus(401);
  }

  const token = request.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secret, (err, payload) => {
    if (err) return response.sendStatus(401);

    if (!payload) throw new Error("No payload on request");

    // todo I shouldn't need the userId at this point.. should be able to find the user from token or something
    const userId = payload.sub;

    if (userId && isJWTPayload(payload)) {
      pool.query(
        "SELECT * FROM users WHERE id = $1",
        [userId],
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
