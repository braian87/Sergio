import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Sergio's virtual assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-replies (this would be a more sophisticated system in a real implementation)
  const autoReplies: Record<string, string> = {
    "pricing": "Our pricing starts at $299 for portrait sessions and $1,999 for weddings. For detailed pricing information, please check the Pricing section or contact us for a custom quote.",
    "wedding": "Sergio specializes in capturing authentic wedding moments with a blend of documentary and artistic styles. Packages include pre-wedding consultation, 8-12 hours of coverage, and a private online gallery.",
    "portrait": "Our portrait sessions typically last 1-2 hours at a location of your choice. We capture a variety of poses and expressions to create a diverse collection of images.",
    "booking": "To book a session, please use the contact form or email us directly at contact@sergiolopez.photo with your preferred date and type of session.",
    "location": "We're based in San Francisco but available for travel worldwide. Travel fees may apply for locations beyond 30 miles.",
    "hours": "Our studio is open Monday through Friday from 9AM to 6PM. Shoots can be scheduled outside these hours by special arrangement.",
    "hi": "Hello! How can I assist you with your photography needs today?",
    "hello": "Hi there! How can I help you with your photography project?",
    "thanks": "You're welcome! If you have any other questions, feel free to ask.",
    "thank you": "You're welcome! Is there anything else you'd like to know about our services?"
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessageId = messages.length + 1;
    setMessages([
      ...messages,
      {
        id: userMessageId,
        text: inputValue,
        isBot: false
      }
    ]);
    
    setInputValue('');
    
    // Simulate bot thinking
    setTimeout(() => {
      // Generate response based on keywords in the input
      let botResponse = "I don't have specific information about that, but I'd be happy to connect you with Sergio directly. Please use the contact form or email contact@sergiolopez.photo.";
      
      const lowercaseInput = inputValue.toLowerCase();
      
      // Check for keywords in the input
      for (const keyword in autoReplies) {
        if (lowercaseInput.includes(keyword)) {
          botResponse = autoReplies[keyword];
          break;
        }
      }
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: userMessageId + 1,
          text: botResponse,
          isBot: true
        }
      ]);
    }, 1000);
  };

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-gold-500 text-black rounded-full p-4 shadow-lg focus:outline-none hover:bg-gold-600 transition-colors"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat with us"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-black border border-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black font-medium">
                  SL
                </div>
                <div className="ml-3">
                  <h3 className="text-white font-serif">Sergio López</h3>
                  <p className="text-gray-400 text-xs">Photography Assistant</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-950">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-3/4 p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-800 text-white'
                        : 'bg-gold-500 text-black'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 bg-gray-900 border-t border-gray-800">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-black rounded-r-lg px-4 focus:outline-none transition-colors"
                  disabled={!inputValue.trim()}
                >
                  <FiSend size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
