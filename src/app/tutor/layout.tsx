"use client";

import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import Navbar from "@/components/Navbar";

/**
 * Home page component that renders the Tambo chat interface.
 *
 * @remarks
 * The `NEXT_PUBLIC_TAMBO_URL` environment variable specifies the URL of the Tambo server.
 * You do not need to set it if you are using the default Tambo server.
 * It is only required if you are running the API server locally.
 *
 * @see {@link https://github.com/tambo-ai/tambo/blob/main/CONTRIBUTING.md} for instructions on running the API server locally.
 */
export default function Home({children}: {children: React.ReactNode}) {
  // Load MCP server configurations
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      contextHelpers={{system_guardrails: () => ({
      role: "system",
        rules: [
          "You are an AI interview preparation assistant.",
          "Your ONLY purpose is to help the user become interview-ready.",
          "Allowed topics include: interview questions, mock interviews, resume ATS optimization, skill explanations, flashcards, behavioral answers, system design explanations, and job-specific preparation.",
          "You MUST NOT answer questions unrelated to interview preparation.",
          "If a question is unrelated (e.g., politics, general coding help without interview context, personal advice, entertainment), you MUST refuse politely.",
          "When refusing, explain briefly that the question is outside the interview-preparation scope and redirect the user back to interview-related topics.",
          "Do NOT provide partial answers to out-of-scope questions.",
          "You have access to a tool 'userProfile' that can fetch the user's professional background (bio, industry, experience, skills). Use it to tailor your advice and mock interviews.",
          "IMPORTANT: You have an interactive side-canvas. When you generate technical quizzes (InterviewQuiz), graphs, or specialized UI components, they will appear in the user's side-dashboard/canvas area. Encourage the user to check the side panel for these interactive modules."
        ]
      }),

      application_context: () => ({
        applicationDetail:
          "This application strictly helps users prepare for job interviews. Any non-interview-related queries must be declined. You have tools to access user professional data for better personalization."
      }),
      user_profile: () => ({
        note: "User profile data is available via the 'userProfile' tool. You should fetch it at the start of a session or when relevant to provide personalized guidance."
      })
      }}
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <div className="h-screen flex flex-col ">
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </TamboProvider>
  );
}
