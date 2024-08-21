import express from "express";
const router = express.Router();

import {
  getSongs,
  updateSong,
  createSong,
  deleteSong
} from "../controllers/songController.js";

router.get("/" , getSongs);
router.post("/" , createSong);
router.delete("/:id"  , deleteSong);
router.put("/:id" , updateSong);

export default router;
