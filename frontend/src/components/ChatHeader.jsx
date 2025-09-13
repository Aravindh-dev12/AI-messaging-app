import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  const isAI = selectedUser._id === "ai_chat";
  const avatarLogo = isAI ? "🤖" : selectedUser.fullName.charAt(0);

  return (
    <div className="p-2.5 border-b border-base-300 bg-base-300 text-base-content">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar items-center justify-center size-10 rounded-full bg-primary text-primary-content text-2xl">
            {avatarLogo}
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {isAI
                ? "AI Assistant"
                : onlineUsers.includes(selectedUser._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
