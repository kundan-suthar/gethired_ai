"use client";

import { cn } from "@/lib/utils";
import { useTamboComponentState } from "@tambo-ai/react";
import { ChevronRight, ChevronLeft, Trophy, Target } from "lucide-react";
import * as React from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MultipleChoiceQuestion } from "./mcq";

/**
 * Zod schema for Quiz Sequence component props
 */
export const quizSequenceSchema = z.object({
  title: z.string().describe("The title of the quiz"),
  questions: z.array(z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswerIndex: z.number(),
    explanation: z.string().optional(),
    title: z.string().optional(),
  })).describe("List of 5 questions to display"),
});

/**
 * Type inferred from the Zod schema
 */
export type QuizSequenceProps = z.infer<typeof quizSequenceSchema>;

/**
 * State type for the Quiz Sequence component
 */
export type QuizSequenceState = {
  currentQuestionIndex: number;
  completed: boolean;
  score: number;
  answers: (number | null)[];
};

/**
 * QuizSequence Component
 * 
 * A parent component that manages a sequence of MultipleChoiceQuestions.
 * Features progress tracking, navigation, and results summary.
 */
export const QuizSequence: React.FC<QuizSequenceProps> = ({ title, questions }) => {
  const [state, setState] = useTamboComponentState<QuizSequenceState>(
    `quiz-${title.replace(/\s+/g, '-').toLowerCase()}`,
    {
      currentQuestionIndex: 0,
      completed: false,
      score: 0,
      answers: Array(questions.length).fill(null),
    }
  );

  const currentQuestionIdx = state?.currentQuestionIndex ?? 0;
  const isLastQuestion = currentQuestionIdx === questions.length - 1;
  const isCompleted = state?.completed ?? false;
  const isCurrentQuestionAnswered = state?.answers?.[currentQuestionIdx] !== null;

  const handleNext = () => {
    if (!state) return;
    if (isLastQuestion) {
      setState({
        ...state,
        completed: true,
      });
    } else {
      setState({
        ...state,
        currentQuestionIndex: currentQuestionIdx + 1,
      });
    }
  };

  const handlePrevious = () => {
    if (!state) return;
    if (currentQuestionIdx > 0) {
      setState({
        ...state,
        currentQuestionIndex: currentQuestionIdx - 1,
      });
    }
  };

  const handleAnswer = (answer: { index: number; isCorrect: boolean }) => {
    if (!state) return;
    // Only update if not already answered
    if (state.answers[currentQuestionIdx] !== null) return;

    const newAnswers = [...state.answers];
    newAnswers[currentQuestionIdx] = answer.index;
    
    setState({
      ...state,
      answers: newAnswers,
      score: state.score + (answer.isCorrect ? 1 : 0),
    });
  };

  const handleRestart = () => {
    setState({
      currentQuestionIndex: 0,
      completed: false,
      score: 0,
      answers: Array(questions.length).fill(null),
    });
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl text-center"
      >
        <div className="mb-6 inline-flex p-4 bg-yellow-500/10 rounded-full">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Quiz Completed!</h2>
        <div className="flex flex-col gap-1 mb-8">
          <p className="text-zinc-500 dark:text-zinc-400">
            You've finished the {title} quiz.
          </p>
          <p className="text-2xl font-black text-indigo-500">
            Score: {state?.score ?? 0} / {questions.length}
          </p>
        </div>
        
        <button
          onClick={handleRestart}
          className="w-full py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const currentQuestionData = questions[currentQuestionIdx];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Progress Header */}
      <div className="px-6 py-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Question
            </p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              {currentQuestionIdx + 1} of {questions.length}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 mx-6 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50">
          <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Progress
          </p>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            {Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Question Component */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MultipleChoiceQuestion 
            {...currentQuestionData}
            title={title}
            onAnswer={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIdx === 0}
          className={cn(
            "flex-1 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
            currentQuestionIdx === 0 
              ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed" 
              : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered}
          className={cn(
            "flex-[1.5] py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
            !isCurrentQuestionAnswered
              ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
              : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:opacity-90"
          )}
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
