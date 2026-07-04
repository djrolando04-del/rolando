import React from "react";
import { SiteTheme } from "../types";
import { defaultThemes } from "../data";
import { Palette, Layout, Type, CheckCircle } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: SiteTheme;
  onSelectTheme: (theme: SiteTheme) => void;
  bannerStyle: "grande" | "estandar" | "solo-titulo";
  onChangeBannerStyle: (style: "grande" | "estandar" | "solo-titulo") => void;
}

export default function ThemeSelector({
  currentTheme,
  onSelectTheme,
  bannerStyle,
  onChangeBannerStyle,
}: ThemeSelectorProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Diseño de Google Sites</h3>
          <p className="text-xs text-slate-500">Recomendación visual y configuración de estilos.</p>
        </div>
      </div>

      {/* Theme Presets */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
          Pre-ajustes de Tema (Google Sites)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {defaultThemes.map((theme) => {
            const isActive = theme.id === currentTheme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className={`flex flex-col text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  isActive
                    ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                    : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-center w-full mb-1">
                  <span className="font-bold text-slate-800">{theme.nombre}</span>
                  {isActive && <CheckCircle className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />}
                </div>
                <div className="flex gap-1 items-center mt-1">
                  <div className={`w-4 h-4 rounded-full ${theme.primaryColor.split(" ")[0]}`} />
                  <span className="text-2xs text-slate-500 font-mono">
                    {theme.fontFamily === "font-serif"
                      ? "Playfair Display"
                      : theme.fontFamily === "font-grotesk"
                      ? "Space Grotesk"
                      : theme.fontFamily === "font-mono"
                      ? "JetBrains Mono"
                      : "Inter"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Banner Sizing */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
          Tipo de Encabezado (Banner)
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(["grande", "estandar", "solo-titulo"] as const).map((style) => (
            <button
              key={style}
              onClick={() => onChangeBannerStyle(style)}
              className={`text-2xs py-1.5 px-2 rounded-md font-semibold capitalize cursor-pointer transition-all ${
                bannerStyle === style
                  ? "bg-white text-slate-800 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {style === "solo-titulo" ? "Solo Título" : style === "estandar" ? "Estándar" : "Grande"}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Recommendations Checklist for Google Sites */}
      <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 space-y-2">
        <h4 className="text-2xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <Layout className="w-3.5 h-3.5 text-slate-400" /> Parámetros para tu Google Site:
        </h4>
        <ul className="space-y-2 text-2xs text-slate-600 leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              <strong>Tipografía recomendada:</strong>{" "}
              {currentTheme.fontFamily === "font-serif"
                ? "Título: Playfair Display | Cuerpo: Georgia"
                : currentTheme.fontFamily === "font-grotesk"
                ? "Título: Space Grotesk | Cuerpo: Montserrat o Inter"
                : currentTheme.fontFamily === "font-mono"
                ? "Título: JetBrains Mono o Courier | Cuerpo: Courier Prime o Arial"
                : "Título e interior: Inter o Roboto"}
            </span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              <strong>Distribución:</strong> Diseña una barra lateral o menú horizontal con las 7 secciones. Utiliza el módulo de <strong>"Tres Columnas"</strong> en la Galería de Evidencias.
            </span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              <strong>Elementos compatibles:</strong> Inserta botones con el enlace a tus documentos PDF en Google Drive, o carga la presentación directamente usando el componente nativo de <strong>Google Slides</strong>.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
