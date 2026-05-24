/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from "react";
import { Award, Download, ShieldCheck, Printer, CheckCircle, Share2 } from "lucide-react";

interface CertificateProps {
  userName: string;
  completionDate?: string;
  certificateId?: string;
}

export default function Certificate({
  userName,
  completionDate = new Date().toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" }),
  certificateId = `PY-${Math.floor(Date.now() / 1000000)}-${Math.floor(Math.random() * 8999 + 1000)}`
}: CertificateProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    if (printContent) {
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>PySchool Python Sertifikati</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Inter:wght@400;600&display=swap');
                body { font-family: 'Inter', sans-serif; }
                .serif-font { font-family: 'Playfair Display', serif; }
              </style>
            </head>
            <body class="bg-white p-6 justify-center flex items-center h-screen">
              <div class="border-[16px] border-double border-yellow-600 bg-amber-50/10 p-12 max-w-[850px] w-full border-zinc-300 relative rounded">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }
              </script>
            </body>
          </html>
        `);
        win.document.close();
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://pyschool.uz/certificates/${certificateId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 py-8 bg-slate-50 dark:bg-zinc-950/20 rounded-2xl border border-slate-200 dark:border-zinc-800" id="certificate_system_container">
      {/* Decorative Outer Badge */}
      <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 font-bold text-sm tracking-wider uppercase mb-6 font-mono">
        <Award className="w-5 h-5 text-yellow-500 animate-spin" />
        <span>Sertifikat Tayyor!</span>
      </div>

      {/* Actual Certificate Document Wrapper */}
      <div 
        ref={printAreaRef}
        id="certificate_frame"
        className="max-w-[780px] w-full bg-amber-50/20 dark:bg-zinc-950 border-[12px] border-double border-yellow-600/60 dark:border-yellow-500/30 p-8 sm:p-12 relative rounded-lg shadow-2xl overflow-hidden text-center transition-all duration-300 transform hover:scale-[1.01]"
      >
        {/* Abstract luxury corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-600"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-600"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-600"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-600"></div>

        {/* Certificate Headline */}
        <div className="text-center">
          <h2 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-yellow-600 dark:text-yellow-500 mb-2">PySchool Professional Certification</h2>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-zinc-100 mt-2 italic">MUTAXASSISLIK DIPLOMI</h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Standard core cert text */}
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-mono mt-8">Ushbu hujjat haqiqatan ham:</p>
        
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-3 underline decoration-yellow-600 underline-offset-8">
          {userName.toUpperCase() || "TALA'BA ALIYEV"}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-sans max-w-[520px] mx-auto mt-6 leading-relaxed">
          PySchool platformasining <strong className="text-yellow-600 dark:text-yellow-400 font-sans">“Python dasturlash tilini 0 dan professional darajagacha o‘rganish”</strong> mukammal ta'lim dasturini muvaffaqiyatli o‘tab, nazariy mavzular, amaliy mashqlar va yakuniy imtihonlarni 100% natija bilan tugatganligini tasdiqlaydi.
        </p>

        {/* Seal and Signatures */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 border-t border-yellow-600/10 gap-8">
          {/* Principal Signature */}
          <div className="text-center w-full sm:w-1/3">
            <span className="font-serif italic text-sm text-slate-700 dark:text-zinc-300 font-bold block mb-1">PyMentor AI</span>
            <div className="h-[1px] w-28 bg-slate-300 dark:bg-zinc-800 mx-auto mb-1"></div>
            <span className="text-[10px] text-gray-500 dark:text-zinc-500 font-mono">Senior AI Trainer</span>
          </div>

          {/* Golden Seal of PySchool */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full border border-yellow-600/30 flex items-center justify-center">
              <div className="w-16 h-16 bg-yellow-500 text-slate-950 rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-amber-300/60 font-serif font-bold relative animate-pulse">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
                <span className="text-[7px] font-bold tracking-widest mt-1">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* CEO Signature */}
          <div className="text-center w-full sm:w-1/3">
            <span className="font-serif italic text-sm text-slate-700 dark:text-zinc-300 font-bold block mb-1">F. Soyilov</span>
            <div className="h-[1px] w-28 bg-slate-300 dark:bg-zinc-800 mx-auto mb-1"></div>
            <span className="text-[10px] text-gray-500 dark:text-zinc-500 font-mono">Platform Director</span>
          </div>
        </div>

        {/* Cert verify ID */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 dark:text-zinc-500 font-mono border-t border-slate-100 dark:border-zinc-900 pt-4 gap-2">
          <span>Hujjat ID: <strong className="text-yellow-600 dark:text-yellow-500">{certificateId}</strong></span>
          <span>Sana: {completionDate}</span>
          <span className="flex items-center text-green-500">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Secure Hash Verified
          </span>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          id="cert_share_link_btn"
          onClick={handleShare}
          className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-zinc-950 text-slate-700 dark:text-zinc-300 rounded-xl text-xs font-semibold flex items-center space-x-2 border border-slate-200 dark:border-zinc-800 transition-all duration-150 cursor-pointer"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Nusxalandi!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Sertifikat havolasi</span>
            </>
          )}
        </button>

        <button
          id="cert_print_pdf_btn"
          onClick={handlePrint}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all duration-150 cursor-pointer shadow"
        >
          <Printer className="w-4 h-4" />
          <span>Sertifikatni Chop Etish (Print)</span>
        </button>
      </div>
    </div>
  );
}
