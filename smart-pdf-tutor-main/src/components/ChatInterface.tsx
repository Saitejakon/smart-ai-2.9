import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, FileText, AlertCircle } from "lucide-react";
import { useStudyMate } from "@/contexts/StudyMateContext";
import { generateAIResponse } from "@/utils/aiResponses";

export const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, getReadyFiles } = useStudyMate();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    const currentInput = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // Generate AI response based on available files and question
    setTimeout(() => {
      const readyFiles = getReadyFiles();
      const aiResponseContent = generateAIResponse(currentInput, readyFiles);
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: aiResponseContent,
        timestamp: new Date(),
        sourceFile: readyFiles.length > 0 ? readyFiles[0].name : undefined
      };
      
      addMessage(aiResponse);
      setIsLoading(false);
    }, Math.random() * 2000 + 1000); // 1-3 seconds for realistic response time
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ask Questions About Your Documents</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, AI-powered answers based on your uploaded study materials
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-large border-0">
            {/* Chat Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">StudyMate AI</h3>
                  <p className="text-sm text-muted-foreground">Ready to answer your questions</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-96 p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[70%] p-4 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {message.sourceFile && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileText className="w-3 h-3" />
                            Source: {message.sourceFile}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-6 border-t border-border/50">
              {getReadyFiles().length === 0 && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">
                      Upload a PDF document first to get AI-powered answers about its content
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getReadyFiles().length > 0 
                    ? "Ask a question about your uploaded documents..." 
                    : "Upload a PDF first to start asking questions..."
                  }
                  className="flex-1 bg-background/50 border-border/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  variant="hero"
                  size="icon"
                  className="w-12 h-12"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send • {getReadyFiles().length > 0 
                  ? `StudyMate has access to ${getReadyFiles().length} document${getReadyFiles().length > 1 ? 's' : ''}`
                  : 'Upload PDFs to enable AI-powered Q&A'
                }
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};