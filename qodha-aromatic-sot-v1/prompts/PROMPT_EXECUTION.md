# Prompt Eksekusi Awal — Phase 2

> **Gunakan prompt ini hanya setelah pemilik proyek menyetujui SOT dan memberikan persetujuan eksplisit untuk Phase 2.** Jangan hapus bagian pemeriksaan persetujuan.

```text
Anda adalah front-end engineer senior untuk proyek Qodha Aromatic.

Sebelum menulis atau mengubah kode:
1. Baca AGENTS.md.
2. Baca SOT/PRD.md, SOT/UI-GUIDELINE.md, dan SOT/IMPLEMENTATION_PLAN.md.
3. Periksa apakah pemilik proyek secara eksplisit menyetujui Phase 2. Persetujuan harus berupa pernyataan yang jelas, bukan asumsi. Jika tidak ada, JANGAN menulis kode; cukup laporkan bahwa Phase 2 menunggu persetujuan.
4. Jika terdapat konflik SOT atau repository yang sudah ada, laporkan dulu dan jangan mengganti file penting secara destruktif.

SCOPE: PHASE 2 SAJA — Fondasi front-end dan UI shell.

Tujuan:
- Menyiapkan/menyesuaikan proyek React + Vite dengan JavaScript.
- Membangun design tokens CSS untuk palet hitam, putih, oranye sesuai UI-GUIDELINE.
- Membuat struktur layout Admin dan area pengunjung yang responsif.
- Membuat navigasi dasar, sidebar/topbar admin, header publik, Button/Input/Card/Badge/EmptyState yang diperlukan.
- Membuat halaman Login Admin sebagai simulasi demo dan Dashboard yang memakai dummy data.
- Menyiapkan placeholder/rute dasar untuk halaman lain agar arsitektur mudah dilanjutkan, tetapi jangan mengimplementasikan fitur phase berikutnya.
- Gunakan CSS biasa dan lucide-react untuk ikon jika perlu. Jangan menambah library UI besar atau dependensi lain tanpa persetujuan.

Jangan dikerjakan pada phase ini:
- CRUD lengkap untuk aroma/kriteria/bobot/penilaian.
- Mesin perhitungan SAW, matriks normalisasi, atau perangkingan yang final.
- Alur rekomendasi personal, detail skor, dan riwayat.
- Cetak laporan final.
- Backend/API/database atau autentikasi produksi.
- Fitur lain di luar PRD.

Aturan desain:
- Ikuti SOT; jangan mengubah identitas hitam-putih-oranye.
- Gunakan data dummy dari modul data terpisah, bukan nilai hardcode tersebar di komponen.
- Semua tombol yang terlihat interaktif harus memiliki aksi yang sesuai atau ditandai jelas sebagai placeholder nonaktif.
- Gunakan Bahasa Indonesia.
- Pastikan layout bekerja pada desktop dan mobile; gunakan empty/error states yang relevan.
- Jangan menyatakan login demo aman untuk produksi.

Keluaran yang diharapkan:
1. Source React + Vite yang dapat dijalankan.
2. Struktur file yang mudah dibaca dan tidak berlebihan.
3. Instruksi menjalankan proyek (`npm install`, `npm run dev`, `npm run build`).
4. Ringkasan file yang dibuat/diubah.
5. Hasil validasi yang benar-benar dijalankan.
6. Daftar kekurangan atau keputusan yang masih menunggu.

Sebelum selesai:
- Jalankan npm run build jika lingkungan memungkinkan.
- Perbaiki error yang berasal dari scope Phase 2.
- Jangan melanjutkan ke Phase 3.
- Sajikan ringkasan hasil Phase 2 dan minta pemilik proyek menyetujui Phase 3. Berhenti setelah meminta persetujuan.
```

## Cara memberi persetujuan
Setelah meninjau SOT, pemilik proyek dapat memberikan pernyataan eksplisit, misalnya:

> Saya menyetujui SOT v1.0-draft dengan catatan revisi yang sudah dibahas, dan menyetujui eksekusi Phase 2 saja.

Bila ada revisi, perbarui dokumen SOT lebih dahulu sebelum implementasi dimulai.
