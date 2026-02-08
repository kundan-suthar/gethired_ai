export const checkCodeOutputTool = {
  name: "check_code_output",
  description: "Evaluate whether the user's predicted JavaScript output is correct",
  parameters: {
    type: "object",
    properties: {
      isCorrect: {
        type: "boolean",
        description: "Whether the user's answer matches the actual output"
      },
      reason: {
        type: "string",
        description: "Short explanation of why the answer is correct or incorrect"
      }
    },
    required: ["isCorrect", "reason"]
  }
};
