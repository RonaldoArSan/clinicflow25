import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Clock, MapPin } from "lucide-react";

// Mock types for the TV panel
interface QueueCall {
  id: string;
  patientName: string;
  ticketNumber: string; // e.g., "A001"
  destination: string; // e.g., "Consultório 1"
  timestamp: Date;
  type: "normal" | "preferential";
}

export default function TVPanelPage() {
  const [currentCall, setCurrentCall] = useState<QueueCall | null>(null);
  const [history, setHistory] = useState<QueueCall[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Audio context for the "ding-dong" chime
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Audio Context on first user interaction (browser policy)
  // For a TV panel, we might assume it's "started" by a click
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  };

  const playChime = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Simple "Ding-Dong" simulation
    // First note (Ding)
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);

    // Second note (Dong) - delayed
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.frequency.setValueAtTime(550, ctx.currentTime + 0.6);
    gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.6);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

    osc2.start(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 2.5);
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      // Cancel any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;

      // Wait for chime to finish (approx 2s) before speaking
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 1500);
    }
  };

  // Simulate receiving a new call (this would come from websocket/localStorage in real app)
  const triggerNewCall = (call: QueueCall) => {
    initAudio(); // Ensure audio is ready

    // Move current to history if exists
    if (currentCall) {
      setHistory((prev) => [currentCall, ...prev].slice(0, 4)); // Keep last 4
    }

    setCurrentCall(call);
    playChime();

    const textToSpeak = `Senha ${call.ticketNumber}. ${call.patientName}. Comparecer ao ${call.destination}.`;
    speak(textToSpeak);
  };

  // Listen for calls from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | Event) => {
      // Handle both real storage events (other tabs) and custom events (same tab testing)
      if (e instanceof StorageEvent && e.key !== "clinicflow_tv_call") return;

      const storedCall = localStorage.getItem("clinicflow_tv_call");
      if (storedCall) {
        try {
          const parsedCall = JSON.parse(storedCall);
          // Convert timestamp string back to Date
          parsedCall.timestamp = new Date(parsedCall.timestamp);
          triggerNewCall(parsedCall);
        } catch (err) {
          console.error("Error parsing call data", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom events if we want to test in same window
    window.addEventListener("clinicflow_call_event", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("clinicflow_call_event", handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden font-sans">
      <Head>
        <title>Painel de Chamada - ClinicFlow</title>
      </Head>

      {/* Top Bar */}
      <div className="h-24 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-8 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            {/* Logo Icon Placeholder */}
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-wider">ClinicFlow</h1>
        </div>
        <div className="flex items-center space-x-4 bg-gray-700 px-6 py-2 rounded-full">
          <Clock className="w-6 h-6 text-blue-400" />
          <span className="text-2xl font-mono font-bold">
            {currentTime.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        {/* Main Area - Current Call */}
        <div className="w-2/3 p-12 flex flex-col justify-center items-center border-r border-gray-800 relative bg-gradient-to-b from-gray-900 to-gray-800">
          {!currentCall ? (
            <div className="text-center opacity-50">
              <p className="text-4xl font-light mb-8">
                Aguardando próxima chamada...
              </p>
              <button
                onClick={() =>
                  triggerNewCall({
                    id: Math.random().toString(),
                    patientName: "Paciente Exemplo",
                    ticketNumber: "A" + Math.floor(Math.random() * 900 + 100),
                    destination:
                      "Consultório " + Math.floor(Math.random() * 5 + 1),
                    timestamp: new Date(),
                    type: Math.random() > 0.8 ? "preferential" : "normal",
                  })
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
              >
                Simular Chamada (Demo)
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Clique para testar o som e voz
              </p>
            </div>
          ) : (
            <div className="w-full max-w-4xl text-center animate-fade-in-up">
              <div className="mb-12">
                <span className="text-3xl text-blue-400 font-medium uppercase tracking-widest block mb-4">
                  Senha
                </span>
                <div className="text-[12rem] leading-none font-bold text-white font-mono tracking-tighter shadow-black drop-shadow-2xl">
                  {currentCall.ticketNumber}
                </div>
              </div>

              <div className="mb-16">
                <span className="text-2xl text-gray-400 font-medium uppercase tracking-widest block mb-2">
                  Paciente
                </span>
                <h2 className="text-6xl font-bold text-white truncate px-4">
                  {currentCall.patientName}
                </h2>
              </div>

              <div className="bg-blue-600/20 border border-blue-500/30 rounded-3xl p-8 inline-flex items-center space-x-6 mx-auto">
                <MapPin className="w-12 h-12 text-blue-400" />
                <div className="text-left">
                  <span className="text-xl text-blue-300 block uppercase text-sm font-bold tracking-wider">
                    Dirija-se ao
                  </span>
                  <span className="text-4xl font-bold text-white">
                    {currentCall.destination}
                  </span>
                </div>
              </div>

              {currentCall.type === "preferential" && (
                <div className="absolute top-8 right-8 bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg animate-pulse">
                  PREFERENCIAL
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - History */}
        <div className="w-1/3 bg-gray-800 p-8 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-400 mb-8 flex items-center">
            <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
            Últimas Chamadas
          </h3>

          <div className="space-y-4 flex-1 overflow-hidden">
            {history.map((call) => (
              <div
                key={call.id}
                className="bg-gray-700/50 rounded-xl p-6 border-l-4 border-gray-600 flex justify-between items-center opacity-70"
              >
                <div>
                  <div className="text-3xl font-bold text-white font-mono mb-1">
                    {call.ticketNumber}
                  </div>
                  <div className="text-lg text-gray-300 truncate max-w-[200px]">
                    {call.patientName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 font-medium">
                    {call.destination}
                  </div>
                  <div className="text-sm text-gray-500">
                    {call.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {history.length === 0 && (
              <div className="text-center text-gray-600 mt-20">
                <p>Histórico vazio</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-auto pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-sm">
              ClinicFlow Painel de Atendimento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
