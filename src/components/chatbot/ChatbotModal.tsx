import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../../types/chat';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history
      const conversationHistory = [
        {
          role: 'system',
          content: 'You are PathForge AI Bot, a helpful assistant for students. Format your responses using markdown for better readability. Use bullet points, numbered lists, and emphasis where appropriate.'
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: userMessage.role,
          content: userMessage.content
        }
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'PathForge'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      const botMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Detailed Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error 
          ? `Sorry, I encountered an error: ${error.message}`
          : 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message) => {
    if (message.role === 'user') {
      return (
        <div className="max-w-[80%] p-3 rounded-lg bg-blue-100 text-blue-900 animate-fade-in">
          {message.content}
        </div>
      );
    }

    return (
      <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 animate-fade-in">
        <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-800 prose-strong:text-gray-900 prose-ul:text-gray-800 prose-ol:text-gray-800">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-gray-900 text-xl font-bold mb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-gray-900 text-lg font-semibold mb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-gray-900 text-base font-semibold mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-2 last:mb-0 text-gray-800" {...props} />,
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />
              ),
              li: ({node, children, ...props}) => (
                <li className="text-gray-800 pl-1 marker:text-gray-600" {...props}>
                  {children}
                </li>
              ),
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
              a: ({node, ...props}) => (
                <a 
                  className="text-indigo-600 hover:text-indigo-800" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  {...props} 
                />
              ),
              code: ({node, inline, ...props}) => (
                inline 
                  ? <code className="bg-gray-200 px-1 rounded text-gray-800" {...props} />
                  : <code className="block bg-gray-200 p-2 rounded text-gray-800" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold">🤖 PathForge AI Bot</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          ✖
        </button>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            👋 Hi! I'm your PathForge assistant. How can I help you today?
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {renderMessage(message)}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? '...' : '➡'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotModal; 