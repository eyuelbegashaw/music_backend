import express from "express";
const router = express.Router();

import {
  getSongs,
  updateSong,
  createSong,
  deleteSong,
  getCountOfAllSongs,
  getSongsByGenre,
  getArtistStats,
  getSongsCountByAlbum,
} from "../controllers/songController.js";

router.get("/", getSongs);
router.get("/count", getCountOfAllSongs);
router.get("/stat/genre/:genre", getSongsByGenre);
router.get("/stat/artist/:artist", getArtistStats);
router.get("/stat/album/:album", getSongsCountByAlbum);

router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
