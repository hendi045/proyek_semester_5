import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RotateCcw,
  Sliders,
  Save
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import './BobotKriteriaPage.css';

export function BobotKriteriaPage() {
  const {
    activeKriteria,
    totalBobot,
    isBobotValid,
    updateBobot,
    normalizeBobot,
    resetBobotToDefault,
    showToast
  } = useDataContext();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSliderChange = (kode, val) => {
    updateBobot(kode, Number(val));
    setHasUnsavedChanges(true);
  };

  const handleSaveBobot = () => {
    if (!isBobotValid) {
      showToast(`Peringatan: Total bobot saat ini ${totalBobot}%. Dianjurkan tepat 100% sebelum SAW dijalankan.`, 'warning');
    } else {
      showToast('Konfigurasi bobot kriteria berhasil disimpan ke penyimpanan demo.', 'success');
    }
    setHasUnsavedChanges(false);
  };

  const diffBobot = 100 - totalBobot;

  return (
    <div className="qa-data-page">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <div className="qa-breadcrumb">
            <span>Data Master</span>
            <span>/</span>
            <span className="qa-breadcrumb__active">Bobot Kriteria</span>
          </div>
          <h1 className="qa-page-title">Pengaturan Bobot Kriteria SAW</h1>
          <p className="qa-page-desc">
            Tentukan bobot preferensi relatif tiap kriteria wewangian sunah. Total bobot seluruh kriteria aktif wajib tepat 100% untuk validitas perangkingan.
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={RotateCcw}
            onClick={() => {
              resetBobotToDefault();
              setHasUnsavedChanges(false);
            }}
          >
            Reset Standar
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={Sliders}
            onClick={normalizeBobot}
            title="Bagi bobot kriteria secara proporsional agar total tepat 100%"
          >
            Normalisasikan ke 100%
          </Button>
          <Button
            variant={hasUnsavedChanges ? 'primary' : 'secondary'}
            size="md"
            icon={Save}
            onClick={handleSaveBobot}
          >
            {hasUnsavedChanges ? 'Simpan Perubahan' : 'Simpan Bobot'}
          </Button>
        </div>
      </div>

      {/* REAL-TIME VALIDATION BANNER */}
      <div
        className={`qa-bobot-banner ${
          isBobotValid
            ? 'qa-bobot-banner--valid'
            : totalBobot < 100
            ? 'qa-bobot-banner--less'
            : 'qa-bobot-banner--more'
        }`}
        role="status"
      >
        <div className="qa-bobot-banner__icon">
          {isBobotValid ? (
            <CheckCircle2 size={24} />
          ) : totalBobot < 100 ? (
            <AlertTriangle size={24} />
          ) : (
            <AlertCircle size={24} />
          )}
        </div>
        <div className="qa-bobot-banner__content">
          <div className="qa-bobot-banner__top">
            <h3 className="qa-bobot-banner__title">
              {isBobotValid
                ? 'Total Bobot Tepat 100% — Siap untuk Kalkulasi SAW'
                : totalBobot < 100
                ? `Total Bobot Kurang ${Math.abs(diffBobot)}% (Saat ini: ${totalBobot}%)`
                : `Total Bobot Kelebihan ${Math.abs(diffBobot)}% (Saat ini: ${totalBobot}%)`}
            </h3>
            <span className="qa-bobot-banner__badge">
              Total: {totalBobot}%
            </span>
          </div>
          <p className="qa-bobot-banner__desc">
            {isBobotValid
              ? 'Seluruh kriteria aktif telah memiliki bobot yang seimbang dan memenuhi syarat normalisasi metode Simple Additive Weighting.'
              : totalBobot < 100
              ? `Anda perlu menambahkan ${Math.abs(diffBobot)}% lagi pada salah satu kriteria aktif, atau klik tombol "Normalisasikan ke 100%" di atas untuk penyesuaian otomatis.`
              : `Kurangi ${Math.abs(diffBobot)}% dari salah satu kriteria aktif agar total pas 100%, atau gunakan fitur "Normalisasikan ke 100%".`}
          </p>

          {/* Progress Bar Akumulasi */}
          <div className="qa-bobot-meter">
            <div
              className={`qa-bobot-meter__fill ${
                isBobotValid
                  ? 'qa-bobot-meter__fill--valid'
                  : totalBobot < 100
                  ? 'qa-bobot-meter__fill--warning'
                  : 'qa-bobot-meter__fill--danger'
              }`}
              style={{ width: `${Math.min(100, totalBobot)}%` }}
            />
          </div>
        </div>
      </div>

      {/* KRITERIA WEIGHT CONTROLLER LIST */}
      <div className="qa-bobot-grid">
        {activeKriteria.map((kriteria) => {
          const valDecimal = (Number(kriteria.bobot) / 100).toFixed(2);

          return (
            <Card key={kriteria.kode} className="qa-bobot-card">
              <CardBody className="qa-bobot-card__body">
                <div className="qa-bobot-card__header">
                  <div className="qa-bobot-card__meta">
                    <div className="flex items-center gap-2">
                      <span className="qa-code-pill">{kriteria.kode}</span>
                      <h4 className="qa-bobot-card__title">{kriteria.nama}</h4>
                    </div>
                    <p className="qa-bobot-card__desc">{kriteria.deskripsi}</p>
                  </div>

                  <div className="qa-bobot-card__tags">
                    <Badge
                      variant={kriteria.tipe === 'benefit' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {kriteria.tipe === 'benefit' ? 'Benefit' : 'Cost'}
                    </Badge>
                  </div>
                </div>

                {/* Slider & Input Controls */}
                <div className="qa-bobot-control">
                  <div className="qa-bobot-slider-wrap">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={kriteria.bobot}
                      onChange={(e) => handleSliderChange(kriteria.kode, e.target.value)}
                      className="qa-bobot-slider"
                      aria-label={`Slider bobot ${kriteria.nama}`}
                    />
                    <div className="qa-slider-scale">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="qa-bobot-number-box">
                    <div className="qa-number-input-group">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={kriteria.bobot}
                        onChange={(e) => handleSliderChange(kriteria.kode, e.target.value)}
                        className="qa-number-input"
                        aria-label={`Input numerik bobot ${kriteria.nama}`}
                      />
                      <span className="qa-number-unit">%</span>
                    </div>
                    <span className="qa-decimal-tag">
                      W = {valDecimal}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* MATRIX SUMMARY TABLE: Vektor Bobot (W) */}
      <Card>
        <CardHeader className="qa-table-header">
          <div>
            <CardTitle>Vektor Bobot Kriteria (W)</CardTitle>
            <p className="qa-table-sub">
              Representasi matematis nilai bobot W_j yang akan digunakan saat proses perkalian matriks SAW (V_i = Σ w_j * r_ij).
            </p>
          </div>
        </CardHeader>
        <CardBody className="qa-table-body-wrapper">
          <div className="qa-table-container">
            <table className="qa-table">
              <thead>
                <tr>
                  <th>Kode Kriteria</th>
                  <th>Nama Kriteria</th>
                  <th>Sifat Kriteria</th>
                  <th>Bobot Persen (%)</th>
                  <th>Vektor W_j (Desimal)</th>
                  <th>Kontribusi Proporsional</th>
                </tr>
              </thead>
              <tbody>
                {activeKriteria.map((k) => (
                  <tr key={k.kode}>
                    <td>
                      <span className="qa-code-pill">{k.kode}</span>
                    </td>
                    <td>
                      <strong>{k.nama}</strong>
                    </td>
                    <td>
                      <Badge variant={k.tipe === 'benefit' ? 'success' : 'warning'} size="sm">
                        {k.tipe === 'benefit' ? 'Benefit' : 'Cost'}
                      </Badge>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700 }}>{k.bobot}%</span>
                    </td>
                    <td>
                      <span className="qa-formula-snippet">
                        {(Number(k.bobot) / 100).toFixed(4)}
                      </span>
                    </td>
                    <td>
                      <div className="qa-mini-progress" style={{ width: '160px' }}>
                        <div
                          className="qa-mini-progress__bar"
                          style={{ width: `${Math.min(100, k.bobot)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: 'var(--color-canvas)', fontWeight: 700 }}>
                  <td colSpan={3} style={{ textAlign: 'right' }}>
                    TOTAL AKUMULASI BOBOT:
                  </td>
                  <td>
                    <span style={{ color: isBobotValid ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {totalBobot}%
                    </span>
                  </td>
                  <td>
                    <span className="qa-formula-snippet">
                      {(totalBobot / 100).toFixed(4)}
                    </span>
                  </td>
                  <td>
                    <Badge variant={isBobotValid ? 'success' : 'danger'} size="sm">
                      {isBobotValid ? 'Valid (1.0000)' : 'Tidak Valid'}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
