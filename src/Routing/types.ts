import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Request type from Express dosn't contain user.sub
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// export type Note = {
//   id: string;
//   userId: string;
//   heading: string;
//   content: string;
//   // date_created: Date;
//   toDoItem: boolean;
//   checked?: boolean;
// };

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };
