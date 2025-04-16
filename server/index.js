require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./models/database");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;
const authenticateTokenOptional = require("./middleware/auth");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API работает!");
});

app.post("/api/analyze", authenticateTokenOptional, async (req, res) => {
  const { url } = req.body;

  const loadTime = 1234;
  const size = 1024;
  const requests = 20;
  let improvementSuggestions = [];

  if (loadTime > 2000) {
    improvementSuggestions.push(
      "Consider optimizing images and using caching."
    );
  }

  if (requests > 50) {
    improvementSuggestions.push(
      "Reduce the number of HTTP requests by combining files."
    );
  }

  const suggestionsText = improvementSuggestions.join(" ");

  const result = {
    url,
    loadTime,
    size,
    requests,
    improvementSuggestions: suggestionsText,
  };
  res.json({ message: "Analysis result (not saved)", result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync().then(() => console.log("Database synced"));
});
