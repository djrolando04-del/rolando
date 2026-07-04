import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  StudentInfo,
  PresentationInfo,
  LearningProcessInfo,
  SkillItem,
  EvidenceItem,
  FinalReflectionInfo,
  ContactInfo,
  SiteTheme,
  ChecklistItem,
} from "./types";
import {
  defaultStudentInfo,
  defaultPresentationInfo,
  defaultLearningProcessInfo,
  defaultSkillItems,
  defaultEvidenceItems,
  defaultFinalReflection,
  defaultContactInfo,
  defaultThemes,
  defaultChecklist,
} from "./data";

import ThemeSelector from "./components/ThemeSelector";
import AIAssistant from "./components/AIAssistant";
import ChecklistProgress from "./components/ChecklistProgress";
import ExportPanel from "./components/ExportPanel";
import PortfolioPreview from "./components/PortfolioPreview";
import DriveExplorerModal from "./components/DriveExplorerModal";
import { GoogleDriveFile } from "./lib/googleDrive";

import {
  GraduationCap,
  Sparkles,
  User,
  BookOpen,
  Award,
  FileText,
  Clock,
  Phone,
  Settings,
  Plus,
  Trash2,
  Check,
  Eye,
  PenTool,
  Upload,
  Cloud,
} from "lucide-react";

export default function App() {
  // State variables for all portfolio sections
  const [student, setStudent] = useState<StudentInfo>(defaultStudentInfo);
  const [presentation, setPresentation] = useState<PresentationInfo>(defaultPresentationInfo);
  const [learningProcess, setLearningProcess] = useState<LearningProcessInfo>(defaultLearningProcessInfo);
  const [skills, setSkills] = useState<SkillItem[]>(defaultSkillItems);
  const [evidences, setEvidences] = useState<EvidenceItem[]>(defaultEvidenceItems);
  const [reflection, setReflection] = useState<FinalReflectionInfo>(defaultFinalReflection);
  const [contact, setContact] = useState<ContactInfo>(defaultContactInfo);

  const [theme, setTheme] = useState<SiteTheme>(defaultThemes[0]);
  const [bannerStyle, setBannerStyle] = useState<"grande" | "estandar" | "solo-titulo">(defaultThemes[0].bannerStyle);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist);

  // Google Drive integration states
  const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);
  const [activeEvidenceIdForDrive, setActiveEvidenceIdForDrive] = useState<string | null>(null);

  // Navigation and focus states for the creator panel
  const [activeEditorTab, setActiveEditorTab] = useState<string>("inicio");
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">("split");
  
  // AI assistant target text helper
  const [aiTargetField, setAiTargetField] = useState<{
    section: string;
    field: string;
    value: string;
    setter: (val: string) => void;
  }>({
    section: "Inicio: Bienvenida",
    field: "bienvenida",
    value: student.bienvenida,
    setter: (val: string) => setStudent((prev) => ({ ...prev, bienvenida: val })),
  });

  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completado: !item.completado } : item))
    );
  };

  // Automated trigger to sync fields to the AI assistant
  const selectFieldForAI = (
    sectionName: string,
    fieldName: string,
    currentValue: string,
    setterFn: (val: string) => void
  ) => {
    setAiTargetField({
      section: sectionName,
      field: fieldName,
      value: currentValue,
      setter: setterFn,
    });
  };

  // Add a new evidence slot
  const handleAddEvidence = () => {
    const newId = `e_${Date.now()}`;
    const newEvidence: EvidenceItem = {
      id: newId,
      tipo: "tarea",
      titulo: `Nueva Evidencia: Actividad ${evidences.length + 1}`,
      representa: "Un informe detallado que elaboré para la unidad...",
      aprendido: "Durante el desarrollo de este trabajo comprendí...",
      competencias: "Habilidades técnicas, pensamiento crítico y gestión de datos.",
      importancia: "Esta actividad me permitió consolidar los conocimientos teóricos sobre...",
      imagenSimulada: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
      archivoNombre: `Evidencia_${evidences.length + 1}_CarlosAlmanzar.pdf`,
    };
    setEvidences((prev) => [...prev, newEvidence]);
  };

  // Delete an evidence slot
  const handleDeleteEvidence = (id: string) => {
    if (evidences.length <= 1) {
      alert("Debes mantener al menos una evidencia académica en tu portafolio.");
      return;
    }
    setEvidences((prev) => prev.filter((ev) => ev.id !== id));
  };

  // Simulate file selection for evidence
  const handleSimulateUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEvidences((prev) =>
        prev.map((ev) =>
          ev.id === id
            ? {
                ...ev,
                archivoNombre: file.name,
                titulo: ev.titulo.startsWith("Nueva Evidencia") ? `Tarea: ${file.name.replace(/\.[^/.]+$/, "")}` : ev.titulo,
              }
            : ev
        )
      );
    }
  };

  // Select a real file from Google Drive explorer
  const handleSelectDriveFile = (file: GoogleDriveFile) => {
    if (activeEvidenceIdForDrive) {
      setEvidences((prev) =>
        prev.map((ev) =>
          ev.id === activeEvidenceIdForDrive
            ? {
                ...ev,
                archivoNombre: file.name,
                titulo: ev.titulo.startsWith("Nueva Evidencia") ? file.name.replace(/\.[^/.]+$/, "") : ev.titulo,
              }
            : ev
        )
      );
    }
    setIsDriveModalOpen(false);
    setActiveEvidenceIdForDrive(null);
  };

  const isNatural = theme.id === "natural-tones";

  return (
    <div className={`min-h-screen ${isNatural ? "bg-[#FDFCFB]" : "bg-slate-50"} flex flex-col ${isNatural ? "text-[#3A3830] font-serif" : "text-slate-850 font-sans"} antialiased selection:bg-amber-100 selection:text-amber-900`}>
      
      {/* HEADER BAR */}
      <header className={`bg-white ${isNatural ? "border-b border-[#E5E0D0]" : "border-b border-slate-200"} sticky top-0 z-40 px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 ${isNatural ? "bg-[#5A5A40]" : "bg-blue-600"} text-white rounded-xl shadow-md`}>
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className={`font-extrabold ${isNatural ? "text-[#2C2B24] font-serif" : "text-slate-900"} text-base md:text-lg tracking-tight flex items-center gap-1.5`}>
              Portafolio Académico Digital <span className={`text-2xs font-bold px-2 py-0.5 ${isNatural ? "bg-[#F5F2EA] text-[#5A5A40]" : "bg-blue-50 text-blue-700"} rounded-md`}>UAPA / Sites Ready</span>
            </h1>
            <p className={`text-xs ${isNatural ? "text-[#6A6658]" : "text-slate-500"}`}>
              Crea tu portafolio en primera persona y expórtalo directamente a Google Sites.
            </p>
          </div>
        </div>

        {/* View togglers for responsive layout */}
        <div className={`flex ${isNatural ? "bg-[#F5F2EA] border-[#E5E0D0]" : "bg-slate-100 border-slate-200"} p-1 rounded-lg shrink-0 border`}>
          <button
            onClick={() => setViewMode("split")}
            className={`hidden md:flex items-center gap-1 text-2xs font-semibold py-1.5 px-3 rounded-md transition-all cursor-pointer ${
              viewMode === "split" ? "bg-white text-slate-800 shadow-xs" : `${isNatural ? "text-[#7A7668] hover:text-[#3A3830]" : "text-slate-500 hover:text-slate-800"}`
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> Split
          </button>
          <button
            onClick={() => setViewMode("editor")}
            className={`flex items-center gap-1 text-2xs font-semibold py-1.5 px-3 rounded-md transition-all cursor-pointer ${
              viewMode === "editor" ? "bg-white text-slate-800 shadow-xs" : `${isNatural ? "text-[#7A7668] hover:text-[#3A3830]" : "text-slate-500 hover:text-slate-800"}`
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> Editor
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1 text-2xs font-semibold py-1.5 px-3 rounded-md transition-all cursor-pointer ${
              viewMode === "preview" ? "bg-white text-slate-800 shadow-xs" : `${isNatural ? "text-[#7A7668] hover:text-[#3A3830]" : "text-slate-500 hover:text-slate-800"}`
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Vista Previa
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE PANEL */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-76px)]">
        
        {/* LEFT COMPANION: EDITOR (COVERS lg:grid-cols-6 OR full depending on viewMode) */}
        <section
          className={`lg:col-span-6 xl:col-span-7 ${isNatural ? "bg-[#FDFCFB] border-[#E5E0D0]" : "bg-slate-100 border-slate-200"} border-r overflow-y-auto p-5 md:p-6 space-y-6 ${
            viewMode === "preview" ? "hidden" : "block"
          } ${viewMode === "editor" ? "lg:col-span-12 xl:col-span-12" : ""}`}
        >
          {/* EDITOR NAVIGATION TABBAR */}
          <div className={`flex gap-1 overflow-x-auto pb-2 scrollbar-thin border-b ${isNatural ? "border-[#E5E0D0]" : "border-slate-200"}`}>
            {[
              { id: "inicio", label: "Portada & Inicio", icon: GraduationCap },
              { id: "presentacion", label: "Biografía", icon: User },
              { id: "proceso", label: "Proceso", icon: BookOpen },
              { id: "competencias", label: "Habilidades", icon: Award },
              { id: "evidencias", label: "Evidencias", icon: FileText },
              { id: "reflexion", label: "Reflexión Final", icon: Clock },
              { id: "contacto", label: "Contacto", icon: Phone },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeEditorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveEditorTab(tab.id)}
                  className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? `${isNatural ? "bg-[#5A5A40] text-white" : "bg-blue-600 text-white"} shadow-xs`
                      : `${isNatural ? "bg-white text-[#6A6658] hover:text-[#3A3830] border border-[#E5E0D0]" : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* CENTRAL MAIN COLUMN: COMPONENT EDITORS (xl:col-span-2) */}
            <div className="xl:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEditorTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5"
                >
                  
                  {/* TAB FORM: PORTADA & INICIO */}
                  {activeEditorTab === "inicio" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h2 className="text-sm font-extrabold text-slate-800">Portada del Portafolio & Bienvenida</h2>
                        <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Inicio</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Título del Portafolio</label>
                          <input
                            type="text"
                            value={student.titulo}
                            onChange={(e) => setStudent({ ...student, titulo: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Nombre Completo</label>
                          <input
                            type="text"
                            value={student.nombre}
                            onChange={(e) => setStudent({ ...student, nombre: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Matrícula</label>
                          <input
                            type="text"
                            value={student.matricula}
                            onChange={(e) => setStudent({ ...student, matricula: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Carrera</label>
                          <input
                            type="text"
                            value={student.carrera}
                            onChange={(e) => setStudent({ ...student, carrera: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Asignatura</label>
                          <input
                            type="text"
                            value={student.asignatura}
                            onChange={(e) => setStudent({ ...student, asignatura: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Facilitador(a)</label>
                          <input
                            type="text"
                            value={student.facilitador}
                            onChange={(e) => setStudent({ ...student, facilitador: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Universidad</label>
                          <input
                            type="text"
                            value={student.universidad}
                            onChange={(e) => setStudent({ ...student, universidad: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Fecha</label>
                          <input
                            type="text"
                            value={student.fecha}
                            onChange={(e) => setStudent({ ...student, fecha: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="block text-2xs font-bold text-slate-500">Bienvenida del Portafolio (Propósito)</label>
                          <button
                            onClick={() => selectFieldForAI("Inicio: Bienvenida", "bienvenida", student.bienvenida, (val) => setStudent(prev => ({ ...prev, bienvenida: val })))}
                            className="text-4xs text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                          >
                            <Sparkles className="w-3 h-3" /> Configurar para IA
                          </button>
                        </div>
                        <textarea
                          value={student.bienvenida}
                          onChange={(e) => setStudent({ ...student, bienvenida: e.target.value })}
                          className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs leading-relaxed h-32"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-2xs font-bold text-slate-500">Sugerencia de Imagen de Portada</label>
                        <input
                          type="text"
                          value={student.sugerenciaPortada}
                          onChange={(e) => setStudent({ ...student, sugerenciaPortada: e.target.value })}
                          className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB FORM: PRESENTACIÓN PERSONAL (BIOGRAFÍA) */}
                  {activeEditorTab === "presentacion" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h2 className="text-sm font-extrabold text-slate-800">Presentación Personal & Perfil</h2>
                        <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Biografía</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <label className="block text-2xs font-bold text-slate-500">URL de tu Foto Profesional (Simulada)</label>
                          <input
                            type="text"
                            value={presentation.imagenUrl}
                            onChange={(e) => setPresentation({ ...presentation, imagenUrl: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-2xs font-bold text-slate-500">Frase Inspiradora Final</label>
                          <input
                            type="text"
                            value={presentation.fraseInspiradora}
                            onChange={(e) => setPresentation({ ...presentation, fraseInspiradora: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 italic"
                          />
                        </div>
                      </div>

                      {[
                        { label: "Biografía Personal", field: "biografia" },
                        { label: "Intereses Académicos y Técnicos", field: "intereses" },
                        { label: "Tus Fortalezas", field: "fortalezas" },
                        { label: "Objetivos Profesionales", field: "objetivos" },
                        { label: "Valores Éticos", field: "valores" },
                        { label: "Motivación de Carrera", field: "motivacion" },
                      ].map((item) => (
                        <div key={item.field} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="block text-2xs font-bold text-slate-500">{item.label}</label>
                            <button
                              onClick={() => selectFieldForAI(`Biografía: ${item.label}`, item.field, (presentation as any)[item.field], (val) => setPresentation(prev => ({ ...prev, [item.field]: val })))}
                              className="text-4xs text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                            >
                              <Sparkles className="w-3 h-3" /> Configurar para IA
                            </button>
                          </div>
                          <textarea
                            value={(presentation as any)[item.field]}
                            onChange={(e) => setPresentation({ ...presentation, [item.field]: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs leading-relaxed h-20"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB FORM: PROCESO DE APRENDIZAJE */}
                  {activeEditorTab === "proceso" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h2 className="text-sm font-extrabold text-slate-800">Proceso de Aprendizaje & Preguntas Metodológicas</h2>
                        <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Reflexión</span>
                      </div>

                      {[
                        { label: "¿Cuál fue la actividad más interesante o importante del ciclo?", field: "actividadInteresante" },
                        { label: "¿Por qué elegiste esta actividad?", field: "porQue" },
                        { label: "¿Qué aprendizaje significativo obtuviste de ella?", field: "aprendizajeSignificativo" },
                        { label: "¿Qué importancia tiene esta asignatura para tu formación profesional?", field: "importanciaProfesional" },
                        { label: "¿Cómo te sientes respecto al proceso vivido?", field: "sentirProceso" },
                        { label: "Conclusión general sobre tu proceso de aprendizaje", field: "conclusion" },
                      ].map((item) => (
                        <div key={item.field} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="block text-2xs font-bold text-slate-700 leading-snug">{item.label}</label>
                            <button
                              onClick={() => selectFieldForAI(`Proceso: ${item.label.substring(0, 30)}...`, item.field, (learningProcess as any)[item.field], (val) => setLearningProcess(prev => ({ ...prev, [item.field]: val })))}
                              className="text-4xs text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                            >
                              <Sparkles className="w-3 h-3" /> Configurar para IA
                            </button>
                          </div>
                          <textarea
                            value={(learningProcess as any)[item.field]}
                            onChange={(e) => setLearningProcess({ ...learningProcess, [item.field]: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs leading-relaxed h-20"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB FORM: HABILIDADES Y COMPETENCIAS */}
                  {activeEditorTab === "competencias" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h2 className="text-sm font-extrabold text-slate-800">Habilidades desarrolladas (Matriz)</h2>
                        <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Matriz</span>
                      </div>

                      <p className="text-2xs text-slate-500 leading-relaxed">
                        Completa cada una de las 10 habilidades exigidas. Puedes personalizar cómo la desarrollaste, un ejemplo concreto y su importancia en tu vida laboral.
                      </p>

                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                        {skills.map((s, idx) => (
                          <div key={s.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs relative">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-blue-600">
                                {idx + 1}. {s.habilidad}
                              </span>
                              <button
                                onClick={() => selectFieldForAI(`Habilidad: ${s.habilidad}`, "desarrollo", s.desarrollo, (val) => {
                                  setSkills((prev) =>
                                    prev.map((item) => (item.id === s.id ? { ...item, desarrollo: val } : item))
                                  );
                                })}
                                className="text-4xs text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                              >
                                <Sparkles className="w-3 h-3" /> Configurar para IA
                              </button>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">¿Cómo la desarrollé?</label>
                                <input
                                  type="text"
                                  value={s.desarrollo}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSkills((prev) =>
                                      prev.map((item) => (item.id === s.id ? { ...item, desarrollo: val } : item))
                                    );
                                  }}
                                  className="w-full p-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Ejemplo de aplicación</label>
                                <input
                                  type="text"
                                  value={s.ejemplo}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSkills((prev) =>
                                      prev.map((item) => (item.id === s.id ? { ...item, ejemplo: val } : item))
                                    );
                                  }}
                                  className="w-full p-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Importancia profesional</label>
                                <input
                                  type="text"
                                  value={s.importancia}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSkills((prev) =>
                                      prev.map((item) => (item.id === s.id ? { ...item, importancia: val } : item))
                                    );
                                  }}
                                  className="w-full p-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB FORM: GALERÍA DE EVIDENCIAS */}
                  {activeEditorTab === "evidencias" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-sm font-extrabold text-slate-800">Galería de Evidencias</h2>
                          <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Archivos</span>
                        </div>
                        <button
                          onClick={handleAddEvidence}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xs py-1 px-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Añadir Evidencia
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                        {evidences.map((ev, idx) => (
                          <div key={ev.id} className="border border-slate-200 bg-slate-50 rounded-xl p-4 space-y-3 relative text-xs">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-slate-700 uppercase tracking-wider text-2xs">
                                Evidencia #{idx + 1}
                              </span>
                              <button
                                onClick={() => handleDeleteEvidence(ev.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-colors cursor-pointer"
                                title="Eliminar evidencia"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tipo de Evidencia</label>
                                <select
                                  value={ev.tipo}
                                  onChange={(e) => {
                                    const val = e.target.value as any;
                                    setEvidences((prev) =>
                                      prev.map((item) => (item.id === ev.id ? { ...item, tipo: val } : item))
                                    );
                                  }}
                                  className="w-full p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs"
                                >
                                  <option value="tarea">Tarea / Trabajo Escrito</option>
                                  <option value="foro">Participación en Foro</option>
                                  <option value="calificacion">Calificaciones / Notas</option>
                                  <option value="evaluacion">Evaluación / Examen</option>
                                  <option value="trabajo">Trabajo Final</option>
                                  <option value="presentacion">Presentación / Diapositivas</option>
                                  <option value="actividad">Actividad de Aprendizaje</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Título del Entregable</label>
                                <input
                                  type="text"
                                  value={ev.titulo}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEvidences((prev) =>
                                      prev.map((item) => (item.id === ev.id ? { ...item, titulo: val } : item))
                                    );
                                  }}
                                  className="w-full p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs font-semibold"
                                />
                              </div>

                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Imagen o Captura de Pantalla (URL)</label>
                                <input
                                  type="text"
                                  value={ev.imagenSimulada}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEvidences((prev) =>
                                      prev.map((item) => (item.id === ev.id ? { ...item, imagenSimulada: val } : item))
                                    );
                                  }}
                                  className="w-full p-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs"
                                />
                              </div>

                              <div>
                                <label className="block text-4xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Soporte / Evidencia (Subir Local o Google Drive)</label>
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex gap-2">
                                    <label className="flex-1 flex items-center justify-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 border-dashed rounded-md py-1.5 text-3xs font-semibold text-slate-600 cursor-pointer">
                                      <Upload className="w-3.5 h-3.5 text-slate-400" />
                                      {ev.archivoNombre ? "Cambiar Local" : "Subir Local"}
                                      <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        onChange={(e) => handleSimulateUpload(ev.id, e)}
                                      />
                                    </label>
                                    
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveEvidenceIdForDrive(ev.id);
                                        setIsDriveModalOpen(true);
                                      }}
                                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md py-1.5 text-3xs font-bold text-blue-700 cursor-pointer transition-colors"
                                    >
                                      <Cloud className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                      Google Drive
                                    </button>
                                  </div>
                                  
                                  {ev.archivoNombre && (
                                    <div className="p-1.5 bg-blue-50 border border-blue-100 rounded-md text-3xs text-blue-700 font-mono flex items-center justify-between">
                                      <span className="truncate max-w-[180px]">{ev.archivoNombre}</span>
                                      <span className="text-4xs uppercase bg-blue-100 text-blue-800 font-extrabold px-1 py-0.5 rounded-sm scale-90 shrink-0">Vinculado</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {[
                                { key: "representa", label: "¿Qué representa esta evidencia?" },
                                { key: "aprendido", label: "¿Qué aprendiste de ella?" },
                                { key: "competencias", label: "¿Qué competencias o habilidades desarrollaste?" },
                                { key: "importancia", label: "¿Por qué fue una actividad indispensable?" },
                              ].map((sub) => (
                                <div key={sub.key} className="space-y-0.5">
                                  <div className="flex justify-between items-center">
                                    <label className="block text-4xs font-bold text-slate-500">{sub.label}</label>
                                    <button
                                      onClick={() => selectFieldForAI(`Evidencia: ${sub.label}`, sub.key, (ev as any)[sub.key], (val) => {
                                        setEvidences((prev) =>
                                          prev.map((item) => (item.id === ev.id ? { ...item, [sub.key]: val } : item))
                                        );
                                      })}
                                      className="text-4xs text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                                    >
                                      <Sparkles className="w-2.5 h-2.5" /> IA
                                    </button>
                                  </div>
                                  <textarea
                                    value={(ev as any)[sub.key]}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEvidences((prev) =>
                                        prev.map((item) => (item.id === ev.id ? { ...item, [sub.key]: val } : item))
                                      );
                                    }}
                                    className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-blue-500 h-14"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB FORM: REFLEXIÓN FINAL */}
                  {activeEditorTab === "reflexion" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h2 className="text-sm font-extrabold text-slate-800">Reflexión Final del Portafolio</h2>
                        <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Reflexión</span>
                      </div>

                      {[
                        { label: "¿Cómo evolucionó mi aprendizaje a lo largo de la asignatura?", field: "evolucion" },
                        { label: "¿Qué nuevos conocimientos teóricos y prácticos adquirí?", field: "conocimientos" },
                        { label: "¿Qué dificultades enfrenté durante el ciclo?", field: "dificultades" },
                        { label: "¿Cómo logré superar esas dificultades técnicas o metodológicas?", field: "superacion" },
                        { label: "¿Qué impacto directo tendrá esta asignatura en mi vida como profesional?", field: "impacto" },
                        { label: "¿Qué metas académicas o de aprendizaje continuo tengo para el futuro?", field: "metas" },
                      ].map((item) => (
                        <div key={item.field} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="block text-2xs font-bold text-slate-500">{item.label}</label>
                            <button
                              onClick={() => selectFieldForAI(`Reflexión Final: ${item.label.substring(0, 30)}...`, item.field, (reflection as any)[item.field], (val) => setReflection(prev => ({ ...prev, [item.field]: val })))}
                              className="text-4xs text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                            >
                              <Sparkles className="w-3 h-3" /> Configurar para IA
                            </button>
                          </div>
                          <textarea
                            value={(reflection as any)[item.field]}
                            onChange={(e) => setReflection({ ...reflection, [item.field]: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-xs leading-relaxed h-24"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB FORM: CONTACTO */}
                  {activeEditorTab === "contacto" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h2 className="text-sm font-extrabold text-slate-800">Sección de Contacto</h2>
                        <span className="text-3xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">Contacto</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Correo Electrónico</label>
                          <input
                            type="email"
                            value={contact.correo}
                            onChange={(e) => setContact({ ...contact, correo: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Perfil de LinkedIn (URL o Nombre de usuario)</label>
                          <input
                            type="text"
                            value={contact.linkedin}
                            onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-2xs font-bold text-slate-500 mb-1">Teléfono o WhatsApp</label>
                          <input
                            type="text"
                            value={contact.telefono}
                            onChange={(e) => setContact({ ...contact, telefono: e.target.value })}
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

              {/* INTEGRATED EXPORT PANEL AT THE BOTTOM OF EDITOR */}
              <ExportPanel
                student={student}
                presentation={presentation}
                learningProcess={learningProcess}
                skills={skills}
                evidences={evidences}
                reflection={reflection}
                contact={contact}
                theme={theme}
                checklist={checklist}
              />
            </div>

            {/* RIGHT CONTEXTUAL TOOLS: ASSISTANT, DESIGN PALETTE, CHECKLIST (xl:col-span-1) */}
            <div className="space-y-6">
              
              {/* INTERACTIVE COMPILATION CHECKLIST */}
              <ChecklistProgress items={checklist} onToggleItem={handleToggleChecklist} />

              {/* DYNAMIC GEMINI SIDE CO-PILOT */}
              <AIAssistant
                section={aiTargetField.section}
                subject={student.asignatura}
                studentProfile={`${student.carrera}. Intereses: ${presentation.intereses}`}
                currentContent={aiTargetField.value}
                onApplyText={(text) => {
                  aiTargetField.setter(text);
                  // Update current state for co-pilot to match the newly changed value
                  setAiTargetField((prev) => ({ ...prev, value: text }));
                }}
              />

              {/* GOOGLE SITE THEME SELECTION RECOMMENDATIONS */}
              <ThemeSelector
                currentTheme={theme}
                onSelectTheme={setTheme}
                bannerStyle={bannerStyle}
                onChangeBannerStyle={setBannerStyle}
              />

            </div>
          </div>
        </section>

        {/* RIGHT PREVIEW CANVAS: PREVIEW OF SITES PORTFOLIO (COVERS lg:grid-cols-6 OR full depending on viewMode) */}
        <section
          className={`lg:col-span-6 xl:col-span-5 ${
            theme.id === "natural-tones" ? "bg-[#E5E0D0]" : "bg-slate-200"
          } p-4 overflow-hidden h-full flex flex-col ${
            viewMode === "editor" ? "hidden" : "block"
          } ${viewMode === "preview" ? "lg:col-span-12 xl:col-span-12" : ""}`}
        >
          <PortfolioPreview
            student={student}
            presentation={presentation}
            learningProcess={learningProcess}
            skills={skills}
            evidences={evidences}
            reflection={reflection}
            contact={contact}
            theme={theme}
            bannerStyle={bannerStyle}
          />
        </section>

      </main>

      <DriveExplorerModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        onSelectFile={handleSelectDriveFile}
        theme={theme}
      />
    </div>
  );
}
