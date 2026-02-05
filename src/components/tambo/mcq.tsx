"use client";

import { cn } from "@/lib/utils";
import { useTamboComponentState } from "@tambo-ai/react";
import { CheckCircle2, XCircle, HelpCircle, RefreshCcw } from "lucide-react";
import * as React from "react";
import { z } from "zod";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";

/**
 * Zod schema for Multiple Choice Question component props
 */
export const mcqSchema = z.object({
  question: z.string().describe("The question to display"),
  options: z.array(z.string()).describe("List of possible answers"),
  correctAnswerIndex: z.number().describe("The index of the correct answer (0-indexed)"),
  explanation: z.string().optional().describe("Optional explanation shown after the user answers"),
  title: z.string().optional().describe("Optional title for the quiz card"),
  onAnswer: z.function({
    input: z.tuple([z.object({
      index: z.number(),
      isCorrect: z.boolean()
    })]),
    output: z.void()
  }).optional().describe("Callback when an answer is selected"),
});

/**
 * Type inferred from the Zod schema
 */
export type MCQProps = z.infer<typeof mcqSchema> & HTMLMotionProps<"div">;

/**
 * State type for the MCQ component
 */
export type MCQState = {
  selectedIndex: number | null;
  isCorrect: boolean | null;
  hasAnswered: boolean;
};

/**
 * MultipleChoiceQuestion Component
 * 
 * A premium interactive component for quizzes and knowledge checks.
 * Supports real-time feedback and state persistence via Tambo.
 */
export const MultipleChoiceQuestion = React.forwardRef<HTMLDivElement, MCQProps>(
  ({ question, options, correctAnswerIndex, explanation, title, onAnswer, className, ...props }, ref) => {
    // Initialize Tambo component state to persist progress
    // Unique ID based on question hash to avoid state collision
    const componentId = React.useMemo(() => {
      if (!question) return "mcq-loading";
      let hash = 0;
      for (let i = 0; i < question.length; i++) {
        hash = ((hash << 5) - hash) + question.charCodeAt(i);
        hash |= 0;
      }
      return `mcq-${Math.abs(hash)}`;
    }, [question]);

    const [state, setState] = useTamboComponentState<MCQState>(
      componentId, 
      { selectedIndex: null, isCorrect: null, hasAnswered: false }
    );

    // Guard against missing props during initial AI rendering
    if (!question || !options || options.length === 0) {
      return (
        <div ref={ref} className={cn("w-full max-w-sm mx-auto p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 animate-pulse flex flex-col items-center justify-center gap-4", className)}>
          <HelpCircle className="w-8 h-8 text-zinc-300" />
          <p className="text-zinc-400 text-sm font-medium">Preparing quiz...</p>
        </div>
      );
    }

    const handleSelect = (index: number) => {
      if (state?.hasAnswered) return;

      const isCorrect = index === correctAnswerIndex;
      setState({
        selectedIndex: index,
        isCorrect,
        hasAnswered: true,
      });

      if (onAnswer) {
        onAnswer({ index, isCorrect });
      }
    };

    const handleReset = () => {
      setState({
        selectedIndex: null,
        isCorrect: null,
        hasAnswered: false,
      });
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <HelpCircle className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                {title || "Quick Quiz"}
              </span>
            </div>
            {state?.hasAnswered && (
               <button 
               onClick={handleReset}
               className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
               title="Restart"
             >
               <RefreshCcw className="w-3.5 h-3.5 text-zinc-400" />
             </button>
            )}
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {question}
          </h3>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {options.map((option: string, index: number) => {
            const isSelected = state?.selectedIndex === index;
            const isCorrect = index === correctAnswerIndex;
            const showResult = state?.hasAnswered;

            return (
              <motion.button
                key={index}
                whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(index)}
                disabled={state?.hasAnswered}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group",
                  !showResult && (isSelected 
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" 
                    : "border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900"),
                  showResult && (isCorrect 
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                    : isSelected 
                      ? "border-rose-500 bg-rose-50/50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.1)]" 
                      : "border-zinc-100 dark:border-zinc-900 opacity-40 grayscale-[0.8]")
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold transition-colors",
                    !showResult && (isSelected ? "bg-blue-500 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"),
                    showResult && (isCorrect ? "bg-emerald-500 text-white" : isSelected ? "bg-rose-500 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500")
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm font-semibold">{option}</span>
                </div>
                <AnimatePresence>
                  {showResult && isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </motion.div>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <XCircle className="w-5 h-5 text-rose-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <AnimatePresence>
          {state?.hasAnswered && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={cn(
                "p-6 border-t overflow-hidden",
                state.isCorrect 
                  ? "bg-emerald-500/5 border-emerald-100 dark:border-emerald-950" 
                  : "bg-rose-500/5 border-rose-100 dark:border-rose-950"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2.5 rounded-2xl",
                  state.isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                )}>
                  {state.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    "font-extrabold text-base mb-2",
                    state.isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                  )}>
                    {state.isCorrect ? "Brilliant! You're right." : "Oh, not quite."}
                  </p>
                  {explanation && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      {explanation}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

MultipleChoiceQuestion.displayName = "MultipleChoiceQuestion";
