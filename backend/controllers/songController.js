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


const getArtistStats = async (req, res) => {
  const artist = req.params.artist;

  if (!req.params.artist) {
    return res.status(400).json({ message: 'Artist query parameter is required' });
  }

  try {
    const artistStats = await Song.aggregate([
      { $match: { artist } },
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
          albumCount: { $addToSet: "$album" } 
        }
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          songCount: 1,
          albumCount: { $size: "$albumCount" } 
        }
      }
    ]);

    if (artistStats.length === 0) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artistStats[0]);

  } catch (error) {
     next(error)
  }
};



// Controller function to get the number of songs in a specific album
const getSongsCountByAlbum = async (req, res) => {
  const album  = req.params.album;

  if (!album) {
    return res.status(400).json({ message: 'Album query parameter is required' });
  }

  try {
    // Count the number of songs in the specified album
    const songCount = await Song.countDocuments({ album });

    if (songCount === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.json({ album, songCount }); // Return the count of songs for the specified album
  } catch (error) {
    console.error('Error retrieving song count by album:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export {getSongs, createSong, updateSong, deleteSong, getCountOfAllSongs, getSongsByGenre , getArtistStats, getSongsCountByAlbum};
