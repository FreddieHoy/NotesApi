import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../dbPool";
import bcrypt from "bcrypt";

export const getUsers = (request: Request, response: Response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getUserById = (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const createUser = (request: Request, response: Response) => {
  const { name, email } = request.body;
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      // should have safer type checking..
      const newUserId = result.rows[0].id;
      response
        .status(201)
        .send(`User added with ID: ${newUserId ?? "unknown"}`);
    }
  );
};

export const updateUser = (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

export const deleteUser = (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

export const logInUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // There is no types on the body - might be a way to define this?
  const { email, password } = request.body;

  // console.log("loggin in ATTapemttTTT");

  // if (request.isAuthenticated()) {
  //   console.log("request", request);
  //   response.json({ message: `Welcome back !` });
  // }
  // next();
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        console.log("error from db query", error.message);
        throw error;
      }

      const user = results.rows[0];

      if (!user) {
        console.log("User not found.");
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
          response.json({ message: `Welcome back ${user.name}!`, token, user });
        }
      });
    }
  );
};

export const registerUser = async (request: Request, response: Response) => {
  const { name, email, password, confirmPassword } = request.body;

  if (!name || !email || !password || !confirmPassword) {
    console.log("Please enter all fields");
  }
  if (password !== confirmPassword) {
    console.log("Password confirmation not matching");
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
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
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
