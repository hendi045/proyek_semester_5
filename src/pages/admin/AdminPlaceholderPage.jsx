import React from 'react';
import {
  Sparkles,
  Sliders,
  Scale,
  Calculator,
  Award,
  Printer,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import './AdminPlaceholderPage.css';

const PLACEHOLDER_DETAILS = {
  aroma: {
    title: 'Data Aroma Wewangian',
    targetPhase: 'Phase 3',
    phaseName: 'Data Master dan Penilaian',
    description: 'Manajemen katalog alternatif aroma wewangian sunah (tambah, lihat, ubah, hapus, tag sunah, status aktif).',
    icon: Sparkles,
    specs: [
      'Katalog alternatif aroma wewangian aktif',
      'Form input nama, keluarga aroma, kegunaan, dan harga dummy',
      'Dialog konfirmasi hapus data dummy',
      'Penyaringan berdasarkan kategori aroma'
    ]
  },
  kriteria: {
    title: 'Data Kriteria SAW',
    targetPhase: 'Phase 3',
    phaseName: 'Data Master dan Penilaian',
    description: 'Manajemen kriteria evaluasi (C1-C7), penetapan tipe benefit atau cost, dan deskripsi skala penilaian.',
    icon: Sliders,
    specs: [
      'Daftar 7 kriteria dasar (Kesesuaian Sunah, Karakter Aroma, Ketahanan, Intensitas, Harga, Tujuan Penggunaan, Tingkat Kesukaan)',
      'Penetapan sifat kriteria: Benefit (keuntungan) atau Cost (biaya)',
      'Rentang nilai dan panduan penskalaan (1-5)'
    ]
  },
  bobot: {
    title: 'Bobot Kriteria',
    targetPhase: 'Phase 3',
    phaseName: 'Data Master dan Penilaian',
    description: 'Pengaturan persentase bobot tiap kriteria dengan validasi jumlah tepat 100% sebelum proses SAW dijalankan.',
    icon: Scale,
    specs: [
      'Kontrol slider dan input numerik persentase bobot kriteria',
      'Validasi real-time total bobot (harus tepat 100%)',
      'Tombol reset bobot ke konfigurasi standar demo'
    ]
  },
  penilaian: {
    title: 'Data Penilaian Aroma',
    targetPhase: 'Phase 3',
    phaseName: 'Data Master dan Penilaian',
    description: 'Matriks nilai alternatif terhadap seluruh kriteria aktif dengan validasi kelengkapan nilai.',
    icon: Calculator,
    specs: [
      'Matriks tabel alternatif x kriteria',
      'Input nilai skala 1-5 dengan indikator status kelengkapan',
      'Deteksi nilai kosong sebelum normalisasi SAW'
    ]
  },
  saw: {
    title: 'Proses Perhitungan SAW',
    targetPhase: 'Phase 4',
    phaseName: 'Mesin SAW, Perangkingan, dan Rekomendasi',
    description: 'Transparansi proses perhitungan SAW: matriks keputusan awal, matriks normalisasi, perkalian bobot, dan nilai preferensi akhir.',
    icon: Calculator,
    specs: [
      'Tabel matriks keputusan awal (X)',
      'Rumus normalisasi Benefit (x_ij / max) & Cost (min / x_ij)',
      'Tabel matriks normalisasi (R)',
      'Perkalian terbobot (W * R) dan kalkulasi preferensi (V_i)'
    ]
  },
  ranking: {
    title: 'Hasil Perangkingan',
    targetPhase: 'Phase 4',
    phaseName: 'Mesin SAW, Perangkingan, dan Rekomendasi',
    description: 'Daftar urutan alternatif dari skor preferensi tertinggi ke terendah dengan ringkasan status dan visualisasi skor.',
    icon: Award,
    specs: [
      'Tabel perangkingan akhir terurut menurun (descending)',
      'Visualisasi persentase skor preferensi',
      'Breakdown kontribusi tiap kriteria terhadap ranking',
      'Pintasan cetak laporan hasil rekomendasi'
    ]
  },
  laporan: {
    title: 'Cetak Laporan',
    targetPhase: 'Phase 5',
    phaseName: 'Laporan, Aksesibilitas, dan Final QA',
    description: 'Tampilan ramah cetak (print stylesheet) untuk dokumen laporan SPK resmi dengan dialog cetak browser.',
    icon: Printer,
    specs: [
      'Kop laporan resmi Qodha Aromatic SPK SAW',
      'Tabel ringkasan bobot, matriks normalisasi, dan skor akhir',
      'Print stylesheet (@media print) yang menyembunyikan sidebar dan tombol aksi',
      'Dukungan ekspor/cetak PDF via dialog cetak browser'
    ]
  }
};

export function AdminPlaceholderPage({ currentPath, onNavigate }) {
  const info = PLACEHOLDER_DETAILS[currentPath] || {
    title: 'Halaman Admin',
    targetPhase: 'Phase Mendatang',
    phaseName: 'Dalam Perencanaan',
    description: 'Halaman ini berada di luar scope Phase 2.',
    icon: AlertCircle,
    specs: []
  };

  const Icon = info.icon;

  return (
    <div className="qa-placeholder-page">
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <div className="qa-placeholder-badge-group">
            <Badge variant="orange" size="md">{info.targetPhase}</Badge>
            <Badge variant="neutral" size="md">{info.phaseName}</Badge>
          </div>
          <h1 className="qa-page-title">{info.title}</h1>
          <p className="qa-page-desc">{info.description}</p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => onNavigate('dashboard')}
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>

      <Card className="qa-placeholder-card">
        <CardBody className="qa-placeholder-body">
          <div className="qa-placeholder-icon-wrap">
            <Icon size={40} />
          </div>
          <h3 className="qa-placeholder-title">
            Struktur Rute Telah Disiapkan untuk {info.targetPhase}
          </h3>
          <p className="qa-placeholder-sub">
            Sesuai kontrak kerja <code>AGENTS.md</code> dan <code>SOT/IMPLEMENTATION_PLAN.md</code>,
            fitur interaktif modul ini sengaja tidak dieksekusi pada Phase 2 (Fondasi UI Shell).
            Implementasi fungsional akan dibuka setelah pemilik proyek menyetujui selesainya Phase 2.
          </p>

          <div className="qa-placeholder-specs">
            <h4 className="qa-placeholder-specs__title">Fitur yang akan hadir pada {info.targetPhase}:</h4>
            <ul className="qa-placeholder-specs__list">
              {info.specs.map((spec, sIdx) => (
                <li key={sIdx} className="qa-placeholder-spec-item">
                  <span className="qa-spec-dot" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="qa-placeholder-action-bar">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('dashboard')}
            >
              Lihat Dashboard Utama
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('public-rekomendasi')}
            >
              Lihat Area Rekomendasi Publik
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
