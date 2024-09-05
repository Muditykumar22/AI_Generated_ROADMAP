require("dotenv/config");
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
 history: [
  {
    role: "user",
    parts: [
      {text: "{\n  \"input\": {\n    \"subject\": \"Enter the subject here\",\n    \"days\": \"Enter the number of days available\",\n    \"hours_per_day\": \"Enter the number of hours available per day\",\n    \"preparing_for\": \"Enter the reason you are preparing (e.g., exam, interview)\"\n  },\n  \"output\": {\n    \"roadmap\": [\n      {\n        \"day\": 1,\n        \"topics\": [\n          {\n            \"topic\": \"__________\",\n            \"description\": \"Brief description of the topic\",\n            \"task_format\": \"Game format task description\",\n            \"resources\": [\n              {\n                \"resource_type\": \"Notes\",\n                \"link\": \"URL to notes for the topic\"\n              },\n              {\n                \"resource_type\": \"YouTube Video\",\n                \"channel\": \"like APNA COLLEGE, CODE AUR CHAI, CODE WITH HARRY, STRIVERS(anyone with the best views)\",\n                \"link\": \"YouTube link\"\n              }\n            ]\n          }\n        ]\n      },\n      {\n        \"day\": 2,\n        \"topics\": [\n          {\n            \"topic\": \"____________________\",\n            \"description\": \"Brief description of the topic\",\n            \"task_format\": \"Game format task description\",\n            \"resources\": [\n              {\n                \"resource_type\": \"Notes\",\n                \"link\": \"URL to notes for the topic\"\n              },\n              {\n                \"resource_type\": \"YouTube Video\",\n                \"channel\": \"like APNA COLLEGE, CODE AUR CHAI, CODE WITH HARRY, STRIVERS(anyone with the best views)\",\n                \"link\": \"YouTube link\"\n              }\n            ]\n          }\n        ]\n      }\n      // Add more days as needed...\n    ]\n  }\n}\n"},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "```json\n{\"input\": {\"subject\": \"Enter the subject here\", \"days\": \"Enter the number of days available\", \"hours_per_day\": \"Enter the number of hours available per day\", \"preparing_for\": \"Enter the reason you are preparing (e.g., exam, interview)\"}, \"output\": {\"roadmap\": [{\"day\": 1, \"topics\": [{\"topic\": \"__________\", \"description\": \"Brief description of the topic\", \"task_format\": \"Game format task description\", \"resources\": [{\"resource_type\": \"Notes\", \"link\": \"URL to notes for the topic\"}, {\"resource_type\": \"YouTube Video\", \"channel\": \"like APNA COLLEGE, CODE AUR CHAI, CODE WITH HARRY, STRIVERS(anyone with the best views)\", \"link\": \"YouTube link\"}]}]}, {\"day\": 2, \"topics\": [{\"topic\": \"____________________\", \"description\": \"Brief description of the topic\", \"task_format\": \"Game format task description\", \"resources\": [{\"resource_type\": \"Notes\", \"link\": \"URL to notes for the topic\"}, {\"resource_type\": \"YouTube Video\", \"channel\": \"like APNA COLLEGE, CODE AUR CHAI, CODE WITH HARRY, STRIVERS(anyone with the best views)\", \"link\": \"YouTube link\"}]}]}]}}\n\n```"},
    ],
  },
],
});

  const result = await chatSession.sendMessage(prompt);
  let ans = result.response.text()
  console.log(ans);
  // let answer = result.response.text();
  return ans;
}
module.exports = run;