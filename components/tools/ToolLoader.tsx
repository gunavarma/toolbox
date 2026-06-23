"use client";

import React from "react";
import { toolComponents } from "./registry";
import FallbackTool from "./FallbackTool";

interface ToolLoaderProps {
  componentName: string;
  slug: string;
  category: string;
}

export default function ToolLoader({ componentName, slug, category }: ToolLoaderProps) {
  const ActiveTool = toolComponents[componentName] || FallbackTool;
  return <ActiveTool slug={slug} category={category} />;
}
