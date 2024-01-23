const express = require("express");
const router = express.Router();
const { getAllSongs, createSong, deleteSongs, editSong } = require("../controller/musicController")


router.get("/songs", getAllSongs)
router.get("/getSongInfo")
router.post("/add", createSong)
router.delete("/delete/:id", deleteSongs)
router.put("/edit/:title/:newTitle", editSong)


module.exports = router;