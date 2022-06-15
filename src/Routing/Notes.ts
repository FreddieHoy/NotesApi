import { Response } from "express";
import { pool } from "../dbPool";
import { AuthRequest } from "./types";

export const getNotes = (request: AuthRequest, response: Response) => {
  const userId = request.user?.sub;

  pool.query(
    "SELECT * FROM notes WHERE userId = $1 ORDER BY id ASC",
    [userId],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const getNote = (request: AuthRequest, response: Response) => {
  const { id } = request.params;
  const userId = request.user?.sub;

  pool.query(
    "SELECT * FROM notes WHERE userId = $1, id = $2 ORDER BY id ASC",
    [userId, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// TODO Change to use token and not user id
// const token = request.cookies.authToken;
export const createNote = (request: AuthRequest, response: Response) => {
  const { heading, content, todoitem, checked } = request.body;
  const userId = request.user?.sub;

  pool.query(
    "INSERT INTO notes (userId, heading, content, todoitem, checked) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, heading, content, todoitem, checked],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const editNote = (request: AuthRequest, response: Response) => {
  const { id, heading, content, todoitem, checked } = request.body;

  pool.query(
    `UPDATE notes SET  
      heading = $1,
      content = $2,
      todoitem = $3,
      checked = $4
      WHERE id = $5 
      RETURNING *
    `,
    [heading, content, todoitem, checked, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const deleteNote = (request: AuthRequest, response: Response) => {
  const { id } = request.body;
  pool.query(
    `DELETE From notes 
      WHERE id = $1
    `,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
