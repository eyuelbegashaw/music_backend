import Song from "../models/songModel.js";

const createSong = async (req, res, next) => {
  try {
    const newSong = new Song(req.body);
    const createdSong = await newSong.save();
    return res.status(201).json(createdSong);
  } catch (error) {
    next(error);
  }
};

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find({});
    return res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const updateSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Id query parameter is required" });
    }

    const song = await Song.findById(req.params.id);
    if (song) {
      let filter = { _id: id };
      let updatedSong = await Song.findOneAndUpdate(filter, req.body, {
        new: true,
      });
      return res.status(201).json(updatedSong);
    } else {
      return res.status(404).json({ message: "Song not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Id query parameter is required" });
    }
    const song = await Song.findById(id);

    if (song) {
      const result = await Song.deleteOne({ _id: id });
      return res.status(200).json({ message: `Song ${id} removed` });
    } else {
      return res.status(404).json({ message: "Song not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getCountOfAllSongs = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments({});
    const uniqueArtists = await Song.distinct("artist");
    const uniqueAlgum = await Song.distinct("album");
    const uniqueGenre = await Song.distinct("genre");

    const totalArtist = uniqueArtists.length;
    const totalAlbum = uniqueAlgum.length;
    const totalGenre = uniqueGenre.length;

    return res
      .status(200)
      .json({ totalSongs, totalArtist, totalAlbum, totalGenre });
  } catch (error) {
    next(error);
  }
};

const getSongsByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    if (!genre) {
      return res
        .status(400)
        .json({ error: "Genre query parameter is required" });
    }
    const songs = await Song.find({ genre: genre });
    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found for this genre" });
    }
    return res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const getArtistStats = async (req, res) => {
  try {
    const artist = req.params.artist;

    if (!req.artist) {
      return res
        .status(400)
        .json({ message: "Artist query parameter is required" });
    }
    const artistStats = await Song.aggregate([
      { $match: { artist } },
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
          albumCount: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          songCount: 1,
          albumCount: { $size: "$albumCount" },
        },
      },
    ]);

    if (artistStats.length === 0) {
      return res.status(404).json({ message: "Artist not found" });
    }

    return res.status(200).json(artistStats[0]);
  } catch (error) {
    next(error);
  }
};

const getSongsCountByAlbum = async (req, res) => {
  try {
    const album = req.params.album;

    if (!album) {
      return res
        .status(400)
        .json({ message: "Album query parameter is required" });
    }

    const songCount = await Song.countDocuments({ album });
    if (songCount === 0) {
      return res.status(404).json({ message: "Album not found" });
    }
    return res.status(200).json({ album, songCount });
  } catch (error) {
    next(error);
  }
};

export {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getCountOfAllSongs,
  getSongsByGenre,
  getArtistStats,
  getSongsCountByAlbum,
};
