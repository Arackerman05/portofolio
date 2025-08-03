"use client";

import Balatro from "@/app/components/Balatro/Balatro";
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
import { notFound, useRouter } from "next/navigation";

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter();
  const project = lensProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden p-6">
      {/* Background Balatro - same as main page */}
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

      {/* Main Content Container - same styling as main page */}
      <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-sm bg-white/20 p-6 pt-8 pb-24 space-y-8 rounded-xl shadow-lg">
        {/* Header dengan tombol back */}
        <BlurFade delay={0.1} inView>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-white/40 hover:bg-white/60 border border-white/30 text-black"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Projects</span>
              <span>/</span>
              <span className="text-black font-medium">{project.title}</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Section */}
        <BlurFade delay={0.2} inView>
          <Card className="overflow-hidden bg-white/40 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {project.title}
                </h1>
                <p className="text-gray-200 text-lg max-w-2xl">
                  {project.description}
                </p>
              </div>
            </div>
          </Card>
        </BlurFade>

        {/* Action Buttons */}
        <BlurFade delay={0.3} inView>
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <Button
                onClick={() => window.open(project.github!, "_blank")}
                className="bg-black hover:bg-gray-800 text-white flex items-center gap-2 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Button>
            )}
            {project.demo && (
              <Button
                onClick={() => window.open(project.demo!, "_blank")}
                variant="outline"
                className="border-sky-200 text-sky-700 hover:bg-sky-50 flex items-center gap-2 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            )}
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <BlurFade delay={0.4} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <Star className="w-5 h-5 text-black" />
                    </div>
                    <CardTitle className="text-lg text-black">
                      Deskripsi Project
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {project.detailDescription}
                  </p>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Features */}
            <BlurFade delay={0.5} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-black" />
                    </div>
                    <CardTitle className="text-lg text-black">
                      Fitur Utama
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20"
                      >
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-800 text-sm">{feature}</span>
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
            <BlurFade delay={0.4} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <Code className="w-5 h-5 text-black" />
                    </div>
                    <CardTitle className="text-lg text-black">
                      Tech Stack
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge
                        key={idx}
                        className="bg-gray-100 text-black hover:bg-gray-200 transition-colors border border-gray-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Project Info */}
            <BlurFade delay={0.5} inView>
              <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-black" />
                    </div>
                    <CardTitle className="text-lg text-black">
                      Project Info
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-black mb-1">
                      Status
                    </div>
                    <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border border-sky-200">
                      Completed
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-black mb-1">
                      Category
                    </div>
                    <div className="text-sm text-gray-700">
                      {project.tech.includes("Flutter")
                        ? "Mobile Development"
                        : project.tech.includes("Figma")
                        ? "UI/UX Design"
                        : "Desktop Application"}
                    </div>
                  </div>

                  {project.github && (
                    <div>
                      <div className="text-sm font-semibold text-black mb-2">
                        Source Code
                      </div>
                      <Button
                        onClick={() => window.open(project.github!, "_blank")}
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 bg-white/30 hover:bg-white/50 border border-white/30 text-black"
                      >
                        <Github className="w-4 h-4" />
                        GitHub Repository
                      </Button>
                    </div>
                  )}

                  {project.demo && (
                    <div>
                      <div className="text-sm font-semibold text-black mb-2">
                        Live Preview
                      </div>
                      <Button
                        onClick={() => window.open(project.demo!, "_blank")}
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 bg-white/30 hover:bg-white/50 border border-white/30 text-black"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Demo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>

        {/* Navigation to other projects */}
        <BlurFade delay={0.6} inView>
          <Card className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-black">
                    Project Lainnya
                  </CardTitle>
                  <CardDescription className="text-gray-600">
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
                  .map((otherProject, idx) => (
                    <Card
                      key={idx}
                      className="cursor-pointer bg-white/30 backdrop-blur-sm border border-white/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      onClick={() =>
                        router.push(`/projects/${otherProject.id}`)
                      }
                    >
                      <div className="relative h-32 overflow-hidden rounded-t-lg">
                        <img
                          src={otherProject.img}
                          alt={otherProject.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-black text-sm mb-1">
                          {otherProject.title}
                        </h3>
                        <p className="text-xs text-gray-700 line-clamp-2">
                          {otherProject.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {otherProject.tech
                            .slice(0, 2)
                            .map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="px-1.5 py-0.5 bg-gray-100 text-black text-xs rounded-md font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          {otherProject.tech.length > 2 && (
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
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
    </main>
  );
}
