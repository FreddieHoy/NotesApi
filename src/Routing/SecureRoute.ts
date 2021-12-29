import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../dbPool";

export const secureRoute = (
  request: Request,
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

  const { id } = request.body;

  console.log(token);

  jwt.verify(token, secret, (err, payload) => {
    if (err) return response.sendStatus(401);

    if (!payload) throw new Error("No payload on request");

    pool.query(
      "SELECT * FROM users WHERE id = $1",
      [payload.sub],
      (error, results) => {
        if (error) {
          throw error;
        }

        const user = results.rows[0];

        if (!user) return response.sendStatus(401);

        next();
      }
    );
  });
};
