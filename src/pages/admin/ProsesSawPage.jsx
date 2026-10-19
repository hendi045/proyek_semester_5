import React from 'react';
import {
  Calculator,
  AlertTriangle,
  Info,
  Scale,
  Award
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import './ProsesSawPage.css';

export function ProsesSawPage({ onNavigate }) {
  const {
    activeAroma,
    activeKriteria,
    totalBobot,
    isBobotValid,
    penilaianStatus,
    sawResult
  } = useDataContext();

  return (
    <div className="qa-data-page qa-saw-page">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <div className="qa-breadcrumb">
            <span>Analisis SAW</span>
            <span>/</span>
            <span className="qa-breadcrumb__active">Proses Perhitungan SAW</span>
          </div>
          <h1 className="qa-page-title">Tahapan Proses Perhitungan SAW</h1>
          <p className="qa-page-desc">
            Transparansi matematis metode Simple Additive Weighting secara bertahap mulai dari matriks keputusan awal (X), normalisasi benefit/cost (R), perkalian vektor bobot (W), hingga nilai preferensi akhir (V).
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={Scale}
            onClick={() => onNavigate && onNavigate('bobot')}
          >
            Kelola Bobot ({totalBobot}%)
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Award}
            onClick={() => onNavigate && onNavigate('ranking')}
          >
            Lihat Hasil Perangkingan
          </Button>
        </div>
      </div>

      {/* KPI Validation Strip */}
      <div className="qa-kpi-strip">
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Alternatif Dievaluasi</span>
          <span className="qa-kpi-strip__val">{activeAroma.length} Alternatif</span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Kriteria Aktif</span>
          <span className="qa-kpi-strip__val">
            {activeKriteria.length} Kriteria
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Total Bobot Kriteria</span>
          <div className="flex items-center gap-2">
            <span
              className={`qa-kpi-strip__val ${isBobotValid ? 'qa-kpi-strip__val--highlight' : ''}`}
              style={{ color: !isBobotValid ? 'var(--color-danger)' : undefined }}
            >
              {totalBobot}%
            </span>
            <Badge variant={isBobotValid ? 'success' : 'danger'} size="sm">
              {isBobotValid ? 'Valid (100%)' : 'Tidak Valid'}
            </Badge>
          </div>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Status Kelengkapan</span>
          <span className="qa-kpi-strip__val">
            {penilaianStatus.isLengkap ? '100% Terisi' : `${penilaianStatus.missingCount} Nilai Kosong`}
          </span>
        </div>
      </div>

      {/* JIKA SAW TIDAK VALID: ERROR STATE BANNER */}
      {!sawResult.isValid && (
        <Card className="qa-saw-error-card">
          <CardBody className="qa-saw-error-body">
            <div className="qa-saw-error-icon">
              <AlertTriangle size={32} />
            </div>
            <div className="qa-saw-error-content">
              <h3 className="qa-saw-error-title">
                Perhitungan SAW Belum Dapat Dijalankan
              </h3>
              <p className="qa-saw-error-desc">
                Terdapat prasyarat matematis yang belum terpenuhi pada konfigurasi data saat ini:
              </p>
              <ul className="qa-saw-error-list">
                {sawResult.errors.map((err, idx) => (
                  <li key={idx} className="qa-saw-error-item">
                    <span>• {err}</span>
                  </li>
                ))}
              </ul>
              <div className="qa-saw-error-actions">
                {!isBobotValid && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Scale}
                    onClick={() => onNavigate && onNavigate('bobot')}
                  >
                    Perbaiki Bobot Kriteria
                  </Button>
                )}
                {!penilaianStatus.isLengkap && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Calculator}
                    onClick={() => onNavigate && onNavigate('penilaian')}
                  >
                    Lengkapi Nilai Matriks
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* JIKA SAW VALID: TAHAP 1 - 4 LENGKAP */}
      {sawResult.isValid && (
        <div className="qa-saw-steps-container">
          {/* TAHAP 1: MATRIKS KEPUTUSAN AWAL (X) */}
          <Card className="qa-saw-step-card">
            <CardHeader className="qa-table-header">
              <div className="qa-step-title-wrapper">
                <span className="qa-step-badge">Tahap 1</span>
                <div>
                  <CardTitle>Matriks Keputusan Awal (X)</CardTitle>
                  <p className="qa-table-sub">
                    Nilai evaluasi asli (x_ij) tiap alternatif wewangian sunah terhadap kriteria aktif skala 1–5.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="qa-table-body-wrapper">
              <div className="qa-table-container">
                <table className="qa-table qa-table--bordered">
                  <thead>
                    <tr>
                      <th style={{ width: '100px' }}>Kode</th>
                      <th style={{ minWidth: '220px' }}>Alternatif Aroma</th>
                      {activeKriteria.map((k) => (
                        <th key={k.kode} style={{ textAlign: 'center' }}>
                          <div className="qa-th-kriteria">
                            <span className="qa-th-code">{k.kode}</span>
                            <span className="qa-th-name">{k.nama}</span>
                            <Badge
                              variant={k.tipe === 'benefit' ? 'success' : 'warning'}
                              size="sm"
                            >
                              {k.tipe === 'benefit' ? 'Benefit' : 'Cost'}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sawResult.matrixX.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span className="qa-code-pill">{row.id}</span>
                        </td>
                        <td>
                          <strong className="qa-kriteria-name">{row.nama}</strong>
                        </td>
                        {activeKriteria.map((k) => (
                          <td key={k.kode} style={{ textAlign: 'center', fontWeight: 600 }}>
                            {row.values[k.kode]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Baris Ekstremum Min / Max */}
                    <tr className="qa-row-extrema">
                      <td colSpan={2}>
                        <div className="flex items-center gap-2">
                          <Info size={14} className="text-muted" />
                          <strong>Nilai Ekstremum Acuan Normalisasi</strong>
                        </div>
                      </td>
                      {activeKriteria.map((k) => {
                        const ext = sawResult.extrema[k.kode];
                        return (
                          <td key={k.kode} style={{ textAlign: 'center' }}>
                            {k.tipe === 'benefit' ? (
                              <div className="qa-extrema-box qa-extrema-box--benefit">
                                <span className="qa-ext-label">Max</span>
                                <span className="qa-ext-val">{ext.max}</span>
                              </div>
                            ) : (
                              <div className="qa-extrema-box qa-extrema-box--cost">
                                <span className="qa-ext-label">Min</span>
                                <span className="qa-ext-val">{ext.min}</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* TAHAP 2: MATRIKS TERNORMALISASI (R) */}
          <Card className="qa-saw-step-card">
            <CardHeader className="qa-table-header">
              <div className="qa-step-title-wrapper">
                <span className="qa-step-badge">Tahap 2</span>
                <div>
                  <CardTitle>Matriks Ternormalisasi (R)</CardTitle>
                  <p className="qa-table-sub">
                    Hasil penskalaan nilai ke rentang [0, 1] sesuai kaidah kriteria Benefit (x_ij / max) dan Cost (min / x_ij).
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="qa-table-body-wrapper">
              <div className="qa-table-container">
                <table className="qa-table qa-table--bordered">
                  <thead>
                    <tr>
                      <th style={{ width: '100px' }}>Kode</th>
                      <th style={{ minWidth: '220px' }}>Alternatif Aroma</th>
                      {activeKriteria.map((k) => (
                        <th key={k.kode} style={{ textAlign: 'center' }}>
                          <span className="qa-th-code">{k.kode}</span>
                          <span className="qa-formula-tag">
                            {k.tipe === 'benefit'
                              ? `x / ${sawResult.extrema[k.kode].max}`
                              : `${sawResult.extrema[k.kode].min} / x`}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sawResult.matrixR.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span className="qa-code-pill">{row.id}</span>
                        </td>
                        <td>
                          <strong className="qa-kriteria-name">{row.nama}</strong>
                        </td>
                        {activeKriteria.map((k) => {
                          const rVal = row.normalized[k.kode];
                          return (
                            <td
                              key={k.kode}
                              style={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: 600,
                                color: rVal === 1 ? 'var(--color-orange)' : 'inherit'
                              }}
                            >
                              {rVal.toFixed(4)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* TAHAP 3: PERKALIAN TERBOBOT (W x R) */}
          <Card className="qa-saw-step-card">
            <CardHeader className="qa-table-header">
              <div className="qa-step-title-wrapper">
                <span className="qa-step-badge">Tahap 3</span>
                <div>
                  <CardTitle>Matriks Perkalian Terbobot (W x R)</CardTitle>
                  <p className="qa-table-sub">
                    Setiap elemen matriks r_ij dikalikan bobot kriteria desimal (w_j = bobot / 100).
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="qa-table-body-wrapper">
              <div className="qa-table-container">
                <table className="qa-table qa-table--bordered">
                  <thead>
                    <tr>
                      <th style={{ width: '100px' }}>Kode</th>
                      <th style={{ minWidth: '220px' }}>Alternatif Aroma</th>
                      {activeKriteria.map((k) => (
                        <th key={k.kode} style={{ textAlign: 'center' }}>
                          <span className="qa-th-code">{k.kode}</span>
                          <span className="qa-formula-tag">
                            W = {(k.bobot / 100).toFixed(2)} ({k.bobot}%)
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sawResult.weightedMatrix.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span className="qa-code-pill">{row.id}</span>
                        </td>
                        <td>
                          <strong className="qa-kriteria-name">{row.nama}</strong>
                        </td>
                        {activeKriteria.map((k) => (
                          <td
                            key={k.kode}
                            style={{
                              textAlign: 'center',
                              fontFamily: 'monospace',
                              fontWeight: 600
                            }}
                          >
                            {row.weighted[k.kode].toFixed(4)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* TAHAP 4: NILAI PREFERENSI AKHIR (V_i) */}
          <Card className="qa-saw-step-card">
            <CardHeader className="qa-table-header">
              <div className="qa-step-title-wrapper">
                <span className="qa-step-badge qa-step-badge--orange">Tahap 4</span>
                <div>
                  <CardTitle>Nilai Preferensi Akhir (V_i)</CardTitle>
                  <p className="qa-table-sub">
                    Penjumlahan seluruh kontribusi kriteria: V_i = ∑ (w_j × r_ij). Alternatif dengan skor V_i terbesar menjadi rekomendasi utama.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="qa-table-body-wrapper">
              <div className="qa-table-container">
                <table className="qa-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Peringkat</th>
                      <th style={{ width: '100px' }}>Kode</th>
                      <th>Nama Alternatif Aroma</th>
                      <th>Kategori</th>
                      <th style={{ textAlign: 'center' }}>Nilai Preferensi ($V_i$)</th>
                      <th style={{ textAlign: 'center' }}>Persentase Skor</th>
                      <th>Status Rekomendasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sawResult.rankings.map((item) => (
                      <tr key={item.id} className={item.rank === 1 ? 'qa-row--rank1' : ''}>
                        <td>
                          <span className={`qa-rank-badge qa-rank-badge--${item.rank}`}>
                            #{item.rank}
                          </span>
                        </td>
                        <td>
                          <span className="qa-code-pill">{item.id}</span>
                        </td>
                        <td>
                          <strong className="qa-kriteria-name">{item.nama}</strong>
                        </td>
                        <td>
                          <Badge variant="neutral" size="sm">{item.kategori}</Badge>
                        </td>
                        <td style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, fontSize: '15px' }}>
                          {item.score.toFixed(4)}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="qa-score-badge-large">{item.scorePercent}</span>
                        </td>
                        <td>
                          <Badge
                            variant={item.rank === 1 ? 'orange' : item.rank <= 3 ? 'success' : 'neutral'}
                            size="sm"
                          >
                            {item.statusRecommendation}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
