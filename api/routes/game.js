import { fetchTop10Scores, savePlayerScoreToDb } from "../controllers/game.js";
import expressPackage from "express";
const express = expressPackage;

const router = express.Router();

router.get("/fetch-top-10-scores", fetchTop10Scores);

router.post("/save-player-score-to-db", savePlayerScoreToDb);

export default router;
