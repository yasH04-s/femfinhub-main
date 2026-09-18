
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  error?: string;
}

const Chatbot = () => {
  const { user } = useAuth();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI financial assistant. How can I help you today?

You can also chat with me on WhatsApp for:
- Instant loan application support
- Financial literacy tips
- Market updates
- Emergency financial assistance
- Multilingual support`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo
  const aiResponses = {
    investment: "Based on your financial profile, I recommend diversifying your investments. Consider allocating 60% to traditional investments (stocks, bonds), 20% to alternative investments like crowdfunding, and 20% to emergency funds. Would you like me to explain any of these options in more detail?",
    budget: "Looking at your expense patterns, I notice you're spending above average on operational costs. Here are three strategies to reduce expenses: 1) Consider co-working spaces instead of dedicated offices, 2) Use subscription-based software instead of one-time purchases, 3) Outsource non-core business functions. Would you like a detailed analysis of your spending?",
    loan: "For your business size and industry, microloans or community development financial institutions (CDFIs) might be your best option. These typically offer lower interest rates and more flexible terms for women entrepreneurs. Your current credit profile suggests you'd qualify for loans up to $50,000. Would you like me to recommend specific lenders?",
    credit: "Your business credit score is currently in the 'good' range at 680. To improve it, I recommend: 1) Reducing your credit utilization to below 30%, 2) Setting up automatic payments for all business expenses, 3) Increasing the average age of your credit accounts. Would you like guidance on implementing any of these strategies?",
    default: "I'm your AI financial advisor specialized in helping women entrepreneurs. I can assist with budgeting, investment strategies, loan options, credit improvement, expense tracking, and personalized financial planning. What specific financial topic would you like help with today?"
  };

  const handleWhatsAppRedirect = () => {
    try {
      const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER || 'your-whatsapp-business-number';
      
      // Check if WhatsApp is installed/available
      if (!whatsappNumber || whatsappNumber === 'your-whatsapp-business-number') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: 'WhatsApp integration is not properly configured. Here\'s how to fix this:\n1. Create a .env file in your project root\n2. Add WHATSAPP_BUSINESS_NUMBER=your-number\n3. Restart your development server\n\nContact support if you need help setting this up.',
          sender: 'ai',
          timestamp: new Date(),
          error: 'whatsapp_not_configured'
        }]);
        return;
      }
      
      // Show loading state
      setIsLoading(true);
      
      // Try opening WhatsApp with timeout
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: 'WhatsApp is taking longer than expected to open. Please ensure WhatsApp is installed on your device.',
          sender: 'ai',
          timestamp: new Date(),
          error: 'whatsapp_timeout'
        }]);
      }, 3000);
      
      const success = window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello! I need financial assistance from femfinhub')}`, '_blank');
      
      if (!success) {
        clearTimeout(timeout);
        setIsLoading(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: 'Failed to open WhatsApp. Here\'s what to check:\n1. Enable pop-ups for this site in browser settings\n2. Install WhatsApp from your app store\n3. Ensure the number format is correct (e.g., +1234567890)\n4. Try clicking the WhatsApp button again',
          sender: 'ai',
          timestamp: new Date(),
          error: 'whatsapp_blocked'
        }]);
      } else {
        clearTimeout(timeout);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('WhatsApp redirect failed:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Failed to open WhatsApp. Please try again later or contact support.',
        sender: 'ai',
        timestamp: new Date(),
        error: 'whatsapp_failed'
      }]);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      let responseContent = aiResponses.default;

      // Check for keywords to provide more relevant response
      const lowerCaseInput = input.toLowerCase();
      if (lowerCaseInput.includes('invest') || lowerCaseInput.includes('stock') || lowerCaseInput.includes('fund')) {
        responseContent = aiResponses.investment;
      } else if (lowerCaseInput.includes('budget') || lowerCaseInput.includes('spend') || lowerCaseInput.includes('expense')) {
        responseContent = aiResponses.budget;
      } else if (lowerCaseInput.includes('loan') || lowerCaseInput.includes('borrow') || lowerCaseInput.includes('finance')) {
        responseContent = aiResponses.loan;
      } else if (lowerCaseInput.includes('credit') || lowerCaseInput.includes('score')) {
        responseContent = aiResponses.credit;
      }

      const newAiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10 mr-2">
          <AvatarFallback className="bg-emerald-600 text-white font-bold">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Financial AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Personalized financial advice for women entrepreneurs</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col mb-4 overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] rounded-lg p-4",
                message.sender === 'user'
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
              role="chat-message"
              aria-label={`Message from ${message.sender === 'user' ? 'you' : 'AI assistant'}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Avatar className="h-6 w-6 mr-2">
                    {message.sender === 'user' ? (
                      <>
                        <AvatarImage src={user?.profileImg} alt={user?.name} />
                        <AvatarFallback className="bg-primary-foreground text-primary text-xs">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
                          <Bot className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <span className="text-xs">
                    {message.sender === 'user' ? user?.name || 'You' : 'Financial AI'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div 
              className="flex w-max max-w-[80%] rounded-lg p-4 bg-muted"
              aria-live="polite"
              aria-busy="true"
              role="status"
            >
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
                      <Bot className="h-3.5 w-3.5" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Financial AI</span>
                </div>
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Attach a document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button 
          onClick={handleWhatsAppRedirect}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          WhatsApp Chat
        </Button>
        <Textarea
          placeholder="Ask about financial planning, investments, or business loans..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-h-[60px] resize-none"
        />
        <Button size="icon" onClick={handleSendMessage} disabled={isLoading || input.trim() === ''}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
