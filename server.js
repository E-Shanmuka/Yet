const express = require("express");
const path = require("path");
const app = express();

const videos = [
  "r9RCcRHM7fI",
  "kNqzhqShicU",
  "V9AzuNliUVk"
];

let videoCount = 0;
let currentVideo = null;

// Pick a random video (not the same as the last one)
function getRandomVideo(lastVideo) {
  let next;
  do {
    next = videos[Math.floor(Math.random() * videos.length)];
  } while (next === lastVideo);
  return next;
}

// Loop forever, simulating playback
function playLoop() {
  currentVideo = getRandomVideo(currentVideo);
  videoCount++;
  console.log(`▶ Now playing: ${currentVideo} | Total Played: ${videoCount}`);

  // Simulate video length = 15 seconds
  setTimeout(playLoop, 15000);
}

// Start loop
playLoop();

// API to share current state
app.get("/status", (req, res) => {
  res.json({
    currentVideo,
    videoCount
  });
});

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
