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
      const totalSongs = await Song.countDocuments({});
      const uniqueArtists = await Song.distinct('artist');
      const uniqueAlgum = await Song.distinct('album');
      const uniqueGenre = await Song.distinct('genre');

      // Count the number of unique artists
      const totalArtist = uniqueArtists.length;
      const totalAlbum = uniqueAlgum.length;
      const totalGenre = uniqueGenre.length;
      
      return res.status(200).json({totalSongs, totalArtist, totalAlbum, totalGenre});
    } catch (error) {
      throw new Error('Error counting documents: ' + error.message); // Throw error to handle it in the caller
    }
  };


  const getSongsByGenre = async (req, res) => {
    try {
      const genre = req.params.genre;
      
      if (!genre) {
        return res.status(400).json({ error: 'Genre parameter is required' });
      }

      const songs = await Song.find({ genre: genre });
  
      if (songs.length === 0) {
        return res.status(404).json({ message: 'No songs found for this genre' });
      }
      return res.status(200).json(songs);
    } catch (error) {
      next(error);
    }
  };

export {getSongs, createSong, updateSong, deleteSong, getCountOfAllSongs, getSongsByGenre};
