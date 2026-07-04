import React from "react";
import { ChecklistItem } from "../types";
import { CheckSquare, Square, ClipboardCheck, Sparkles } from "lucide-react";

interface ChecklistProgressProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
}

export default function ChecklistProgress({ items, onToggleItem }: ChecklistProgressProps) {
  const completedCount = items.filter((item) => item.completado).length;
  const totalCount = items.length;
  const percentage = Math.round((completedCount / totalCount) * 100) || 0;

  // Group items by section
  const sections = items.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Lista de Verificación Académica</h3>
            <p className="text-xs text-slate-500">Comprueba el cumplimiento de los requisitos de tu portafolio.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          {percentage}% Listo
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-2xs text-slate-500 font-medium">
          <span>{completedCount} de {totalCount} requisitos completados</span>
          <span>{percentage === 100 ? "¡Listo para copiar a Google Sites!" : "En desarrollo"}</span>
        </div>
      </div>

      {/* Sectioned Checklist */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {Object.entries(sections).map(([sectionName, sectionItems]) => (
          <div key={sectionName} className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Página: {sectionName}
            </h4>
            <div className="space-y-1">
              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onToggleItem(item.id)}
                  className="w-full flex items-start gap-2 p-2 rounded-md hover:bg-slate-50 transition-all text-left group"
                >
                  <span className="shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-500 transition-colors">
                    {item.completado ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </span>
                  <span
                    className={`text-xs ${
                      item.completado
                        ? "text-slate-400 line-through decoration-slate-300"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    {item.texto}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
