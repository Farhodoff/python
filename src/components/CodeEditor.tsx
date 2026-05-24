/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Play, RotateCcw, Terminal as TerminalIcon, HelpCircle, CheckCircle, XCircle, AlertCircle, Sparkles } from "lucide-react";

interface CodeEditorProps {
  initialCode: string;
  solutionCode?: string;
  testCases?: { input: string; expectedOutput: string }[];
  onCorrectSolution?: (gainedXp: number) => void;
  gainedXpPoints?: number;
}

export default function CodeEditor({
  initialCode,
  solutionCode,
  testCases,
  onCorrectSolution,
  gainedXpPoints = 15
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [loading, setLoading] = useState(false);
  const [gradedStatus, setGradedStatus] = useState<"none" | "success" | "fail">("none");
  const [showHint, setShowHint] = useState(false);

  // Sync update if parent exercise shifts
  useEffect(() => {
    setCode(initialCode);
    setStdout("");
    setStderr("");
    setGradedStatus("none");
    setShowHint(false);
  }, [initialCode]);

  const handleRunCode = async () => {
    setLoading(true);
    setStdout("");
    setStderr("");
    setGradedStatus("none");

    try {
      const response = await fetch("/api/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error("Server xatosi yuz berdi.");
      }

      const data = await response.json();
      
      setStdout(data.stdout || "");
      setStderr(data.stderr || "");

      // Auto check outputs against testCases
      if (testCases && testCases.length > 0) {
        let allPassed = true;
        
        // Loop through test cases and check output
        for (const tc of testCases) {
          // If the test target is basic checking:
          // We look if output contains expected result or matches trimmed result
          const normalizedStdout = (data.stdout || "").trim().toLowerCase();
          const normalizedExpected = tc.expectedOutput.trim().toLowerCase();

          if (!normalizedStdout.includes(normalizedExpected)) {
            allPassed = false;
            break;
          }
        }

        if (allPassed && !data.stderr) {
          setGradedStatus("success");
          if (onCorrectSolution) {
            onCorrectSolution(gainedXpPoints);
          }
        } else {
          setGradedStatus("fail");
        }
      }
    } catch (err: any) {
      setStderr(`Kompilyatorda texnik uzilish: ${err.message}`);
      setGradedStatus("fail");
    } finally {
      setLoading(false);
    }
  };

  const handleResetCode = () => {
    if (confirm("Kodingizni boshlang'ich holatga qaytarmoqchimisiz?")) {
      setCode(initialCode);
      setStdout("");
      setStderr("");
      setGradedStatus("none");
      setShowHint(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl" id="code_ide_wrapper">
      {/* Code Editor Header */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 pl-2 border-l border-slate-800">
            main.py
          </span>
          {loading && (
            <span className="text-[10px] bg-yellow-950/40 text-yellow-400 px-2 py-0.5 rounded border border-yellow-900/50 font-mono animate-pulse">
              Executing...
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {solutionCode && (
            <button
              id="editor_hint_btn"
              onClick={() => setShowHint(!showHint)}
              className="p-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-all duration-150 flex items-center space-x-1 cursor-pointer"
              title="Yordam maslahat olish"
            >
              <HelpCircle className="w-3.5 h-3.5 text-yellow-500" />
              <span>{showHint ? "Yopish" : "Yordam"}</span>
            </button>
          )}
          <button
            id="editor_reset_btn"
            onClick={handleResetCode}
            className="p-1.5 bg-slate-850 hover:bg-slate-800 text-slate-400 rounded-lg text-xs transition-colors duration-150 flex items-center cursor-pointer"
            title="Kodni qayta tiklash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            id="editor_run_btn"
            onClick={handleRunCode}
            disabled={loading}
            className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 rounded-lg text-xs font-bold transition-all duration-150 flex items-center space-x-1.5 cursor-pointer shadow"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Kodni Ishlatish</span>
          </button>
        </div>
      </div>

      {/* Code Textarea Area */}
      <div className="flex-1 relative flex flex-col min-h-[220px]">
        {/* Editor Line Indicators */}
        <div className="flex flex-1 overflow-hidden font-mono text-sm leading-relaxed">
          {/* Line Numbers columns */}
          <div className="w-12 bg-slate-950/80 text-slate-600 select-none text-right pr-3.5 pt-4 text-xs">
            {Array.from({ length: Math.max(12, code.split("\n").length + 2) }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code Input */}
          <textarea
            id="code_editor_textarea"
            className="flex-1 bg-transparent text-slate-100 font-mono text-sm leading-relaxed p-4 outline-none border-none resize-none focus:ring-0 overflow-y-auto w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            placeholder="# Python kodingizni bu yerda yozing..."
          />
        </div>

        {/* Suggestion overlay box */}
        {showHint && solutionCode && (
          <div className="absolute top-4 right-4 max-w-sm bg-slate-950 border border-yellow-950 text-slate-200 p-4 rounded-xl shadow-2xl animate-fadeIn z-10 font-sans">
            <div className="flex items-center space-x-2 mb-2 text-yellow-400">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span className="text-xs font-bold">Mentor Maslahati:</span>
            </div>
            <p className="text-xs text-slate-300 mb-3 font-medium">To'g'ri kod yozishga qiynalmoqdamisiz? Mana andoza namunasi:</p>
            <pre className="p-2 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono overflow-x-auto text-yellow-200">
              {solutionCode}
            </pre>
            <button
              onClick={() => {
                setCode(solutionCode);
                setShowHint(false);
              }}
              className="mt-3 w-full text-center bg-yellow-500 hover:bg-yellow-600 text-slate-950 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Namunani kodga ko'chirish
            </button>
          </div>
        )}
      </div>

      {/* Terminal Output Logs */}
      <div className="h-[180px] bg-slate-950/95 border-t border-slate-800/80 flex flex-col overflow-hidden" id="terminal_pane">
        {/* Terminal Header */}
        <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-900 select-none">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Bash - Terminal Output (Python 3)</span>
          </div>
          {gradedStatus !== "none" && (
            <div className="flex items-center">
              {gradedStatus === "success" ? (
                <span className="flex items-center space-x-1 text-green-400 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Tekshiruv: MUVAFFQQIYATLI (+{gainedXpPoints} XP!)</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 text-red-400 text-xs font-semibold">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Tekshiruv: XATO (Kodingiz testdan o'tmadi!)</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Terminal Text lines */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed text-slate-300">
          {loading ? (
            <div className="text-slate-500 animate-pulse flex items-center space-x-2">
              <span className="inline-block w-2.5 h-4 bg-yellow-500 animate-pulse"></span>
              <span>Python kod kompilyatsiya qilinmoqda, natijalar kutilmoqda...</span>
            </div>
          ) : stdout || stderr ? (
            <>
              {stdout && (
                <pre className="text-green-400 whitespace-pre-wrap">{stdout}</pre>
              )}
              {stderr && (
                <div className="text-red-400 whitespace-pre-wrap flex items-start space-x-1.5 bg-red-950/20 p-2.5 rounded border border-red-900/30">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{stderr}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-slate-500 flex flex-col justify-center h-full items-center select-none font-sans">
              <p className="font-mono text-[11px] mb-1">Terminal bo'sh. Kod natijasini tekshirish uchun yuqoridagi 'Kodni Ishlatish' tugmasini bosing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
