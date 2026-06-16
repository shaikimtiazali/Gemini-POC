require("dotenv").config({ quiet: true });

const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/ai", require("./src/routes/ai.routes"));

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
