"use client";

import { cn } from "@/lib/utils";
import { useTamboComponentState } from "@tambo-ai/react";
import { CheckCircle2, XCircle, Code2, Play, RefreshCcw, HelpCircle } from "lucide-react";
import * as React from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import DOMPurify from "dompurify";

/**
 * Zod schema for Code Output Question component props
 */
export const codeOutputSchema = z.object({
  code: z.string().describe("The JavaScript code snippet to analyze"),
  question: z.string().describe("The question or instruction (e.g., 'What is the output?')"),
  correctAnswer: z.string().describe("The exact expected string output from the code"),
  explanation: z.string().optional().describe("Explanation of why the output is what it is"),
  title: z.string().optional().describe("Optional title for the challenge"),
});

/**
 * Type inferred from the Zod schema
 */
export type CodeOutputProps = z.infer<typeof codeOutputSchema>;

/**
 * State type for the Code Output component
 */
export type CodeOutputState = {
  userValue: string;
  hasChecked: boolean;
  isCorrect: boolean | null;
};

/**
 * CodeOutputQuestion Component
 * 
 * A premium component for technical assessments where users predict code output.
 * Specifically designed for JavaScript deep-dives.
 */
export const CodeOutputQuestion: React.FC<CodeOutputProps> = ({ 
  code, 
  question, 
  correctAnswer, 
  explanation, 
  title 
}) => {
  // Unique ID based on code hash to avoid state collision
  const componentId = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = ((hash << 5) - hash) + code.charCodeAt(i);
      hash |= 0;
    }
    return `code-output-${Math.abs(hash)}`;
  }, [code]);

  const [state, setState] = useTamboComponentState<CodeOutputState>(
    componentId,
    { userValue: "", hasChecked: false, isCorrect: null }
  );

  const highlightedCode = React.useMemo(() => {
    try {
      return hljs.highlight(code, { language: 'javascript' }).value;
    } catch {
      return code;
    }
  }, [code]);

  if (!state) return null;

  const handleCheck = () => {
    if (state.hasChecked) return;
    
    // Normalize both strings for comparison (remove whitespace, case insensitive optionally)
    // Actually, console output is usually strict, so let's keep it close but maybe trim.
    const normalizedUser = state.userValue.trim();
    const normalizedCorrect = correctAnswer.trim();
    
    const isCorrect = normalizedUser === normalizedCorrect;
    
    setState({
      userValue: state.userValue,
      hasChecked: true,
      isCorrect,
    });
  };

  const handleReset = () => {
    setState({
      userValue: "",
      hasChecked: false,
      isCorrect: null,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-500/10 rounded-lg">
              <Code2 className="w-4 h-4 text-yellow-500" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              {title || "JS Output Challenge"}
            </span>
          </div>
          {state?.hasChecked && (
            <button 
              onClick={handleReset}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
              title="Reset Challenge"
            >
              <RefreshCcw className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          )}
        </div>
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {question}
        </p>
      </div>

      {/* Code Area */}
      <div className="px-6 py-4 bg-zinc-900 dark:bg-black/40">
        <div className="relative group">
          <pre className="text-sm font-mono leading-relaxed overflow-x-auto p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50 scrollbar-hide">
            <code 
              className="javascript"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(highlightedCode) 
              }}
            />
          </pre>
        </div>
      </div>

      {/* Interaction Area */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
            Expected Console Output
          </label>
          <div className="relative">
            <input 
              type="text"
              value={state.userValue}
              onChange={(e) => !state.hasChecked && setState({ 
                userValue: e.target.value,
                hasChecked: state.hasChecked,
                isCorrect: state.isCorrect
              })}
              disabled={state.hasChecked}
              className={cn(
                "w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-2 rounded-2xl font-mono text-sm transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
                !state.hasChecked && "border-zinc-100 dark:border-zinc-800 focus:border-indigo-500",
                state.hasChecked && state.isCorrect && "border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400",
                state.hasChecked && !state.isCorrect && "border-rose-500/50 bg-rose-50/50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400"
              )}
              placeholder="Type your answer here..."
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            />
            {!state.hasChecked && (
              <button 
                onClick={handleCheck}
                className="absolute right-2 top-2 bottom-2 px-6 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Play className="w-3 h-3 fill-current" />
                Run
              </button>
            )}
            {state.hasChecked && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {state.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Feedback Section */}
        <AnimatePresence>
          {state.hasChecked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className={cn(
                "p-5 rounded-2xl border flex gap-4",
                state.isCorrect 
                  ? "bg-emerald-500/5 border-emerald-100 dark:border-emerald-900/30" 
                  : "bg-rose-500/5 border-rose-100 dark:border-rose-900/30"
              )}
            >
              <div className={cn(
                "p-2 h-fit rounded-lg",
                state.isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
              )}>
                {state.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "font-bold text-sm mb-1",
                  state.isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                )}>
                  {state.isCorrect ? "Correct!" : "Incorrect Answer"}
                </p>
                {!state.isCorrect && (
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    Expected: <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">{correctAnswer}</code>
                  </p>
                )}
                {explanation && (
                  <div className="flex gap-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50 mt-2">
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                      {explanation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
