import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Welcome to Dalle Routes" });
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;
    console.log(image);
    res.status(200).json({ photo: image });
  } catch (error) {
    if (response.status(400)) {
      res.send(400).json({ message: response.error.body });
    }
    res.status(500).json({ message: "Something went wrong.!", error });
  }
});

export default router;
