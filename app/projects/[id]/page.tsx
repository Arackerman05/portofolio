/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { lensProjects } from "@/lib/projects";

import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Code,
  ExternalLink,
  Github,
  Star,
} from "lucide-react";

/* ====== DYNAMIC IMPORTS (hindari isu SSR/hydration) ====== */
const FaultyTerminal = dynamic(
  () => import("@/app/components/FaultyTerminal/FaultyTerminal"),
  { ssr: false }
);
const SmoothCursor = dynamic(
  () =>
    import("@/components/magicui/smooth-cursor").then((m) => m.SmoothCursor),
  { ssr: false }
);

/* ====== THEME TOKENS (sama dengan main page) ====== */
const PALETTE = {
  dark: "#0d0d0d",
  teal: "#003333",
  greenDark: "#0b6648",
  greenMid: "#439960",
  greenLight: "#89cc89",
  textMain: "#eafbe0",
  textSoft: "#d9f7d9",
  textMuted: "#cfeecf",
  textSubtle: "#c8efc8",
} as const;

const OPACITY = {
  surfaceA: 0.52,
  surfaceB: 0.34,
  border: 0.52,
  overlayTop: 0.9,
  overlayMid: 0.8,
  overlayEnd: 0.6,
} as const;

/* -> helper style seragam */
const surfaceStyle = (
  a: number = OPACITY.surfaceA,
  b: number = OPACITY.surfaceB,
  angle: number = 135
): React.CSSProperties => ({
  background: `linear-gradient(${angle}deg, rgba(13,13,13,${a}), rgba(0,51,51,${b}))`,
  borderColor: `rgba(0,51,51,${OPACITY.border})`,
});

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter();

  const project = useMemo(
    () => lensProjects.find((p) => p.id === params.id),
    [params.id]
  );
  if (!project) {
    notFound();
    return null;
  }

  /* ====== FLAGS: mobile / reduced-motion / pause WebGL saat tab hidden ====== */
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pauseGL, setPauseGL] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mm = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMM = () => setIsMobile(mm.matches);
    const updateRM = () => setReducedMotion(rm.matches);
    updateMM();
    updateRM();

    mm.addEventListener?.("change", updateMM);
    rm.addEventListener?.("change", updateRM);

    const vis = () => setPauseGL(document.hidden);
    document.addEventListener("visibilitychange", vis);

    return () => {
      mm.removeEventListener?.("change", updateMM);
      rm.removeEventListener?.("change", updateRM);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  /* ====== Background layer (ringan & konsisten dengan main page) ====== */
  const bgScrimStyle = useMemo<React.CSSProperties>(
    () => ({
      backgroundImage: `linear-gradient(180deg, rgba(13,13,13,${OPACITY.overlayTop}) 0%, rgba(13,13,13,${OPACITY.overlayMid}) 55%, rgba(13,13,13,${OPACITY.overlayEnd}) 100%)`,
    }),
    []
  );

  const BackgroundLayer = useMemo(
    () => (
      <div
        className="fixed inset-0 -z-30"
        style={{ backgroundColor: PALETTE.dark }}
        aria-hidden
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {mounted && !reducedMotion ? (
            isMobile ? (
              // LITE MODE di mobile: DPR=1, animasi pelan, tanpa mouse
              <FaultyTerminal
                pause={pauseGL}
                scale={1.3}
                gridMul={[2, 1]}
                digitSize={1.2}
                timeScale={0.22}
                scanlineIntensity={0.35}
                glitchAmount={1}
                flickerAmount={0.6}
                noiseAmp={0.6}
                chromaticAberration={0}
                dither={0}
                curvature={0}
                tint={PALETTE.greenDark}
                mouseReact={false}
                mouseStrength={0}
                dpr={1}
                pageLoadAnimation={false}
                brightness={1.18}
              />
            ) : (
              // MODE PENUH di desktop
              <FaultyTerminal
                pause={pauseGL}
                scale={1.5}
                gridMul={[2, 1]}
                digitSize={1}
                timeScale={1}
                scanlineIntensity={0.6}
                glitchAmount={0.35}
                flickerAmount={0.28}
                noiseAmp={0.45}
                chromaticAberration={0}
                dither={1}
                curvature={0}
                tint={PALETTE.greenDark}
                mouseReact
                mouseStrength={0.45}
                pageLoadAnimation={false}
                brightness={1.3}
                dpr={Math.min(window.devicePixelRatio || 1, 2)}
              />
            )
          ) : (
            // Fallback statis saat reduce-motion / belum mounted
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 600px at 30% 20%, rgba(67,153,96,0.20), transparent), radial-gradient(900px 500px at 80% 80%, rgba(11,102,72,0.18), transparent)",
              }}
            />
          )}
        </div>

        {/* scrim kontras */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b"
          style={bgScrimStyle}
        />
      </div>
    ),
    [mounted, isMobile, reducedMotion, pauseGL, bgScrimStyle]
  );

  return (
    <main className="relative min-h-screen overflow-hidden font-sans tracking-tight">
      {/* Head: preconnect CDN gambar untuk LCP/TBT lebih rendah */}
      <Head>
        <meta name="theme-color" content="#0d0d0d" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
      </Head>

      {/* SmoothCursor hanya desktop & jika tidak reduce motion */}
      {mounted && !isMobile && !reducedMotion && <SmoothCursor />}

      {BackgroundLayer}

      <section
        className="reduce-flicker relative z-10 px-4 md:px-6 lg:px-8 pt-10 pb-20"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1100px 1600px",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-5xl">
          {/* Header: tombol back + breadcrumb */}
          <BlurFade delay={0.1} inView>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] px-4 py-2"
                style={{
                  borderColor: `${PALETTE.greenMid}88`,
                  color: PALETTE.textMain,
                  backgroundColor: "transparent",
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>

              <nav
                className="flex items-center gap-2 text-sm"
                aria-label="Breadcrumb"
                style={{ color: PALETTE.textSoft }}
              >
                <span>Projects</span>
                <span aria-hidden>/</span>
                <span
                  className="font-semibold"
                  style={{ color: PALETTE.textMain }}
                >
                  {project.title}
                </span>
              </nav>
            </div>
          </BlurFade>

          {/* Hero */}
          <BlurFade delay={0.18} inView>
            <Card
              className="overflow-hidden border shadow-2xl"
              style={surfaceStyle(0.5, 0.32, 90)}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h1
                    className="text-3xl md:text-4xl font-extrabold mb-2"
                    style={{ color: PALETTE.textMain }}
                  >
                    {project.title}
                  </h1>
                  <p
                    className="text-base md:text-lg max-w-2xl"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </Card>
          </BlurFade>

          {/* Actions */}
          <BlurFade delay={0.24} inView>
            <div className="flex flex-wrap gap-3 mt-4">
              {project.github && (
                <Button
                  onClick={() => window.open(project.github!, "_blank")}
                  className="transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] px-4 py-2"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.greenDark})`,
                    color: PALETTE.textMain,
                  }}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              )}
              {project.demo && (
                <Button
                  onClick={() => window.open(project.demo!, "_blank")}
                  variant="outline"
                  className="transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] px-4 py-2"
                  style={{
                    borderColor: `${PALETTE.greenMid}88`,
                    color: PALETTE.textMain,
                    backgroundColor: "transparent",
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Kolom kiri */}
            <div className="lg:col-span-2 space-y-6">
              {/* Deskripsi */}
              <BlurFade delay={0.28} inView>
                <Card className="border shadow-xl" style={surfaceStyle()}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,51,51,0.4), rgba(67,153,96,0.4))",
                        }}
                      >
                        <Star
                          className="w-5 h-5"
                          style={{ color: PALETTE.greenLight }}
                        />
                      </div>
                      <CardTitle
                        style={{ color: PALETTE.textMain }}
                        className="text-lg"
                      >
                        Deskripsi Project
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p
                      className="leading-relaxed text-justify"
                      style={{ color: PALETTE.textSubtle }}
                    >
                      {project.detailDescription}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Fitur */}
              <BlurFade delay={0.32} inView>
                <Card className="border shadow-xl" style={surfaceStyle()}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,51,51,0.4), rgba(67,153,96,0.4))",
                        }}
                      >
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: PALETTE.greenLight }}
                        />
                      </div>
                      <CardTitle
                        style={{ color: PALETTE.textMain }}
                        className="text-lg"
                      >
                        Fitur Utama
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg border"
                          style={surfaceStyle(0.44, 0.26)}
                        >
                          <span
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: PALETTE.greenLight }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: PALETTE.textSoft }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <BlurFade delay={0.3} inView>
                <Card className="border shadow-xl" style={surfaceStyle()}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,51,51,0.4), rgba(67,153,96,0.4))",
                        }}
                      >
                        <Code
                          className="w-5 h-5"
                          style={{ color: PALETTE.greenLight }}
                        />
                      </div>
                      <CardTitle
                        style={{ color: PALETTE.textMain }}
                        className="text-lg"
                      >
                        Tech Stack
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge
                          key={idx}
                          className="border"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(13,13,13,0.5), rgba(0,51,51,0.28))",
                            color: PALETTE.textSoft,
                            borderColor: `rgba(0,51,51,${OPACITY.border})`,
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Project Info */}
              <BlurFade delay={0.34} inView>
                <Card className="border shadow-xl" style={surfaceStyle()}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,51,51,0.4), rgba(67,153,96,0.4))",
                        }}
                      >
                        <Calendar
                          className="w-5 h-5"
                          style={{ color: PALETTE.greenLight }}
                        />
                      </div>
                      <CardTitle
                        style={{ color: PALETTE.textMain }}
                        className="text-lg"
                      >
                        Project Info
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <div>
                      <div
                        className="text-sm font-semibold mb-1"
                        style={{ color: PALETTE.textMain }}
                      >
                        Status
                      </div>
                      <Badge
                        className="border"
                        style={{
                          backgroundColor: "rgba(67,153,96,0.22)",
                          color: PALETTE.textMain,
                          borderColor: `rgba(0,51,51,${OPACITY.border})`,
                        }}
                      >
                        Completed
                      </Badge>
                    </div>

                    <div>
                      <div
                        className="text-sm font-semibold mb-1"
                        style={{ color: PALETTE.textMain }}
                      >
                        Category
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: PALETTE.textSoft }}
                      >
                        {project.tech.includes("Flutter")
                          ? "Mobile Development"
                          : project.tech.includes("Figma")
                          ? "UI/UX Design"
                          : "Desktop / Web Application"}
                      </div>
                    </div>

                    {project.github && (
                      <div>
                        <div
                          className="text-sm font-semibold mb-2"
                          style={{ color: PALETTE.textMain }}
                        >
                          Source Code
                        </div>
                        <Button
                          onClick={() => window.open(project.github!, "_blank")}
                          variant="outline"
                          size="sm"
                          className="w-full transition-all duration-300"
                          style={{
                            borderColor: `${PALETTE.greenMid}88`,
                            color: PALETTE.textMain,
                            backgroundColor: "transparent",
                          }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub Repository
                        </Button>
                      </div>
                    )}

                    {project.demo && (
                      <div>
                        <div
                          className="text-sm font-semibold mb-2"
                          style={{ color: PALETTE.textMain }}
                        >
                          Live Preview
                        </div>
                        <Button
                          onClick={() => window.open(project.demo!, "_blank")}
                          variant="outline"
                          size="sm"
                          className="w-full transition-all duration-300"
                          style={{
                            borderColor: `${PALETTE.greenMid}88`,
                            color: PALETTE.textMain,
                            backgroundColor: "transparent",
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Demo
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>

          {/* Project lainnya */}
          <BlurFade delay={0.38} inView>
            <Card className="mt-6 border shadow-xl" style={surfaceStyle()}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,51,51,0.35), rgba(67,153,96,0.35))",
                    }}
                  >
                    <Star
                      className="w-5 h-5"
                      style={{ color: PALETTE.greenLight }}
                    />
                  </div>
                  <div>
                    <CardTitle
                      className="text-lg"
                      style={{ color: PALETTE.textMain }}
                    >
                      Project Lainnya
                    </CardTitle>
                    <CardDescription style={{ color: PALETTE.textMuted }}>
                      Lihat project lain yang telah saya kerjakan
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lensProjects
                    .filter((p) => p.id !== project.id)
                    .slice(0, 3)
                    .map((otherProject) => (
                      <Card
                        key={otherProject.id}
                        className="cursor-pointer border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
                        style={surfaceStyle()}
                        onClick={() =>
                          router.push(`/projects/${otherProject.id}`)
                        }
                      >
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={otherProject.img}
                            alt={otherProject.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                            sizes="(max-width: 768px) 100vw, 600px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <CardContent className="p-4">
                          <h3
                            className="font-semibold mb-1"
                            style={{ color: PALETTE.textMain }}
                          >
                            {otherProject.title}
                          </h3>
                          <p
                            className="text-xs line-clamp-2"
                            style={{ color: PALETTE.textMuted }}
                          >
                            {otherProject.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {otherProject.tech.slice(0, 2).map((tech) => (
                              <span
                                key={tech}
                                className="px-1.5 py-0.5 text-xs rounded-md font-medium border"
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(13,13,13,0.5), rgba(0,51,51,0.28))",
                                  color: PALETTE.textSoft,
                                  borderColor: `rgba(0,51,51,${OPACITY.border})`,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                            {otherProject.tech.length > 2 && (
                              <span
                                className="px-1.5 py-0.5 text-xs rounded-md font-medium border"
                                style={{
                                  backgroundColor: "rgba(13,13,13,0.4)",
                                  color: PALETTE.textSoft,
                                  borderColor: `rgba(0,51,51,${OPACITY.border})`,
                                }}
                              >
                                +{otherProject.tech.length - 2}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </section>

      {/* Global styles (sama) */}
      <style jsx global>{`
        :root {
          --text-main: ${PALETTE.textMain};
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: ${PALETTE.dark};
          color: ${PALETTE.textMain};
          font-feature-settings: "liga" 1, "calt" 1;
        }
        .reduce-flicker {
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform, opacity;
        }
        section.reduce-flicker {
          contain: paint;
        }
      `}</style>
    </main>
  );
}
