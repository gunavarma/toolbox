"use client";

import React, { useState, useRef } from "react";
import { Upload, Image, ArrowRight, Download, RefreshCw, Percent, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(75);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadOriginal(file);
  };

  const loadOriginal = (file: File) => {
    setSelectedFile(file);
    setOriginalSize(file.size);
    setCompressedUrl(null);
    setCompressedSize(0);

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
  };

  const compressImage = () => {
    if (!originalUrl || !selectedFile) return;

    setIsCompressing(true);
    const img = new window.Image();
    img.src = originalUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Perform local canvas compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const compUrl = URL.createObjectURL(blob);
            setCompressedUrl(compUrl);
          }
          setIsCompressing(false);
        },
        selectedFile.type,
        quality / 100
      );
    };
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      loadOriginal(file);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const reduction =
    originalSize > 0 && compressedSize > 0
      ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(0)
      : null;

  return (
    <div className="space-y-6">
      {/* File Drag-and-Drop Area */}
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video rounded-xl border border-dashed border-zinc-800 hover:border-violet-500/40 bg-zinc-900/15 hover:bg-zinc-900/35 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 cursor-pointer select-none glass"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="h-12 w-12 rounded-full bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-400 mb-3 hover:text-violet-400 transition-colors">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">Drag and Drop Image File</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-[240px] sm:max-w-xs leading-relaxed">
              Supports JPEG, PNG, or WEBP. All image scaling/compression runs completely client-side.
            </p>
          </div>
        </div>
      ) : (
        // Preview & Stats Dashboard
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Original Preview */}
            <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-col items-center justify-center space-y-3.5 relative min-h-[220px]">
              <span className="absolute top-3 left-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850">
                Original Image
              </span>
              {originalUrl && (
                <img
                  src={originalUrl}
                  alt="Original preview"
                  className="max-h-[160px] object-contain rounded border border-zinc-900 shadow-lg"
                />
              )}
              <span className="text-xs text-zinc-400 font-mono font-semibold">
                Size: {formatSize(originalSize)}
              </span>
            </div>

            {/* Compressed Preview */}
            <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-col items-center justify-center space-y-3.5 relative min-h-[220px]">
              <span className="absolute top-3 left-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850">
                Compressed Image
              </span>
              {compressedUrl ? (
                <>
                  <img
                    src={compressedUrl}
                    alt="Compressed preview"
                    className="max-h-[160px] object-contain rounded border border-zinc-900 shadow-lg"
                  />
                  <span className="text-xs text-zinc-400 font-mono font-semibold">
                    Size: {formatSize(compressedSize)}
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-zinc-600 gap-1 select-none">
                  <Image className="h-10 w-10 opacity-30" />
                  <span className="text-xs">Pending Compression</span>
                </div>
              )}
            </div>
          </div>

          {/* Slider Panel */}
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-6">
            <Slider
              label="Compression Quality"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              valueDisplay={`${quality}%`}
            />

            <div className="flex justify-between items-center flex-wrap gap-4 pt-1">
              <Button
                variant="ghost"
                onClick={() => setSelectedFile(null)}
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                Upload New Image
              </Button>

              <div className="flex gap-2.5 ml-auto">
                <Button
                  variant="primary"
                  onClick={compressImage}
                  isLoading={isCompressing}
                  leftIcon={<Percent className="h-4 w-4" />}
                >
                  Compress Image
                </Button>

                {compressedUrl && (
                  <a href={compressedUrl} download={`compressed_${selectedFile.name}`}>
                    <Button variant="glass" leftIcon={<Download className="h-4 w-4" />}>
                      Download
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Reduction stats tag */}
          {reduction && (
            <div className="glass rounded-xl border border-emerald-500/10 bg-emerald-500/10 p-4 flex items-center justify-between text-xs text-emerald-400 select-none">
              <span className="font-bold uppercase tracking-wider">Compression Statistics</span>
              <span className="font-mono flex items-center gap-1.5 font-bold">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Saved {reduction}% of original image file size!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
