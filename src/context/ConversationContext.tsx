import React, { createContext, useState, useContext, ReactNode } from "react";
import { QAI } from "../types/question.type";

interface ConversationContextType {
  qaList: QAI[];
  onQAList: (qa: QAI) => void;
  onResetConversation: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
  children,
}) => {
  const [qaList, setQAList] = useState<QAI[]>([]);

  const onQAList = (qa: QAI) => {
    setQAList((prev) => [...prev, qa]);
  };

  const onResetConversation = () => {
    setQAList([]);
  };

  return (
    <ConversationContext.Provider
      value={{ qaList, onQAList, onResetConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within an ConversationProvider"
    );
  }
  return context;
};
