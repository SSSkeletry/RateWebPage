require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./models/database");
const routes = require("./routes");
const authenticateTokenOptional = require("./middleware/auth");
const { Plan } = require("./models/models");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API работает!");
});

app.post("/api/analyze", authenticateTokenOptional, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

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
  sequelize.sync().then(async () => {
    console.log("Database synced");

    const count = await Plan.count();
    if (count === 0) {
      await Plan.bulkCreate([
        { name: "Стандартний", maxWebsites: 1 },
        { name: "Середній", maxWebsites: 5 },
        { name: "Просунутий", maxWebsites: 20 },
      ]);
      console.log("Initial plans added to database");
    }
  });
});
