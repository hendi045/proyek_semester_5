import React, { useState, useMemo } from 'react';
import {
  Printer,
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  User,
  SlidersHorizontal,
  Scale
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import './LaporanPage.css';

export function LaporanPage({ onNavigate }) {
  const {
    activeKriteria,
    isBobotValid,
    totalBobot,
    penilaianStatus,
    sawResult
  } = useDataContext();

  // Opsi cetak
  const [scopeCetak, setScopeCetak] = useState('all'); // 'all', 'top3', 'top5'
  const [showKriteria, setShowKriteria] = useState(true);
  const [showTandaTangan, setShowTandaTangan] = useState(true);

  // Tanggal hari ini dalam format Indonesia (diinisialisasi sekali saat mount)
  const [currentDateFormatted] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  const [documentNumber] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `QA-SPK-SAW/${year}/${month}/001`;
  });

  // Filter kandidat yang akan dicetak
  const displayedRankings = useMemo(() => {
    if (!sawResult.isValid) return [];
    if (scopeCetak === 'top3') {
      return sawResult.rankings.slice(0, 3);
    }
    if (scopeCetak === 'top5') {
      return sawResult.rankings.slice(0, 5);
    }
    return sawResult.rankings;
  }, [sawResult, scopeCetak]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="qa-data-page qa-laporan-page">
      {/* TOOLBAR CONTROLS (Screen only, hidden on print) */}
      <div className="qa-laporan-screen-toolbar no-print">
        <div className="qa-page-header">
          <div className="qa-page-header__meta">
            <div className="qa-breadcrumb">
              <span>Analisis SAW</span>
              <span>/</span>
              <span className="qa-breadcrumb__active">Cetak Dokumen Laporan</span>
            </div>
            <h1 className="qa-page-title">Dokumen Laporan Hasil Analisis SPK</h1>
            <p className="qa-page-desc">
              Format pratinjau dokumen resmi keputusan Simple Additive Weighting (SAW) yang siap dicetak langsung via dialog cetak browser atau disimpan sebagai PDF.
            </p>
          </div>
          <div className="qa-page-header__actions">
            <Button
              variant="outline"
              size="md"
              icon={ArrowLeft}
              onClick={() => onNavigate && onNavigate('ranking')}
            >
              Kembali ke Perangkingan
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={Printer}
              onClick={handlePrint}
              disabled={!sawResult.isValid}
            >
              Cetak Dokumen (Print / PDF)
            </Button>
          </div>
        </div>

        {/* Panel Konfigurasi Cetak */}
        <Card className="qa-print-options-card">
          <CardBody className="qa-print-options-body">
            <div className="qa-print-opt-group">
              <span className="qa-print-opt-title">
                <SlidersHorizontal size={16} /> Cakupan Hasil
              </span>
              <div className="qa-scope-select-wrap">
                <Select
                  id="scopeCetakSelect"
                  value={scopeCetak}
                  onChange={(e) => setScopeCetak(e.target.value)}
                  options={[
                    { value: 'all', label: `Semua Alternatif (${sawResult.isValid ? sawResult.rankings.length : 0} Aroma)` },
                    { value: 'top3', label: 'Top 3 Rekomendasi Utama' },
                    { value: 'top5', label: 'Top 5 Rekomendasi Unggulan' }
                  ]}
                />
              </div>
            </div>

            <div className="qa-print-opt-group qa-print-opt-checkboxes">
              <span className="qa-print-opt-title">Komponen Laporan</span>
              <label className="qa-checkbox-label">
                <input
                  type="checkbox"
                  checked={showKriteria}
                  onChange={(e) => setShowKriteria(e.target.checked)}
                />
                <span>Sertakan Tabel Bobot Kriteria Aktif</span>
              </label>
              <label className="qa-checkbox-label">
                <input
                  type="checkbox"
                  checked={showTandaTangan}
                  onChange={(e) => setShowTandaTangan(e.target.checked)}
                />
                <span>Sertakan Lembar Pengesahan & Tanda Tangan</span>
              </label>
            </div>

            <div className="qa-print-guide-tip">
              <span className="qa-guide-label">Petunjuk Cetak:</span>
              <p>
                Gunakan opsi <em>Destination: Save as PDF</em> atau printer fisik pada dialog browser. Sidebar admin, tombol aksi, dan kontrol navigasi otomatis disembunyikan.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* JIKA SAW BELUM VALID: ERROR STATE BANNER */}
      {!sawResult.isValid && (
        <Card className="qa-saw-error-card no-print">
          <CardBody className="qa-saw-error-body">
            <div className="qa-saw-error-icon">
              <AlertTriangle size={32} />
            </div>
            <div className="qa-saw-error-content">
              <h3 className="qa-saw-error-title">
                Dokumen Laporan Belum Dapat Dicetak
              </h3>
              <p className="qa-saw-error-desc">
                Dokumen resmi keputusan SPK hanya dapat dicetak setelah seluruh prasyarat matematis terpenuhi (total bobot kriteria tepat 100% dan seluruh alternatif aktif memiliki nilai lengkap).
              </p>
              <div className="qa-saw-error-actions">
                {!isBobotValid && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Scale}
                    onClick={() => onNavigate && onNavigate('bobot')}
                  >
                    Sesuaikan Bobot Kriteria (Saat ini: {totalBobot}%)
                  </Button>
                )}
                {!penilaianStatus.isLengkap && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FileText}
                    onClick={() => onNavigate && onNavigate('penilaian')}
                  >
                    Lengkapi Penilaian Matriks
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* DOKUMEN CETAK RESMI (A4 Paper layout) */}
      <div className="qa-document-sheet-container">
        <div className="qa-document-paper" id="printableDocument">
          {/* 1. KOP SURAT FORMAL */}
          <div className="qa-doc-kop">
            <div className="qa-kop-brand">
              <div className="qa-kop-logo-box">
                <img
                  src="/logo-qodha.jpg"
                  alt="Logo Qodha Aromatic"
                  className="qa-kop-logo-img"
                />
              </div>
              <div className="qa-kop-text">
                <h2 className="qa-kop-title">QODHA AROMATIC KOTA BOGOR</h2>
                <h3 className="qa-kop-sub">
                  SISTEM PENDUKUNG KEPUTUSAN PENENTUAN REKOMENDASI AROMA WEWANGIAN SUNAH MENGGUNAKAN METODE SIMPLE ADDITIVE WEIGHTING (SAW)
                </h3>
                <p className="qa-kop-meta">
                  Implementasi Algoritma Simple Additive Weighting (SAW) — Laboratorium Pemrograman Web
                </p>
                <p className="qa-kop-contact">
                  Pusat Wewangian Sunah & Thibbun Nabawi — Kota Bogor, Jawa Barat • Kontak: info@qodha.id • Dokumen Keputusan SPK SAW
                </p>
              </div>
            </div>
            <div className="qa-kop-divider" />
          </div>

          {/* 2. JUDUL DOKUMEN & METADATA */}
          <div className="qa-doc-heading">
            <h1 className="qa-doc-main-title">
              LAPORAN KEPUTUSAN HASIL PERANGKINGAN SAW
            </h1>
            <p className="qa-doc-reg-no">Nomor Dokumen: <strong>{documentNumber}</strong></p>
          </div>

          <div className="qa-doc-meta-grid">
            <div className="qa-doc-meta-item">
              <span className="qa-meta-key">
                <Calendar size={14} className="no-print" /> Tanggal Cetak:
              </span>
              <span className="qa-meta-val">{currentDateFormatted}</span>
            </div>
            <div className="qa-doc-meta-item">
              <span className="qa-meta-key">
                <User size={14} className="no-print" /> Petugas Penilai:
              </span>
              <span className="qa-meta-val">Demo Administrator (Operator SPK)</span>
            </div>
            <div className="qa-doc-meta-item">
              <span className="qa-meta-key">Metode Pengambilan Keputusan:</span>
              <span className="qa-meta-val">Simple Additive Weighting (SAW)</span>
            </div>
            <div className="qa-doc-meta-item">
              <span className="qa-meta-key">Status Integritas Data:</span>
              <span className="qa-meta-val qa-meta-val--valid">
                <CheckCircle2 size={14} className="no-print" /> 100% Valid & Terverifikasi
              </span>
            </div>
          </div>

          {/* 3. BAGIAN I: TABEL BOBOT KRITERIA AKTIF (Opsional) */}
          {showKriteria && (
            <div className="qa-doc-section">
              <h4 className="qa-section-title">
                I. Parameter Kriteria & Distribusi Bobot Preferensi
              </h4>
              <p className="qa-section-desc">
                Perhitungan preferensi SAW didasarkan pada {activeKriteria.length} kriteria penilaian aktif dengan total bobot akumulasi tepat 100%:
              </p>

              <table className="qa-doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                    <th style={{ width: '90px' }}>Kode</th>
                    <th>Nama Parameter Kriteria</th>
                    <th style={{ width: '130px', textAlign: 'center' }}>Sifat / Atribut</th>
                    <th style={{ width: '110px', textAlign: 'right' }}>Bobot (%)</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Nilai Bobot (w_j)</th>
                  </tr>
                </thead>
                <tbody>
                  {activeKriteria.map((k, idx) => (
                    <tr key={k.kode}>
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td>
                        <strong>{k.kode}</strong>
                      </td>
                      <td>{k.nama}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`qa-doc-tag qa-doc-tag--${k.tipe}`}>
                          {k.tipe === 'benefit' ? 'Benefit (Maksimal)' : 'Cost (Minimal)'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{k.bobot}%</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                        {(k.bobot / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="qa-doc-table-foot">
                    <td colSpan={4} style={{ textAlign: 'right', fontWeight: 700 }}>
                      Total Akumulasi Bobot Kriteria (W):
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>100%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                      1.00
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* 4. BAGIAN II: TABEL HASIL PERANGKINGAN FINAL */}
          <div className="qa-doc-section">
            <h4 className="qa-section-title">
              II. Daftar Peringkat Keputusan Alternatif Wewangian Sunah
            </h4>
            <p className="qa-section-desc">
              Berikut adalah urutan alternatif wewangian sunah berdasarkan akumulasi nilai preferensi (V_i) dari skor tertinggi ke terendah:
            </p>

            <table className="qa-doc-table">
              <thead>
                <tr>
                  <th style={{ width: '50px', textAlign: 'center' }}>Rank</th>
                  <th style={{ width: '80px' }}>Kode</th>
                  <th>Nama Alternatif Aroma</th>
                  <th style={{ width: '120px' }}>Keluarga Aroma</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>Skor (V_i)</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>Persentase</th>
                  <th style={{ width: '170px', textAlign: 'center' }}>Status Rekomendasi</th>
                </tr>
              </thead>
              <tbody>
                {displayedRankings.map((item) => (
                  <tr
                    key={item.id}
                    className={item.rank === 1 ? 'qa-doc-row--highlight' : ''}
                  >
                    <td style={{ textAlign: 'center' }}>
                      <strong>#{item.rank}</strong>
                    </td>
                    <td>
                      <span className="qa-doc-code">{item.id}</span>
                    </td>
                    <td>
                      <strong>{item.nama}</strong>
                      <div className="qa-doc-subtext">{item.karakteristik}</div>
                    </td>
                    <td>{item.kategori}</td>
                    <td style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 700 }}>
                      {item.score.toFixed(4)}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>
                      {item.scorePercent}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        className={`qa-doc-status qa-doc-status--${
                          item.rank === 1 ? 'gold' : item.rank <= 3 ? 'silver' : 'neutral'
                        }`}
                      >
                        {item.statusRecommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. BAGIAN III: CATATAN METODOLOGI & DISCLAIMER */}
          <div className="qa-doc-section qa-doc-section--notes">
            <h4 className="qa-section-title">
              III. Catatan Teknis & Metodologi Penilaian
            </h4>
            <ul className="qa-doc-notes-list">
              <li>
                Formula perhitungan normalisasi matriks: <code>r_ij = x_ij / max(x_j)</code> untuk kriteria bertipe <em>Benefit</em>, dan <code>r_ij = min(x_j) / x_ij</code> untuk kriteria bertipe <em>Cost</em>.
              </li>
              <li>
                Nilai preferensi akhir dihitung melalui perkalian bobot kriteria dengan matriks normalisasi: <code>V_i = ∑ (w_j × r_ij)</code>.
              </li>
              <li>
                Hasil perangkingan merefleksikan bobot kriteria yang sedang aktif saat laporan ini dicetak dan dapat beradaptasi secara dinamis jika parameter bobot disesuaikan oleh administrator sistem.
              </li>
            </ul>
          </div>

          {/* 6. BAGIAN IV: LEMBAR PENGESAHAN & TANDA TANGAN (Opsional) */}
          {showTandaTangan && (
            <div className="qa-doc-signature-wrapper">
              <div className="qa-doc-sig-box">
                <p className="qa-sig-city">Bogor, {currentDateFormatted}</p>
                <p className="qa-sig-role">Operator / Administrator SPK,</p>
                <div className="qa-sig-space" />
                <p className="qa-sig-name">Demo Administrator</p>
                <p className="qa-sig-title">NIP/ID: QA-ADM-2026-001</p>
              </div>

              <div className="qa-doc-sig-box">
                <p className="qa-sig-city">Mengetahui & Menyetujui,</p>
                <p className="qa-sig-role">Pengelola Qodha Aromatic Kota Bogor,</p>
                <div className="qa-sig-space" />
                <p className="qa-sig-name">( .................................................... )</p>
                <p className="qa-sig-title">Kepala Divisi Wewangian Sunah</p>
              </div>
            </div>
          )}

          {/* 7. FOOTER DOKUMEN CETAK */}
          <div className="qa-doc-footer">
            <p>
              Dokumen ini dihasilkan secara otomatis oleh <strong>Qodha Aromatic Kota Bogor — SPK SAW v1.0</strong> pada {currentDateFormatted}.
            </p>
            <p>Halaman 1 dari 1 — Laporan Resmi Keputusan SAW</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaporanPage;
