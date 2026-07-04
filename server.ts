import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API client to prevent startup crashes if key is not yet set
let aiInstance: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Configure it in Settings > Secrets inside Google AI Studio.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// API endpoint to generate or polish academic content
app.post("/api/gemini/generate-section", async (req, res) => {
  try {
    const { section, subject, studentProfile, currentContent, promptNotes, action } = req.body;

    const ai = getGemini();

    const systemInstruction = `
Actúas como un estudiante universitario altamente reflexivo, comprometido y responsable con su formación.
Tu tarea es redactar o perfeccionar el contenido para su portafolio académico digital de la asignatura "${subject || 'Asignatura Universitaria'}".

NORMAS IMPORTANTES DE REDACCIÓN:
1. Escribe SIEMPRE en primera persona del singular ("yo", "mi", "me").
2. Utiliza un lenguaje natural, humano, cercano y a la vez de alto nivel académico.
3. Evita clichés típicos de IA como "En resumen,", "Por lo tanto,", "Es fundamental recordar que", "En este viaje de aprendizaje", "En conclusión," o enumeraciones exageradamente estructuradas con emojis repetitivos.
4. Redacta párrafos fluidos y conectados, imitando la redacción auténtica de un estudiante real.
5. Nunca hables de ti mismo como una inteligencia artificial ni digas que eres un modelo de lenguaje.
6. Demuestra autocrítica, honestidad intelectual, madurez académica y entusiasmo genuino por el aprendizaje.
7. Al ampliar el contenido, hazlo de manera profunda y con excelente ortografía, aportando reflexiones sinceras.
8. Si se trata de optimizar/pulir texto existente, respeta el sentido original de las ideas pero mejóralo estructuralmente para que suene brillante pero realista.
`;

    let userPrompt = "";

    if (action === "polish") {
      userPrompt = `
Por favor, mejora y pule el siguiente borrador escrito por el estudiante para la sección de "${section}". Hazlo sonar más fluido, profesional y reflexivo, manteniendo la perspectiva de primera persona y las ideas clave del estudiante:

TEXTO BORRADOR:
"""
${currentContent || ""}
"""

INFORMACIÓN ADICIONAL DE CONTEXTO:
- Asignatura: ${subject || 'Asignatura'}
- Perfil del estudiante (intereses/valores): ${studentProfile || 'Estudiante universitario'}
- Notas adicionales: ${promptNotes || 'Ninguna'}

Genera solo el texto optimizado para copiar y pegar, estructurado con párrafos completos y elegantes, sin etiquetas explicativas ni introducciones como "Aquí tienes tu texto".`;
    } else {
      // Generate new draft
      userPrompt = `
Genera un borrador completo y profundamente desarrollado para la sección "${section}" del portafolio académico de la asignatura "${subject || 'Asignatura'}".

NOTAS E IDEAS CLAVE PARA DESARROLLAR:
- Notas del estudiante: ${promptNotes || 'Ideas generales sobre el proceso'}
- Perfil del estudiante: ${studentProfile || 'Estudiante universitario'}

Estructura el contenido con títulos si es apropiado, párrafos bien hilados, o listas fluidas. El texto debe estar completamente redactado y listo para copiar y pegar de forma directa en Google Sites.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;
    res.json({ success: true, text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error al procesar la solicitud con Gemini AI.",
    });
  }
});

// Serve Vite application
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
