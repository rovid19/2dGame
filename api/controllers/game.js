import Score from "../models/Score.js";

export const savePlayerScoreToDb = async (req, res) => {
  const { playerName, playerScore } = req.body;

  const newScore = new Score();

  newScore.set({
    player: playerName,
    score: playerScore,
  });

  await newScore.save();

  res.json("ok");
};

export const fetchTop10Scores = async (req, res) => {
  const allScores = await Score.find();

  const topScores = allScores.sort((a, b) => b.score - a.score);

  const top10scores = topScores.splice(0, 10);

  res.json(top10scores);
};
