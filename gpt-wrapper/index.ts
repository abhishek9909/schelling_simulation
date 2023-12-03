import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatRoles, ISatisfactionRequest } from "./src/types";
import settings from "./settings/local.settings.json";
import { ChatMessage } from "langchain/schema";
import { Prompts } from "./src/assets/prompt";
import bodyParser from "body-parser";

const chatModel = new ChatOpenAI({
  temperature: 0.1,
  openAIApiKey: settings.apiKey,
});

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Given: Neighbours and Current profile information.
 * Receieved: Satisfaction rate of the profile.
 */
app.post(
  "/api/satisfaction",
  async (req: Request<any, any, ISatisfactionRequest>, res: Response) => {
    const reqBody = req.body;
    const systemMessage = new ChatMessage({
      content: Prompts.SatisfactionSystemPrompt,
      role: ChatRoles.System,
    });
    const userMessage = new ChatMessage({
      content: Prompts.SatisfactionUserPromptTemplate.replace(
        "{profile}",
        JSON.stringify(reqBody.currentProfile)
      ).replace(
        "{otherProfiles}",
        JSON.stringify(reqBody.neighbouringProfiles)
      ),
      role: ChatRoles.User,
    });
    const baseMessage = await chatModel.call([systemMessage, userMessage]);
    let plainText = "";
    if (typeof baseMessage === "string") {
      plainText = baseMessage;
    } else if (typeof baseMessage === "object") {
      plainText = baseMessage.text;
    }
    console.log("plainText", plainText);
    res.json(JSON.parse(plainText));
  }
);

/**
 * Given: Neighbours and Current profile information.
 * Receieved: Satisfaction rate of the profile.
 */
app.post(
  "/api/affinity",
  async (req: Request<any, any, ISatisfactionRequest>, res: Response) => {
    const reqBody = req.body;
    const systemMessage = new ChatMessage({
      content: Prompts.AffinitySystemPrompt,
      role: ChatRoles.System,
    });
    const userMessage = new ChatMessage({
      content: Prompts.AffinityUserPromptTemplate.replace(
        "{profile}",
        JSON.stringify(reqBody.currentProfile)
      ).replace(
        "{otherProfiles}",
        JSON.stringify(reqBody.neighbouringProfiles)
      ),
      role: ChatRoles.User,
    });
    const baseMessage = await chatModel.call([systemMessage, userMessage]);
    let plainText = "";
    if (typeof baseMessage === "string") {
      plainText = baseMessage;
    } else if (typeof baseMessage === "object") {
      plainText = baseMessage.text;
    }
    console.log("plainText", plainText);
    res.json(JSON.parse(plainText));
  }
);

/**
 * Given: Number of profiles to create.
 * Received: Creating many profiles.
 */
app.put("/api/grid", (req: Request, res: Response) => {
  const reqBody = req.body;
  console.log("Request body is: ", reqBody);
  res.json({ message: "response is understood" });
});

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
