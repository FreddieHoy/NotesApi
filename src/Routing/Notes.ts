import { Request, Response } from "express";
import { pool } from "../dbPool";

export const getNotes = (request: Request, response: Response) => {
  // typing isn't able to find jwt
  const userId = (request.user as any).sub;

  pool.query(
    "SELECT * FROM notes WHERE userId = $1 ORDER BY id ASC",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const getNote = (request: Request, response: Response) => {
  const { id } = request.params;
  const userId = (request.user as any).sub;

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

// Feels as though now that I have logged in I shouldn't need to search by userId
export const createNote = (request: Request, response: Response) => {
  const { heading, content, toDoItem, checked } = request.body;
  const userId = (request.user as any).sub;

  pool.query(
    "INSERT INTO notes (userId, heading, content, toDoItem, checked) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, heading, content, toDoItem, checked],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const editNote = (request: Request, response: Response) => {
  const { id, heading, content, toDoItem, checked } = request.body;

  pool.query(
    `UPDATE notes SET  
      heading = $1,
      content = $2,
      toDoItem = $3,
      checked = $4
      WHERE id = $5 
      RETURNING *
      `,
    [heading, content, toDoItem, checked, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const deleteNote = (request: Request, response: Response) => {
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
