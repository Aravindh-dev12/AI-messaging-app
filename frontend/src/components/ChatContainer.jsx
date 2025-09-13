import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import ReactMarkdown from "react-markdown";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser._id !== "ai_chat") getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          // Determine if message is sent by the user
          const isUserMessage =
            message.senderId === authUser._id || message.senderId === "user";
          // Determine if message is AI
          const isAIMessage = message.senderId === "ai_chat";

          return (
            <div
              key={message._id}
              className={`chat ${isUserMessage ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div
                className={`rounded-xl chat-bubble flex flex-col ${
                  isUserMessage
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.text && <ReactMarkdown>{message.text}</ReactMarkdown>}
                <time
                  className={`text-[10px] ${
                    isUserMessage
                      ? "text-primary-content self-end"
                      : "text-base-content/70 self-start"
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
