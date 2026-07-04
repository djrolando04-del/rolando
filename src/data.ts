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

export const defaultStudentInfo: StudentInfo = {
  titulo: "Portafolio Académico Digital",
  nombre: "Carlos Manuel Almánzar",
  matricula: "2024-00843",
  carrera: "Ingeniería en Software",
  asignatura: "Tecnología de la Información y Comunicación I",
  facilitador: "Ing. Ramona Altagracia Mercedes",
  universidad: "Universidad Abierta para Adultos (UAPA)",
  fecha: "Julio de 2026",
  bienvenida: "Te doy la más cordial bienvenida a mi portafolio digital, un espacio diseñado para recopilar, estructurar y reflexionar sobre las competencias adquiridas y los logros alcanzados durante el transcurso de esta asignatura. Este portafolio no es solo una colección de tareas, sino un testimonio de mi crecimiento académico, técnico y personal, donde analizo de manera crítica mi proceso de aprendizaje y cómo estas herramientas impactarán positivamente mi formación como futuro ingeniero en software.",
  sugerenciaPortada: "Una composición minimalista que combine elementos tecnológicos limpios (como líneas de código sutiles, redes o un plano técnico) con tonos azulados o grises, transmitiendo profesionalismo, orden y una visión moderna de la informática."
};

export const defaultPresentationInfo: PresentationInfo = {
  biografia: "Soy un estudiante apasionado por la tecnología y el desarrollo de sistemas. Nací en Santiago, República Dominicana, y desde muy joven me sentí atraído por cómo funcionan las computadoras y la capacidad de crear soluciones lógicas a través del software. Actualmente curso la carrera de Ingeniería en Software, un paso fundamental para cumplir mi sueño de convertirme en un arquitecto de soluciones de software de impacto global.",
  intereses: "Mis principales intereses giran en torno al desarrollo frontend y backend, la inteligencia artificial, el diseño de bases de datos relacionales y la optimización de procesos mediante la automatización de flujos de trabajo. Fuera de lo técnico, disfruto mucho de la lectura de biografías de innovadores tecnológicos, el ajedrez y la música instrumental.",
  fortalezas: "Me considero una persona con un alto pensamiento analítico, paciencia para resolver problemas complejos de lógica y depuración, gran capacidad de adaptación ante nuevas tecnologías y una disposición innata para el aprendizaje autodidacta. Valoro mucho la comunicación asertiva y el orden en mis proyectos.",
  objetivos: "A corto plazo, deseo dominar con excelencia las bases del desarrollo de software y participar activamente en proyectos de código abierto. A largo plazo, mi meta es liderar equipos de ingeniería de software en proyectos que resuelvan necesidades reales en sectores clave como la educación, la salud y la sostenibilidad.",
  valores: "Mis pilares éticos son la honestidad intelectual, la perseverancia, la responsabilidad, el respeto mutuo en el trabajo en equipo y la búsqueda constante de la excelencia en todo lo que emprendo.",
  motivacion: "Mi gran motivación es saber que el software tiene el poder de transformar vidas y eficientizar el mundo. Ver cómo unas líneas de código escritas con paciencia pueden solucionar el problema diario de miles de personas es el motor que me impulsa a superar cada desafío matemático o lógico en mi formación académica.",
  fraseInspiradora: "El único modo de hacer un gran trabajo es amar lo que haces. Si no lo has encontrado todavía, sigue buscando.",
  imagenUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
};

export const defaultLearningProcessInfo: LearningProcessInfo = {
  actividadInteresante: "La actividad más interesante para mí fue el diseño y estructuración del 'Trabajo de Investigación Colaborativo sobre Seguridad de la Información', en conjunto con la simulación práctica de diagramas de red y flujos de datos seguros utilizando herramientas digitales compartidas en la nube.",
  porQue: "Elegí esta actividad porque representó un puente directo entre la teoría técnica y las dinámicas reales del mundo laboral. Trabajar en equipo a distancia utilizando herramientas colaborativas nos obligó a establecer protocolos claros de comunicación, a integrar sistemas de control de versiones informales y a debatir constructivamente sobre medidas de protección de datos, un aspecto vital para mi carrera de Ingeniería en Software.",
  aprendizajeSignificativo: "Obtuve una comprensión profunda de cómo la seguridad de la información no depende únicamente de códigos complejos o cortafuegos, sino también de la cultura de organización y del manejo ético de las herramientas de comunicación. Aprendí a configurar permisos estructurados en repositorios de datos y a valorar el impacto que tiene un diseño arquitectónico limpio en la prevención de fugas de datos.",
  importanciaProfesional: "Esta asignatura es fundamental para mi carrera porque las tecnologías de la información son la materia prima con la que trabajaré diariamente. Entender cómo se transmiten, almacenan y protegen los datos en las redes y conocer las metodologías de investigación académica me capacita no solo para programar, sino para documentar mis proyectos con rigurosidad científica y trabajar bajo estándares profesionales.",
  sentirProceso: "Me siento sumamente satisfecho y motivado. El proceso me desafió a salir de mi zona de confort técnico, aprendiendo a equilibrar mis destrezas de codificación pura con habilidades blandas esenciales, como la redacción formal de informes académicos, el análisis sintáctico de fuentes bibliográficas y la autogestión eficaz del tiempo de estudio.",
  conclusion: "En conclusión, el camino recorrido en esta asignatura ha sido sumamente enriquecedor. Ha cambiado mi perspectiva del aprendizaje, enseñándome que la tecnología no es un fin en sí misma, sino un medio potente para estructurar soluciones y construir conocimiento sólido de forma sistemática y ética."
};

export const defaultSkillItems: SkillItem[] = [
  {
    id: "s1",
    habilidad: "Pensamiento Crítico",
    desarrollo: "A través del análisis detallado de diferentes fuentes bibliográficas y la resolución de ejercicios de lógica de programación en cada unidad.",
    ejemplo: "Evaluación de la veracidad de artículos web sobre ciberseguridad, descartando blogs no oficiales y priorizando revistas científicas indexadas.",
    importancia: "Como ingeniero, me permite discernir cuál es la mejor arquitectura de software ante un problema de rendimiento de la base de datos."
  },
  {
    id: "s2",
    habilidad: "Comunicación Escrita",
    desarrollo: "Redactando los informes semanales y el borrador de investigación con normas APA, cuidando la precisión, la cohesión y el rigor académico.",
    ejemplo: "Elaboración de la introducción del trabajo final, explicando de forma clara y sin tecnicismos complejos los riesgos de la ingeniería social.",
    importancia: "Indispensable para redactar documentación técnica clara de APIs y guías para usuarios finales."
  },
  {
    id: "s3",
    habilidad: "Trabajo Colaborativo",
    desarrollo: "Mediante el uso coordinado de Google Docs y GitHub para la coautoría del informe final con compañeros de distintas localidades.",
    ejemplo: "Establecer un cronograma grupal de entregas y consolidar las partes redactadas por mis compañeros garantizando una sola voz editorial.",
    importancia: "Los proyectos de software actuales se desarrollan por equipos multidisciplinarios interconectados globalmente."
  },
  {
    id: "s4",
    habilidad: "Investigación",
    desarrollo: "Utilizando bases de datos académicas (como Google Académico y Scielo) para encontrar literatura científica válida y aprender a citar con precisión.",
    ejemplo: "Búsqueda y comparación de tres estudios experimentales sobre la latencia en arquitecturas microservicios.",
    importancia: "Me capacita para mantenerme al día con investigaciones de vanguardia en tecnologías emergentes."
  },
  {
    id: "s5",
    habilidad: "Uso de Herramientas Digitales",
    desarrollo: "Explorando y dominando plataformas de diseño interactivo, suites de productividad en la nube y organizadores de tareas digitales.",
    ejemplo: "Configuración del entorno de desarrollo y uso de Canva/Google Sites para el diseño estético de la interfaz visual de este portafolio.",
    importancia: "Acelera los flujos de trabajo de ingeniería y optimiza la presentación de informes corporativos."
  },
  {
    id: "s6",
    habilidad: "Organización y Planificación",
    desarrollo: "Creando esquemas jerárquicos de los contenidos de cada módulo antes de redactar y organizando carpetas en la nube para las evidencias.",
    ejemplo: "Creación de un mapa conceptual con la estructura lógica de los temas clave de la asignatura para facilitar mi repaso de exámenes.",
    importancia: "Garantiza que la arquitectura de un software sea modular, mantenible y escalable con el tiempo."
  },
  {
    id: "s7",
    habilidad: "Gestión del Tiempo",
    desarrollo: "Utilizando la técnica Pomodoro para estructurar mis sesiones de estudio y respetando los plazos de entrega de la plataforma universitaria.",
    ejemplo: "Establecimiento de bloques de 2 horas diarias de estudio para evitar la acumulación de trabajos en la última semana del ciclo.",
    importancia: "Vital para cumplir con los hitos de entrega en metodologías ágiles de desarrollo de software (Scrum)."
  },
  {
    id: "s8",
    habilidad: "Resolución de Problemas",
    desarrollo: "Afrontando errores de configuración en los entornos de desarrollo virtualizados y corrigiendo inconsistencias de formato en los textos.",
    ejemplo: "Depuración de un error de enlace en la primera versión de mi portafolio digital, analizando la consola del navegador.",
    importancia: "Es el núcleo diario del trabajo de un programador: encontrar fallos y resolverlos eficientemente."
  },
  {
    id: "s9",
    habilidad: "Autonomía",
    desarrollo: "Buscando videotutoriales complementarios cuando los conceptos de la guía oficial de la plataforma resultaban demasiado generales.",
    ejemplo: "Estudio independiente sobre el protocolo HTTPS para entender a profundidad cómo se encriptan los datos de los formularios.",
    importancia: "En tecnología, la capacidad de aprender de forma autodidacta marca la diferencia entre un profesional estancado y uno innovador."
  },
  {
    id: "s10",
    habilidad: "Aprendizaje Continuo",
    desarrollo: "Manteniéndome curioso y asumiendo este portafolio digital como un proyecto en constante evolución, no solo como una entrega única.",
    ejemplo: "Suscripción a boletines de tecnología educativa y desarrollo web para mantenerme informado de nuevas tendencias.",
    importancia: "El software cambia vertiginosamente; lo que hoy es estándar, mañana será obsoleto."
  }
];

export const defaultEvidenceItems: EvidenceItem[] = [
  {
    id: "e1",
    tipo: "tarea",
    titulo: "Tarea 1: Informe sobre la Evolución de la Web y Servicios en la Nube",
    representa: "Un ensayo estructurado de 5 páginas con normas APA que detalla la transición de la Web 1.0 a la Web 3.0, el modelo SaaS (Software as a Service) y las implicaciones éticas del almacenamiento en la nube.",
    aprendido: "Aprendí a contrastar fuentes de información académicas, a formatear citas directas e indirectas de manera estricta y a resumir las diferencias clave entre nubes públicas, privadas e híbridas.",
    competencias: "Desarrollé la competencia de Comunicación Escrita bajo estándares formales (APA 7), el Pensamiento Crítico y el Análisis de Infraestructuras Tecnológicas.",
    importancia: "Es crucial porque, como desarrollador, mis aplicaciones se desplegarán y consumirán en la nube, por lo que comprender estos ecosistemas es indispensable desde los cimientos de mi formación.",
    imagenSimulada: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    archivoNombre: "Tarea1_Evolucion_Web_CarlosAlmanzar.pdf"
  },
  {
    id: "e2",
    tipo: "foro",
    titulo: "Participación en Foro Académico: El Impacto de la IA en la Educación del Siglo XXI",
    representa: "Un debate interactivo en la plataforma institucional donde expuse con argumentos sólidos los beneficios del aprendizaje personalizado mediado por IA y los riesgos de la pérdida de habilidades de redacción.",
    aprendido: "Comprendí el valor del debate respetuoso y cómo refutar ideas utilizando datos estadísticos en vez de opiniones subjetivas.",
    competencias: "Trabajo Colaborativo, Capacidad de Argumentación y Uso Ético de las Tecnologías de la Información.",
    importancia: "Es relevante porque la IA es hoy en día un asistente clave en el desarrollo de software; discutir sus límites éticos me forma como un profesional socialmente responsable.",
    imagenSimulada: "https://images.unsplash.com/photo-1577563906419-4a0eb222c3f1?auto=format&fit=crop&q=80&w=600",
    archivoNombre: "Foro_IA_Educacion_Sintesis.png"
  },
  {
    id: "e3",
    tipo: "trabajo",
    titulo: "Trabajo Final: Propuesta de Sistema de Gestión de Información Estudiantil",
    representa: "Un anteproyecto técnico completo que describe el flujo de datos, la estructura de la base de datos conceptual y el diseño de la interfaz de usuario para un sistema web escolar.",
    aprendido: "Aprendí a traducir los requisitos de un usuario final a especificaciones lógicas de software y a plasmarlo en diagramas comprensibles.",
    competencias: "Resolución de Problemas, Planificación, Uso de Software de Diagramación y Metodología de Diseño.",
    importancia: "Es la evidencia más directa de mi competencia práctica en esta asignatura, demostrando que puedo estructurar un sistema complejo desde su fase conceptual de investigación.",
    imagenSimulada: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
    archivoNombre: "ProyectoFinal_CarlosAlmanzar_V2.pdf"
  }
];

export const defaultFinalReflection: FinalReflectionInfo = {
  evolucion: "Al inicio de la asignatura, veía las tecnologías de la información como simples herramientas de uso diario que dominaba de forma empírica. Con el paso de las unidades, mi perspectiva maduró drásticamente. Aprendí a ver la tecnología con ojos de ingeniero y científico: evaluando la procedencia de la información, estructurando mis ideas bajo metodologías académicas y comprendiendo el trasfondo sistémico de cada plataforma digital que utilizo.",
  conocimientos: "He adquirido conocimientos fundamentales sobre normas internacionales de documentación científica (APA), estructuración de bases de datos conceptuales, taxonomía de redes de comunicación de datos, herramientas avanzadas de colaboración síncrona y asíncrona, y las implicaciones éticas y de ciberseguridad que rigen la sociedad del conocimiento actual.",
  dificultades: "La mayor dificultad que enfrenté fue la rigurosidad formal que exige la redacción académica y el correcto citado de normas APA. Al venir de una formación más práctica e informal, acostumbrar mi pluma a un tono neutral, analítico y rigurosamente referenciado requirió un gran esfuerzo de auto-corrección.",
  superacion: "Superé este obstáculo dedicando horas adicionales a repasar el manual oficial de normas APA, utilizando gestores de referencias bibliográficas, solicitando retroalimentación previa a mi facilitador y realizando múltiples borradores de cada trabajo antes de su entrega definitiva.",
  impacto: "El impacto de esta asignatura en mi vida profesional será definitivo. Me ha brindado la estructura metodológica para redactar informes técnicos de alta calidad para futuros clientes, fundamentar mis decisiones tecnológicas mediante investigación rigurosa de mercado y trabajar fluidamente en equipos de ingeniería distribuidos.",
  metas: "Mis metas inmediatas son continuar profundizando de manera autónoma en herramientas de documentación de código, obtener una certificación oficial en metodologías ágiles de desarrollo de software (como Scrum) y aplicar este rigor organizativo en todas las materias consecutivas de mi plan de estudios."
};

export const defaultContactInfo: ContactInfo = {
  correo: "c.almanzar.estudiante@uapa.edu.do",
  linkedin: "linkedin.com/in/carlos-almanzar-software",
  telefono: "+1 (809) 555-0145"
};

export const defaultThemes: SiteTheme[] = [
  {
    id: "natural-tones",
    nombre: "Tono Natural",
    primaryColor: "bg-[#5A5A40] text-[#FDFCFB] border-[#5A5A40] hover:bg-[#454530]",
    bgColor: "bg-[#FDFCFB]",
    cardColor: "bg-[#F5F2EA]",
    fontFamily: "font-serif",
    bannerStyle: "estandar"
  },
  {
    id: "sencillo",
    nombre: "Tema Sencillo",
    primaryColor: "bg-slate-700 text-white border-slate-700 hover:bg-slate-800",
    bgColor: "bg-slate-50",
    cardColor: "bg-white",
    fontFamily: "font-sans",
    bannerStyle: "grande"
  },
  {
    id: "aristoteles",
    nombre: "Tema Aristóteles",
    primaryColor: "bg-amber-800 text-white border-amber-800 hover:bg-amber-900",
    bgColor: "bg-orange-50/30",
    cardColor: "bg-white",
    fontFamily: "font-serif",
    bannerStyle: "estandar"
  },
  {
    id: "diplomatico",
    nombre: "Tema Diplomático",
    primaryColor: "bg-blue-900 text-white border-blue-900 hover:bg-blue-950",
    bgColor: "bg-slate-100/50",
    cardColor: "bg-white",
    fontFamily: "font-sans",
    bannerStyle: "estandar"
  },
  {
    id: "vision",
    nombre: "Tema Visión",
    primaryColor: "bg-teal-700 text-white border-teal-700 hover:bg-teal-800",
    bgColor: "bg-teal-50/20",
    cardColor: "bg-white",
    fontFamily: "font-grotesk",
    bannerStyle: "grande"
  },
  {
    id: "nivel",
    nombre: "Tema Nivel",
    primaryColor: "bg-neutral-800 text-white border-neutral-800 hover:bg-neutral-900",
    bgColor: "bg-neutral-50",
    cardColor: "bg-white",
    fontFamily: "font-mono",
    bannerStyle: "solo-titulo"
  },
  {
    id: "impresion",
    nombre: "Tema Impresión",
    primaryColor: "bg-rose-700 text-white border-rose-700 hover:bg-rose-800",
    bgColor: "bg-rose-50/10",
    cardColor: "bg-white",
    fontFamily: "font-sans",
    bannerStyle: "grande"
  }
];

export const defaultChecklist: ChecklistItem[] = [
  { id: "c1", section: "Inicio", texto: "Portada con título, nombre completo, matrícula, carrera, asignatura, facilitador y universidad.", completado: true },
  { id: "c2", section: "Inicio", texto: "Bienvenida breve redactada que explique de forma sincera el propósito del portafolio.", completado: true },
  { id: "c3", section: "Inicio", texto: "Sugerencia o inserción de una imagen de banner para la portada que represente la asignatura.", completado: true },
  { id: "c4", section: "Presentación", texto: "Biografía personal con formación, intereses y fortalezas estructuradas académicamente.", completado: true },
  { id: "c5", section: "Presentación", texto: "Frase inspiradora final y espacio/carga de fotografía profesional para el perfil.", completado: true },
  { id: "c6", section: "Proceso", texto: "Respuesta reflexiva a cuál fue la actividad más importante y por qué, en varios párrafos.", completado: true },
  { id: "c7", section: "Proceso", texto: "Explicación del aprendizaje significativo obtenido y su importancia profesional.", completado: true },
  { id: "c8", section: "Proceso", texto: "Conclusión detallada y consolidada sobre todo el proceso de aprendizaje vivido.", completado: true },
  { id: "c9", section: "Competencias", texto: "Matriz con las 10 habilidades completas (desarrollo, ejemplo y trascendencia laboral).", completado: true },
  { id: "c10", section: "Evidencias", texto: "Al menos 3 evidencias subidas/simuladas con sus descripciones profesionales completas.", completado: true },
  { id: "c11", section: "Reflexión", texto: "Reflexión final auténtica detallando la evolución, dificultades y superación técnica.", completado: true },
  { id: "c12", section: "Contacto", texto: "Sección de contacto con enlaces a correo, teléfono y perfil profesional de LinkedIn.", completado: true }
];
