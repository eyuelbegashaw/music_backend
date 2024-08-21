import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
        type: String,
        required: true,
      },
    album: {
        type: String,
        required: true,
      },
    genre: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const song = mongoose.model("song", songSchema);

export default song;
