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

  jwt.verify(token, secret, (err, payload) => {
    if (err) return response.sendStatus(401);

    if (!payload) throw new Error("No payload on request");

    // todo I shouldn't need the userId at this point.. should be able to find the user from token or something
    const { userId } = request.body;

    pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
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
