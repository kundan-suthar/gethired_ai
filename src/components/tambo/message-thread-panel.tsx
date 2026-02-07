"use client";

import type { messageVariants } from "@/components/tambo/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputFileButton,
  MessageInputMcpPromptButton,
  MessageInputMcpResourceButton,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsList,
  MessageSuggestionsStatus,
} from "@/components/tambo/message-suggestions";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { MessageInputMcpConfigButton } from "@/components/tambo/message-input";
import { ThreadContainer, useThreadContainerContext } from "./thread-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryList,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
} from "@/components/tambo/thread-history";
import { useMergeRefs } from "@/lib/thread-hooks";
import type { Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the MessageThreadPanel component
 */
export interface MessageThreadPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the visual styling of messages in the thread.
   */
  variant?: VariantProps<typeof messageVariants>["variant"];
}

/**
 * A chat thread component designed to be used as a side panel
 */
export const MessageThreadPanel = React.forwardRef<
  HTMLDivElement,
  MessageThreadPanelProps
>(({ className, variant, style, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, containerRef);

  const threadHistorySidebar = (
    <ThreadHistory position={historyPosition}>
      <ThreadHistoryHeader />
      <ThreadHistoryNewButton />
      <ThreadHistorySearch />
      <ThreadHistoryList />
    </ThreadHistory>
  );

  const defaultSuggestions: Suggestion[] = [
    {
      id: "suggestion-1",
      title: "Tell me about my profile",
      detailedSuggestion: "What are my main skills based on my profile?",
      messageId: "profile-query",
    },
    {
      id: "suggestion-2",
      title: "Practice Mock Interview",
      detailedSuggestion: "I want to start a mock interview for my industry.",
      messageId: "mock-interview-query",
    },
    {
      id: "suggestion-3",
      title: "Optimize my resume",
      detailedSuggestion: "How can I improve my resume for ATS?",
      messageId: "resume-query",
    },
  ];

  return (
    <div 
      className={cn("flex h-full border-l border-border bg-background", className)} 
      style={style}
    >
      {/* Thread History Sidebar - rendered first if history is on the left */}
      {historyPosition === "left" && threadHistorySidebar}

      <ThreadContainer
        ref={mergedRef}
        disableSidebarSpacing
        className="flex-1"
        {...props}
      >
        <ScrollableMessageContainer className="p-4">
          <ThreadContent variant={variant}>
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        {/* Message suggestions status */}
        <MessageSuggestions>
          <MessageSuggestionsStatus />
        </MessageSuggestions>

        {/* Message input */}
        <div className="px-4 pb-4">
          <MessageInput>
            <MessageInputTextarea placeholder="Ask about interviews, resumes, or practice..." />
            <MessageInputToolbar>
              <MessageInputFileButton />
              <MessageInputMcpPromptButton />
              <MessageInputMcpResourceButton />
              <MessageInputMcpConfigButton />
              <MessageInputSubmitButton />
            </MessageInputToolbar>
            <MessageInputError />
          </MessageInput>
        </div>

        {/* Message suggestions */}
        <MessageSuggestions initialSuggestions={defaultSuggestions}>
          <MessageSuggestionsList />
        </MessageSuggestions>
      </ThreadContainer>

      {/* Thread History Sidebar - rendered last if history is on the right */}
      {historyPosition === "right" && threadHistorySidebar}
    </div>
  );
});
MessageThreadPanel.displayName = "MessageThreadPanel";
