import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../dbPool";
import bcrypt from "bcrypt";

export const getMe = (request: Request, response: Response) => {
  const token = request.cookies.token;
  pool.query(
    "SELECT * FROM users WHERE token = $1",
    [token],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const logInUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // There is no types on the body - might be a way to define this?
  const { email, password } = request.body;

  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }

      const user = results.rows[0];

      if (!user) {
        throw new Error("User not found.");
      }

      const { password: hashedPassword } = user;

      bcrypt.compare(password, hashedPassword, function (err, result) {
        if (err) {
          console.log("Error from compare", err.message);
        }

        if (!result) {
          console.log("Incorrect");
        } else {
          const token = jwt.sign({ sub: user.id }, secret, {
            expiresIn: "6h",
          });

          response.cookie("token", token, { httpOnly: true });

          response.json({
            message: `Welcome back ${user.name}! (With Cookie)`,
            user,
          });

          pool.query(
            "UPDATE users SET token = $1 WHERE email = $2",
            [token, email],
            (error, result) => {
              if (error) {
                console.log("error from db query", error.message);
                throw error;
              }

              console.log("saved token");
            }
          );
        }
      });
    }
  );
};

export const logOut = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // There is no types on the body - might be a way to define this?
  const { id } = request.body;

  pool.query("UPDATE users SET token = NULL WHERE id = $1", [id], (error) => {
    if (error) {
      console.log("error from db query", error.message);
      throw error;
    }
    response.status(200);
  });
};

export const registerUser = async (request: Request, response: Response) => {
  const { name, email, password, confirmPassword } = request.body;

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Please enter all fields");
  }
  if (password !== confirmPassword) {
    throw new Error("Password confirmation not matching");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    `SELECT * FROM users
        WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        console.log("error from dbquery", err.message);
      }
      if (results.rows.length > 0) {
        console.log("Email already registered");
      } else {
        pool.query(
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, email, hashedPassword],
          (error, result) => {
            if (error) {
              console.log("error from reg db", error.message);
              throw error;
            }
            // should have safer type checking..
            const newUserId = result.rows[0].id;

            response
              .status(201)
              .send(`User added with ID: ${newUserId ?? "unknown"}`);
          }
        );
      }
    }
  );
};
