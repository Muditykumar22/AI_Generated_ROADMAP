const run = require("./geminiApi");
const { Router, response } = require("express");
const router = Router();

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
