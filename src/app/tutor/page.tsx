
import { TamboCanvas } from "@/components/tambo/tambo-canvas";
import { MessageThreadPanel } from "@/components/tambo/message-thread-panel";

export default function DashboardWithChat() {
  return (
    <div className="flex h-full bg-zinc-50 dark:bg-zinc-950">
      {/* Main content area (Canvas/Dashboard) */}
      <div className="flex-1 relative overflow-hidden">
        <TamboCanvas />
      </div>  

      {/* Chat panel on the right */}
      <MessageThreadPanel
        className="right shadow-2xl"
        style={{ width: "600px" }}
      />
    </div>
  );
}