/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { MultipleChoiceQuestion, mcqSchema } from "@/components/tambo/mcq";
import { CodeOutputQuestion, codeOutputSchema } from "@/components/tambo/code-output-question";
import { InterviewQuiz, interviewQuizSchema } from "@/components/tambo/Interview";
import { QuizSequence, quizSequenceSchema } from "@/components/tambo/quiz-sequence";
import { TechnicalQuiz, technicalQuizSchema } from "@/components/tambo/TechnicalQuiz";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";
import { getUserProfile } from "./actions/user";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "userProfile",
    description:
      "A tool to get the current user's profile information including industry, bio, experience, and skills. Use this to personalize the conversation or preparation advice.",
    tool: getUserProfile,
    inputSchema: z.object({}),
    outputSchema: z.object({
      id: z.string(),
      name: z.string().nullable(),
      email: z.string(),
      industry: z.string().nullable(),
      bio: z.string().nullable(),
      experience: z.number().nullable(),
      skills: z.array(z.string()),
    }).nullable(),
  }
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [

  {
    name: "MultipleChoiceQuestion",
    description:
      "A component that displays a multiple choice question with options. It provides immediate feedback to the user on whether their selection was correct and can show an explanation.",
    component: MultipleChoiceQuestion,
    propsSchema: mcqSchema,
  },
  {
    name: "InterviewQuiz",
    description:
      "A specialized component that presents one of three technical interview questions about React, JavaScript, or System Design.",
    component: InterviewQuiz,
    propsSchema: interviewQuizSchema,
  },
  {
    name: "QuizSequence",
    description:
      "A flexible quiz component that manages a sequence of multiple choice questions with progress tracking and navigation.",
    component: QuizSequence,
    propsSchema: quizSequenceSchema,
  },
  {
    name: "TechnicalQuiz",
    description:
      "A specialized assessment component containing 5 technical interview questions covering React, JavaScript, and software design.",
    component: TechnicalQuiz,
    propsSchema: technicalQuizSchema,
  },
  {
    name: "CodeOutputQuestion",
    description:
      "A specialized interactive component for JavaScript output-based questions. It shows a code snippet and asks the user to predict the exactly printed console output. This is specifically for JavaScript logic challenges like object keys, closures, hoisting, and array methods. Use this when the user needs to demonstrate deep understanding of JS execution.",
    component: CodeOutputQuestion,
    propsSchema: codeOutputSchema,
  },
];
