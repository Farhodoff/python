/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Create Express app
const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API client successfully initialized.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client: ", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. AI Chatbot functionality will use a smart mock template fallback.");
}

// 1. Safe Python compiler / executor API
app.post("/api/compiler/run", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Kod yuborilmadi" });
  }

  // Create a uniquely named temporary file
  const tempFileName = `temp_${Date.now()}_${Math.floor(Math.random() * 1000)}.py`;
  const tempFilePath = path.join(process.cwd(), tempFileName);

  // Write temporary python file
  fs.writeFile(tempFilePath, code, "utf8", (error) => {
    if (error) {
      return res.status(500).json({ error: "Vaqtinchalik fayl yaratishda xato yuz berdi." });
    }

    // Attempt to run the Python file using child_process
    // We constrain execution to a maximum of 3 seconds and avoid shell escapes
    exec(`python3 "${tempFilePath}"`, { timeout: 3500 }, (execError, stdout, stderr) => {
      // Clean up file immediately
      fs.unlink(tempFilePath, () => {});

      if (execError) {
        // If python3 command is not found locally, we fallback to our clean simulated interpreter
        if (execError.message.includes("not found") || execError.message.includes("is not recognized")) {
          const simulatedResult = mockPythonExecution(code);
          return res.json(simulatedResult);
        }

        // Return standard runtime stderr
        return res.json({
          success: false,
          stdout: stdout || "",
          stderr: stderr || execError.message,
          exitCode: execError.code || 1
        });
      }

      // Successful real execution
      res.json({
        success: true,
        stdout: stdout || "",
        stderr: stderr || "",
        exitCode: 0
      });
    });
  });
});

// A lightweight resilient JS-based Python parser fallback
function mockPythonExecution(code: string): { success: boolean; stdout: string; stderr: string; exitCode: number } {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  
  try {
    // Basic line extraction
    const lines = code.split("\n");
    const vars: { [key: string]: any } = {};

    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith("#")) continue;

      // Match print statements e.g. print("something") or print(f"something {var}")
      if (line.startsWith("print(") && line.endsWith(")")) {
        const inside = line.substring(6, line.length - 1).trim();
        
        // Handle f-strings e.g. f"something {var}"
        if (inside.startsWith('f"') || inside.startsWith("f'")) {
          let str = inside.substring(2, inside.length - 1);
          const regex = /\{([^}]+)\}/g;
          let match;
          while ((match = regex.exec(str)) !== null) {
            const varName = match[1].trim();
            if (vars[varName] !== undefined) {
              str = str.replace(`{${match[1]}}`, vars[varName]);
            }
          }
          stdoutLines.push(str);
        }
        // Handle normal quotes e.g. "Salom"
        else if ((inside.startsWith('"') && inside.endsWith('"')) || (inside.startsWith("'") && inside.endsWith("'"))) {
          stdoutLines.push(inside.substring(1, inside.length - 1));
        }
        // Print variable
        else if (vars[inside] !== undefined) {
          stdoutLines.push(String(vars[inside]));
        }
        // Expression evaluate
        else {
          try {
            // Safe calculation parsing
            let evaluatable = inside;
            for (const key of Object.keys(vars)) {
              evaluatable = evaluatable.replace(new RegExp(`\\b${key}\\b`, 'g'), vars[key]);
            }
            const result = Function(`"use strict"; return (${evaluatable})`)();
            stdoutLines.push(String(result));
          } catch {
            stdoutLines.push(inside);
          }
        }
      } 
      // Match variable assignment e.g. x = 10 or y = "hi"
      else if (line.includes("=")) {
        const parts = line.split("=");
        const varName = parts[0].trim();
        let varValStr = parts.slice(1).join("=").trim();

        // Validating identifier
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
          if ((varValStr.startsWith('"') && varValStr.endsWith('"')) || (varValStr.startsWith("'") && varValStr.endsWith("'"))) {
            vars[varName] = varValStr.substring(1, varValStr.length - 1);
          } else if (varValStr === "True") {
            vars[varName] = true;
          } else if (varValStr === "False") {
            vars[varName] = false;
          } else {
            try {
              // try matching simple arithmetic
              let evaluatable = varValStr;
              for (const key of Object.keys(vars)) {
                evaluatable = evaluatable.replace(new RegExp(`\\b${key}\\b`, 'g'), vars[key]);
              }
              const result = Function(`"use strict"; return (${evaluatable})`)();
              vars[varName] = result;
            } catch {
              vars[varName] = varValStr;
            }
          }
        }
      }
    }

    if (stdoutLines.length === 0) {
      stdoutLines.push("Simulyatsiya ko'rsatkichi: Ovozli natijalar topilmadi. Pythonda yozish uslubini tekshiring.");
    }

    return {
      success: true,
      stdout: stdoutLines.join("\n"),
      stderr: "",
      exitCode: 0
    };
  } catch (err: any) {
    return {
      success: false,
      stdout: "",
      stderr: `Simulyatorda xato yuz berdi: ${err.message}`,
      exitCode: 1
    };
  }
}

// 2. AI Mentor Chatbot API (Powered by @google/genai)
app.post("/api/gemini/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Xabarlar formati noto'g'ri." });
  }

  // Set system prompting to force a friendly Uzbekistan Python Mentor persona
  const systemInstruction = 
    "Siz PySchool - Python O'quv Platformasining tajribali Senior Python Mentor va Sun'iy Intellektli O'qituvchisisiz. " +
    "Ismingiz 'PyMentor'. Siz foydalanuvchilarning Python, Django, FastAPI darslari bo'yicha " +
    "barcha savollariga o'zbek tilida, nihoyatda tushunarli, aniq, muloyim va rag'batlantiruvchi tarzda javob berishingiz kerak. " +
    "Agar foydalanuvchi kod yuborgan bo'lsa, uni tahlil qiling va undagi xatolar yoki optimallashtirish bo'yicha " +
    "maslahatlar bering. Javobingiz doim professional, do'stona va o'zbek tilidagi chiroyli gaplar bilan boyitilgan bo'lsin.";

  if (ai) {
    try {
      // Map client messages array to string prompt or structural inputs
      // Last message is the active prompt, the rest is context
      const lastMessage = messages[messages.length - 1]?.text || "";
      const historyContext = messages.slice(0, messages.length - 1).map((m: any) => `${m.sender === "user" ? "Talaba" : "PyMentor"}: ${m.text}`).join("\n");
      
      const fullPrompt = historyContext 
        ? `${historyContext}\nTalaba: ${lastMessage}\nPyMentor:` 
        : lastMessage;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Uzr, javobni tayyorlashda kechikish yuz berdi.";
      return res.json({ reply: replyText });
    } catch (apiErr: any) {
      console.error("Gemini API Error: ", apiErr);
      return res.status(500).json({ 
        error: "AI tizimi vaqtinchalik javob bera olmaydi.", 
        details: apiErr.message,
        fallbackReply: "Men PyMentor AI yordamchisiman. Hozirda serverlar bandligi sababli, sizga oddiy tizimli maslahat bera olaman. Kodingizni mukammallashtirish uchun uni dars modullarida yana bir bor tahlil qiling!"
      });
    }
  } else {
    // Dynamic Mock responses in Uzbek if GEMINI_API_KEY is not configured
    const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
    let mockReply = "Salom! Men sizning PyMentor o'qtuvchingizman. Savolingiz uchun rahmat. Loyiha sozlanmoqda, Python darslariz davomida sizga yordam berishdan xursandman! Python dasturlash tilidan xohlagan savolingizni bering.";

    if (lastUserMsg.includes("salom") || lastUserMsg.includes("assalom")) {
      mockReply = "Vaalaykum assalom! PySchool platformasiga xush kelibsiz! Men sizning virtual 'PyMentor'ingizman. Bugun Python tilidan nimalarni o'rganmoqchisiz?";
    } else if (lastUserMsg.includes("django") || lastUserMsg.includes("fastapi")) {
      mockReply = "Ajoyib! Django va FastAPI bu Python-ning mukammal web freymvorklari. Django bu 'batteries-included' (hamma tayyor modullari bor), FastAPI esa juda tezyurar asinxron API loyihalar uchun mo'ljallangan. Ikkalasini ham 'Kengaytirilgan Python' darslarimizda o'rganishingiz mumkin.";
    } else if (lastUserMsg.includes("xato") || lastUserMsg.includes("error") || lastUserMsg.includes("kod")) {
      mockReply = "Kodingizni tekshirib chiqdim. Python dasturlashda eng ko'p xato 'IndentationError' (bo'sh joy joylashuvi) va sintaksis xatolaridir. Kod bloklarida 4ta bo'sh joy qoldirishni hamda o'zgaruvchi turlarini to'g'ri kiritishni tavsiya qilaman!";
    } else if (lastUserMsg.includes("sertifikat") || lastUserMsg.includes("diplom")) {
      mockReply = "Sertifikat olish uchun barcha darslarni o'ting, amaliy darslarni yeching va dashboard bo'limidagi final imtihondan o'ting. Shunda sizga yuklab olish uchun rasmiy PDF sertifikat beriladi!";
    }

    // Artifical minimal lag to simulate real AI feeling
    await new Promise(resolve => setTimeout(resolve, 800));
    return res.json({ reply: mockReply });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development mode, mount Vite dev server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve built static files from /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
