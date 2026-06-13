"use client";

import React, { useState, useEffect, useRef } from "react";
import { resumeData } from "../../data/resume";

interface Message {
  sender: "bot" | "user";
  text: string;
  downloadResume?: boolean;
}

const handleDownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Thirumoorthi Murugesan.pdf";
  link.download = "Thirumoorthi Murugesan.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am Thiru's AI Assistant. What role or info are you looking for today? Select one of the options below:"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [usedSuggestions, setUsedSuggestions] = useState<string[]>([]);
  const [showFreelanceForm, setShowFreelanceForm] = useState(false);
  
  const [freelanceData, setFreelanceData] = useState({
    name: "",
    projectTitle: "",
    description: "",
    email: "",
    phone: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    projectTitle: "",
    description: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, showFreelanceForm]);

  const initialSuggestions = [
    "MERN Developer",
    "Full Stack Developer",
    "Front End Developer",
    "Back End Developer",
    "OIC Developer",
    "Freelancing Enquiry",
    "Contact Details",
    "Interview Availability",
    "Notice Period"
  ];

  const visibleSuggestions = initialSuggestions.filter(
    (sug) => !usedSuggestions.includes(sug)
  );

  const handleClearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! I am Thiru's AI Assistant. What role or info are you looking for today? Select one of the options below:"
      }
    ]);
    setUsedSuggestions([]);
    setShowFreelanceForm(false);
    setFormError("");
    setFreelanceData({
      name: "",
      projectTitle: "",
      description: "",
      email: "",
      phone: ""
    });
    setFormErrors({
      name: "",
      projectTitle: "",
      description: "",
      email: "",
      phone: ""
    });
  };

  const validateForm = () => {
    const errors = {
      name: "",
      projectTitle: "",
      email: "",
      phone: "",
      description: ""
    };
    let isValid = true;

    // Name check
    if (freelanceData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(freelanceData.name)) {
      errors.name = "Name can only contain letters and spaces.";
      isValid = false;
    }

    // Project Title check
    if (freelanceData.projectTitle.trim().length < 3) {
      errors.projectTitle = "Project title must be at least 3 characters.";
      isValid = false;
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(freelanceData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Phone check
    const cleanPhone = freelanceData.phone.replace(/[\s()-]/g, "");
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errors.phone = "Enter a valid phone number (minimum 10 digits).";
      isValid = false;
    }

    // Description check
    if (freelanceData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSuggestionClick = (sug: string) => {
    // Add suggestion to used list so it won't show again
    setUsedSuggestions((prev) => [...prev, sug]);

    // Add user message to chat log
    let userMsgText = `I am looking for a ${sug}`;
    if (sug === "Freelancing Enquiry") {
      userMsgText = "I have a freelancing enquiry";
    } else if (sug === "Contact Details" || sug === "Interview Availability" || sug === "Notice Period") {
      userMsgText = `What is your ${sug.toLowerCase()}?`;
    }
    
    setMessages((prev) => [...prev, { sender: "user", text: userMsgText }]);

    if (sug === "Freelancing Enquiry") {
      setTimeout(() => {
        setShowFreelanceForm(true);
      }, 500);
      return;
    }

    // Generate response for roles and other information
    setTimeout(() => {
      let botResponse = "";
      let isDevRole = false;

      if (sug === "MERN Developer") {
        botResponse = `**MERN Developer Details**:\n\n` +
          `• **Total Experience**: 2+ Years\n` +
          `• **Experience**: Core experience in MERN Stack. Built "SimplifyAI" (3 microservices reporting tool used by 200+ employees) and "AirekruitPro" (Next.js recruitment SaaS with GPT-3.5 integration).\n` +
          `• **Skills**: React, Node.js, Express, MongoDB, Next.js, Redux, TailwindCSS, TypeScript.`;
        isDevRole = true;
      } else if (sug === "Full Stack Developer") {
        botResponse = `**Full Stack Developer Details**:\n\n` +
          `• **Total Experience**: 2+ Years\n` +
          `• **Experience**: Developed full-featured web applications using MERN, Vue.js, and Node.js. Integrated middleware pipelines syncing databases with cloud storage.\n` +
          `• **Skills**: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, OIC Integration.`;
        isDevRole = true;
      } else if (sug === "Front End Developer") {
        botResponse = `**Front End Developer Details**:\n\n` +
          `• **Total Experience**: 2+ Years\n` +
          `• **Experience**: Designed responsive, premium, interactive dashboards for SimplifyAI, AirekruitPro, and SmartKonnect.\n` +
          `• **Skills**: React, Next.js, Vue.js, TailwindCSS, HTML5/CSS3, JavaScript, TypeScript, Redux.`;
        isDevRole = true;
      } else if (sug === "Back End Developer") {
        botResponse = `**Back End Developer Details**:\n\n` +
          `• **Total Experience**: 2+ Years\n` +
          `• **Experience**: Developed microservice APIs, database structures in MongoDB/Mongoose, and automated sync jobs.\n` +
          `• **Skills**: Node.js, Express, MongoDB, Mongoose, REST/SOAP APIs, SQL.`;
        isDevRole = true;
      } else if (sug === "OIC Developer") {
        botResponse = `**OIC Developer Details**:\n\n` +
          `• **Total Experience**: 8 Months\n` +
          `• **Experience**: Worked for InterContinental Hotels Group (IHG), USA, building end-to-end SOAP/REST integrations, OCI streaming, and VBCS components.\n` +
          `• **Skills**: Oracle Integration Cloud (OIC), VBCS, SOAP, REST, JSON, XML.`;
        isDevRole = true;
      } else if (sug === "Contact Details") {
        botResponse = `**Contact Details**:\n\n` +
          `• **Email**: ${resumeData.email}\n` +
          `• **Phone**: ${resumeData.phone}\n` +
          `• **LinkedIn**: ${resumeData.linkedin}\n` +
          `• **GitHub**: ${resumeData.github}`;
      } else if (sug === "Interview Availability") {
        botResponse = `**Interview Availability**:\n\n` +
          `• Monday to Friday (10:00 AM to 6:00 PM)`;
      } else if (sug === "Notice Period") {
        botResponse = `**Notice Period**:\n\n` +
          `• 30 Days (Negotiable)`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, downloadResume: isDevRole }
      ]);
    }, 600);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add user message and temporary typing indicator to chat
    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      { sender: "bot", text: "Typing..." }
    ]);
    setInputValue("");

    try {
      // Send chat history and current message to backend chat endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await response.json();

      setMessages((prev) => {
        // Filter out the "Typing..." message
        const list = prev.filter((msg) => msg.text !== "Typing...");
        if (data.success) {
          // If query mentions downloading resume, show the direct action button
          const query = text.toLowerCase();
          const shouldShowDownload =
            query.includes("resume") ||
            query.includes("cv") ||
            query.includes("download");
          return [...list, { sender: "bot", text: data.text, downloadResume: shouldShowDownload }];
        } else {
          return [
            ...list,
            {
              sender: "bot",
              text: "I'm having trouble connecting to my AI brain. Please try clicking one of the suggestions or ask again."
            }
          ];
        }
      });
    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const list = prev.filter((msg) => msg.text !== "Typing...");
        return [
          ...list,
          {
            sender: "bot",
            text: "I'm having trouble connecting to my AI brain. Please try clicking one of the suggestions or ask again."
          }
        ];
      });
    }
  };

  const handleFreelanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(freelanceData),
      });

      const data = await response.json();

      if (data.success) {
        // Clear form and close it
        setFreelanceData({
          name: "",
          projectTitle: "",
          description: "",
          email: "",
          phone: ""
        });
        setShowFreelanceForm(false);

        // Add a success bot message
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `**Enquiry Sent Successfully!**\n\nThank you, **${freelanceData.name}**. Your freelance project enquiry for **"${freelanceData.projectTitle}"** has been sent to Thiru. He will contact you soon at **${freelanceData.email}**.`
          }
        ]);
      } else {
        setFormError(data.error || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setFormError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render line breaks and simple bold markdown
  const renderMessageText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <p key={i} className="min-h-[1em]">
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              return (
                <strong key={index} className="font-bold text-accent dark:text-indigo-300">
                  {part}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Open assistant"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] flex flex-col rounded-2xl border border-card-border bg-card-bg/95 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-accent px-5 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h3 className="font-bold text-sm">AI Assistant</h3>
                <p className="text-[10px] text-white/80">Online • Ask me anything</p>
              </div>
            </div>
            <button
              onClick={handleClearChat}
              className="text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer text-white"
            >
              Clear Chat
            </button>
          </div>

          {/* Messages Container */}
          <div className="relative flex-1 flex flex-col overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed shadow-sm break-words overflow-wrap break-word whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-accent text-white rounded-br-none"
                        : "bg-card-bg border border-card-border text-foreground rounded-bl-none"
                    }`}
                  >
                    {renderMessageText(msg.text)}

                    {msg.downloadResume && (
                      <button
                        onClick={handleDownloadResume}
                        className="mt-3.5 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-opacity-90 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download Resume
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Freelance Form Overlay */}
            {showFreelanceForm && (
              <div className="absolute inset-0 bg-card-bg/98 z-20 flex flex-col p-5 overflow-y-auto animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between mb-3 border-b border-card-border pb-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <span>💼</span> Freelance Project Enquiry
                  </h3>
                  <button
                    onClick={() => {
                      setShowFreelanceForm(false);
                      setFormError("");
                    }}
                    className="text-muted-text hover:text-foreground transition-colors cursor-pointer text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleFreelanceSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[9px] font-bold text-muted-text uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={freelanceData.name}
                        onChange={(e) => {
                          setFreelanceData({ ...freelanceData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                        }}
                        className={`w-full px-3 py-2 text-xs rounded-xl border bg-card-bg text-foreground focus:outline-none ${
                          formErrors.name ? "border-rose-500 focus:border-rose-500" : "border-card-border focus:border-accent"
                        }`}
                        placeholder="e.g. John Doe"
                      />
                      {formErrors.name && (
                        <p className="text-[9px] text-rose-500 mt-0.5 font-semibold">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-muted-text uppercase mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={freelanceData.projectTitle}
                        onChange={(e) => {
                          setFreelanceData({ ...freelanceData, projectTitle: e.target.value });
                          if (formErrors.projectTitle) setFormErrors({ ...formErrors, projectTitle: "" });
                        }}
                        className={`w-full px-3 py-2 text-xs rounded-xl border bg-card-bg text-foreground focus:outline-none ${
                          formErrors.projectTitle ? "border-rose-500 focus:border-rose-500" : "border-card-border focus:border-accent"
                        }`}
                        placeholder="e.g. E-Commerce Development"
                      />
                      {formErrors.projectTitle && (
                        <p className="text-[9px] text-rose-500 mt-0.5 font-semibold">{formErrors.projectTitle}</p>
                      )}
                    </div>
                    <div className="flex gap-2.5">
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-muted-text uppercase mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={freelanceData.email}
                          onChange={(e) => {
                            setFreelanceData({ ...freelanceData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl border bg-card-bg text-foreground focus:outline-none ${
                            formErrors.email ? "border-rose-500 focus:border-rose-500" : "border-card-border focus:border-accent"
                          }`}
                          placeholder="john@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-[9px] text-rose-500 mt-0.5 font-semibold">{formErrors.email}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-muted-text uppercase mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={freelanceData.phone}
                          onChange={(e) => {
                            setFreelanceData({ ...freelanceData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl border bg-card-bg text-foreground focus:outline-none ${
                            formErrors.phone ? "border-rose-500 focus:border-rose-500" : "border-card-border focus:border-accent"
                          }`}
                          placeholder="+91 9876543210"
                        />
                        {formErrors.phone && (
                          <p className="text-[9px] text-rose-500 mt-0.5 font-semibold">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-muted-text uppercase mb-1">Project Description</label>
                      <textarea
                        required
                        value={freelanceData.description}
                        onChange={(e) => {
                          setFreelanceData({ ...freelanceData, description: e.target.value });
                          if (formErrors.description) setFormErrors({ ...formErrors, description: "" });
                        }}
                        rows={3}
                        className={`w-full px-3 py-2 text-xs rounded-xl border bg-card-bg text-foreground focus:outline-none resize-none ${
                          formErrors.description ? "border-rose-500 focus:border-rose-500" : "border-card-border focus:border-accent"
                        }`}
                        placeholder="Describe the scope, timeline, and requirements..."
                      />
                      {formErrors.description && (
                        <p className="text-[9px] text-rose-500 mt-0.5 font-semibold">{formErrors.description}</p>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <p className="text-[10px] font-semibold text-rose-500 mt-1">{formError}</p>
                  )}

                  <div className="flex gap-2 pt-3 border-t border-card-border mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowFreelanceForm(false);
                        setFormError("");
                      }}
                      className="flex-1 py-2 text-xs font-semibold rounded-xl border border-card-border hover:bg-card-bg/50 active:scale-95 transition-all cursor-pointer text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2 text-xs font-bold rounded-xl bg-accent text-white hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Suggestions List (Filtered to show only unused) */}
          {visibleSuggestions.length > 0 && !showFreelanceForm && (
            <div className="px-4 pb-2.5 pt-1.5 flex flex-wrap gap-1.5 border-t border-card-border bg-card-bg/50">
              {visibleSuggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(sug)}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-card-border hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer bg-card-bg/80 hover:bg-card-bg shadow-sm"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input field */}
          {!showFreelanceForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex border-t border-card-border bg-card-bg"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, OIC, projects..."
                className="flex-1 px-4 py-3.5 text-xs md:text-sm bg-transparent border-0 outline-none text-foreground placeholder:text-muted-text/80"
              />
              <button
                type="submit"
                className="px-4 text-accent hover:text-accent/80 font-bold transition-colors cursor-pointer text-xs uppercase tracking-wider"
              >
                Send
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
