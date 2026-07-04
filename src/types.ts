export interface StudentInfo {
  titulo: string;
  nombre: string;
  matricula: string;
  carrera: string;
  asignatura: string;
  facilitador: string;
  universidad: string;
  fecha: string;
  bienvenida: string;
  sugerenciaPortada: string;
}

export interface PresentationInfo {
  biografia: string;
  intereses: string;
  fortalezas: string;
  objetivos: string;
  valores: string;
  motivacion: string;
  fraseInspiradora: string;
  imagenUrl: string;
}

export interface LearningProcessInfo {
  actividadInteresante: string;
  porQue: string;
  aprendizajeSignificativo: string;
  importanciaProfesional: string;
  sentirProceso: string;
  conclusion: string;
}

export interface SkillItem {
  id: string;
  habilidad: string;
  desarrollo: string;
  ejemplo: string;
  importancia: string;
}

export interface EvidenceItem {
  id: string;
  tipo: "tarea" | "foro" | "calificacion" | "evaluacion" | "trabajo" | "presentacion" | "actividad";
  titulo: string;
  representa: string;
  aprendido: string;
  competencias: string;
  importancia: string;
  imagenSimulada: string;
  archivoNombre?: string;
}

export interface FinalReflectionInfo {
  evolucion: string;
  conocimientos: string;
  dificultades: string;
  superacion: string;
  impacto: string;
  metas: string;
}

export interface ContactInfo {
  correo: string;
  linkedin: string;
  telefono: string;
}

export interface SiteTheme {
  id: string;
  nombre: string;
  primaryColor: string;
  bgColor: string;
  cardColor: string;
  fontFamily: "font-sans" | "font-serif" | "font-mono" | "font-grotesk";
  bannerStyle: "grande" | "estandar" | "solo-titulo";
}

export interface ChecklistItem {
  id: string;
  section: string;
  texto: string;
  completado: boolean;
}
