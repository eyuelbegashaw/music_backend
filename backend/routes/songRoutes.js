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
  getSongsCountByAlbum
} from "../controllers/songController.js";

router.get("/" , getSongs);
router.get("/count" , getCountOfAllSongs);
router.post("/" , createSong);
router.delete("/:id"  , deleteSong);
router.put("/:id" , updateSong);
router.get("/:genre" , getSongsByGenre);
router.get("/stat/:artist" , getArtistStats);
router.get("/stat/album/:album" , getSongsCountByAlbum);

export default router;
