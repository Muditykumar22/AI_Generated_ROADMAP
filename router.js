const run = require("./geminiApi");
const { Router, response } = require("express");
const router = Router();
const generatePPT = require("./generatePPTApi"); // Import the new file

router.post("/api/generate-ppt", async (req, res) => {
  try {
    const { topic } = req.body;
    const response = await generatePPT(topic); // Call the API
    res.json({ link: response.link });
    // res.json(response); // Return the API response
  } catch (error) {
    console.error("Error generating PPT:", error);
    res.status(500).send("Failed to generate PPT");
  }
});

router.post("/prompt-post", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await run(prompt);
    
    res.send(response);

  } catch (error) {
    console.log(error);
    res.send("there is an error");
  }
});

module.exports = router;
