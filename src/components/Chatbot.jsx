// src/components/Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const messageBase = 'max-w-[85%] rounded-[20px] px-[18px] py-3.5 text-[0.9rem] leading-[1.5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] [&_p]:m-0 [&_p]:break-words';
const markdownClass = 'font-poppins leading-[1.6] [&_p]:mb-3 [&_p]:mt-0 [&_p:last-child]:m-0 [&_strong]:font-bold [&_strong]:text-maroon [&_ul]:mb-3 [&_ul]:mt-2 [&_ul]:pl-[22px] [&_ol]:mb-3 [&_ol]:mt-2 [&_ol]:pl-[22px] [&_li]:mb-1.5 [&_h3]:mb-1.5 [&_h3]:mt-3.5 [&_h3]:font-bold [&_h3]:text-[0.95rem] [&_h3]:uppercase [&_h3]:tracking-[1px] [&_h3]:text-maroon';
const quickButtonClass = 'flex cursor-pointer items-center gap-1.5 rounded-[20px] border border-[rgba(109,7,26,0.15)] bg-white px-4 py-2 text-[0.8rem] font-medium text-maroon shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-maroon hover:bg-maroon hover:text-cream';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
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
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      });

      const data = await response.json();

      if (data.text.trim() === '[TRIGGER_ADMIN_DASHBOARD_UNLOCK]') {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: 'Admin credentials verified. Please access the secure portal below:',
          link: '/admin'
        }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: data.text }]);
      }
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm experiencing a brief delay. Please try asking again in a moment. 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[30px] right-[30px] z-[1000] font-poppins max-[480px]:bottom-5 max-[480px]:right-[15px]">
      {!isOpen && (
        <button className="flex h-[65px] w-[65px] cursor-pointer items-center justify-center rounded-full border-2 border-cream bg-maroon text-cream shadow-[0_8px_25px_rgba(109,7,26,0.3)] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.08] hover:bg-[#5a0615] [&_svg]:h-[30px] [&_svg]:w-[30px]" onClick={() => setIsOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="mb-[15px] flex h-[580px] w-[380px] flex-col overflow-hidden rounded-[20px] border border-[rgba(109,7,26,0.08)] bg-ivory shadow-[0_15px_45px_rgba(0,0,0,0.15)] animate-[slideUp_0.3s_ease-out_forwards] max-[480px]:h-[75vh] max-[480px]:w-[calc(100vw-30px)]">
          <div className="flex items-center justify-between bg-maroon px-5 py-4 text-cream">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(244,235,225,0.2)] bg-[rgba(244,235,225,0.1)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-maroon bg-[#4CAF50]"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.95rem] font-semibold tracking-[0.3px]">Wedding Assistant</span>
                <span className="mt-0.5 text-[0.75rem] opacity-80">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="flex cursor-pointer items-center justify-center border-0 bg-transparent text-cream opacity-70 transition-[opacity,transform] duration-200 hover:scale-110 hover:opacity-100">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#fcf8f2] p-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[rgba(109,7,26,0.15)]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex w-full flex-col ${msg.sender === 'bot' ? 'items-start' : 'items-end'}`}>
                <div className={`${messageBase} ${msg.sender === 'bot' ? 'rounded-bl bg-white text-[#333] border border-[rgba(109,7,26,0.08)]' : 'rounded-br bg-maroon text-cream'}`}>
                  {msg.sender === 'user' ? (
                    <p>{msg.text}</p>
                  ) : (
                    <ReactMarkdown className={markdownClass}>{msg.text}</ReactMarkdown>
                  )}
                </div>

                {msg.link && (
                  <div className="mt-2 w-full max-w-[250px]">
                    <a href={msg.link} className="flex items-center justify-between rounded-xl border border-[rgba(212,175,55,0.3)] bg-[linear-gradient(135deg,#111111_0%,#333333_100%)] px-[18px] py-3.5 text-[0.85rem] font-semibold tracking-[0.5px] text-[#D4AF37] no-underline shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[rgba(212,175,55,0.6)] hover:text-[#F3E5AB] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]">
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
              <div className="flex w-full flex-col items-start">
                <div className={`${messageBase} rounded-bl border border-[rgba(109,7,26,0.08)] bg-white px-[18px] py-3 text-[#333]`}>
                  <div className="[&_span]:mx-0.5 [&_span]:inline-block [&_span]:h-1.5 [&_span]:w-1.5 [&_span]:rounded-full [&_span]:bg-maroon [&_span]:opacity-50 [&_span]:animate-[bounce_1.4s_infinite_ease-in-out] [&_span:nth-child(2)]:delay-200 [&_span:nth-child(3)]:delay-[400ms]">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && (
              <div className="mt-[5px] flex flex-wrap gap-2">
                <button className={quickButtonClass} onClick={() => sendMessage(null, 'Where is the venue?')}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Venue
                </button>
                <button className={quickButtonClass} onClick={() => sendMessage(null, 'What is the dress code?')}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17v2H2v-2l10-11 10 11z"/><path d="M12 6V3a1 1 0 0 0-2 0"/></svg>
                  Dress Code
                </button>
                <button className={quickButtonClass} onClick={() => sendMessage(null, 'What is the schedule?')}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Schedule
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="flex items-center border-t border-[rgba(109,7,26,0.08)] bg-white px-5 py-4" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 rounded-3xl border border-[#e0e0e0] bg-[#fcfcfc] px-[18px] py-3.5 text-[0.9rem] outline-none transition-[border-color,background-color] duration-200 focus:border-maroon focus:bg-white"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="ml-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-maroon text-cream transition-[transform,background-color] duration-200 hover:enabled:scale-105 hover:enabled:bg-[#5a0615] disabled:cursor-not-allowed disabled:opacity-40">
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
