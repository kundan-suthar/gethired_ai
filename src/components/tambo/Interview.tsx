"use client";

import { MultipleChoiceQuestion } from "./mcq";
import * as React from "react";
import { z } from "zod";

/**
 * Zod schema for Interview Quiz
 */
export const interviewQuizSchema = z.object({
  questionIndex: z.number().min(0).max(2).describe("Index of the interview question to show (0-2)"),
});

type InterviewQuizProps = z.infer<typeof interviewQuizSchema>;

const questions = [
  {
    question: "In React, what is the primary purpose of the 'useEffect' dependency array?",
    options: [
      "To specify which props should be visible in the component",
      "To control when the side effect function should re-run",
      "To define the order of execution for multiple effects",
      "To automatically memoize the component's render output"
    ],
    correctAnswerIndex: 1,
    explanation: "The dependency array tells React to only re-run the effect if the values within that array have changed between renders. An empty array [] means it runs once after mount.",
    title: "React Fundamentals"
  },
  {
    question: "Which of the following describes 'Closures' in JavaScript?",
    options: [
      "A way to close a browser tab programmatically",
      "A method of private class fields introduced in ES2022",
      "A function bundled together with its lexical environment",
      "A syntax for immediately invoked function expressions (IIFE)"
    ],
    correctAnswerIndex: 2,
    explanation: "A closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.",
    title: "JavaScript Core"
  },
  {
    question: "When designing a system for high availability, what does 'Horizontal Scaling' refer to?",
    options: [
      "Increasing the power (CPU/RAM) of a single existing server",
      "Optimizing the database queries to run faster",
      "Adding more machines to your pool of resources",
      "Moving data from a relational to a non-relational database"
    ],
    correctAnswerIndex: 2,
    explanation: "Horizontal scaling (scaling out) means adding more nodes (servers) to your infrastructure. Vertical scaling (scaling up) means adding more power to an existing node.",
    title: "System Design"
  }
];

/**
 * InterviewQuiz Component
 * 
 * A wrapper around MCQ that provides technical interview questions.
 */
export const InterviewQuiz: React.FC<InterviewQuizProps> = ({ questionIndex }) => {
  const data = questions[questionIndex % questions.length];
  
  return (
    <MultipleChoiceQuestion 
      {...data}
      className="my-4 shadow-indigo-500/10"
    />
  );
};
