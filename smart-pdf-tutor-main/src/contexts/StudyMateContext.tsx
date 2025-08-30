import { createContext, useContext, useState, ReactNode } from "react";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  content?: string; // Simulated extracted text
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sourceFile?: string;
}

interface StudyMateContextType {
  files: UploadedFile[];
  messages: Message[];
  addFile: (file: UploadedFile) => void;
  updateFile: (id: string, updates: Partial<UploadedFile>) => void;
  removeFile: (id: string) => void;
  addMessage: (message: Message) => void;
  getReadyFiles: () => UploadedFile[];
}

const StudyMateContext = createContext<StudyMateContextType | undefined>(undefined);

export const useStudyMate = () => {
  const context = useContext(StudyMateContext);
  if (!context) {
    throw new Error('useStudyMate must be used within a StudyMateProvider');
  }
  return context;
};

export const StudyMateProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm StudyMate, your AI study assistant. Upload a PDF and ask me any questions about its content. I'm here to help you learn!",
      timestamp: new Date(),
    }
  ]);

  const addFile = (file: UploadedFile) => {
    setFiles(prev => [...prev, file]);
  };

  const updateFile = (id: string, updates: Partial<UploadedFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const getReadyFiles = () => {
    return files.filter(f => f.status === 'ready');
  };

  return (
    <StudyMateContext.Provider
      value={{
        files,
        messages,
        addFile,
        updateFile,
        removeFile,
        addMessage,
        getReadyFiles,
      }}
    >
      {children}
    </StudyMateContext.Provider>
  );
};