# Qodha Aromatic — SOT Package

**Versi:** 1.0-draft  
**Status:** Siap ditinjau; implementasi belum dimulai  
**Fokus:** Front-end React + Vite dengan data dummy

## Isi paket

- `SOT/PRD.md` — kebutuhan produk, aktor, fitur, aturan SAW, batasan, dan kriteria penerimaan.
- `SOT/UI-GUIDELINE.md` — arah visual, design tokens, layout, komponen, dan rancangan tiap layar.
- `SOT/IMPLEMENTATION_PLAN.md` — phase eksekusi, hasil yang diharapkan, kriteria selesai, serta gerbang persetujuan.
- `AGENTS.md` — kontrak kerja untuk AI coding agent/developer.
- `prompts/PROMPT_EXECUTION.md` — prompt eksekusi awal untuk Phase 2, dengan pemeriksaan persetujuan eksplisit.

## Cara menggunakan

1. Extract ZIP ini ke root folder repository proyek.
2. Tinjau PRD, UI-GUIDELINE, dan IMPLEMENTATION_PLAN.
3. Berikan persetujuan eksplisit atas SOT sebelum meminta implementasi.
4. Setelah disetujui, gunakan `prompts/PROMPT_EXECUTION.md` untuk menjalankan Phase 2 saja.
5. Sesudah setiap phase, tinjau hasilnya dan berikan persetujuan sebelum phase berikutnya.

## Catatan penting

Paket ini sengaja **belum berisi aplikasi React yang dapat dijalankan**. Implementasi adalah phase terpisah dan belum dieksekusi supaya aturan persetujuan per phase tetap dipatuhi. Semua data pada implementasi awal harus berupa data dummy; tidak ada backend/API/database nyata.
