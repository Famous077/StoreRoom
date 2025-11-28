"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useChatContract } from "@/hooks/useContract";

const SampleIntegration = () => {
  const { isConnected } = useAccount();
  const [message, setMessage] = useState("");

  const { data, actions, state } = useChatContract();

  const handleJoin = async () => {
    await actions.joinRoom();
  };

  const handlePost = async () => {
    if (!message) return;
    await actions.postMessage(message);
    setMessage("");
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Chat Contract</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to interact with the chatroom.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Decentralized Chatroom</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-muted-foreground text-xs">Members</p>
            <p className="text-2xl font-semibold">{data.totalMembers}</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-muted-foreground text-xs">Messages</p>
            <p className="text-2xl font-semibold">{data.totalMessages}</p>
          </div>
        </div>

        <button
          onClick={handleJoin}
          disabled={state.isLoading}
          className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          {state.isLoading ? "Joining..." : "Join Room"}
        </button>

        {/* Message Input */}
        <div>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-4 py-2 bg-card border border-border rounded-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handlePost}
            disabled={state.isLoading || !message}
            className="w-full mt-3 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {state.isLoading ? "Posting..." : "Post Message"}
          </button>
        </div>

        {/* Messages */}
        <div className="space-y-3 mt-6">
          <h2 className="text-xl font-semibold">Messages</h2>
          {data.messages.map((m, i) => (
            <div key={i} className="bg-card p-3 border border-border rounded-lg">
              {m}
            </div>
          ))}
        </div>

        {/* Status */}
        {state.hash && (
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
            <p className="font-mono break-all">{state.hash}</p>
          </div>
        )}

        {state.error && (
          <p className="text-destructive-foreground p-4 border border-destructive rounded-lg">
            Error: {state.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SampleIntegration;
