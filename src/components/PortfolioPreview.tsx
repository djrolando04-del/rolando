import React, { useState } from "react";
import {
  StudentInfo,
  PresentationInfo,
  LearningProcessInfo,
  SkillItem,
  EvidenceItem,
  FinalReflectionInfo,
  ContactInfo,
  SiteTheme,
} from "../types";
import {
  ExternalLink,
  Mail,
  Linkedin,
  Phone,
  BookOpen,
  User,
  GraduationCap,
  Calendar,
  Grid,
  Sparkles,
  Award,
  ChevronRight,
  FileText,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface PortfolioPreviewProps {
  student: StudentInfo;
  presentation: PresentationInfo;
  learningProcess: LearningProcessInfo;
  skills: SkillItem[];
  evidences: EvidenceItem[];
  reflection: FinalReflectionInfo;
  contact: ContactInfo;
  theme: SiteTheme;
  bannerStyle: "grande" | "estandar" | "solo-titulo";
}

export default function PortfolioPreview({
  student,
  presentation,
  learningProcess,
  skills,
  evidences,
  reflection,
  contact,
  theme,
  bannerStyle,
}: PortfolioPreviewProps) {
  const [activeTab, setActiveTab] = useState<string>("inicio");

  const isNatural = theme.id === "natural-tones";

  const getCardBg = () => {
    return isNatural ? "bg-white" : "bg-white";
  };

  const getCardBorder = () => {
    return isNatural ? "border-[#E5E0D0]" : "border-slate-200/80";
  };

  const getCardRounding = () => {
    return isNatural ? "rounded-[32px]" : "rounded-xl";
  };

  const getTextColor = () => {
    return isNatural ? "text-[#3A3830]" : "text-slate-850";
  };

  const getHeadingColor = () => {
    return isNatural ? "text-[#2C2B24] font-serif" : "text-slate-900 font-extrabold";
  };

  const getMutedTextColor = () => {
    return isNatural ? "text-[#6A6658]" : "text-slate-600";
  };

  const getLabelColor = () => {
    return isNatural ? "text-[#8C8878]" : "text-slate-400";
  };

  const getSeparatorColor = () => {
    return isNatural ? "border-[#F0EDE4]" : "border-slate-100";
  };

  // Determine font classes based on selected theme's fontFamily
  const getFontClass = () => {
    switch (theme.fontFamily) {
      case "font-serif":
        return "font-serif";
      case "font-mono":
        return "font-mono";
      case "font-grotesk":
        return "font-grotesk";
      default:
        return "font-sans";
    }
  };

  // Determine primary color classes (hex/tailwind utility)
  const getAccentBg = () => {
    return theme.primaryColor.split(" ")[0]; // Get the first class (e.g. 'bg-slate-700')
  };

  const getAccentText = () => {
    const bgClass = theme.primaryColor.split(" ")[0];
    return bgClass.replace("bg-", "text-"); // e.g. 'text-slate-700'
  };

  const getAccentBorder = () => {
    const bgClass = theme.primaryColor.split(" ")[0];
    return bgClass.replace("bg-", "border-"); // e.g. 'border-slate-700'
  };

  // Render simulated page tabs
  const pages = [
    { id: "inicio", label: "Inicio" },
    { id: "presentacion", label: "Presentación Personal" },
    { id: "proceso", label: "Proceso de Aprendizaje" },
    { id: "competencias", label: "Habilidades" },
    { id: "evidencias", label: "Galería de Evidencias" },
    { id: "reflexion", label: "Reflexión Final" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md flex flex-col h-full ${getFontClass()}`}>
      {/* Simulated Browser Bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="bg-white border border-slate-200 rounded-md py-1 px-3 text-2xs text-slate-400 font-mono w-full max-w-md flex items-center gap-1">
          <span className="text-slate-300">https://sites.google.com/uapa/</span>
          <span className="text-slate-600 font-medium font-sans">
            {student.nombre ? student.nombre.toLowerCase().replace(/\s+/g, "-") : "portafolio"}-{activeTab}
          </span>
        </div>
        <div className="text-2xs font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded flex items-center gap-1 select-none shrink-0">
          <Sparkles className="w-3 h-3 text-amber-500" /> Vista Previa
        </div>
      </div>

      {/* Simulated Google Sites Navigation Bar */}
      <div className="bg-white border-b border-slate-150 px-5 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-6 rounded-xs ${getAccentBg()}`} />
          <span className="font-bold text-xs text-slate-800 tracking-tight uppercase">
            {student.titulo || "PORTAFOLIO DIGITAL"}
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`text-3xs py-1 px-2 rounded-md font-bold shrink-0 transition-all cursor-pointer ${
                activeTab === p.id
                  ? `${getAccentBg()} text-white`
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Simulated Page Header (Banner) */}
      {bannerStyle !== "solo-titulo" && (
        <div className={`relative ${bannerStyle === "grande" ? "py-16 md:py-24" : "py-10 md:py-14"} ${getAccentBg()} text-white overflow-hidden text-center`}>
          {/* Decorative background grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

          <div className="relative z-10 px-6 max-w-4xl mx-auto space-y-2">
            <span className="text-4xs font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full inline-block">
              {student.asignatura || "Mi Asignatura"}
            </span>
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight drop-shadow-xs capitalize">
              {pages.find((p) => p.id === activeTab)?.label}
            </h1>
            <p className="text-5xs md:text-4xs text-white/80 uppercase tracking-wider font-semibold font-mono">
              {student.universidad || "UNIVERSIDAD"}
            </p>
          </div>
        </div>
      )}

      {/* Preview Content Area */}
      <div className={`flex-1 overflow-y-auto p-6 md:p-8 space-y-8 ${theme.bgColor}`}>
        {/* If banner style is solo-titulo, we display simple top headers */}
        {bannerStyle === "solo-titulo" && (
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className={`text-4xs font-extrabold uppercase tracking-widest ${getAccentText()}`}>
              {student.asignatura} • {student.universidad}
            </span>
            <h1 className="text-2xl font-bold text-slate-800 capitalize mt-1">
              {pages.find((p) => p.id === activeTab)?.label}
            </h1>
          </div>
        )}

        <div className="animate-fade-in max-w-3xl mx-auto space-y-8">
          {/* TAB: INICIO */}
          {activeTab === "inicio" && (
            <div className="space-y-6">
              {/* Academic Cover */}
              <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-6 md:p-8 shadow-xs space-y-6 relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1.5 ${getAccentBg()}`} />
                <div className={`space-y-2 text-center pb-4 border-b ${getSeparatorColor()}`}>
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${getAccentText()}`}>
                    {student.universidad || "[Escribe tu Universidad]"}
                  </h2>
                  <h3 className={`text-lg md:text-xl font-bold ${isNatural ? "text-[#2C2B24] font-serif" : "text-slate-800 font-extrabold"}`}>
                    {student.titulo || "Portafolio Académico"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div>
                      <span className={`text-4xs uppercase font-bold tracking-wider block ${getLabelColor()}`}>Asignatura</span>
                      <span className={`${getTextColor()} font-bold`}>{student.asignatura || "[Asignatura]"}</span>
                    </div>
                    <div>
                      <span className={`text-4xs uppercase font-bold tracking-wider block ${getLabelColor()}`}>Estudiante</span>
                      <span className={`${getTextColor()} font-semibold`}>{student.nombre || "[Tu Nombre]"}</span>
                    </div>
                    <div>
                      <span className={`text-4xs uppercase font-bold tracking-wider block ${getLabelColor()}`}>Matrícula</span>
                      <span className={`${getTextColor()} font-mono`}>{student.matricula || "[Tu Matrícula]"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className={`text-4xs uppercase font-bold tracking-wider block ${getLabelColor()}`}>Facilitador</span>
                      <span className={`${getTextColor()} font-semibold`}>{student.facilitador || "[Facilitador]"}</span>
                    </div>
                    <div>
                      <span className={`text-4xs uppercase font-bold tracking-wider block ${getLabelColor()}`}>Carrera</span>
                      <span className={`${getTextColor()} font-semibold`}>{student.carrera || "[Carrera]"}</span>
                    </div>
                    <div>
                      <span className={`text-4xs uppercase font-bold tracking-wider block ${getLabelColor()}`}>Fecha</span>
                      <span className={`${getTextColor()} font-semibold`}>{student.fecha || "[Fecha]"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="space-y-3">
                <h3 className={`text-sm font-extrabold uppercase tracking-wider border-l-3 ${getAccentBorder()} pl-2.5 ${getHeadingColor()}`}>
                  Bienvenida y Propósito
                </h3>
                <p className={`text-xs ${getMutedTextColor()} leading-relaxed text-justify whitespace-pre-line`}>
                  {student.bienvenida || "Bienvenido a mi portafolio digital."}
                </p>
              </div>

              {/* Cover Image Advice */}
              <div className={`${isNatural ? "bg-[#F5F2EA]/60 border-[#DCD7C9]" : "bg-slate-50 border-slate-200/80"} border rounded-lg p-4 space-y-2`}>
                <h4 className={`text-4xs font-bold uppercase tracking-widest flex items-center gap-1 ${getLabelColor()}`}>
                  <HelpCircle className="w-3.5 h-3.5" /> Recomendación de Imagen de Portada para Google Sites:
                </h4>
                <p className={`text-5xs leading-relaxed italic ${getMutedTextColor()}`}>
                  "{student.sugerenciaPortada}"
                </p>
              </div>
            </div>
          )}

          {/* TAB: PRESENTACION */}
          {activeTab === "presentacion" && (
            <div className="space-y-6">
              {/* Profile Bio Section */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className={`shrink-0 w-28 h-28 mx-auto md:mx-0 rounded-xl overflow-hidden border-2 ${isNatural ? "border-[#E5E0D0]" : "border-slate-200"} shadow-xs relative bg-slate-100 flex items-center justify-center`}>
                  {presentation.imagenUrl ? (
                    <img
                      src={presentation.imagenUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-10 h-10 text-slate-400" />
                  )}
                  <div className={`absolute bottom-0 right-0 ${isNatural ? "bg-[#5A5A40]" : "bg-slate-800"} text-white p-1 text-5xs font-bold rounded-tl`}>
                    ESTUDIANTE
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-1 text-center md:text-left">
                    <h2 className={`text-lg font-bold ${isNatural ? "text-[#2C2B24] font-serif" : "text-slate-800"}`}>{student.nombre}</h2>
                    <p className={`text-xs ${getMutedTextColor()} font-medium`}>Estudiante de {student.carrera}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className={`text-4xs font-bold uppercase tracking-wider ${getAccentText()}`}>Mi Biografía</h4>
                    <p className={`text-xs ${getMutedTextColor()} leading-relaxed whitespace-pre-line`}>
                      {presentation.biografia}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-4 space-y-1.5 shadow-2xs`}>
                  <h4 className={`text-4xs font-bold uppercase tracking-wider ${getAccentText()}`}>Mis Intereses</h4>
                  <p className={`text-xs ${getMutedTextColor()} leading-relaxed`}>{presentation.intereses}</p>
                </div>

                <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-4 space-y-1.5 shadow-2xs`}>
                  <h4 className={`text-4xs font-bold uppercase tracking-wider ${getAccentText()}`}>Mis Fortalezas</h4>
                  <p className={`text-xs ${getMutedTextColor()} leading-relaxed`}>{presentation.fortalezas}</p>
                </div>

                <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-4 space-y-1.5 shadow-2xs`}>
                  <h4 className={`text-4xs font-bold uppercase tracking-wider ${getAccentText()}`}>Objetivos Profesionales</h4>
                  <p className={`text-xs ${getMutedTextColor()} leading-relaxed`}>{presentation.objetivos}</p>
                </div>

                <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-4 space-y-1.5 shadow-2xs`}>
                  <h4 className={`text-4xs font-bold uppercase tracking-wider ${getAccentText()}`}>Valores y Motivación</h4>
                  <p className={`text-xs ${getMutedTextColor()} leading-relaxed`}>
                    <strong>Valores:</strong> {presentation.valores}
                    <br />
                    <strong className="mt-1 block">Motivación:</strong> {presentation.motivacion}
                  </p>
                </div>
              </div>

              {/* Inspiring quote */}
              {presentation.fraseInspiradora && (
                <div className={`${isNatural ? "bg-[#F5F2EA]/60 border-l-4 border-[#5A5A40]" : "bg-slate-50 border-l-4 border-slate-300"} p-4 rounded-r-xl italic text-xs ${getMutedTextColor()}`}>
                  "{presentation.fraseInspiradora}"
                </div>
              )}
            </div>
          )}

          {/* TAB: PROCESO */}
          {activeTab === "proceso" && (
            <div className="space-y-6">
              <div className={`${isNatural ? "bg-[#5A5A40] text-[#FDFCFB] border border-[#5A5A40]" : "bg-white border border-slate-200/80"} ${getCardRounding()} p-6 md:p-8 shadow-xs space-y-6`}>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isNatural ? "text-white/90" : getAccentText()}`}>
                      ¿Cuál fue la actividad más interesante o importante y por qué?
                    </h3>
                    <p className={`text-xs ${isNatural ? "text-[#FDFCFB]/80" : "text-slate-600"} leading-relaxed whitespace-pre-line`}>
                      <strong>Actividad más destacada:</strong> {learningProcess.actividadInteresante}
                      <br />
                      <strong className="mt-2 block">Justificación:</strong> {learningProcess.porQue}
                    </p>
                  </div>

                  <div className={`space-y-1 pt-3 border-t ${isNatural ? "border-white/10" : "border-slate-100"}`}>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isNatural ? "text-white/90" : getAccentText()}`}>
                      ¿Qué aprendizaje significativo obtuve de ella?
                    </h3>
                    <p className={`text-xs ${isNatural ? "text-[#FDFCFB]/80" : "text-slate-600"} leading-relaxed whitespace-pre-line`}>
                      {learningProcess.aprendizajeSignificativo}
                    </p>
                  </div>

                  <div className={`space-y-1 pt-3 border-t ${isNatural ? "border-white/10" : "border-slate-100"}`}>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isNatural ? "text-white/90" : getAccentText()}`}>
                      ¿Qué importancia tiene esta asignatura para mi formación profesional?
                    </h3>
                    <p className={`text-xs ${isNatural ? "text-[#FDFCFB]/80" : "text-slate-600"} leading-relaxed whitespace-pre-line`}>
                      {learningProcess.importanciaProfesional}
                    </p>
                  </div>

                  <div className={`space-y-1 pt-3 border-t ${isNatural ? "border-white/10" : "border-slate-100"}`}>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isNatural ? "text-white/90" : getAccentText()}`}>
                      ¿Cómo me siento respecto al proceso vivido?
                    </h3>
                    <p className={`text-xs ${isNatural ? "text-[#FDFCFB]/80" : "text-slate-600"} leading-relaxed whitespace-pre-line`}>
                      {learningProcess.sentirProceso}
                    </p>
                  </div>
                </div>

                <div className={`mt-6 pt-5 border-t-2 ${isNatural ? "border-white/20" : getAccentBorder()} space-y-2`}>
                  <h4 className={`text-xs font-bold uppercase ${isNatural ? "text-white" : "text-slate-800"}`}>Conclusión del Ciclo</h4>
                  <p className={`text-xs ${isNatural ? "text-[#FDFCFB]/80" : "text-slate-600"} leading-relaxed whitespace-pre-line`}>
                    {learningProcess.conclusion}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMPETENCIAS */}
          {activeTab === "competencias" && (
            <div className="space-y-6">
              <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} overflow-hidden shadow-xs`}>
                <div className={`px-4 py-3 ${getAccentBg()} ${isNatural ? "text-[#FDFCFB]" : "text-white"} text-xs font-bold uppercase tracking-wider`}>
                  Matriz de Competencias y Habilidades Desarrolladas
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-3xs">
                    <thead>
                      <tr className={`${isNatural ? "bg-[#F5F2EA] text-[#8C8878] border-b border-[#E5E0D0]" : "bg-slate-50 text-slate-500 border-b border-slate-150"} uppercase tracking-wider font-bold`}>
                        <th className="p-3 w-1/4">Habilidad</th>
                        <th className="p-3 w-1/4">Cómo la desarrollé</th>
                        <th className="p-3 w-1/4">Ejemplo</th>
                        <th className="p-3 w-1/4">Importancia Profesional</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isNatural ? "divide-[#F0EDE4]" : "divide-slate-100"} ${getTextColor()}`}>
                      {skills.map((s) => (
                        <tr key={s.id} className={`hover:${isNatural ? "bg-[#F5F2EA]/30" : "bg-slate-50/50"} transition-colors`}>
                          <td className={`p-3 font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} flex items-center gap-1.5`}>
                            <Award className={`w-3.5 h-3.5 ${getAccentText()} shrink-0`} />
                            {s.habilidad}
                          </td>
                          <td className="p-3 leading-relaxed">{s.desarrollo}</td>
                          <td className="p-3 leading-relaxed italic">{s.ejemplo}</td>
                          <td className="p-3 leading-relaxed">{s.importancia}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EVIDENCIAS */}
          {activeTab === "evidencias" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {evidences.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className={`${isNatural ? "bg-[#F5F2EA] border-dashed border-[#DCD7C9] rounded-2xl" : "bg-white border border-slate-200 rounded-xl"} border overflow-hidden shadow-2xs flex flex-col md:flex-row`}
                  >
                    {/* Evidence media column */}
                    <div className={`relative w-full md:w-56 h-36 md:h-auto shrink-0 ${isNatural ? "bg-[#E5E0D0]/40" : "bg-slate-100"} flex flex-col justify-between p-4 overflow-hidden`}>
                      {ev.imagenSimulada ? (
                        <img
                          src={ev.imagenSimulada}
                          alt={ev.titulo}
                          className="absolute inset-0 w-full h-full object-cover opacity-65"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className={`absolute inset-0 ${isNatural ? "bg-[#E5E0D0]/30" : "bg-slate-150"}`} />
                      )}
                      <div className="relative z-10">
                        <span className={`text-5xs ${isNatural ? "bg-[#5A5A40] text-[#FDFCFB]" : "bg-blue-600 text-white"} font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                          {ev.tipo}
                        </span>
                      </div>
                      <div className="relative z-10 space-y-1.5">
                        <div className={`bg-white/95 backdrop-blur-xs border ${isNatural ? "border-[#E5E0D0]" : "border-slate-200"} rounded-md p-1.5 flex items-center gap-1`}>
                          <FileText className={`w-3.5 h-3.5 ${isNatural ? "text-[#5A5A40]" : "text-slate-600"}`} />
                          <span className={`text-5xs font-mono ${isNatural ? "text-[#3A3830]" : "text-slate-700"} truncate font-semibold`}>
                            {ev.archivoNombre || "evidencia.pdf"}
                          </span>
                        </div>
                        <span className={`text-5xs font-bold ${isNatural ? "text-[#5A5A40] bg-white/60 px-1 py-0.5 rounded" : "text-slate-500"} drop-shadow-xs`}>
                          Evidencia #{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content details column */}
                    <div className="p-5 flex-1 space-y-3.5 text-xs">
                      <h3 className={`font-bold ${isNatural ? "text-[#2C2B24] font-serif text-sm" : "text-slate-800"} leading-snug`}>
                        {ev.titulo}
                      </h3>
                      <div className={`space-y-2 ${getMutedTextColor()} text-2xs leading-relaxed`}>
                        <p>
                          <strong className={`${isNatural ? "text-[#3A3830]" : "text-slate-800"} block font-bold`}>¿Qué representa?</strong> {ev.representa}
                        </p>
                        <p>
                          <strong className={`${isNatural ? "text-[#3A3830]" : "text-slate-800"} block font-bold`}>¿Qué aprendí?</strong> {ev.aprendido}
                        </p>
                        <p>
                          <strong className={`${isNatural ? "text-[#3A3830]" : "text-slate-800"} block font-bold`}>Competencias de egreso:</strong> {ev.competencias}
                        </p>
                        <p>
                          <strong className={`${isNatural ? "text-[#3A3830]" : "text-slate-800"} block font-bold`}>Importancia profesional:</strong> {ev.importancia}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REFLEXION */}
          {activeTab === "reflexion" && (
            <div className="space-y-6">
              <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-6 md:p-8 shadow-xs space-y-6`}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className={`text-xs font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} flex items-center gap-1.5`}>
                      <ChevronRight className={`w-4 h-4 ${getAccentText()}`} /> Evolución del Aprendizaje
                    </h3>
                    <p className={`text-xs ${getMutedTextColor()} leading-relaxed whitespace-pre-line pl-5`}>
                      {reflection.evolucion}
                    </p>
                  </div>

                  <div className={`space-y-1.5 pt-3 border-t ${getSeparatorColor()}`}>
                    <h3 className={`text-xs font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} flex items-center gap-1.5`}>
                      <ChevronRight className={`w-4 h-4 ${getAccentText()}`} /> Conocimientos Adquiridos
                    </h3>
                    <p className={`text-xs ${getMutedTextColor()} leading-relaxed whitespace-pre-line pl-5`}>
                      {reflection.conocimientos}
                    </p>
                  </div>

                  <div className={`space-y-1.5 pt-3 border-t ${getSeparatorColor()}`}>
                    <h3 className={`text-xs font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} flex items-center gap-1.5`}>
                      <ChevronRight className={`w-4 h-4 ${getAccentText()}`} /> Dificultades Enfrentadas y Superación
                    </h3>
                    <p className={`text-xs ${getMutedTextColor()} leading-relaxed whitespace-pre-line pl-5`}>
                      <strong className={isNatural ? "text-[#3A3830]" : "text-slate-800"}>Desafíos:</strong> {reflection.dificultades}
                      <br />
                      <strong className={`mt-1.5 block ${isNatural ? "text-[#3A3830]" : "text-slate-800"}`}>Solución y Superación:</strong> {reflection.superacion}
                    </p>
                  </div>

                  <div className={`space-y-1.5 pt-3 border-t ${getSeparatorColor()}`}>
                    <h3 className={`text-xs font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} flex items-center gap-1.5`}>
                      <ChevronRight className={`w-4 h-4 ${getAccentText()}`} /> Impacto y Proyección de Futuro
                    </h3>
                    <p className={`text-xs ${getMutedTextColor()} leading-relaxed whitespace-pre-line pl-5`}>
                      {reflection.impacto}
                    </p>
                  </div>

                  <div className={`space-y-1.5 pt-3 border-t ${getSeparatorColor()}`}>
                    <h3 className={`text-xs font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} flex items-center gap-1.5`}>
                      <ChevronRight className={`w-4 h-4 ${getAccentText()}`} /> Metas de Aprendizaje Continuo
                    </h3>
                    <p className={`text-xs ${getMutedTextColor()} leading-relaxed whitespace-pre-line pl-5`}>
                      {reflection.metas}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTACTO */}
          {activeTab === "contacto" && (
            <div className="space-y-6">
              <div className={`${getCardBg()} border ${getCardBorder()} ${getCardRounding()} p-8 shadow-xs max-w-md mx-auto text-center space-y-6`}>
                <div className={`w-12 h-12 rounded-full ${getAccentBg()} ${isNatural ? "text-[#FDFCFB]" : "text-white"} flex items-center justify-center mx-auto shadow-md`}>
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className={`text-md font-bold ${isNatural ? "text-[#2C2B24] font-serif" : "text-slate-800"}`}>{student.nombre}</h2>
                  <p className={`text-xs ${getMutedTextColor()}`}>Portafolio Académico Digital</p>
                </div>

                <div className="space-y-3.5 text-xs text-left max-w-xs mx-auto">
                  {contact.correo && (
                    <div className={`flex items-center gap-2.5 ${getMutedTextColor()}`}>
                      <Mail className={`w-4 h-4 ${isNatural ? "text-[#5A5A40]" : "text-slate-400"}`} />
                      <span className="truncate">{contact.correo}</span>
                    </div>
                  )}

                  {contact.linkedin && (
                    <div className={`flex items-center gap-2.5 ${getMutedTextColor()}`}>
                      <Linkedin className={`w-4 h-4 ${isNatural ? "text-[#5A5A40]" : "text-slate-400"}`} />
                      <span className="truncate">{contact.linkedin}</span>
                    </div>
                  )}

                  {contact.telefono && (
                    <div className={`flex items-center gap-2.5 ${getMutedTextColor()}`}>
                      <Phone className={`w-4 h-4 ${isNatural ? "text-[#5A5A40]" : "text-slate-400"}`} />
                      <span>{contact.telefono}</span>
                    </div>
                  )}
                </div>

                <div className={`text-4xs ${getLabelColor()} border-t ${getSeparatorColor()} pt-4`}>
                  Elaborado por un estudiante universitario en primera persona para Google Sites.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Footer */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-4 text-5xs flex justify-between items-center select-none border-t border-slate-850 shrink-0">
        <div>
          © {new Date().getFullYear()} {student.nombre || "Estudiante"}. Todos los derechos reservados.
        </div>
        <div className="flex gap-2">
          <span>Creado para {student.universidad || "UAPA"}</span>
          <span>•</span>
          <span>Google Sites Ready</span>
        </div>
      </footer>
    </div>
  );
}
