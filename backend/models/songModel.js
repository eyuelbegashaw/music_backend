import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
        type: String,
        required: true,
        unique: true,
      },
      album: {
        type: String,
        required: true,
        unique: true,
      },
      genre: {
        type: String,
        required: true,
        unique: true,
      },
  },
  {
    timestamps: true,
  }
);

const song = mongoose.model("song", songSchema);

export default song;
