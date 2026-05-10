import { TopToolbar } from "./TopToolbar";
import { Sidebar } from "./Sidebar";
import { ResizeHandle } from "./ResizeHandle";
import { ContentArea } from "./ContentArea";
import { ChatPanel } from "./ChatPanel";
import { GlobalSearch } from "@/components/search/global-search";

export function ShellLayout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <TopToolbar />
      <div className="flex-1 flex flex-row min-h-0">
        <Sidebar />
        <ResizeHandle />
        <ContentArea />
        <ChatPanel />
      </div>
      <GlobalSearch />
    </div>
  );
}
