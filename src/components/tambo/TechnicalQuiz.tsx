"use client";

import { QuizSequence, QuizSequenceProps } from "./quiz-sequence";
import * as React from "react";
import { z } from "zod";

/**
 * Zod schema for Technical Quiz
 */
export const technicalQuizSchema = z.object({
  topic: z.string().optional().describe("Topic of the technical quiz"),
});

type TechnicalQuizProps = z.infer<typeof technicalQuizSchema>;

const technicalQuestions = [
  {
    question: "What is the primary benefit of React's Virtual DOM?",
    options: [
      "It makes the application run directly in the GPU",
      "It reduces the number of direct manipulations to the actual DOM",
      "It automatically minifies your CSS and JavaScript files",
      "It replaces the need for any state management libraries"
    ],
    correctAnswerIndex: 1,
    explanation: "The Virtual DOM allows React to calculate the most efficient way to update the UI by comparing a virtual representation with the actual DOM and only updating what changed.",
    title: "React Performance"
  },
  {
    question: "Which hook would you use to store a mutable value that doesn't trigger a re-render?",
    options: [
      "useState",
      "useMemo",
      "useRef",
      "useCallback"
    ],
    correctAnswerIndex: 2,
    explanation: "useRef returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component and changing it doesn't cause a re-render.",
    title: "React Hooks"
  },
  {
    question: "In JavaScript, what is 'hoisting'?",
    options: [
      "A way to move data from the client to the server",
      "The behavior of moving declarations to the top of their scope",
      "A performance optimization for loops",
      "The process of converting a string to a number"
    ],
    correctAnswerIndex: 1,
    explanation: "Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of the current scope before code execution.",
    topic: "JavaScript Mechanics"
  },
  {
    question: "What does the 'S' in SOLID principles stand for?",
    options: [
      "Sequence Control",
      "State Management",
      "Single Responsibility Principle",
      "Structural Integrity"
    ],
    correctAnswerIndex: 2,
    explanation: "The Single Responsibility Principle states that a class or module should have one, and only one, reason to change.",
    title: "Software Design"
  },
  {
    question: "Which of these is NOT a valid way to create a new transition in Framer Motion?",
    options: [
      "layoutId",
      "initial and animate props",
      "direct DOM manipulation",
      "variants"
    ],
    correctAnswerIndex: 2,
    explanation: "Framer Motion is designed to handle animations declaratively through props like initial, animate, exit, and variants. Direct DOM manipulation bypasses React and Framer Motion's logic.",
    title: "Frontend Animation"
  }
];

/**
 * TechnicalQuiz Component
 * 
 * A specialized version of QuizSequence with 5 technical questions.
 */
export const TechnicalQuiz: React.FC<TechnicalQuizProps> = ({ topic = "Technical Assessment" }) => {
  return (
    <QuizSequence 
      title={topic}
      questions={technicalQuestions}
    />
  );
};
