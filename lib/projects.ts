// lib/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  img: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  detailDescription: string;
  features: string[];
}

export const lensProjects: Project[] = [
  {
    id: "coffee-order-app",
    title: "Coffee Order App",
    description:
      "Aplikasi pemesanan kopi dengan Flutter yang terintegrasi antara admin dan user interface.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2071&auto=format&fit=crop",
    tech: ["Flutter", "Dart", "Firebase"],
    github: "https://github.com/Arackerman05/coffee-order-app",
    demo: null,
    detailDescription:
      "Aplikasi mobile lengkap untuk pemesanan kopi dengan dua interface terpisah untuk admin dan customer. Admin dapat mengelola menu, pesanan, dan laporan penjualan. Customer dapat melihat menu, melakukan pemesanan, dan tracking status pesanan real-time.",
    features: [
      "Interface terpisah Admin dan Customer",
      "Real-time order tracking",
      "Payment integration",
      "Menu management system",
      "Sales reporting dashboard",
    ],
  },
  {
    id: "sistem-antrian-klinik",
    title: "Sistem Antrian Klinik",
    description:
      "Aplikasi Java untuk manajemen antrian pasien di klinik dengan interface yang user-friendly.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2071&auto=format&fit=crop",
    tech: ["Java", "Swing", "MySQL"],
    github: "https://github.com/Arackerman05/sistem-antrian-klinik",
    demo: null,
    detailDescription:
      "Sistem desktop untuk mengelola antrian pasien di klinik. Dilengkapi dengan fitur pendaftaran pasien, pengelolaan antrian, dan cetak nomor antrian. Interface yang sederhana memudahkan staff klinik dalam pengoperasian sehari-hari.",
    features: [
      "Registrasi pasien baru",
      "Generate nomor antrian otomatis",
      "Display antrian real-time",
      "Cetak tiket antrian",
      "Database pasien terintegrasi",
    ],
  },
  {
    id: "spk-metode-saw",
    title: "SPK Metode SAW",
    description:
      "Aplikasi Java untuk sistem pengambilan keputusan menggunakan metode Simple Additive Weighting.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2071&auto=format&fit=crop",
    tech: ["Java", "Swing", "MySQL"],
    github: "https://github.com/Arackerman05/spk-metode-saw",
    demo: null,
    detailDescription:
      "Aplikasi sistem pendukung keputusan yang mengimplementasikan metode Simple Additive Weighting (SAW) untuk membantu dalam pengambilan keputusan multi-kriteria. Dilengkapi dengan interface yang intuitif untuk input kriteria dan alternatif.",
    features: [
      "Input multiple criteria dan alternatif",
      "Perhitungan otomatis metode SAW",
      "Ranking hasil keputusan",
      "Export hasil ke PDF",
      "History keputusan sebelumnya",
    ],
  },
  {
    id: "program-kasir",
    title: "Program Kasir",
    description:
      "Aplikasi desktop kasir yang dibuat dengan Java untuk memudahkan transaksi penjualan.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2071&auto=format&fit=crop",
    tech: ["Java", "Swing", "MySQL"],
    github: "https://github.com/Arackerman05/program-kasir",
    demo: null,
    detailDescription:
      "Aplikasi Point of Sale (POS) desktop yang memudahkan proses transaksi penjualan. Dilengkapi dengan fitur manajemen produk, perhitungan otomatis, dan laporan penjualan harian.",
    features: [
      "Manajemen produk dan stok",
      "Perhitungan transaksi otomatis",
      "Cetak struk penjualan",
      "Laporan penjualan harian/bulanan",
      "Manajemen user kasir",
    ],
  },
  {
    id: "program-perpustakaan",
    title: "Program Perpustakaan",
    description:
      "Sistem manajemen perpustakaan dengan Java untuk pengelolaan buku dan peminjaman.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2071&auto=format&fit=crop",
    tech: ["Java", "Swing", "MySQL"],
    github: "https://github.com/Arackerman05/program-perpustakaan",
    demo: null,
    detailDescription:
      "Sistem informasi perpustakaan lengkap untuk mengelola koleksi buku, data anggota, dan transaksi peminjaman-pengembalian. Dilengkapi dengan fitur pencarian buku dan laporan peminjaman.",
    features: [
      "Katalog buku digital",
      "Manajemen data anggota",
      "Sistem peminjaman dan pengembalian",
      "Denda keterlambatan otomatis",
      "Pencarian buku advanced",
    ],
  },
  {
    id: "desain-ui-ux-figma",
    title: "Desain UI/UX Figma",
    description:
      "Desain interface aplikasi penjualan buku dan streaming film menggunakan Figma.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2071&auto=format&fit=crop",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    github: null,
    demo: "https://figma.com/proto/abdurrouf-designs",
    detailDescription:
      "Koleksi desain UI/UX untuk berbagai aplikasi termasuk platform penjualan buku online dan aplikasi streaming film. Desain dibuat dengan memperhatikan user experience dan current design trends.",
    features: [
      "Wireframe dan mockup lengkap",
      "Interactive prototype",
      "Design system konsisten",
      "Mobile-first approach",
      "User journey mapping",
    ],
  },
];