import express from "express";
import fetch from "node-fetch";
import { Client, ServerPort } from "./Utils.js";
const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", Client); // Update with your React app's origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Proxy endpoint for fetching all teams data
app.get("/api/teams", async (req, res) => {
  try {
    const resp = await fetch(
      "https://api.nhle.com/stats/rest/en/team/summary?start=0&limit=-1"
    );
    const data = await resp.json();
    let completeData = data?.data ?? [];
    res.json(completeData);
  } catch (error) {
    console.error("Error fetching team data:", error);
    res.status(500).json({ error: "Failed to fetch team data" });
  }
});

// Proxy endpoint for fetching team details
app.get("/api/getAbbrevations", async (req, res) => {
  try {
    const response = await fetch("https://api.nhle.com/stats/rest/en/team");
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error("Error fetching teams details:", error);
    res.status(500).json({ error: "Failed to fetch teams details" });
  }
});

// Proxy endpoint for fetching seasons data
app.get("/api/getSeasons", async (req, res) => {
  try {
    const response = await fetch("https://api-web.nhle.com/v1/season");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching teams details:", error);
    res.status(500).json({ error: "Failed to fetch teams details" });
  }
});

app.listen(ServerPort, () => {
  console.log(`Server is running on http://localhost:${ServerPort}`);
});
