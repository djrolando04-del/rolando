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
  ChecklistItem,
} from "../types";
import {
  Copy,
  Check,
  FileCode,
  CheckSquare,
  Globe,
  X,
  Loader2,
  Sparkles,
  ExternalLink,
  Users,
  CloudLightning,
  ArrowRight,
  Info,
  Share2,
  Cloud,
  CheckCircle,
} from "lucide-react";
import { googleSignIn, getAccessToken } from "../lib/driveAuth";
import { uploadFileToDrive } from "../lib/googleDrive";

interface ExportPanelProps {
  student: StudentInfo;
  presentation: PresentationInfo;
  learningProcess: LearningProcessInfo;
  skills: SkillItem[];
  evidences: EvidenceItem[];
  reflection: FinalReflectionInfo;
  contact: ContactInfo;
  theme?: SiteTheme;
  checklist: ChecklistItem[];
}

export default function ExportPanel({
  student,
  presentation,
  learningProcess,
  skills,
  evidences,
  reflection,
  contact,
  theme,
  checklist,
}: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Deployment simulation state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deployStep, setDeployStep] = useState<"idle" | "deploying" | "success">("idle");
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Google Drive backup state
  const [driveBackupStatus, setDriveBackupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [driveBackupError, setDriveBackupError] = useState<string | null>(null);
  const [driveBackupLink, setDriveBackupLink] = useState<string | null>(null);

  const isNatural = theme?.id === "natural-tones";

  const getSectionMarkdown = (section: string): string => {
    switch (section) {
      case "inicio":
        return `# PORTADA DE PORTAFOLIO DIGITAL

## ${student.titulo}

**Estudiante:** ${student.nombre || "[Escribe tu nombre completo]"}
**Matrícula:** ${student.matricula || "[Escribe tu matrícula]"}
**Carrera:** ${student.carrera || "[Escribe tu carrera]"}
**Asignatura:** ${student.asignatura || "[Escribe tu asignatura]"}
**Facilitador:** ${student.facilitador || "[Escribe tu facilitador]"}
**Universidad:** ${student.universidad || "[Escribe tu universidad]"}
**Fecha:** ${student.fecha || "[Escribe la fecha]"}

---

# BIENVENIDA

${student.bienvenida || "[Escribe un texto de bienvenida]"}

*Nota para Google Sites: Se recomienda insertar una imagen de portada o banner de estilo: ${student.sugerenciaPortada}*
`;

      case "presentacion":
        return `# PRESENTACIÓN PERSONAL

## Biografía
${presentation.biografia || "[Tu biografía aquí]"}

## Mis Intereses
${presentation.intereses || "[Tus intereses aquí]"}

## Mis Fortalezas
${presentation.fortalezas || "[Tus fortalezas aquí]"}

## Objetivos Profesionales
${presentation.objetivos || "[Tus objetivos aquí]"}

## Valores y Ética
${presentation.valores || "[Tus valores aquí]"}

## Motivación para estudiar la Carrera
${presentation.motivacion || "[Tu motivación aquí]"}

---

[ESPACIO PARA INSERTAR FOTOGRAFÍA PROFESIONAL DE PERFIL]

> **Frase Inspiradora:**
> "${presentation.fraseInspiradora || "Sigue buscando lo que te apasiona."}"
`;

      case "proceso":
        return `# PROCESO DE APRENDIZAJE

## ¿Cuál fue la actividad más interesante o importante?
${learningProcess.actividadInteresante || "[Tu respuesta aquí]"}

## ¿Por qué?
${learningProcess.porQue || "[Tu respuesta aquí]"}

## ¿Qué aprendizaje significativo obtuve de ella?
${learningProcess.aprendizajeSignificativo || "[Tu respuesta aquí]"}

## ¿Qué importancia tiene esta asignatura para mi formación profesional?
${learningProcess.importanciaProfesional || "[Tu respuesta aquí]"}

## ¿Cómo me siento respecto al proceso vivido?
${learningProcess.sentirProceso || "[Tu respuesta aquí]"}

---

## Conclusión del Proceso de Aprendizaje
${learningProcess.conclusion || "[Tu conclusión aquí]"}
`;

      case "competencias":
        let skillsTable = `# HABILIDADES Y COMPETENCIAS DESARROLLADAS\n\n`;
        skillsTable += `| Habilidad | Cómo la desarrollé | Ejemplo de aplicación | Importancia profesional |\n`;
        skillsTable += `| :--- | :--- | :--- | :--- |\n`;
        skills.forEach((s) => {
          skillsTable += `| **${s.habilidad}** | ${s.desarrollo} | ${s.ejemplo} | ${s.importancia} |\n`;
        });
        return skillsTable;

      case "evidencias":
        let evidenceText = `# GALERÍA DE EVIDENCIAS ACADÉMICAS\n\n`;
        evidences.forEach((ev, idx) => {
          evidenceText += `## Evidencia ${idx + 1}: ${ev.titulo}\n`;
          evidenceText += `* **Tipo de Evidencia:** ${ev.tipo.toUpperCase()}\n`;
          if (ev.archivoNombre) {
            evidenceText += `* **Archivo Adjunto:** ${ev.archivoNombre}\n`;
          }
          evidenceText += `\n[INSERTAR AQUÍ CAPTURA DE PANTALLA O ENLACE A DOCUMENTO DE LA EVIDENCIA]\n\n`;
          evidenceText += `### Descripción y Análisis Crítico:\n`;
          evidenceText += `- **¿Qué representa esta evidencia?** ${ev.representa}\n`;
          evidenceText += `- **¿Qué aprendí al realizarla?** ${ev.aprendido}\n`;
          evidenceText += `- **¿Qué competencias profesionales desarrollé?** ${ev.competencias}\n`;
          evidenceText += `- **¿Por qué fue importante e imprescindible esta actividad?** ${ev.importancia}\n\n`;
          evidenceText += `---\n\n`;
        });
        return evidenceText;

      case "reflexion":
        return `# REFLEXIÓN FINAL

## ¿Cómo evolucionó mi aprendizaje a lo largo de la asignatura?
${reflection.evolucion || "[Tu reflexión aquí]"}

## ¿Qué nuevos conocimientos teóricos y prácticos adquirí?
${reflection.conocimientos || "[Tus conocimientos aquí]"}

## ¿Qué dificultades enfrenté durante el ciclo?
${reflection.dificultades || "[Tus dificultades aquí]"}

## ¿Cómo logré superar esas dificultades técnicas o metodológicas?
${reflection.superacion || "[Tus soluciones aquí]"}

## ¿Qué impacto directo tendrá esta asignatura en mi vida como profesional?
${reflection.impacto || "[El impacto aquí]"}

## ¿Qué metas académicas o de aprendizaje continuo tengo para el futuro?
${reflection.metas || "[Tus metas aquí]"}
`;

      case "contacto":
        return `# INFORMACIÓN DE CONTACTO

Siente libre de contactarme o revisar mi perfil profesional para colaboraciones académicas o laborales:

- **Correo Electrónico:** ${contact.correo || "[Tu correo]"}
- **Perfil de LinkedIn:** ${contact.linkedin || "[Tu LinkedIn]"}
- **Teléfono / WhatsApp:** ${contact.telefono || "[Tu teléfono]"}
`;

      default:
        return "";
    }
  };

  const handleCopy = (section: string) => {
    const text = getSectionMarkdown(section);
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const studentSlug = student.nombre
    ? student.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : "estudiante";
  const matriculaClean = student.matricula
    ? student.matricula.replace(/[^a-zA-Z0-9]/g, "")
    : "matricula";
  const generatedInvitationLink = `https://sites.google.com/uapa.edu.do/portafolio-${matriculaClean || "10001234"}-${studentSlug}/edit?usp=sharing`;

  const list = checklist || [];
  const checkPortada = list.find(item => item.id === "c1" || item.texto.toLowerCase().includes("portada"));
  const checkBiografia = list.find(item => item.id === "c4" || item.texto.toLowerCase().includes("biografía") || item.texto.toLowerCase().includes("biografia"));
  const checkReflexion = list.find(item => item.id === "c11" || item.texto.toLowerCase().includes("reflexión") || item.texto.toLowerCase().includes("reflexion"));

  const isPortadaDone = checkPortada ? checkPortada.completado : true;
  const isBiografiaDone = checkBiografia ? checkBiografia.completado : true;
  const isReflexionDone = checkReflexion ? checkReflexion.completado : true;

  const isPublishEnabled = isPortadaDone && isBiografiaDone && isReflexionDone;

  const pendingSections: string[] = [];
  if (!isPortadaDone) pendingSections.push("Portada (Sección Inicio)");
  if (!isBiografiaDone) pendingSections.push("Biografía (Sección Presentación)");
  if (!isReflexionDone) pendingSections.push("Reflexión Final");

  const deploymentSteps = [
    "Compilando secciones del portafolio (Inicio, Biografía, Proceso)...",
    "Estructurando matriz de competencias y galería de evidencias...",
    "Generando metadatos de estilo optimizados para Google Sites...",
    "Configurando acceso seguro del facilitador en la nube...",
    "Finalizando enlace de invitación a colaboración académica..."
  ];

  const handleStartSimulation = () => {
    setDeployStep("deploying");
    setSimulatedProgress(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < deploymentSteps.length) {
        setSimulatedProgress(step);
      } else {
        clearInterval(interval);
        setDeployStep("success");
      }
    }, 800); // 800ms per step for an interactive but snappy simulation
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedInvitationLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getFullPortfolioMarkdown = (): string => {
    return `# PORTAFOLIO ACADÉMICO DIGITAL - UAPA

=========================================
1. PORTADA DEL PORTAFOLIO & INICIO
=========================================
${getSectionMarkdown("inicio")}

=========================================
2. PRESENTACIÓN PERSONAL & BIOGRAFÍA
=========================================
${getSectionMarkdown("presentacion")}

=========================================
3. PROCESO DE APRENDIZAJE
=========================================
${getSectionMarkdown("proceso")}

=========================================
4. MATRIZ DE COMPETENCIAS Y HABILIDADES
=========================================
${getSectionMarkdown("competencias")}

=========================================
5. GALERÍA DE EVIDENCIAS ACADÉMICAS
=========================================
${getSectionMarkdown("evidencias")}

=========================================
6. REFLEXIÓN FINAL
=========================================
${getSectionMarkdown("reflexion")}

=========================================
7. INFORMACIÓN DE CONTACTO
=========================================
${getSectionMarkdown("contacto")}
`;
  };

  const handleGoogleDriveBackup = async () => {
    setDriveBackupStatus("loading");
    setDriveBackupError(null);
    setDriveBackupLink(null);

    try {
      let token = await getAccessToken();
      if (!token) {
        const result = await googleSignIn();
        if (result) {
          token = result.accessToken;
        }
      }

      if (!token) {
        throw new Error("No se pudo conectar a Google Drive.");
      }

      const content = getFullPortfolioMarkdown();
      const studentSlug = student.nombre
        ? student.nombre
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : "estudiante";
      const filename = `Portafolio_UAPA_${student.matricula || "1000"}_${studentSlug}.txt`;

      const fileData = await uploadFileToDrive(token, filename, content, "text/plain");
      if (fileData && fileData.webViewLink) {
        setDriveBackupLink(fileData.webViewLink);
        setDriveBackupStatus("success");
      } else {
        throw new Error("El archivo se subió pero no se recibió el enlace de visualización.");
      }
    } catch (err: any) {
      console.error(err);
      setDriveBackupError(err.message || "Error al conectar y subir a Google Drive.");
      setDriveBackupStatus("error");
    }
  };

  const tabs = [
    { id: "inicio", label: "Inicio" },
    { id: "presentacion", label: "Presentación" },
    { id: "proceso", label: "Proceso" },
    { id: "competencias", label: "Habilidades" },
    { id: "evidencias", label: "Galería Evidencias" },
    { id: "reflexion", label: "Reflexión Final" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className={`${isNatural ? "bg-[#F5F2EA]/40 border-[#E5E0D0]" : "bg-white border border-slate-200"} rounded-xl p-5 shadow-sm space-y-4`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b ${isNatural ? "border-[#E5E0D0]" : "border-slate-100"} pb-3 gap-3`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 ${isNatural ? "bg-[#5A5A40]/10 text-[#5A5A40]" : "bg-indigo-50 text-indigo-600"} rounded-lg`}>
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`font-bold ${isNatural ? "text-[#2C2B24] font-serif" : "text-slate-800"} text-sm`}>Exportador de Contenido</h3>
            <p className={`text-xs ${isNatural ? "text-[#6A6658]" : "text-slate-500"}`}>Copia y pega directamente en los bloques de texto de tu Google Site.</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-end flex-wrap">
          <button
            onClick={() => handleCopy(activeTab)}
            className={`${isNatural ? "bg-[#5A5A40] hover:bg-[#454530]" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer`}
          >
            {copiedSection === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-300" />
                ¡Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar Sección
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleGoogleDriveBackup}
            disabled={driveBackupStatus === "loading"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            {driveBackupStatus === "loading" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Respaldando...
              </>
            ) : (
              <>
                <Cloud className="w-3.5 h-3.5 text-blue-100" />
                Respaldar en Drive
              </>
            )}
          </button>
          
          <div className="relative group">
            <button
              disabled={!isPublishEnabled}
              onClick={() => {
                setIsModalOpen(true);
                setDeployStep("idle");
                setSimulatedProgress(0);
              }}
              className={`font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                isPublishEnabled
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${isPublishEnabled ? "animate-pulse" : ""}`} />
              Publicar / Desplegar
            </button>
            
            {!isPublishEnabled && (
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2.5 rounded-lg shadow-lg w-56 z-50 space-y-1 border border-slate-700">
                <p className="font-bold text-rose-400">Campos Críticos Requeridos:</p>
                <p className="text-slate-300 leading-snug">
                  Debes marcar como completados en tu lista de cotejo:
                </p>
                <ul className="list-disc list-inside text-rose-300 pl-1">
                  {pendingSections.map((sec, i) => (
                    <li key={i}>{sec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {driveBackupStatus === "success" && driveBackupLink && (
        <div className="text-[11px] p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-start gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5 animate-pulse" />
          <div className="flex-1">
            <p className="font-bold text-xs text-emerald-900">¡Portafolio guardado con éxito en tu Google Drive!</p>
            <p className="opacity-95 mt-0.5 leading-relaxed text-slate-600">
              Se ha creado un archivo de texto con el contenido compilado del portafolio. Puedes acceder a él desde tu cuenta de Google Drive:
            </p>
            <a
              href={driveBackupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-extrabold mt-1 hover:underline"
            >
              Abrir archivo en Google Drive <ExternalLink className="w-3 h-3 text-blue-500" />
            </a>
          </div>
          <button
            onClick={() => setDriveBackupStatus("idle")}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {driveBackupStatus === "error" && driveBackupError && (
        <div className="text-[11px] p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-2 animate-fade-in">
          <X className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-xs text-red-900">Error al respaldar en Google Drive</p>
            <p className="opacity-95 mt-0.5 leading-relaxed text-red-700">{driveBackupError}</p>
          </div>
          <button
            onClick={() => setDriveBackupStatus("idle")}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!isPublishEnabled && (
        <div className={`text-[11px] p-3 rounded-lg flex items-start gap-2 border ${
          isNatural 
            ? "bg-rose-50/20 border-rose-200/50 text-[#8B4F4F]" 
            : "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          <X className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
          <div>
            <span className="font-bold">Publicación de Portafolio Deshabilitada:</span>
            <span className="opacity-95 block mt-0.5 leading-relaxed">
              Por favor, marca como completados los campos críticos en la lista de cotejo para activar el botón de Publicar: <strong>{pendingSections.join(", ")}</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Tabs list inside exporter */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-2xs py-1.5 px-3 rounded-md font-semibold shrink-0 cursor-pointer transition-all ${
                isSelected
                  ? isNatural
                    ? "bg-[#5A5A40] text-white border border-[#5A5A40]"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  : isNatural
                    ? "text-[#6A6658] hover:bg-[#E5E0D0]/40 border border-transparent"
                    : "text-slate-500 hover:bg-slate-50 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto overflow-y-auto max-h-80 font-mono whitespace-pre-wrap select-all">
          {getSectionMarkdown(activeTab)}
        </pre>
        <div className="absolute top-2 right-2 flex gap-1">
          <span className="bg-slate-800 border border-slate-700 text-slate-400 text-3xs px-2 py-0.5 rounded uppercase font-semibold select-none">
            Markdown / APA
          </span>
        </div>
      </div>

      <div className={`${isNatural ? "bg-[#5A5A40]/5 border border-[#5A5A40]/10 text-[#3A3830]" : "bg-amber-50 border border-amber-200 text-amber-800"} rounded-lg p-3.5 flex gap-2 items-start text-xs`}>
        <CheckSquare className={`w-4 h-4 shrink-0 mt-0.5 ${isNatural ? "text-[#5A5A40]" : "text-amber-600"}`} />
        <div>
          <p className="font-bold">¿Cómo insertarlo en Google Sites?</p>
          <p className="opacity-95 leading-relaxed text-2xs mt-0.5">
            1. Abre tu panel en Google Sites.<br />
            2. Haz doble clic en el lienzo para abrir la rueda e inserta un bloque de <strong>"Cuadro de texto"</strong>.<br />
            3. Haz clic en el botón superior <strong>"Copiar Sección"</strong> de esta herramienta y pégalo directamente.<br />
            4. Ajusta el formato de los títulos seleccionándolos y cambiándolos de "Texto normal" a "Título" o "Subtítulo".
          </p>
        </div>
      </div>

      {/* SIMULATED DEPLOYMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div 
            className={`${
              isNatural 
                ? "bg-[#FDFCFB] border border-[#E5E0D0] rounded-[24px] font-serif text-[#3A3830]" 
                : "bg-white border border-slate-100 rounded-2xl font-sans text-slate-800"
            } max-w-xl w-full shadow-2xl p-6 space-y-5 relative animate-in fade-in zoom-in-95 duration-200 my-8`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className={`p-1.5 ${isNatural ? "bg-[#5A5A40]/10 text-[#5A5A40]" : "bg-emerald-50 text-emerald-600"} rounded-lg`}>
                <CloudLightning className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-bold ${isNatural ? "text-[#2C2B24]" : "text-slate-800"} text-base`}>
                  Asistente de Publicación en Google Sites
                </h3>
                <p className={`text-5xs ${isNatural ? "text-[#6A6658]" : "text-slate-400"} uppercase font-bold tracking-wider`}>
                  Simulación de despliegue oficial UAPA
                </p>
              </div>
            </div>

            {/* Modal Body depending on step */}
            {deployStep === "idle" && (
              <div className="space-y-4 text-xs">
                <p className="leading-relaxed">
                  Estás a punto de iniciar la preparación de tu portafolio estructurado. El sistema empaquetará tus datos de portada, biografía, competencias, evidencias y reflexiones, y generará un <strong>enlace oficial de invitación a colaboración</strong>.
                </p>

                <div className={`p-4 rounded-xl border ${isNatural ? "bg-[#F5F2EA]/50 border-[#E5E0D0]" : "bg-slate-50 border-slate-200"} space-y-2`}>
                  <h4 className={`font-bold text-2xs uppercase tracking-wider flex items-center gap-1.5 ${isNatural ? "text-[#5A5A40]" : "text-indigo-700"}`}>
                    <Info className="w-3.5 h-3.5" /> ¿Qué incluye este empaquetado académico?
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-2xs pl-1">
                    <li>Estructuración de <span className="font-semibold">7 Secciones</span> curriculares.</li>
                    <li>Sugerencia temática de Google Sites basada en el estilo seleccionado.</li>
                    <li>Generación del <span className="font-semibold">enlace de colaboración compartida</span> para tu facilitador.</li>
                    <li>Guía paso a paso de publicación rápida en Sites de la UAPA.</li>
                  </ul>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="border border-slate-200 text-slate-600 font-semibold px-4 py-2 rounded-lg text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleStartSimulation}
                    className={`${isNatural ? "bg-[#5A5A40] hover:bg-[#454530]" : "bg-emerald-600 hover:bg-emerald-700"} text-white font-semibold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm`}
                  >
                    Iniciar Despliegue Simulado <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {deployStep === "deploying" && (
              <div className="space-y-5 text-center py-6">
                <div className="flex justify-center">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-800">
                    Procesando Portafolio Académico...
                  </h4>
                  <p className="text-2xs text-slate-500">
                    Por favor espera mientras estructuramos tus datos según la rúbrica oficial.
                  </p>
                </div>

                {/* Animated progress bar */}
                <div className="w-full max-w-xs mx-auto bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300" 
                    style={{ width: `${((simulatedProgress + 1) / deploymentSteps.length) * 100}%` }}
                  />
                </div>

                {/* Steps process listing */}
                <div className="max-w-xs mx-auto text-left text-2xs space-y-1.5 pt-4 border-t border-slate-150">
                  {deploymentSteps.map((stepMsg, idx) => {
                    const isDone = idx < simulatedProgress;
                    const isCurrent = idx === simulatedProgress;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-2 ${
                          isDone ? "text-emerald-600 font-semibold" : isCurrent ? "text-slate-800 font-bold" : "text-slate-400"
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 shrink-0 bg-emerald-100 text-emerald-700 rounded-full p-0.5" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600 shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 bg-slate-100 rounded-full border border-slate-200 shrink-0" />
                        )}
                        <span className="truncate">{stepMsg}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {deployStep === "success" && (
              <div className="space-y-5 text-xs">
                {/* Banner Success */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center p-2.5 bg-emerald-100 rounded-full text-emerald-700 mx-auto shadow-inner">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className={`font-bold text-md text-emerald-700 ${isNatural ? "font-serif" : ""}`}>
                    ¡Despliegue Estructurado Exitosamente!
                  </h4>
                  <p className="text-2xs text-slate-500">
                    Tu contenido está optimizado y listo para ser enlazado en Google Sites.
                  </p>
                </div>

                {/* Dynamic Share / Invitation link */}
                <div className={`p-4 rounded-xl border ${isNatural ? "bg-[#5A5A40]/5 border-[#E5E0D0]" : "bg-slate-50 border-slate-200"} space-y-2.5`}>
                  <div className="flex items-center justify-between">
                    <label className={`text-4xs font-bold uppercase tracking-wider block ${isNatural ? "text-[#5A5A40]" : "text-indigo-600"}`}>
                      Enlace de Invitación de Colaboración Generado
                    </label>
                    <span className="text-4xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                      Colaborativo
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedInvitationLink}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-2xs font-mono text-slate-600 focus:outline-none select-all"
                    />
                    <button
                      onClick={handleCopyLink}
                      className={`${isNatural ? "bg-[#5A5A40] hover:bg-[#454530]" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-semibold px-4 rounded-lg text-2xs shrink-0 flex items-center gap-1 transition-colors cursor-pointer`}
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-300" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-4xs text-slate-500 italic">
                    * Este enlace dinámico simula la invitación compartida con tu facilitador en Google Sites para que pueda editar y evaluar directamente tu progreso.
                  </p>
                </div>

                {/* Step by Step Publish Checklist Guide */}
                <div className="space-y-2">
                  <h4 className={`font-bold text-2xs uppercase tracking-wider ${isNatural ? "text-[#2C2B24]" : "text-slate-700"}`}>
                    Pasos Clave para Publicar en Google Sites Real
                  </h4>
                  
                  <div className="space-y-3.5 pl-1">
                    <div className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-3xs font-bold shrink-0 mt-0.5 ${isNatural ? "bg-[#5A5A40] text-white" : "bg-indigo-600 text-white"}`}>
                        1
                      </div>
                      <div>
                        <p className="font-bold text-2xs text-slate-800">Crea tu Google Site Universitario</p>
                        <p className="text-3xs text-slate-500 leading-relaxed">
                          Ve a <a href="https://sites.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800 inline-flex items-center gap-0.5">Google Sites <ExternalLink className="w-2.5 h-2.5" /></a> con tu cuenta oficial de la UAPA y crea un nuevo sitio web en blanco.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-3xs font-bold shrink-0 mt-0.5 ${isNatural ? "bg-[#5A5A40] text-white" : "bg-indigo-600 text-white"}`}>
                        2
                      </div>
                      <div>
                        <p className="font-bold text-2xs text-slate-800">Invita a tu Facilitador como Colaborador</p>
                        <p className="text-3xs text-slate-500 leading-relaxed">
                          Haz clic en el icono <strong>"Compartir con otros"</strong> (persona con signo +) en la esquina superior de Google Sites y agrega a tu facilitador <strong>{student.facilitador || "[Tu Facilitador]"}</strong> para que pueda ingresar al espacio colaborativo que genera este enlace.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-3xs font-bold shrink-0 mt-0.5 ${isNatural ? "bg-[#5A5A40] text-white" : "bg-indigo-600 text-white"}`}>
                        3
                      </div>
                      <div>
                        <p className="font-bold text-2xs text-slate-800">Copia y Pega tu Contenido Organizado</p>
                        <p className="text-3xs text-slate-500 leading-relaxed">
                          Crea las páginas para cada pestaña (Inicio, Presentación, Proceso, Competencias, Evidencias, Reflexión, Contacto) y usa los botones <strong>"Copiar Sección"</strong> de este Exportador para pegar el texto Markdown o formateado en cada cuadro de texto.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-3xs font-bold shrink-0 mt-0.5 ${isNatural ? "bg-[#5A5A40] text-white" : "bg-indigo-600 text-white"}`}>
                        4
                      </div>
                      <div>
                        <p className="font-bold text-2xs text-slate-800">Publica el Sitio y Comparte el Enlace</p>
                        <p className="text-3xs text-slate-500 leading-relaxed">
                          Haz clic en el botón azul <strong>"Publicar"</strong> arriba a la derecha en Google Sites, asigna la dirección web (ej: <code>uapa-{student.matricula || "10001234"}</code>) y copia la URL pública del sitio para entregarla en tu tarea virtual de la UAPA.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={`${isNatural ? "bg-[#5A5A40] hover:bg-[#454530]" : "bg-slate-800 hover:bg-slate-900"} text-white font-semibold px-5 py-2 rounded-lg text-xs cursor-pointer transition-colors shadow-xs`}
                  >
                    ¡Listo, Entendido!
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

