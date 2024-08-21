import express from "express";
const router = express.Router();

import {
  getSongs,
  updateSong,
  createSong,
  deleteSong,
  getCountOfAllSongs
} from "../controllers/songController.js";

router.get("/" , getSongs);
router.get("/count" , getCountOfAllSongs);
router.post("/" , createSong);
router.delete("/:id"  , deleteSong);
router.put("/:id" , updateSong);

export default router;
