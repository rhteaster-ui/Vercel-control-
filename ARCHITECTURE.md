# 👑 THE ULTIMATE BLUEPRINT: Vercel-Proxy IDE & Headless Admin API
**Version:** 1.0 (Production-Ready)
**Author / Lead Engineer:** Rahmat Dev

## 1. PROJECT OVERVIEW & ARCHITECTURE PARADIGM
Aplikasi PWA-ready berskala Enterprise yang berfungsi sebagai *Deployment Manager* (tanpa Git) dan *Web-based IDE*. Memiliki arsitektur Microservices dengan memisahkan *Client-Facing Application* dari *Headless Admin API*.
* **Tujuan Utama:** Memungkinkan pengguna mengunggah ZIP statis (HTML/CSS/JS), mengelola file melalui Virtual File System (VFS) di browser, mengedit kode, dan men-deploy-nya secara instan ke Vercel dengan manajemen siklus hidup token otomatis.

## 2. TECH STACK ECOSYSTEM
* **Core Framework:** Next.js 14+ (App Router) dengan TypeScript yang ketat (`strict: true`).
* **UI/UX & Styling:** Tailwind CSS, komponen berbasis Glassmorphism, `lucide-react` (icons), dan `sonner` (Toast notifications).
* **State Management:** Zustand (Global State).
* **Client Database (VFS):** Dexie.js (IndexedDB Wrapper).
* **Server Database & Cache:** Redis via Upstash (`@upstash/redis` & `@upstash/ratelimit`).
* **Editor Engine:** CodeMirror 6 (WAJIB diimpor secara dinamis untuk mencegah SSR Crash).
* **File Processing:** `adm-zip` (ekstraksi Server-side), `jszip` & `file-saver` (kompresi Client-side).

## 3. UI/UX & DESIGN SYSTEM (GLASSMORPHISM)
Tampilan harus terasa seperti Vercel versi modern dan "Hacker/Developer-centric".
* **Tema Visual:** Dark Mode Monokromatik (dominan Hitam & Putih), background `bg-black` dengan grid lines tipis (`bg-grid-white/[0.02]`).
* **Komponen:** Efek Glassmorphism menggunakan `backdrop-blur-md`, `bg-black/40`, dan border putih semi-transparan (`border-white/10`).
* **Responsivitas Layout:**
  * **Desktop:** Sidebar Navigasi di sisi kiri (Header atas: Logo App bulat + Nama App bold dengan garis pemisah bawah). Area utama di tengah.
  * **Mobile:** Bottom Navigation Bar yang ramping (Fixed, Glassmorphism, z-50). Terdapat Sticky Top Bar berisi Logo dan Nama Aplikasi.
* **5 Menu Navigasi Utama:** Home (Dashboard), Deploy (Upload), Logs (History), Editor (IDE), About (Dev Info).
* **Micro-Interactions (Wajib):** * Disable button dan tampilkan spinner saat state `isLoading`.
  * Tampilkan Modal Konfirmasi sebelum aksi destruktif (Delete Project).
  * Render "Empty State" (Ikon Folder Kosong) jika VFS tidak memiliki data.

## 4. DATABASE SCHEMAS & STATE OPTIMIZATION
**A. Client-Side (Dexie.js / VFS)**
*Krusial: Untuk mencegah browser crash/memory leak, properti `content` yang berisi raw code TIDAK BOLEH diindeks.*
```typescript
db.version(1).stores({
  projects: 'id, name, createdAt', // Vercel deployment ID, project name
  files: 'id, projectId, path, isFolder, parentId' // content string tidak diindeks
});
