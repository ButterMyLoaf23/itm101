const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (request, response) => {
  response.json({
    message: "Node.js is connected!",
    time: new Date().toLocaleTimeString(),
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
