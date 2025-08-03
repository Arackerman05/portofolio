"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { Lens } from "@/components/magicui/lens";
import { Button } from "@/components/ui/button";
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
import { lensProjects } from "@/lib/projects";
import {
  Award,
  Briefcase,
  Calendar,
  Code,
  Database,
  Download,
  FolderOpen,
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
  Star,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Balatro from "./components/Balatro/Balatro";
import Lanyard from "./components/Lanyard/Lanyard";
import Stack from "./components/Stack/Stack";

const images = [
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

const techImages = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
];

const techCategories = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-5 h-5" />,
    techs: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
    description:
      "Membangun antarmuka pengguna yang responsif dan interaktif dengan teknologi web modern.",
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-5 h-5" />,
    techs: ["Flutter", "Dart"],
    description:
      "Mengembangkan aplikasi mobile cross-platform dengan performa native.",
  },
  {
    title: "Backend & Database",
    icon: <Database className="w-5 h-5" />,
    techs: ["Java", "Python", "MySQL"],
    description:
      "Membangun sistem backend yang robust dan mengelola database dengan efisien.",
  },
  {
    title: "Design & Prototyping",
    icon: <Palette className="w-5 h-5" />,
    techs: ["Figma"],
    description:
      "Merancang UI/UX yang menarik dan user-friendly dengan prototipe interaktif.",
  },
];

export default function HomePage() {
  const router = useRouter();

  // Refs untuk setiap section
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Function untuk scroll ke section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Function untuk handle download CV
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/AbdurRouf_CV.pdf";
    link.download = "AbdurRouf_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function untuk handle view project
  const handleViewProject = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <main className="relative h-screen overflow-hidden p-6 py-6">
      {/* Background Balatro */}
      <div className="absolute inset-0 -z-30">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={1100}
          color1={"123458"}
          color2={"D4C9BE"}
          color3={"F1EFEC"}
        />
      </div>

      {/* Lanyard - Hide on mobile, no pointer events on mobile */}
      <div className="fixed top-0 right-0 h-full w-1/3 z-0 pointer-events-none lg:pointer-events-auto hidden lg:block">
        <Lanyard fov={8} />
      </div>

      {/* Dock Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <TooltipProvider>
          <Dock
            iconSize={48}
            iconMagnification={64}
            iconDistance={120}
            className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg"
          >
            <DockIcon
              onClick={() => scrollToSection(homeRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <Home className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Beranda</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon
              onClick={() => scrollToSection(aboutRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tentang Saya</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon
              onClick={() => scrollToSection(experienceRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <Briefcase className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pengalaman Kerja</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon
              onClick={() => scrollToSection(educationRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <GraduationCap className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pendidikan</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon
              onClick={() => scrollToSection(projectsRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <FolderOpen className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Proyek Terakhir</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon
              onClick={() => scrollToSection(skillsRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <Code className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Keahlian Teknologi</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon
              onClick={() => scrollToSection(contactRef)}
              className="hover:bg-white/20 transition-colors"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <Phone className="w-6 h-6 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kontak</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>

      {/* Konten */}
      <div
        className="relative z-10 max-w-2xl w-full h-full overflow-y-scroll mx-auto backdrop-blur-sm bg-white/20 p-6 pt-10 pb-24 space-y-14 rounded-xl shadow-lg"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Enhanced Header */}
        <section ref={homeRef} className="space-y-6">
          {/* Main Hero Section */}
          <div className="relative">
            <BlurFade delay={0.25} inView>
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100/50 backdrop-blur-sm rounded-full border border-sky-200/30">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-sky-700">
                      Available for work
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                    Hai, Saya
                    <span className="block bg-gradient-to-r from-sky-600 to-black bg-clip-text text-transparent">
                      Abdur Rouf
                    </span>
                  </h1>

                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    Fullstack Developer
                  </p>

                  <p className="text-gray-600 text-base leading-relaxed max-w-md">
                    Fokus pada frontend interaktif dan backend yang efisien.
                    Menciptakan solusi digital yang user-friendly dan inovatif.
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      onClick={handleDownloadCV}
                      className="bg-black text-white hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 px-6 py-2"
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => scrollToSection(contactRef)}
                      className="border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-300"
                    >
                      Hubungi Saya
                    </Button>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-sky-200/20 to-transparent rounded-full blur-xl"></div>
                    <Stack
                      randomRotation
                      sensitivity={180}
                      sendToBackOnClick={false}
                      cardDimensions={{ width: 140, height: 140 }}
                      cardsData={images}
                    />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Quick Stats */}
          <BlurFade delay={0.5} inView>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <div className="text-2xl font-bold text-black">6+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <div className="text-2xl font-bold text-black">2+</div>
                <div className="text-sm text-gray-600">Years Learning</div>
              </div>
              <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <div className="text-2xl font-bold text-black">10+</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
            </div>
          </BlurFade>
        </section>

        {/* Enhanced About Section */}
        <section ref={aboutRef}>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-sky-600" />
              </div>
              Tentang Saya
            </h2>
          </BlurFade>

          <div className="space-y-6">
            <BlurFade delay={0.5} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <Star className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg mb-2">
                          Profil Singkat
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-justify">
                          Mahasiswa semester 5 Teknologi Informasi di
                          Universitas Widya Gama Lumajang. Passionate dalam
                          pengembangan aplikasi web dan mobile, dengan fokus
                          pada pembuatan solusi teknologi yang user-friendly dan
                          efisien.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg mb-2">
                          Passion & Goals
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Senang belajar teknologi baru dan mengembangkan
                          proyek-proyek inovatif. Berfokus pada pengembangan
                          aplikasi yang memberikan dampak positif dan pengalaman
                          pengguna yang luar biasa.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-black">
                            Lokasi
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Lumajang, Jawa Timur
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-black">
                            Status
                          </div>
                          <div className="text-sm text-gray-600">
                            Mahasiswa & Developer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </section>

        {/* Work Experience - Enhanced with consistent colors */}
        <section ref={experienceRef}>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-sky-600" />
              </div>
              Pengalaman & Proyek
            </h2>
          </BlurFade>
          <div className="space-y-4">
            <BlurFade delay={0.5} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <Code className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-black">
                        Fullstack Developer (Personal Projects)
                      </CardTitle>
                      <CardDescription className="text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        2023 - Sekarang
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Mengembangkan aplikasi mobile dengan Flutter
                        terintegrasi admin-user
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Membangun sistem desktop dengan Java untuk berbagai
                        kebutuhan bisnis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Merancang UI/UX dengan Figma untuk aplikasi modern
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Implementasi algoritma pengambilan keputusan dengan
                        metode SAW
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.7} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <Award className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-black">
                        Key Achievements
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Pencapaian dalam Pengembangan Proyek
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-black">6+</div>
                      <div className="text-sm text-gray-600">
                        Proyek Selesai
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-black">10+</div>
                      <div className="text-sm text-gray-600">
                        Teknologi Dikuasai
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </section>

        {/* Education - Enhanced with consistent colors */}
        <section ref={educationRef}>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-sky-600" />
              </div>
              Pendidikan
            </h2>
          </BlurFade>
          <div className="space-y-4">
            <BlurFade delay={0.5} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-black">
                        Institut Teknologi dan Bisnis Widya Gama Lumajang
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        S1 Teknologi Informasi
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-black">
                        Semester 5
                      </div>
                      <div className="text-xs text-gray-500">
                        2022 - Sekarang
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Lumajang, Jawa Timur</span>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.7} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-black">
                        MA Raudhlatul Ulum
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Madrasah Aliyah
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-black">
                        Lulus
                      </div>
                      <div className="text-xs text-gray-500">2019 - 2022</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </BlurFade>

            <BlurFade delay={0.9} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-black">
                        MTs Raudhlatul Ulum
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Madrasah Tsanawiyah
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-black">
                        Lulus
                      </div>
                      <div className="text-xs text-gray-500">2016 - 2019</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </BlurFade>

            <BlurFade delay={1.1} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-black">
                        MI Bustanul Ulum
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Madrasah Ibtidaiyah
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-black">
                        Lulus
                      </div>
                      <div className="text-xs text-gray-500">2010 - 2016</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </BlurFade>
          </div>
        </section>

        {/* Enhanced Projects with better Lens cards */}
        <section ref={projectsRef} className="space-y-6">
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-sky-600" />
              </div>
              Proyek Terakhir
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <div className="flex flex-col lg:flex-row lg:space-x-6 lg:overflow-x-auto lg:scrollbar-thin lg:scrollbar-thumb-gray-300 space-y-6 lg:space-y-0">
              {lensProjects && lensProjects.length > 0 ? (
                lensProjects.map((project, idx) => (
                  <Card
                    key={idx}
                    className="relative w-full lg:max-w-md bg-white/50 backdrop-blur-sm border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] lg:flex-shrink-0 group"
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Lens zoomFactor={2.5} lensSize={200} isStatic={false}>
                          <img
                            src={project.img}
                            alt={project.title}
                            width={500}
                            height={500}
                            className="object-cover h-48 w-full transition-transform duration-300 group-hover:scale-110"
                          />
                        </Lens>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                      <div className="space-y-3">
                        <CardTitle className="text-xl text-black mb-2 leading-tight font-bold">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-gray-700 leading-relaxed text-sm">
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tech.slice(0, 3).map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-2">
                      <Button
                        onClick={() => handleViewProject(project.id)}
                        className="bg-black hover:bg-gray-800 text-white w-full transition-all duration-300 hover:shadow-lg"
                      >
                        View Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">
                  <p>No projects available</p>
                </div>
              )}
            </div>
          </BlurFade>
        </section>

        {/* Enhanced Tech Skills with categories */}
        <section ref={skillsRef}>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-sky-600" />
              </div>
              Keahlian Teknologi
            </h2>
          </BlurFade>

          {/* Tech Categories */}
          <BlurFade delay={0.5} inView>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {techCategories.map((category, idx) => (
                <Card
                  key={idx}
                  className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {category.icon}
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-black text-lg">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {category.techs.map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className="px-2 py-1 bg-gray-100 text-black text-xs rounded-md font-medium border border-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </BlurFade>

          {/* Icon Cloud */}
          <BlurFade delay={0.7} inView>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/50 backdrop-blur-sm rounded-full border border-gray-200/30">
                <Zap className="w-4 h-4 text-black" />
                <span className="text-sm font-medium text-black">
                  Interactive Technology Stack
                </span>
              </div>
              <div className="flex justify-center">
                <IconCloud images={techImages} />
              </div>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Klik dan drag untuk berinteraksi dengan teknologi yang saya
                kuasai
              </p>
            </div>
          </BlurFade>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="space-y-6">
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-sky-600" />
              </div>
              Kontak Saya
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-3 p-6 h-auto bg-white/40 hover:bg-white/60 border border-white/30 transition-all duration-300"
                onClick={() =>
                  window.open("mailto:arackerman05@gmail.com", "_blank")
                }
              >
                <Mail className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold text-black">Email</div>
                  <div className="text-sm text-gray-600">
                    arackerman05@gmail.com
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-3 p-6 h-auto bg-white/40 hover:bg-white/60 border border-white/30 transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://wa.me/6283132974120?text=Halo%20Abdur%20Rouf,%20saya%20tertarik%20dengan%20portfolio%20Anda",
                    "_blank"
                  )
                }
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold text-black">WhatsApp</div>
                  <div className="text-sm text-gray-600">+62 831-3297-4120</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-3 p-6 h-auto bg-white/40 hover:bg-white/60 border border-white/30 transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/abdur-rouf-59aa23298/",
                    "_blank"
                  )
                }
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-black">LinkedIn</div>
                  <div className="text-sm text-gray-600">
                    linkedin.com/in/abdur-rouf-59aa23298
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-3 p-6 h-auto bg-white/40 hover:bg-white/60 border border-white/30 transition-all duration-300"
                onClick={() =>
                  window.open("https://github.com/Arackerman05", "_blank")
                }
              >
                <Github className="w-5 h-5 text-gray-800" />
                <div className="text-left">
                  <div className="font-semibold text-black">GitHub</div>
                  <div className="text-sm text-gray-600">
                    github.com/Arackerman05
                  </div>
                </div>
              </Button>
            </div>
          </BlurFade>
        </section>
      </div>
    </main>
  );
}
