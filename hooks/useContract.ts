"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contractABI, contractAddress } from "@/lib/contract";

export interface ContractState {
  isLoading: boolean;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  hash: `0x${string}` | undefined;
  error: Error | null;
}

export interface ContractData {
  totalMembers: number;
  totalMessages: number;
  messages: string[];
}

export interface ContractActions {
  joinRoom: () => Promise<void>;
  postMessage: (message: string) => Promise<void>;
}

export const useChatContract = () => {
  const { address } = useAccount();
  const [messages, setMessages] = useState<string[]>([]);

  const { data: totalMembers, refetch: refetchMembers } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "totalMembers",
  });

  const { data: totalMessages, refetch: refetchMsgCount } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "totalMessages",
  });

  const { writeContractAsync, data: hash, error, isPending } =
    useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const fetchMessages = async () => {
    if (!totalMessages) return;
    const count = Number(totalMessages as bigint);

    const msgs: string[] = [];
    for (let i = 0; i < count; i++) {
      try {
        const res = (await useReadContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "messages",
          args: [BigInt(i)],
        })) as any;
        if (res?.data) msgs.push(res.data as string);
      } catch {}
    }
    setMessages(msgs);
  };

  useEffect(() => {
    if (isConfirmed) {
      refetchMembers();
      refetchMsgCount();
      fetchMessages();
    }
  }, [isConfirmed]);

  const joinRoom = async () => {
    await writeContractAsync({
      address: contractAddress,
      abi: contractABI,
      functionName: "joinRoom",
    });
  };

  const postMessage = async (message: string) => {
    await writeContractAsync({
      address: contractAddress,
      abi: contractABI,
      functionName: "postMessage",
      args: [message],
    });
  };

  const data: ContractData = {
    totalMembers: totalMembers ? Number(totalMembers as bigint) : 0,
    totalMessages: totalMessages ? Number(totalMessages as bigint) : 0,
    messages,
  };

  const actions: ContractActions = { joinRoom, postMessage };

  const state: ContractState = {
    isLoading: isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };

  return { data, actions, state };
};
