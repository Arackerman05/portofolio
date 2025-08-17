/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Briefcase,
  Calendar,
  ChevronRight,
  Code,
  Database,
  Download,
  Github,
  Globe,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Smartphone,
  Sparkles,
  Star,
  User,
  Zap,
} from "lucide-react";

import { lensProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

/* ====== DYNAMIC IMPORT (komponen berat) ====== */
const FaultyTerminal = dynamic(
  () => import("./components/FaultyTerminal/FaultyTerminal"),
  { ssr: false }
);
const Stack = dynamic(() => import("./components/Stack/Stack"), { ssr: false });
const Lens = dynamic(
  () => import("@/components/magicui/lens").then((m) => m.Lens),
  { ssr: false }
);
const SmoothCursor = dynamic(
  () =>
    import("@/components/magicui/smooth-cursor").then((m) => m.SmoothCursor),
  { ssr: false }
);
const IconCloud = dynamic(
  () => import("@/components/magicui/icon-cloud").then((m) => m.IconCloud),
  { ssr: false }
);

/* ====== THEME TOKENS (seragam) ====== */
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

// intensitas global
const OPACITY = {
  surfaceA: 0.52,
  surfaceB: 0.34,
  border: 0.52,
  overlayTop: 0.9,
  overlayMid: 0.8,
  overlayEnd: 0.6,
} as const;

// helper style panel seragam — ketik eksplisit supaya aman untuk TS
const surfaceStyle = (
  a: number = OPACITY.surfaceA,
  b: number = OPACITY.surfaceB,
  angle: number = 135
): React.CSSProperties => ({
  background: `linear-gradient(${angle}deg, rgba(13,13,13,${a}), rgba(0,51,51,${b}))`,
  borderColor: `rgba(0,51,51,${OPACITY.border})`,
});

/* ====== DATA ====== */
type HeroImage = { id: number; img: string };
// Jangan `as const` agar tidak jadi readonly (menyesuaikan kebutuhan komponen Stack)
const heroImages: HeroImage[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=500&auto=format&fit=crop",
  },
];

// —> logo pasti muncul (termasuk Framer)
const siteLogos = [
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", src: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
  { name: "Framer Motion", src: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "shadcn/ui", src: "https://cdn.simpleicons.org/shadcnui/ffffff" },
] as const;

const NAV_ITEMS = [
  { key: "home", label: "Beranda", Icon: Home },
  { key: "about", label: "Tentang", Icon: User },
  { key: "education", label: "Pendidikan", Icon: GraduationCap },
  { key: "xp", label: "Pengalaman & Proyek", Icon: Briefcase },
  { key: "skills", label: "Keahlian", Icon: Code },
  { key: "contact", label: "Kontak", Icon: Phone },
] as const;

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ====== Icon Cloud (disesuaikan dengan keahlian) ====== */
const skillSlugs = [
  // Frontend
  "html5",
  "css3",
  "javascript",
  "typescript",
  "react",
  "nextdotjs",
  "tailwindcss",
  // Mobile
  "flutter",
  "dart",
  // Backend & DB
  "java",
  "python",
  "nodedotjs",
  "mysql",
  // Tools / Design
  "figma",
  "git",
  "github",
  "visualstudiocode",
] as const;

const IconCloudDemo = memo(function IconCloudDemo() {
  const images = useMemo(
    () =>
      skillSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/eafbe0`),
    []
  );

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden will-change-transform">
      <IconCloud images={images} />
    </div>
  );
});

export default function Page() {
  const router = useRouter();

  // === state untuk highlight dock
  const [active, setActive] = useState<string>("home");
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // === RESPONSIVE / LIGHTHOUSE-FRIENDLY FLAGS
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pauseGL, setPauseGL] = useState(false);

  useEffect(() => {
    setMounted(true);

    // match media untuk mobile & prefers-reduced-motion
    const mm = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMM = () => setIsMobile(mm.matches);
    const updateRM = () => setReducedMotion(rm.matches);
    updateMM();
    updateRM();

    mm.addEventListener?.("change", updateMM);
    rm.addEventListener?.("change", updateRM);

    // pause WebGL saat tab tidak aktif
    const vis = () => setPauseGL(document.hidden);
    document.addEventListener("visibilitychange", vis);

    return () => {
      mm.removeEventListener?.("change", updateMM);
      rm.removeEventListener?.("change", updateRM);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  // highlight dock saat scroll
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.key);
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id && vis.target.id !== activeRef.current) {
          setActive(vis.target.id);
        }
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleDownloadCV = useCallback(() => {
    const a = document.createElement("a");
    a.href = "/AbdurRouf_CV.pdf";
    a.download = "AbdurRouf_CV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const handleViewProject = useCallback(
    (projectId: string) => router.push(`/projects/${projectId}`),
    [router]
  );

  // ==== Style object dimemo agar tidak bikin object baru tiap render ====
  const surface = useMemo(() => surfaceStyle(), []);
  const surface90 = useMemo(() => surfaceStyle(0.5, 0.32, 90), []);
  const surfaceAlt = useMemo(() => surfaceStyle(0.6, 0.3), []);
  const chipBg = useMemo<React.CSSProperties>(
    () => ({
      backgroundColor: "rgba(13,13,13,0.36)",
      border: `1px solid rgba(0,51,51,${OPACITY.border})`,
    }),
    []
  );
  const chipBgSoft = useMemo<React.CSSProperties>(
    () => ({
      backgroundColor: "rgba(13,13,13,0.48)",
      border: `1px solid rgba(0,51,51,${OPACITY.border})`,
    }),
    []
  );
  const darkGlass = useMemo<React.CSSProperties>(
    () => ({
      backgroundColor: "rgba(13,13,13,0.58)",
      borderColor: `rgba(0,51,51,${OPACITY.border})`,
    }),
    []
  );

  // ==== Background dimemo agar tidak ikut re-render ====
  const BackgroundLayer = useMemo(
    () => (
      <div
        className="fixed inset-0 -z-30"
        style={{ backgroundColor: PALETTE.dark }}
        aria-hidden
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* Jika reduce motion, atau mobile, pakai mode hemat / fallback */}
          {mounted && !reducedMotion ? (
            isMobile ? (
              // LITE MODE di mobile
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
            // Fallback static gradient bila reduce motion / belum mounted
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 600px at 30% 20%, rgba(67,153,96,0.20), transparent), radial-gradient(900px 500px at 80% 80%, rgba(11,102,72,0.18), transparent)",
              }}
            />
          )}
        </div>
        {/* scrim – lebih pekat sedikit agar kontras stabil */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(13,13,13,${OPACITY.overlayTop}) 0%, rgba(13,13,13,${OPACITY.overlayMid}) 55%, rgba(13,13,13,${OPACITY.overlayEnd}) 100%)`,
          }}
        />
      </div>
    ),
    [mounted, isMobile, reducedMotion, pauseGL]
  );

  return (
    <main className="relative min-h-screen overflow-hidden font-sans tracking-tight">
      {/* Head untuk preconnect CDN gambar */}
      <Head>
        <meta name="theme-color" content="#0d0d0d" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://cdn.simpleicons.org"
          crossOrigin=""
        />
      </Head>

      {/* Smooth cursor hanya di desktop & jika tidak reduce motion */}
      {mounted && !isMobile && !reducedMotion && <SmoothCursor />}

      {/* ==== Background (memoized) ==== */}
      {BackgroundLayer}

      {/* ====== HOME ====== */}
      <section
        id="home"
        className="reduce-flicker relative z-10 px-4 md:px-6 lg:px-8 pt-12 md:pt-16 pb-8"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1200px 800px",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[1fr,1fr] gap-6 lg:gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4 lg:space-y-5">
              <BlurFade delay={0.15} inView>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg ring-1 text-sm"
                  style={{
                    backgroundColor: "rgba(0,51,51,0.9)",
                    borderColor: `rgba(0,51,51,${OPACITY.border})`,
                    color: PALETTE.textMain,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: PALETTE.greenLight }}
                  />
                  <span className="font-semibold">Available for work</span>
                </div>
              </BlurFade>

              {/* Title */}
              <div className="space-y-0">
                <BlurFade delay={0.2} inView>
                  <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight text-[--text-main]">
                    Hai, Saya
                  </h1>
                </BlurFade>
                <BlurFade delay={0.25} inView>
                  <h2
                    className="text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #89cc89, #439960, #0b6648)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Abdur Rouf
                  </h2>
                </BlurFade>
              </div>

              <BlurFade delay={0.3} inView>
                <p
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: PALETTE.textMain }}
                >
                  Fullstack Developer
                </p>
              </BlurFade>

              <BlurFade delay={0.35} inView>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: PALETTE.textSoft }}
                >
                  Fokus pada frontend interaktif dan backend yang efisien.
                  Menciptakan solusi digital yang user-friendly dan inovatif.
                </p>
              </BlurFade>

              {/* Highlight */}
              <BlurFade delay={0.38} inView>
                <div className="p-4 rounded-lg border" style={surface}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PALETTE.greenLight }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: PALETTE.textMain }}
                    >
                      Spesialisasi
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: PALETTE.textSubtle }}
                  >
                    Mengembangkan aplikasi web modern dengan React, Next.js, dan
                    Node.js. Berpengalaman dalam database management, API
                    development, dan UI/UX implementation.
                  </p>
                </div>
              </BlurFade>

              {/* Buttons */}
              <BlurFade delay={0.4} inView>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button
                    onClick={handleDownloadCV}
                    size="default"
                    className="transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] px-4 py-2"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.greenDark})`,
                      color: PALETTE.textMain,
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => scrollToId("contact")}
                    className="border-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] px-4 py-2"
                    style={{
                      borderColor: `${PALETTE.greenMid}88`,
                      color: PALETTE.textMain,
                      backgroundColor: "transparent",
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi Saya
                  </Button>
                </div>
              </BlurFade>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { value: "6+", label: "Projects" },
                  { value: "2+", label: "Years" },
                  { value: "10+", label: "Tech Stack" },
                ].map((s, i) => (
                  <BlurFade key={s.label} delay={0.45 + i * 0.05} inView>
                    <div
                      className="text-center p-3 rounded-lg border shadow-lg"
                      style={surface}
                    >
                      <div
                        className="text-xl md:text-2xl font-extrabold"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, #89cc89, #439960)",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: PALETTE.textSoft }}
                      >
                        {s.label}
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <BlurFade delay={0.3} inView>
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <div
                      className="absolute -inset-4 rounded-full blur-2xl"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(137,204,137,0.15), rgba(67,153,96,0.15), rgba(11,102,72,0.15))",
                      }}
                    />
                    <Stack
                      randomRotation
                      sensitivity={180}
                      sendToBackOnClick={false}
                      cardDimensions={{ width: 180, height: 180 }}
                      cardsData={heroImages}
                    />
                  </div>
                </div>
              </BlurFade>

              {/* Skills Preview */}
              <BlurFade delay={0.5} inView>
                <div
                  className="p-4 rounded-xl border shadow-lg"
                  style={surface}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Code
                      className="w-5 h-5"
                      style={{ color: PALETTE.greenLight }}
                    />
                    <h3
                      className="text-lg font-bold"
                      style={{ color: PALETTE.textMain }}
                    >
                      Core Skills
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Frontend", "Backend", "Database", "DevOps"].map(
                      (skill, idx) => (
                        <BlurFade key={skill} delay={0.55 + idx * 0.05} inView>
                          <div
                            className="flex items-center gap-2 p-2 rounded-lg"
                            style={chipBg}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: PALETTE.greenLight }}
                            />
                            <span
                              className="text-sm font-medium"
                              style={{ color: PALETTE.textSubtle }}
                            >
                              {skill}
                            </span>
                          </div>
                        </BlurFade>
                      )
                    )}
                  </div>
                </div>
              </BlurFade>

              {/* Location */}
              <BlurFade delay={0.6} inView>
                <div
                  className="p-4 rounded-xl border shadow-lg"
                  style={surface}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin
                      className="w-5 h-5"
                      style={{ color: PALETTE.greenLight }}
                    />
                    <h3
                      className="text-lg font-bold"
                      style={{ color: PALETTE.textMain }}
                    >
                      Location & Availability
                    </h3>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Globe
                        className="w-4 h-4"
                        style={{ color: PALETTE.greenLight }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: PALETTE.textSubtle }}
                      >
                        Lumajang, Jawa Timur, Indonesia
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm"
                        style={{ color: PALETTE.textSubtle }}
                      >
                        WIB (UTC+7) • GMT+7
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: PALETTE.greenLight }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: PALETTE.textSoft }}
                      >
                        Available 24/7 • Flexible hours
                      </span>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(67,153,96,0.34)",
                        color: PALETTE.textMain,
                      }}
                    >
                      Remote Ready
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Built with */}
          <BlurFade delay={0.65} inView>
            <div
              className="mt-8 md:mt-10 p-4 rounded-xl border shadow-xl"
              style={surface90}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(67,153,96,0.3), rgba(137,204,137,0.3))",
                  }}
                >
                  <Sparkles
                    className="w-4 h-4"
                    style={{ color: PALETTE.greenLight }}
                  />
                </div>
                <h3
                  className="text-base md:text-lg font-bold text-center"
                  style={{ color: PALETTE.textMain }}
                >
                  Website ini dibangun dengan
                </h3>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3">
                {siteLogos.map((l, idx) => (
                  <BlurFade key={l.name} delay={0.7 + idx * 0.05} inView>
                    <div
                      className="flex flex-col items-center justify-center gap-1.5 p-2 md:p-3 rounded-lg transition-all duration-300 hover:scale-105"
                      style={chipBgSoft}
                    >
                      <img
                        src={l.src}
                        alt={l.name}
                        className="h-6 w-6 md:h-8 md:w-8 object-contain"
                        width={32}
                        height={32}
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        className="text-xs"
                        style={{ color: PALETTE.textSubtle }}
                      >
                        {l.name}
                      </span>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section
        id="about"
        className="reduce-flicker min-h-screen flex items-center px-4 md:px-6 py-16"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1200px 900px",
          } as React.CSSProperties
        }
      >
        <div className="w-full max-w-6xl mx-auto">
          <BlurFade inView delay={0.1}>
            <h2
              className="text-center text-4xl lg:text-5xl font-extrabold mb-10"
              style={{ color: PALETTE.textMain }}
            >
              Tentang Saya
            </h2>
          </BlurFade>

          {/* Main Profile Card */}
          <BlurFade inView delay={0.15}>
            <Card className="mb-8 border shadow-2xl" style={surfaceAlt}>
              <CardContent className="p-8 md:p-10">
                <div className="grid md:grid-cols-[auto,1fr] gap-8 items-start">
                  {/* Profile Avatar/Icon */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative">
                      <div
                        className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,51,51,0.4), rgba(67,153,96,0.4))",
                        }}
                      >
                        <User
                          className="w-12 h-12 md:w-16 md:h-16"
                          style={{ color: PALETTE.greenLight }}
                        />
                      </div>
                      {/* Animated ring */}
                      <div
                        className="absolute -inset-2 rounded-3xl animate-pulse"
                        style={{
                          background: `linear-gradient(135deg, ${PALETTE.greenLight}20, ${PALETTE.greenMid}20)`,
                          filter: "blur(8px)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Text */}
                  <div className="text-center md:text-left space-y-4">
                    <h3
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: PALETTE.textMain }}
                    >
                      Abdur Rouf
                    </h3>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: PALETTE.greenLight }}
                    >
                      Fullstack Developer & Student
                    </p>
                    <p
                      className="text-base leading-relaxed max-w-2xl"
                      style={{ color: PALETTE.textMuted }}
                    >
                      Mahasiswa semester 5 Teknologi Informasi di Universitas
                      Widya Gama Lumajang. Passionate dalam pengembangan
                      aplikasi web dan mobile dengan fokus pada solusi teknologi
                      yang efisien dan inovatif.
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {[
                        {
                          icon: Calendar,
                          label: "Semester 5",
                          value: "2022-Now",
                        },
                        {
                          icon: MapPin,
                          label: "Lumajang",
                          value: "Jawa Timur",
                        },
                        { icon: Zap, label: "Status", value: "Available" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="flex items-center gap-2"
                        >
                          <stat.icon
                            className="w-4 h-4"
                            style={{ color: PALETTE.greenLight }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: PALETTE.textSoft }}
                          >
                            <strong>{stat.value}</strong> {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                Icon: Star,
                title: "Passion & Goals",
                desc: "Senang belajar teknologi baru dan mengembangkan proyek inovatif yang berdampak positif.",
                gradient: "from-[#003333]/30 to-[#439960]/30",
              },
              {
                Icon: Zap,
                title: "Work Style",
                desc: "Aktif mencari pengalaman dan tantangan baru dalam dunia teknologi informasi.",
                gradient: "from-[#439960]/30 to-[#89cc89]/30",
              },
              {
                Icon: Globe,
                title: "Vision",
                desc: "Berkontribusi dalam ekosistem teknologi Indonesia melalui solusi digital yang bermakna.",
                gradient: "from-[#0b6648]/30 to-[#89cc89]/30",
              },
            ].map(({ Icon, title, desc, gradient }, i) => (
              <BlurFade key={title} inView delay={0.2 + i * 0.1}>
                <Card
                  className="group h-full border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  style={surface}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: PALETTE.greenLight }}
                      />
                    </div>
                    <h3
                      className="font-bold text-lg mb-3"
                      style={{ color: PALETTE.textMain }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: PALETTE.textMuted }}
                    >
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EDUCATION ====== */}
      <section
        id="education"
        className="reduce-flicker relative z-10 px-6 md:px-8 lg:px-12 py-16 md:py-20"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1200px 900px",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <BlurFade delay={0.15} inView>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
                style={{ color: PALETTE.textMain }}
              >
                Perjalanan Pendidikan
              </h2>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p
                className="text-lg mt-4 max-w-2xl mx-auto"
                style={{ color: PALETTE.textMuted }}
              >
                Timeline pendidikan yang membentuk fondasi pengetahuan saya
              </p>
            </BlurFade>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-px"
              style={{ backgroundColor: `${PALETTE.greenMid}40` }}
            />

            <div className="space-y-8 md:space-y-12">
              {[
                {
                  name: "Institut Teknologi dan Bisnis Widya Gama Lumajang",
                  degree: "S1 Teknologi Informasi",
                  period: "2022 - Sekarang",
                  status: "Semester 5",
                  isActive: true,
                  icon: GraduationCap,
                  details:
                    "Fokus pada pengembangan aplikasi dan sistem informasi",
                  color: "from-[#003333]/35 to-[#0b6648]/35",
                  position: "left",
                },
                {
                  name: "MA Raudhlatul Ulum",
                  degree: "Madrasah Aliyah",
                  period: "2019 - 2022",
                  status: "Lulus",
                  isActive: false,
                  icon: GraduationCap,
                  details: "Pendidikan menengah atas dengan fokus akademik",
                  color: "from-[#439960]/35 to-[#89cc89]/35",
                  position: "right",
                },
                {
                  name: "MTs Raudhlatul Ulum",
                  degree: "Madrasah Tsanawiyah",
                  period: "2016 - 2019",
                  status: "Lulus",
                  isActive: false,
                  icon: GraduationCap,
                  details:
                    "Pendidikan menengah pertama dengan dasar akademik yang kuat",
                  color: "from-[#003333]/35 to-[#439960]/35",
                  position: "left",
                },
                {
                  name: "MI Bustanul Ulum",
                  degree: "Madrasah Ibtidaiyah",
                  period: "2010 - 2016",
                  status: "Lulus",
                  isActive: false,
                  icon: GraduationCap,
                  details: "Fondasi pendidikan dasar dan pembentukan karakter",
                  color: "from-[#0b6648]/35 to-[#89cc89]/35",
                  position: "right",
                },
              ].map((edu, idx) => (
                <BlurFade key={edu.name} delay={0.25 + idx * 0.1} inView>
                  <div
                    className={`relative flex items-center ${
                      edu.position === "left"
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    } gap-4 md:gap-8`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 md:-ml-6 z-10 -ml-6">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                          edu.isActive ? "animate-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: PALETTE.dark,
                          borderColor: edu.isActive
                            ? PALETTE.greenLight
                            : PALETTE.greenMid,
                        }}
                      >
                        <edu.icon
                          className="w-5 h-5"
                          style={{
                            color: edu.isActive
                              ? PALETTE.greenLight
                              : PALETTE.greenMid,
                          }}
                        />
                      </div>
                      {edu.isActive && (
                        <div
                          className="absolute -inset-2 rounded-full animate-ping"
                          style={{ backgroundColor: `${PALETTE.greenLight}20` }}
                        />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-5/12 ml-16 md:ml-0">
                      <Card
                        className="group border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        style={surface}
                      >
                        <CardContent className="p-4 md:p-6">
                          {/* Mobile Layout */}
                          <div className="md:hidden">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`p-2 rounded-lg bg-gradient-to-r ${edu.color} group-hover:scale-110 transition-transform duration-300`}
                              >
                                <edu.icon
                                  className="w-5 h-5"
                                  style={{ color: PALETTE.textMain }}
                                />
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ml-auto ${
                                  edu.isActive ? "animate-pulse" : ""
                                }`}
                                style={{
                                  backgroundColor: edu.isActive
                                    ? `${PALETTE.greenLight}20`
                                    : `${PALETTE.greenMid}20`,
                                  color: edu.isActive
                                    ? PALETTE.greenLight
                                    : PALETTE.greenMid,
                                }}
                              >
                                {edu.status}
                              </span>
                            </div>

                            <h3
                              className="font-bold text-base mb-1"
                              style={{ color: PALETTE.textMain }}
                            >
                              {edu.name}
                            </h3>
                            <p
                              className="text-sm font-semibold mb-2"
                              style={{ color: PALETTE.greenLight }}
                            >
                              {edu.degree}
                            </p>
                            <p
                              className="text-xs mb-3 leading-relaxed"
                              style={{ color: PALETTE.textMuted }}
                            >
                              {edu.details}
                            </p>
                            <span
                              className="text-xs font-medium"
                              style={{ color: PALETTE.textSoft }}
                            >
                              {edu.period}
                            </span>
                          </div>

                          {/* Desktop Layout */}
                          <div className="hidden md:flex items-start gap-4">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-r ${edu.color} group-hover:scale-110 transition-transform duration-300`}
                            >
                              <edu.icon
                                className="w-6 h-6"
                                style={{ color: PALETTE.textMain }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3
                                className="font-bold text-lg mb-1"
                                style={{ color: PALETTE.textMain }}
                              >
                                {edu.name}
                              </h3>
                              <p
                                className="text-base font-semibold mb-2"
                                style={{ color: PALETTE.greenLight }}
                              >
                                {edu.degree}
                              </p>
                              <p
                                className="text-sm mb-3"
                                style={{ color: PALETTE.textMuted }}
                              >
                                {edu.details}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-sm font-medium"
                                  style={{ color: PALETTE.textSoft }}
                                >
                                  {edu.period}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    edu.isActive ? "animate-pulse" : ""
                                  }`}
                                  style={{
                                    backgroundColor: edu.isActive
                                      ? `${PALETTE.greenLight}20`
                                      : `${PALETTE.greenMid}20`,
                                    color: edu.isActive
                                      ? PALETTE.greenLight
                                      : PALETTE.greenMid,
                                  }}
                                >
                                  {edu.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== EXPERIENCE + PROJECTS ====== */}
      <section
        id="xp"
        className="reduce-flicker relative z-10 px-6 md:px-8 lg:px-12 py-16 md:py-20"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1200px 1200px",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <BlurFade delay={0.15} inView>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
                style={{ color: PALETTE.textMain }}
              >
                Pengalaman & Proyek
              </h2>
            </BlurFade>
          </div>

          <BlurFade delay={0.2} inView>
            <Card
              className="bg-gradient-to-r backdrop-blur-sm border shadow-xl mb-8"
              style={surface90}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(67,153,96,0.32), rgba(137,204,137,0.32))",
                    }}
                  >
                    <Code
                      className="w-6 h-6"
                      style={{ color: PALETTE.greenLight }}
                    />
                  </div>
                  <div>
                    <CardTitle
                      className="text-xl"
                      style={{ color: PALETTE.textMain }}
                    >
                      Fullstack Developer
                    </CardTitle>
                    <CardDescription
                      className="flex items-center gap-2 mt-1"
                      style={{ color: PALETTE.textMuted }}
                    >
                      <Calendar className="w-4 h-4" />
                      2023 - Sekarang • Personal Projects
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Flutter app admin–user",
                    "Sistem desktop Java untuk bisnis",
                    "UI/UX modern dengan Figma",
                    "Keputusan berbasis metode SAW",
                  ].map((item, idx) => (
                    <BlurFade key={item} delay={0.25 + idx * 0.05} inView>
                      <div
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{
                          backgroundColor: "rgba(13,13,13,0.5)",
                          border: `1px solid rgba(0,51,51,${OPACITY.border})`,
                          color: PALETTE.textSoft,
                        }}
                      >
                        <ChevronRight
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: PALETTE.greenMid }}
                        />
                        <span>{item}</span>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {lensProjects.map((project, idx) => (
              <BlurFade key={project.id ?? idx} delay={0.3 + idx * 0.05} inView>
                <Card
                  className="group relative h-full bg-gradient-to-br backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                  style={surface}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden h-44">
                      <Lens
                        zoomFactor={isMobile ? 1.35 : 2}
                        lensSize={isMobile ? 110 : 150}
                        isStatic={isMobile || reducedMotion}
                      >
                        <img
                          src={project.img}
                          alt={project.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 will-change-transform"
                          loading="lazy"
                          decoding="async"
                        />
                      </Lens>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <CardTitle
                      className="text-lg mb-2"
                      style={{ color: PALETTE.textMain }}
                    >
                      {project.title}
                    </CardTitle>
                    <CardDescription
                      className="mb-4 line-clamp-2"
                      style={{ color: PALETTE.textMuted }}
                    >
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-[11px] rounded-full font-medium border"
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
                      {project.tech.length > 3 && (
                        <span
                          className="px-3 py-1 text-[11px] rounded-full font-medium border"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(13,13,13,0.5), rgba(0,51,51,0.28))",
                            color: "#9fdc9f",
                            borderColor: `rgba(0,51,51,${OPACITY.border})`,
                          }}
                        >
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto px-5 pb-5">
                    <Button
                      onClick={() => handleViewProject(project.id)}
                      className="w-full transition-all duration-300"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.greenDark})`,
                        color: PALETTE.textMain,
                      }}
                    >
                      View Project
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SKILLS ====== */}
      <section
        id="skills"
        className="reduce-flicker min-h-screen flex items-center px-4 md:px-6 py-16"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1200px 900px",
          } as React.CSSProperties
        }
      >
        <div className="w-full max-w-7xl mx-auto">
          <BlurFade inView delay={0.1}>
            <h2
              className="text-center text-4xl lg:text-5xl font-extrabold mb-10"
              style={{ color: PALETTE.textMain }}
            >
              Keahlian Teknologi
            </h2>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {[
              {
                title: "Frontend Development",
                iconBg: "from-[#003333]/35 to-[#0b6648]/35",
                icon: <Globe className="w-6 h-6" />,
                desc: "Membangun antarmuka responsif dan interaktif.",
                techs: [
                  "HTML5",
                  "CSS3",
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                ],
              },
              {
                title: "Mobile Development",
                iconBg: "from-[#439960]/35 to-[#89cc89]/35",
                icon: <Smartphone className="w-6 h-6" />,
                desc: "Aplikasi mobile cross-platform performa tinggi.",
                techs: ["Flutter", "Dart"],
              },
              {
                title: "Backend & Database",
                iconBg: "from-[#003333]/35 to-[#439960]/35",
                icon: <Database className="w-6 h-6" />,
                desc: "Backend robust & manajemen data efisien.",
                techs: ["Java", "Python", "MySQL"],
              },
              {
                title: "Design & Prototyping",
                iconBg: "from-[#0b6648]/35 to-[#89cc89]/35",
                icon: <Palette className="w-6 h-6" />,
                desc: "UI/UX menarik dengan prototipe interaktif.",
                techs: ["Figma"],
              },
            ].map((c, i) => (
              <BlurFade key={c.title} inView delay={0.15 + i * 0.05}>
                <Card
                  className="h-full border shadow-xl hover:shadow-2xl transition-[transform,box-shadow] duration-300 hover:scale-[1.01]"
                  style={surface}
                >
                  <CardContent className="p-6 md:p-7">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${c.iconBg}`}
                      >
                        <span
                          className="text-[--green-light]"
                          style={{ color: PALETTE.greenLight }}
                        >
                          {c.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3
                          className="font-bold text-xl mb-2"
                          style={{ color: PALETTE.textMain }}
                        >
                          {c.title}
                        </h3>
                        <p
                          className="text-[15px] mb-4"
                          style={{ color: PALETTE.textMuted }}
                        >
                          {c.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {c.techs.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1.5 text-sm rounded-lg font-medium border"
                              style={{
                                backgroundColor: "rgba(13,13,13,0.5)",
                                color: PALETTE.textSoft,
                                borderColor: `rgba(0,51,51,${OPACITY.border})`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>

          {/* ===== Icon Cloud ===== */}
          <BlurFade inView delay={0.35}>
            <Card
              className="mt-8 border shadow-xl overflow-hidden"
              style={surface}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className="text-lg md:text-xl"
                  style={{ color: PALETTE.textMain }}
                >
                  Teknologi yang saya pakai — Icon Cloud
                </CardTitle>
                <CardDescription style={{ color: PALETTE.textMuted }}>
                  Visualisasi ringkas tools & stack yang sering saya pakai.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[260px] sm:h-[320px]">
                  <IconCloudDemo />
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section
        id="contact"
        className="reduce-flicker relative z-10 px-6 md:px-8 lg:px-12 py-16 md:py-20"
        style={
          {
            contentVisibility: "auto",
            containIntrinsicSize: "1200px 800px",
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <BlurFade delay={0.15} inView>
              <div className="relative inline-block">
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
                  style={{ color: PALETTE.textMain }}
                >
                  Mari Berkolaborasi
                </h2>
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
                  style={{ backgroundColor: PALETTE.greenLight }}
                />
              </div>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p
                className="text-lg mt-6 max-w-2xl mx-auto"
                style={{ color: PALETTE.textMuted }}
              >
                Siap untuk diskusi proyek atau kolaborasi? Hubungi saya melalui
                platform favorit Anda
              </p>
            </BlurFade>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Email",
                icon: Mail,
                url: "mailto:arackerman05@gmail.com",
                detail: "arackerman05@gmail.com",
                description: "Untuk diskusi formal dan proposal kerja sama",
                isPrimary: true,
              },
              {
                title: "WhatsApp",
                icon: MessageCircle,
                url: "https://wa.me/6283132974120?text=Halo%20Abdur%20Rouf,%20saya%20tertarik%20dengan%20portfolio%20Anda",
                detail: "+62 831-3297-4120",
                description: "Chat langsung untuk komunikasi cepat",
                isPrimary: true,
              },
              {
                title: "LinkedIn",
                icon: Linkedin,
                url: "https://www.linkedin.com/in/abdur-rouf-59aa23298/",
                detail: "Abdur Rouf",
                description: "Terhubung untuk networking profesional",
              },
              {
                title: "GitHub",
                icon: Github,
                url: "https://github.com/Arackerman05",
                detail: "Arackerman05",
                description: "Lihat kode dan kontribusi proyek saya",
              },
            ].map((contact, idx) => (
              <BlurFade key={contact.title} delay={0.25 + idx * 0.1} inView>
                <Card
                  className={`group relative overflow-hidden border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                    contact.isPrimary ? "md:col-span-1" : ""
                  }`}
                  style={surface}
                  onClick={() => window.open(contact.url, "_blank")}
                >
                  {/* Background Gradient Animation */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${PALETTE.greenLight}10, ${PALETTE.greenMid}10)`,
                    }}
                  />

                  <CardContent className="relative p-8">
                    <div className="flex items-start gap-6">
                      {/* Icon Container */}
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${PALETTE.greenLight}20, ${PALETTE.greenMid}20)`,
                          }}
                        >
                          <contact.icon
                            className="w-8 h-8"
                            style={{ color: PALETTE.greenLight }}
                          />
                        </div>
                        {/* Pulse effect */}
                        <div
                          className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                          style={{ backgroundColor: `${PALETTE.greenLight}15` }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3
                          className="font-bold text-xl mb-2 group-hover:text-[--green-light] transition-colors duration-300"
                          style={{ color: PALETTE.textMain }}
                        >
                          {contact.title}
                        </h3>
                        <p
                          className="font-mono text-sm mb-3 break-all"
                          style={{ color: PALETTE.greenLight }}
                        >
                          {contact.detail}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: PALETTE.textMuted }}
                        >
                          {contact.description}
                        </p>
                      </div>

                      {/* Arrow Icon */}
                      <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                        <ChevronRight
                          className="w-5 h-5"
                          style={{ color: PALETTE.textMuted }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  {/* Highlight Border */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${PALETTE.greenLight}, ${PALETTE.greenMid})`,
                    }}
                  />
                </Card>
              </BlurFade>
            ))}
          </div>

          {/* Call to Action */}
          <BlurFade delay={0.6} inView>
            <div className="mt-12 text-center">
              <Card className="inline-block border shadow-xl" style={surface}>
                <CardContent className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: PALETTE.greenLight }}
                    />
                    <span
                      className="font-semibold text-lg"
                      style={{ color: PALETTE.textMain }}
                    >
                      Waktu respon : Biasanya dalam 24 jam
                    </span>
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: PALETTE.greenLight }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ==== DOCK ==== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <TooltipProvider>
          <div
            className="rounded-2xl border backdrop-blur-xl shadow-2xl p-0"
            style={darkGlass}
          >
            <Dock
              direction="middle"
              className="!bg-transparent !p-0 !m-0 !border-0 !shadow-none gap-2"
            >
              {NAV_ITEMS.map(({ key, label, Icon }) => (
                <DockIcon key={key} className="!m-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => scrollToId(key)}
                        aria-label={label}
                        data-active={active === key}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full",
                          "!hover:bg-[#89cc89]/12 focus-visible:ring-0 focus:outline-none",
                          "data-[active=true]:bg-[#89cc89]/10 data-[active=true]:ring-1 data-[active=true]:ring-[#89cc89]/25"
                        )}
                        style={{
                          color:
                            active === key
                              ? PALETTE.greenLight
                              : PALETTE.textMuted,
                        }}
                      >
                        <Icon className="size-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={8}
                      className="border"
                      style={{
                        backgroundColor: "rgba(13,13,13,0.92)",
                        borderColor: `rgba(0,51,51,${OPACITY.border})`,
                        color: PALETTE.textMain,
                      }}
                    >
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
            </Dock>
          </div>
        </TooltipProvider>
      </div>

      {/* Global styles */}
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
        /* batasi area repaint per section agar tidak memicu flash putih */
        section.reduce-flicker {
          contain: paint;
        }
      `}</style>
    </main>
  );
}
