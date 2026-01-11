import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 🌿 I'm your MindEase companion. How are you feeling today? I'm here to listen and support you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error("Please sign in to use the AI chat");
    }

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to connect");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages.filter((m) => m.role === "user" || m.role === "assistant"));
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error instanceof Error && error.message.includes("sign in") 
            ? "Please sign in to chat with me. 💚"
            : "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. 💚",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              MindEase AI Companion
            </h1>
            <p className="text-muted-foreground">
              Your personal mental wellness support, available 24/7
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
            {/* Messages */}
            <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground px-5 py-3 rounded-2xl rounded-bl-md">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1 bg-background border-border focus:border-primary focus:ring-primary rounded-full px-5"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="rounded-full bg-gradient-to-br from-primary to-accent hover:opacity-90 shrink-0 h-10 w-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                For crisis support, please call 988 (Suicide & Crisis Lifeline)
              </p>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIChat;
