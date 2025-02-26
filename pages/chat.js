import dynamic from "next/dynamic";

const AgoraChat = dynamic(() => import("../Component/AgorChat"), { ssr: false });

export default function ChatPage() {
  return (
    <div>
      <h2>Live Chat</h2>
      <AgoraChat />
    </div>
  );
}
