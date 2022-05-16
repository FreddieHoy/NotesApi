import { Router } from "express";
import * as UserDb from "./Users";
import * as NoteDb from "./Notes";
import { secureRoute } from "./SecureRoute";

export const router = Router();

router.post("/login", UserDb.logInUser);
router.post("/logout", secureRoute, UserDb.logOut);
router.post("/register", UserDb.registerUser);

router.get("/notes", secureRoute, NoteDb.getNotes);
router.get("/notes/:id", secureRoute, NoteDb.getNote);
router.post("/notes", secureRoute, NoteDb.createNote);
router.put("/notes/:id", secureRoute, NoteDb.editNote);
router.delete("/notes/:id", secureRoute, NoteDb.deleteNote);

router.get("/me", secureRoute, UserDb.getMe);
