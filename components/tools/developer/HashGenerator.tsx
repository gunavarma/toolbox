"use client";

import React, { useState, useEffect } from "react";

export default function HashGenerator() {
  const [inputText, setInputText] = useState("");
  const [hashes, setHashes] = useState({
    sha1: "",
    sha256: "",
    sha384: "",
    sha512: ""
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  // Helper to convert array buffer to hex string
  const bufferToHex = (buffer: ArrayBuffer) => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // Generate hashes using Web Cryptography API
  const generateHashes = async (text: string) => {
    if (!text) {
      setHashes({ sha1: "", sha256: "", sha384: "", sha512: "" });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    try {
      const sha1Buffer = await crypto.subtle.digest("SHA-1", data);
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
      const sha384Buffer = await crypto.subtle.digest("SHA-384", data);
      const sha512Buffer = await crypto.subtle.digest("SHA-512", data);

      setHashes({
        sha1: bufferToHex(sha1Buffer),
        sha256: bufferToHex(sha256Buffer),
        sha384: bufferToHex(sha384Buffer),
        sha512: bufferToHex(sha512Buffer)
      });
    } catch (e) {
      console.error("Cryptographic hash generation failed:", e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    setFileName(null);
    setFileSize(null);
    generateHashes(val);
  };

  // Handle local file hashing
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    setInputText(`[Hashing local file: ${file.name}]`);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const sha1Buffer = await crypto.subtle.digest("SHA-1", arrayBuffer);
      const sha256Buffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const sha384Buffer = await crypto.subtle.digest("SHA-384", arrayBuffer);
      const sha512Buffer = await crypto.subtle.digest("SHA-512", arrayBuffer);

      setHashes({
        sha1: bufferToHex(sha1Buffer),
        sha256: bufferToHex(sha256Buffer),
        sha384: bufferToHex(sha384Buffer),
        sha512: bufferToHex(sha512Buffer)
      });
    } catch (e) {
      console.error("File hashing failed:", e);
    }
  };

  const handleCopy = (algo: string, val: string) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
    setCopied(algo);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      {/* File Dropper Zone */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-container-low/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
        <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-350">
          {fileName ? (
            <p className="flex items-center gap-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{fileName}</span>
              <span className="text-[10px] text-zinc-400">({(fileSize! / 1024).toFixed(1)} KB)</span>
            </p>
          ) : (
            <p>Hash text or drag-and-drop a local file to generate hashes instantly.</p>
          )}
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer shadow-sm active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          <span>Upload File</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Editor & Outputs splits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Input Text String</span>
            <span className="text-[10px] text-zinc-400 font-mono">
              {inputText.length.toLocaleString()} chars
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type or paste standard text content parameters here to hash in real-time..."
            className="w-full h-80 px-4 py-3 rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono text-zinc-800 dark:text-zinc-100 resize-none"
          />
        </div>

        {/* Hashes Column list */}
        <div className="space-y-4">
          {/* SHA-256 */}
          <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
              <span>SHA-256 Hash</span>
              <button
                onClick={() => handleCopy("sha256", hashes.sha256)}
                disabled={!hashes.sha256}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied === "sha256" ? "check" : "content_copy"}
                </span>
                <span>{copied === "sha256" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-zinc-800 dark:text-zinc-250 break-all select-all min-h-[1.5rem]">
              {hashes.sha256 || <span className="opacity-35 select-none font-normal">Waiting for inputs...</span>}
            </div>
          </div>

          {/* SHA-512 */}
          <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
              <span>SHA-512 Hash</span>
              <button
                onClick={() => handleCopy("sha512", hashes.sha512)}
                disabled={!hashes.sha512}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied === "sha512" ? "check" : "content_copy"}
                </span>
                <span>{copied === "sha512" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-zinc-800 dark:text-zinc-250 break-all select-all min-h-[1.5rem]">
              {hashes.sha512 || <span className="opacity-35 select-none font-normal">Waiting for inputs...</span>}
            </div>
          </div>

          {/* SHA-1 */}
          <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
              <span>SHA-1 Hash</span>
              <button
                onClick={() => handleCopy("sha1", hashes.sha1)}
                disabled={!hashes.sha1}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied === "sha1" ? "check" : "content_copy"}
                </span>
                <span>{copied === "sha1" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-zinc-800 dark:text-zinc-250 break-all select-all min-h-[1.5rem]">
              {hashes.sha1 || <span className="opacity-35 select-none font-normal">Waiting for inputs...</span>}
            </div>
          </div>

          {/* SHA-384 */}
          <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
              <span>SHA-384 Hash</span>
              <button
                onClick={() => handleCopy("sha384", hashes.sha384)}
                disabled={!hashes.sha384}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied === "sha384" ? "check" : "content_copy"}
                </span>
                <span>{copied === "sha384" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-zinc-800 dark:text-zinc-250 break-all select-all min-h-[1.5rem]">
              {hashes.sha384 || <span className="opacity-35 select-none font-normal">Waiting for inputs...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
