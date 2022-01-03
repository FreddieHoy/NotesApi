import { Router } from "express";
import * as UserDb from "./Users";
import * as NoteDb from "./Notes";
import { secureRoute } from "./SecureRoute";
import passport from "passport";

export const router = Router();

router.post("/login", passport.authenticate("local"), UserDb.logInUser);
router.post("/register", UserDb.registerUser);

router.get("/notes", secureRoute, NoteDb.getNotes);
router.get("/notes/:id", secureRoute, NoteDb.getNote);
router.post("/notes", secureRoute, NoteDb.createNote);
router.put("/notes/:id", secureRoute, NoteDb.editNote);
router.delete("/notes/:id", secureRoute, NoteDb.deleteNote);

// router.get("/users", UserDb.getUsers);
// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);
