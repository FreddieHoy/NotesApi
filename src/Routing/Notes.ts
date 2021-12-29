import { Request, Response } from "express";
import { pool } from "../dbPool";

export const getNotes = (request: Request, response: Response) => {
  const { userId } = request.body;
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

// Feels as though now that I have logged in I shouldn't need to search by userId
export const createNote = (request: Request, response: Response) => {
  const { userId, heading, content, toDoItem, checked } = request.body;
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