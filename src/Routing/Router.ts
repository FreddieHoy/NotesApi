import { Router } from "express";
import * as UserDb from "./Users";
import * as NoteDb from "./Notes";

export const router = Router();

router.post("/login", UserDb.logInUser);
router.post("/register", UserDb.registerUser);

router.get("/notes", NoteDb.getNotes);

// app.get("/users", db.getUsers);
// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);
