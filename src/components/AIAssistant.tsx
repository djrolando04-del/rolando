import React, { useState } from "react";
import { Sparkles, Loader2, AlertCircle, Check, Copy } from "lucide-react";

interface AIAssistantProps {
  section: string;
  subject: string;
  studentProfile: string;
  currentContent: string;
  onApplyText: (newText: string) => void;
}

export default function AIAssistant({
  section,
  subject,
  studentProfile,
  currentContent,
  onApplyText,
}: AIAssistantProps) {
  const [promptNotes, setPromptNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async (action: "generate" | "polish") => {
    setIsLoading(true);
    setError(null);
    setIsCopied(false);

    try {
      const response = await fetch("/api/gemini/generate-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          subject,
          studentProfile,
          currentContent: action === "polish" ? currentContent : "",
          promptNotes: action === "generate" ? promptNotes : "Pulir el texto actual para mayor elocuencia académica.",
          action,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error al conectar con el servidor de IA.");
      }

      setGeneratedText(data.text);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado al procesar con la IA.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h3 className="font-semibold text-sm tracking-tight text-white">Copiloto de Redacción Académica</h3>
          <p className="text-xs text-slate-400">Gemini optimiza tu portafolio con lenguaje reflexivo y natural.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Sección seleccionada para optimizar:
          </label>
          <div className="px-3 py-1.5 bg-slate-800 rounded-md text-xs font-semibold text-violet-300 inline-block border border-slate-700">
            {section}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Tus apuntes de clase o ideas clave (Opcional para redactar desde cero):
          </label>
          <textarea
            className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:border-violet-500 placeholder-slate-500 resize-none h-16"
            placeholder="Ej: 'Me gustó el debate de IA porque nos hace reflexionar sobre ética, aprendí a buscar fuentes en google académico...'"
            value={promptNotes}
            onChange={(e) => setPromptNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleGenerate("generate")}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 text-white font-medium text-xs py-2 px-3 rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            Redactar sección
          </button>

          {currentContent && (
            <button
              onClick={() => handleGenerate("polish")}
              disabled={isLoading}
              className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-medium text-xs py-2 px-3 rounded-md flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              )}
              Perfeccionar borrador
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-950/50 border border-red-800 rounded-lg p-3 flex gap-2 items-start text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error del Copiloto</p>
            <p className="opacity-90">{error}</p>
          </div>
        </div>
      )}

      {generatedText && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-300">Borrador Académico Generado:</span>
            <div className="flex gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
                title="Copiar texto"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-md text-xs text-slate-300 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-line">
            {generatedText}
          </div>

          <button
            onClick={() => {
              onApplyText(generatedText);
              setGeneratedText("");
            }}
            className="w-full bg-indigo-900/60 hover:bg-indigo-900/80 text-indigo-200 hover:text-white border border-indigo-700 font-semibold text-xs py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
          >
            Aplicar y reemplazar en mi Portafolio
          </button>
        </div>
      )}
    </div>
  );
}
