"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BrainCircuit, X } from "lucide-react";

/**
 * TamboCanvas component
 * 
 * This component serves as the main interactive area where specialized UI 
 * components (like quizzes, graphs, etc.) are rendered when triggered from the chat.
 */
export const TamboCanvas = () => {
  const [activeComponent, setActiveComponent] = React.useState<React.ReactNode | null>(null);
  const [activeMessageId, setActiveMessageId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleShowComponent = (event: any) => {
      const { component, messageId } = event.detail;
      setActiveComponent(component);
      setActiveMessageId(messageId);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("tambo:showComponent" as any, handleShowComponent);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("tambo:showComponent" as any, handleShowComponent);
      }
    };
  }, []);

  const clearCanvas = () => {
    setActiveComponent(null);
    setActiveMessageId(null);
  };

  return (
    <div 
      className="h-full w-full flex flex-col bg-slate-50 dark:bg-zinc-900 border-r border-border"
      data-canvas-space="true"
    >
      {activeComponent ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-sm">Interactive Module</span>
            </div>
            <button 
              onClick={clearCanvas}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Close canvas module"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
            <div className="w-full max-w-4xl">
              {activeComponent}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center">
            <BrainCircuit className="w-8 h-8 text-blue-500" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-xl font-bold">Your Learning Canvas</h3>
            <p className="text-muted-foreground">
              When you ask Tambo for quizzes, graphs, or interview practice modules, they will appear here for you to interact with.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
            <div className="p-4 rounded-xl border border-dashed border-border bg-background/50 text-left space-y-1">
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Quizzes</p>
              <p className="text-sm">Test your technical knowledge in real-time.</p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-border bg-background/50 text-left space-y-1">
              <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Insights</p>
              <p className="text-sm">Visualize industry trends and salary data.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
