// src/components/Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // ✨ NEW: The secret to Pro AI formatting
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  // Starting message with standard Markdown formatting
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your wedding assistant. Ask me anything about the **venue**, **schedule**, or **dress code**." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (e, quickText = null) => {
    if (e) e.preventDefault();
    
    const userMessage = quickText || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    // --- SECRET CODE INTERCEPTOR ---
    if (userMessage.trim().toLowerCase() === 'lanieangelo2026') {
      setIsLoading(true);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "Admin credentials verified. Access the portal below:",
          link: "/admin?access_token=secret_temp_token_123" 
        }]);
        setIsLoading(false);
      }, 1000);
      
      return;
    }
    // -------------------------------

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.text }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm experiencing a brief delay. Please try asking again in a moment. 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          
          {/* Header */}
          <div className="chat-header">
            <div className="chat-profile">
              <div className="avatar-container">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="avatar-icon">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="status-dot"></span>
              </div>
              <div className="header-info">
                <span className="bot-name">Wedding Assistant</span>
                <span className="status-text">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Body */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.sender}`}>
                <div className={`message ${msg.sender}`}>
                  
                  {/* ✨ THE UPGRADE: If it is the user, render plain text. If it is the bot, render Markdown! */}
                  {msg.sender === 'user' ? (
                    <p>{msg.text}</p>
                  ) : (
                    <ReactMarkdown className="markdown-body">
                      {msg.text}
                    </ReactMarkdown>
                  )}

                </div>
                
                {/* Properly Formatted CTA Link */}
                {msg.link && (
                  <div className="admin-cta-wrapper">
                    <a href={msg.link} className="admin-access-link">
                      <span>Open Admin Portal</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="message-wrapper bot">
                <div className="message bot typing-message">
                  <div className="typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && (
              <div className="quick-replies">
                <button onClick={() => sendMessage(null, "Where is the venue?")}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Venue
                </button>
                <button onClick={() => sendMessage(null, "What is the dress code?")}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17v2H2v-2l10-11 10 11z"/><path d="M12 6V3a1 1 0 0 0-2 0"/></svg>
                  Dress Code
                </button>
                <button onClick={() => sendMessage(null, "What is the schedule?")}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Schedule
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form className="chat-footer" onSubmit={sendMessage}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your question..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ transform: 'translateX(2px)' }}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;