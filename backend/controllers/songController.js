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
    const song = await Song.findById(req.params.id);
    
    if (song) {
        let filter = {_id: req.params.id};
        let updatedSong = await Song.findOneAndUpdate(filter, req.body, {
            new: true,
            runValidators: true,
     });
     return res.status(201).json(updatedSong);

    } else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);

    if (song) {
      const result = await Song.deleteOne({ _id: req.params.id });
      return res.status(200).json({message: `Song ${req.params.id} removed`});
    } else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    next(error);
  }
};


const getCountOfAllSongs = async (req, res) => {
    try {
      const count = await Song.countDocuments({});
      return res.status(200).json({count});
    } catch (error) {
      throw new Error('Error counting documents: ' + error.message); // Throw error to handle it in the caller
    }
  };

export {getSongs, createSong, updateSong, deleteSong, getCountOfAllSongs};
