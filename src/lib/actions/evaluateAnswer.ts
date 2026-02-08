"use server";

import OpenAI from "openai";
import { checkCodeOutputTool } from "../tools/tools";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


interface EvaluationResult {
  isCorrect: boolean;
  reason: string;
}

interface EvaluateAnswerParams {
  code: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
}

export async function evaluateAnswer({
  code,
  question,
  correctAnswer,
  userAnswer
}: EvaluateAnswerParams): Promise<EvaluationResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a strict JavaScript evaluator. Compare the user's answer to the expected console output. Ignore minor formatting differences unless they change meaning."
      },
      {
        role: "user",
        content: `
JavaScript Code:
${code}

Question:
${question}

Expected Output:
${correctAnswer}

User Answer:
${userAnswer}
        `
      }
    ],
    tools: [
      {
        type: "function",
        function: checkCodeOutputTool
      }
    ],
    tool_choice: {
      type: "function",
      function: { name: "check_code_output" }
    }
  });

  const toolCall = response.choices[0].message.tool_calls?.[0];
  if (toolCall?.type === 'function') {
    return JSON.parse(toolCall.function.arguments);
  }
  
  throw new Error("Invalid response from model: Expected a function tool call.");

}
