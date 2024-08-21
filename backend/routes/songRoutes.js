import express from "express";
const router = express.Router();

import {
  getSongs,
  updateSong,
  createSong,
  deleteSong,
  getCountOfAllSongs,
  getSongsByGenre
} from "../controllers/songController.js";

router.get("/" , getSongs);
router.get("/count" , getCountOfAllSongs);
router.post("/" , createSong);
router.delete("/:id"  , deleteSong);
router.put("/:id" , updateSong);
router.get("/:genre" , getSongsByGenre)

export default router;
