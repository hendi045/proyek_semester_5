# IMPLEMENTATION_PLAN — Qodha Aromatic

**Versi:** 1.0-draft  
**Strategi:** Front-end first, data dummy, phase-by-phase dengan persetujuan eksplisit

## 1. Aturan eksekusi

- Hanya satu phase boleh dikerjakan dalam satu persetujuan.
- Setelah hasil phase ditampilkan, hentikan pekerjaan dan minta persetujuan sebelum mengerjakan phase berikutnya.
- Jangan menganggap diam, permintaan review, atau permintaan perbaikan kecil sebagai persetujuan untuk pindah phase.
- Jika pemilik proyek meminta revisi terhadap phase aktif, lakukan revisi tersebut lalu berhenti untuk review ulang.
- PRD dan UI-GUIDELINE menjadi sumber kebenaran. Konflik atau kebutuhan baru harus dilaporkan, bukan diasumsikan.

## 2. Tahapan

### Phase 1 — SOT dan kontrak kerja

**Status:** Dokumen v1.0-draft disiapkan untuk ditinjau.  
**Artefak:** PRD, UI-GUIDELINE, IMPLEMENTATION_PLAN, `AGENTS.md`, prompt eksekusi awal.

**Selesai jika:**
- Semua 12 fitur sudah dipetakan ke kebutuhan dan layar.
- Rumus SAW, validasi, asumsi preferensi, batasan dummy data, dan fitur laporan sudah dijelaskan.
- Arah visual dan pola responsif sudah terdokumentasi.
- Pemilik proyek menerima atau mengirim revisi terhadap SOT.

**Gerbang:** Jangan mulai menulis aplikasi sampai pemilik proyek menyetujui SOT dan secara eksplisit mengizinkan Phase 2.

### Phase 2 — Fondasi front-end dan UI shell

**Hasil yang ditargetkan:**
- Proyek React + Vite dapat berjalan dan dibangun.
- Token CSS, font fallback, komponen dasar, layout responsif, sidebar/topbar admin, header publik, dan navigasi awal.
- Halaman Login Admin demo dan Dashboard menggunakan dummy data.
- Struktur rute dan empty states dasar; tidak ada backend.

**Tidak dikerjakan:** CRUD penuh, algoritma SAW lengkap, laporan final, integrasi backend/database.

**Validasi:** `npm run build`, navigasi antarhalaman fondasi, pengecekan viewport desktop/mobile, serta tidak ada console error utama.

**Gerbang:** Tampilkan hasil/screenshot dan ringkas file yang berubah, lalu minta persetujuan Phase 3.

### Phase 3 — Data master dan penilaian

**Hasil yang ditargetkan:**
- CRUD dummy Data Aroma, Data Kriteria, Bobot Kriteria, dan Data Penilaian.
- Validasi form, konfirmasi penghapusan, filter/search, status kosong, dan persistensi browser yang disetujui.
- Total bobot 100% dan pemeriksaan nilai lengkap.

**Validasi:** tambah, ubah, hapus, pencarian/filter, refresh browser, dan bobot tidak valid.

**Gerbang:** Berhenti untuk review dan minta persetujuan Phase 4.

### Phase 4 — Mesin SAW, perangkingan, dan rekomendasi

**Hasil yang ditargetkan:**
- Fungsi perhitungan SAW terpisah dari UI dan dapat diuji dengan input yang diketahui.
- Matriks keputusan, normalisasi benefit/cost, bobot, nilai preferensi, sorting ranking.
- Form preferensi pengunjung, hasil rekomendasi, detail breakdown skor, serta riwayat `localStorage`.

**Validasi:** bobot valid/tidak valid, data tidak lengkap, nilai cost nol, maksimum benefit nol, hasil ranking descending, dan filter tanpa hasil.

**Gerbang:** Berhenti untuk review dan minta persetujuan Phase 5.

### Phase 5 — Laporan, aksesibilitas, dan final QA

**Hasil yang ditargetkan:**
- Layout cetak dan `window.print()`.
- Penyesuaian responsive, aksesibilitas keyboard/focus/label, error states, dan perapian microcopy.
- Smoke test semua 12 fitur dan build produksi.

**Validasi:** print preview, uji desktop/mobile, semua alur utama, tidak ada fitur tanpa aksi, `npm run build` sukses.

**Gerbang:** Sajikan ringkasan QA untuk persetujuan akhir; jangan menambahkan fitur baru di luar SOT.

## 3. Arsitektur awal yang disarankan

```text
src/
  app/                 # routing dan komposisi aplikasi
  components/          # Button, Input, Card, Badge, Modal, Table, EmptyState
  layouts/             # AdminLayout, PublicLayout
  pages/
    admin/              # Login, Dashboard, master data, SAW, laporan
    public/             # Rekomendasi, detail, riwayat
  data/                 # dummy seed data
  lib/                  # fungsi SAW dan validasi murni
  styles/               # tokens dan global styles
```

Struktur dapat disesuaikan ringan selama nama dan tanggung jawab tetap mudah dipahami. Jangan membuat lapisan abstraksi kompleks untuk prototipe.

## 4. Standar teknis

- React + Vite, JavaScript, CSS biasa dengan CSS custom properties.
- `lucide-react` untuk ikon konsisten; paket lain memerlukan alasan dan persetujuan.
- Data dummy di luar komponen UI.
- Perhitungan SAW ditempatkan pada fungsi terpisah agar bisa diuji.
- Gunakan `localStorage` hanya untuk simulasi data/history di browser; tampilkan keterangan bahwa ini bukan database.
- Komponen responsif, label aksesibel, focus state, empty/loading/error state yang relevan.
- Jangan menaruh rahasia/token/API key pada front-end.

## 5. Strategi pengujian minimum

- Uji fungsi SAW dengan nilai yang telah dihitung manual.
- Uji validasi bobot 100%, data kosong, nilai invalid, cost nol, dan alternatif tidak aktif.
- Uji interaksi CRUD dan penyimpanan browser.
- Uji login demo yang benar/salah tanpa mengklaim keamanan produksi.
- Uji rekomendasi dengan filter ada hasil dan tidak ada hasil.
- Uji print stylesheet dan layout pada viewport lebar serta sempit.
- Jalankan `npm run build` sebelum melaporkan phase selesai.

## 6. Risiko dan mitigasi

| Risiko | Mitigasi |
|---|---|
| Pengunjung mengira ranking adalah kebenaran absolut | Tampilkan bobot, skor, dan catatan bahwa ranking mengikuti kriteria aktif. |
| Bobot tidak berjumlah 100% | Blokir proses SAW dan tampilkan jumlah serta instruksi koreksi. |
| Nilai tidak lengkap atau formula tidak valid | Validasi sebelum menghitung; tampilkan penyebab dan tautan ke data terkait. |
| Riwayat dianggap tersinkron antarperangkat | Beri label bahwa riwayat tersimpan pada browser ini. |
| Mock login dianggap aman untuk publik | Tandai demo-only dan jangan memasukkan data sensitif. |
| Fitur melebar ke backend atau layanan nyata | Ikuti batasan PRD dan minta persetujuan untuk perubahan scope. |

## 7. Permintaan persetujuan per phase

Format review setelah tiap phase:

- **Status:** selesai / perlu revisi.
- **Yang tercakup:** daftar singkat hasil sesuai phase.
- **Validasi:** build, test manual, dan isu tersisa.
- **Di luar cakupan:** pekerjaan yang sengaja belum dilakukan.
- **Keputusan pemilik proyek:** setujui phase berikutnya atau minta revisi.

Tidak ada phase otomatis berlanjut.
