"use client";

import { useState, useRef, useEffect } from "react";

// Speech Recognition types
declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognition;
		webkitSpeechRecognition: new () => SpeechRecognition;
	}
}

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
	error: string;
}

interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start(): void;
	stop(): void;
	abort(): void;
	onresult: ((event: SpeechRecognitionEvent) => void) | null;
	onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
	onend: (() => void) | null;
}
import { Mic, MicOff, Volume2, VolumeX, Send, Bot, User, Loader2, RefreshCw, X, Maximize2, Minimize2 } from "lucide-react";
import { useChatbotTracking } from "./analytics-provider";

interface Message {
	role: "user" | "bot";
	text: string;
	sources?: Array<{ title: string; type: string; id: string }>;
	timestamp: Date;
	audioUrl?: string;
}

interface ConversationState {
	messages: Message[];
	conversationHistory: Array<{ user: string; assistant: string }>;
	isLoading: boolean;
	isVoiceMode: boolean;
	isListening: boolean;
	isPlaying: boolean;
	error: string | null;
}

export function ChatbotWidget() {
	const [open, setOpen] = useState(false);
	const [isMaximized, setIsMaximized] = useState(false);
	const [state, setState] = useState<ConversationState>({
		messages: [],
		conversationHistory: [],
		isLoading: false,
		isVoiceMode: false,
		isListening: false,
		isPlaying: false,
		error: null,
	});
	
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);
	const recognitionRef = useRef<SpeechRecognition | null>(null);
	
	// Analytics tracking
	const {
		trackChatbotOpen,
		trackChatbotClose,
	} = useChatbotTracking();

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [state.messages]);

	// Initialize speech recognition
	useEffect(() => {
		if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
			const SpeechRecognition = window.webkitSpeechRecognition;
			recognitionRef.current = new SpeechRecognition();
			if (recognitionRef.current) {
				recognitionRef.current.continuous = false;
				recognitionRef.current.interimResults = false;
				recognitionRef.current.lang = "en-US";

				recognitionRef.current.onresult = (event) => {
					const transcript = event.results[0][0].transcript;
					setInput(transcript);
					setState(prev => ({ ...prev, isListening: false }));
				};
				recognitionRef.current.onerror = () => {
					setState(prev => ({ ...prev, isListening: false, error: "Speech recognition failed" }));
				};

				recognitionRef.current.onend = () => {
					setState(prev => ({ ...prev, isListening: false }));
				};
			}
		}
	}, []);

	const startListening = () => {
		if (recognitionRef.current && !state.isListening) {
			setState(prev => ({ ...prev, isListening: true, error: null }));
			recognitionRef.current.start();
		}
	};

	const stopListening = () => {
		if (recognitionRef.current && state.isListening) {
			recognitionRef.current.stop();
			setState(prev => ({ ...prev, isListening: false }));
		}
	};

	const playAudio = async (audioUrl: string) => {
		if (audioRef.current) {
			try {
				setState(prev => ({ ...prev, isPlaying: true }));
				audioRef.current.src = audioUrl;
				await audioRef.current.play();
			} catch (error) {
				console.error("Audio playback failed:", error);
				setState(prev => ({ ...prev, error: "Audio playback failed" }));
			}
		}
	};

	const stopAudio = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			setState(prev => ({ ...prev, isPlaying: false }));
		}
	};

	const sendMessage = async (messageText: string = input) => {
		if (!messageText.trim() || state.isLoading) return;

		const userMessage: Message = {
			role: "user",
			text: messageText.trim(),
			timestamp: new Date(),
		};

		setState(prev => ({
			...prev,
			messages: [...prev.messages, userMessage],
			isLoading: true,
			error: null,
		}));

		setInput("");

		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_CHATBOT_URL || "http://localhost:8000/chat",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						question: messageText.trim(),
						context: [],
						use_voice: state.isVoiceMode,
						conversation_history: state.conversationHistory,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			const botMessage: Message = {
				role: "bot",
				text: data.answer || "I'm sorry, I couldn't generate a response.",
				sources: data.sources || [],
				timestamp: new Date(),
				audioUrl: data.audio_url ? `${process.env.NEXT_PUBLIC_CHATBOT_URL || "http://localhost:8000"}${data.audio_url}` : undefined,
			};

			setState(prev => ({
				...prev,
				messages: [...prev.messages, botMessage],
				isLoading: false,
				conversationHistory: [
					...prev.conversationHistory,
					{ user: messageText.trim(), assistant: data.answer || "" },
				].slice(-5), // Keep last 5 exchanges
			}));

			// Auto-play audio if voice mode is enabled
			if (state.isVoiceMode && botMessage.audioUrl) {
				await playAudio(botMessage.audioUrl);
			}
		} catch (error) {
			console.error("Chat error:", error);
			const errorMessage: Message = {
				role: "bot",
				text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
				timestamp: new Date(),
			};

			setState(prev => ({
				...prev,
				messages: [...prev.messages, errorMessage],
				isLoading: false,
				error: "Connection failed",
			}));
		}
	};

	const clearConversation = () => {
		setState(prev => ({
			...prev,
			messages: [],
			conversationHistory: [],
			error: null,
		}));
	};

	const toggleVoiceMode = () => {
		setState(prev => ({ ...prev, isVoiceMode: !prev.isVoiceMode }));
		if (state.isPlaying) {
			stopAudio();
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className={`fixed ${isMaximized ? 'top-4 left-4' : 'bottom-4 right-4'} z-50`}>
			{/* Audio element for TTS playback */}
			<audio
				ref={audioRef}
				onEnded={() => setState(prev => ({ ...prev, isPlaying: false }))}
				onError={() => setState(prev => ({ ...prev, isPlaying: false, error: "Audio playback failed" }))}
			/>

			{open && (
				<div className={`${isMaximized ? 'w-[90vw] h-[90vh]' : 'w-96 h-[500px]'} glass rounded-2xl border border-black/10 dark:border-white/10 flex flex-col overflow-hidden shadow-2xl transition-all duration-300`}>
					{/* Header */}
					<div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Bot className="h-5 w-5 text-accent-500" />
							<span className="font-semibold">AI Assistant</span>
							{state.isVoiceMode && (
								<span className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 px-2 py-1 rounded-full">
									Voice Mode
								</span>
							)}
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={toggleVoiceMode}
								className={`p-2 rounded-full transition-colors ${
									state.isVoiceMode
										? "bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400"
										: "hover:bg-black/5 dark:hover:bg-white/10"
								}`}
								title={state.isVoiceMode ? "Disable voice mode" : "Enable voice mode"}
							>
								{state.isVoiceMode ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
							</button>
							<button
								onClick={clearConversation}
								className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
								title="Clear conversation"
							>
								<RefreshCw className="h-4 w-4" />
							</button>
							<button
								onClick={() => setIsMaximized(!isMaximized)}
								className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
								title={isMaximized ? "Minimize" : "Maximize"}
							>
								{isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
							</button>
							<button
								onClick={() => {
									setOpen(false);
									setIsMaximized(false);
									trackChatbotClose();
								}}
								className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
								title="Close chat"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					</div>

					{/* Messages */}
					<div className="flex-1 p-4 space-y-4 overflow-y-auto">
						{state.messages.length === 0 && (
							<div className="text-center text-muted-foreground py-8">
								<Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
								<p className="text-sm">Ask me about Adarsh&apos;s projects, skills, or services!</p>
								<p className="text-xs mt-1">Try: &quot;What projects has Adarsh worked on?&quot;</p>
							</div>
						)}

						{state.messages.map((message, index) => (
							<div
								key={index}
								className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								{message.role === "bot" && (
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
										<Bot className="h-4 w-4 text-accent-600 dark:text-accent-400" />
									</div>
								)}
								
								<div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
									<div
										className={`px-4 py-3 rounded-2xl ${
											message.role === "user"
												? "bg-accent-500 text-white"
												: "bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
										}`}
									>
										<p className="text-sm whitespace-pre-wrap">{message.text}</p>
									</div>
									
									
									{/* Audio controls */}
									{message.audioUrl && state.isVoiceMode && (
										<div className="mt-2">
											<button
												onClick={() => state.isPlaying ? stopAudio() : playAudio(message.audioUrl!)}
												className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 px-2 py-1 rounded-full hover:bg-accent-200 dark:hover:bg-accent-800 transition-colors"
											>
												{state.isPlaying ? "Stop" : "Play"} Audio
											</button>
										</div>
									)}
									
									<p className="text-xs text-muted-foreground mt-1">
										{message.timestamp.toLocaleTimeString()}
									</p>
								</div>

								{message.role === "user" && (
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center">
										<User className="h-4 w-4 text-white" />
									</div>
								)}
							</div>
						))}

						{state.isLoading && (
							<div className="flex gap-3 justify-start">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
									<Bot className="h-4 w-4 text-accent-600 dark:text-accent-400" />
								</div>
								<div className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 px-4 py-3 rounded-2xl">
									<div className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										<span className="text-sm text-muted-foreground">Thinking...</span>
									</div>
								</div>
							</div>
						)}

						{state.error && (
							<div className="text-center text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
								{state.error}
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className="p-4 border-t border-black/10 dark:border-white/10">
						<div className="flex gap-2">
							{/* Voice input button */}
							<button
								onClick={state.isListening ? stopListening : startListening}
								disabled={!recognitionRef.current}
								className={`p-2 rounded-full transition-colors ${
									state.isListening
										? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
										: "hover:bg-black/5 dark:hover:bg-white/10"
								} ${!recognitionRef.current ? "opacity-50 cursor-not-allowed" : ""}`}
								title={state.isListening ? "Stop listening" : "Start voice input"}
							>
								{state.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
							</button>

							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Ask about Adarsh&apos;s work..."
								className="flex-1 bg-transparent border border-black/10 dark:border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20"
								disabled={state.isLoading}
							/>

							<button
								onClick={() => sendMessage()}
								disabled={!input.trim() || state.isLoading}
								className="p-2 rounded-full bg-accent-500 text-white hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								title="Send message"
							>
								<Send className="h-4 w-4" />
							</button>
						</div>
						
						{state.isListening && (
							<div className="mt-2 text-center">
								<div className="inline-flex items-center gap-2 text-sm text-accent-600 dark:text-accent-400">
									<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
									Listening...
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Toggle button */}
			<button
				onClick={() => {
					const newOpen = !open;
					setOpen(newOpen);
					if (newOpen) {
						trackChatbotOpen();
					} else {
						trackChatbotClose();
					}
				}}
				className="rounded-full h-14 w-14 glass border border-black/10 dark:border-white/10 hover:scale-105 transition-transform shadow-lg"
			>
				{open ? (
					<Bot className="h-6 w-6 mx-auto text-accent-500" />
				) : (
					<Bot className="h-6 w-6 mx-auto text-accent-500" />
				)}
			</button>
		</div>
	);
}

// Extend Window interface for speech recognition
