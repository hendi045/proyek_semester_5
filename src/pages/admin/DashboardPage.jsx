import React from 'react';
import {
  Sparkles,
  Sliders,
  Calculator,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  ExternalLink,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import {
  DUMMY_TOP_RANKING,
  DUMMY_AKTIVITAS_TERBARU
} from '../../data/dummyData';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import './DashboardPage.css';

export function DashboardPage({ onNavigate }) {
  const {
    aromaList,
    activeAroma,
    kriteriaList,
    totalBobot,
    isBobotValid,
    penilaianStatus,
    sawResult,
    riwayatList
  } = useDataContext();

  const activities = DUMMY_AKTIVITAS_TERBARU;
  const dynamicTopRank = sawResult.isValid && sawResult.rankings.length > 0
    ? sawResult.rankings.slice(0, 4)
    : DUMMY_TOP_RANKING;

  return (
    <div className="qa-dashboard">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <h1 className="qa-page-title">Dashboard Overview</h1>
          <p className="qa-page-desc">
            Ringkasan status data master, parameter kriteria, dan simulasi perangkingan SAW wewangian sunah pada Qodha Aromatic Kota Bogor.
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={ExternalLink}
            onClick={() => onNavigate('public-rekomendasi')}
          >
            Preview Publik
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Calculator}
            onClick={() => onNavigate('saw')}
          >
            Lihat Analisis SAW
          </Button>
        </div>
      </div>

      {/* KPI 4 Cards Grid */}
      <section className="qa-kpi-grid" aria-label="Ringkasan Metrik Utama">
        {/* KPI 1 */}
        <Card className="qa-kpi-card">
          <CardBody className="qa-kpi-body">
            <div className="qa-kpi-info">
              <span className="qa-kpi-label">Aroma Terdaftar</span>
              <div className="qa-kpi-value">{aromaList.length}</div>
              <span className="qa-kpi-sub">{activeAroma.length} alternatif aktif</span>
            </div>
            <div className="qa-kpi-icon-wrap qa-kpi-icon-wrap--orange">
              <Sparkles size={24} />
            </div>
          </CardBody>
        </Card>

        {/* KPI 2 */}
        <Card className="qa-kpi-card">
          <CardBody className="qa-kpi-body">
            <div className="qa-kpi-info">
              <span className="qa-kpi-label">Kriteria SAW</span>
              <div className="qa-kpi-value">{kriteriaList.length}</div>
              <span className="qa-kpi-sub">
                {kriteriaList.filter((k) => k.tipe === 'benefit').length} Benefit • {kriteriaList.filter((k) => k.tipe === 'cost').length} Cost
              </span>
            </div>
            <div className="qa-kpi-icon-wrap qa-kpi-icon-wrap--ink">
              <Sliders size={24} />
            </div>
          </CardBody>
        </Card>

        {/* KPI 3 */}
        <Card className="qa-kpi-card">
          <CardBody className="qa-kpi-body">
            <div className="qa-kpi-info">
              <span className="qa-kpi-label">Alternatif Siap</span>
              <div className="qa-kpi-value">{activeAroma.length}</div>
              <span className="qa-kpi-sub">
                {penilaianStatus.isLengkap ? 'Matriks 100% lengkap' : `${penilaianStatus.missingCount} nilai kosong`}
              </span>
            </div>
            <div className="qa-kpi-icon-wrap qa-kpi-icon-wrap--green">
              <Calculator size={24} />
            </div>
          </CardBody>
        </Card>

        {/* KPI 4 */}
        <Card className="qa-kpi-card">
          <CardBody className="qa-kpi-body">
            <div className="qa-kpi-info">
              <span className="qa-kpi-label">Rekomendasi Tersimpan</span>
              <div className="qa-kpi-value">{riwayatList ? riwayatList.length : 0}</div>
              <span className="qa-kpi-sub">Riwayat simulasi demo</span>
            </div>
            <div className="qa-kpi-icon-wrap qa-kpi-icon-wrap--blue">
              <Award size={24} />
            </div>
          </CardBody>
        </Card>
      </section>

      {/* Main 2-Column Section */}
      <div className="qa-dashboard-content-grid">
        {/* Left Column: Top Ranking Preview */}
        <div className="qa-dashboard-column">
          <Card className="qa-ranking-card">
            <CardHeader className="qa-card-header--row">
              <div>
                <CardTitle>Ranking Teratas Alternatif SAW</CardTitle>
                <CardDescription>
                  Urutan nilai preferensi (V_i) tertinggi berdasarkan bobot kriteria aktif.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onNavigate('ranking')}
              >
                Lihat Semua
              </Button>
            </CardHeader>

            <CardBody className="qa-ranking-body">
              <div className="qa-ranking-list">
                {dynamicTopRank.map((item) => (
                  <div key={item.id} className="qa-ranking-item">
                    <div className="qa-ranking-item__rank">
                      <span className={`qa-rank-badge qa-rank-badge--${item.rank}`}>
                        #{item.rank}
                      </span>
                    </div>

                    <div className="qa-ranking-item__info">
                      <div className="qa-ranking-item__header">
                        <h4 className="qa-ranking-name">{item.nama}</h4>
                        <Badge variant="orange" size="sm">{item.kategori}</Badge>
                      </div>
                      <p className="qa-ranking-highlight">
                        {item.karakteristik || item.highlight || item.statusRecommendation}
                      </p>
                    </div>

                    <div className="qa-ranking-item__score">
                      <span className="qa-score-label">Skor Preferensi</span>
                      <span className="qa-score-value">
                        {item.scorePercent || item.persen}
                      </span>
                      <span className="qa-score-raw">
                        (V = {(item.score !== undefined ? item.score : item.skor).toFixed(4)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Quick Shortcuts */}
          <div className="qa-quick-actions">
            <h3 className="qa-quick-actions__title">Pintasan Kerja Admin</h3>
            <div className="qa-quick-actions__grid">
              <button
                type="button"
                className="qa-action-tile"
                onClick={() => onNavigate('aroma')}
              >
                <Sparkles size={20} className="qa-action-tile__icon" />
                <span className="qa-action-tile__label">Kelola Data Aroma</span>
                <span className="qa-action-tile__hint">6 item aktif</span>
              </button>

              <button
                type="button"
                className="qa-action-tile"
                onClick={() => onNavigate('bobot')}
              >
                <Sliders size={20} className="qa-action-tile__icon" />
                <span className="qa-action-tile__label">Pengaturan Bobot</span>
                <span className="qa-action-tile__hint">Total 100% valid</span>
              </button>

              <button
                type="button"
                className="qa-action-tile"
                onClick={() => onNavigate('penilaian')}
              >
                <FileSpreadsheet size={20} className="qa-action-tile__icon" />
                <span className="qa-action-tile__label">Matriks Penilaian</span>
                <span className="qa-action-tile__hint">Nilai alternatif</span>
              </button>

              <button
                type="button"
                className="qa-action-tile"
                onClick={() => onNavigate('laporan')}
              >
                <Layers size={20} className="qa-action-tile__icon" />
                <span className="qa-action-tile__label">Cetak Laporan</span>
                <span className="qa-action-tile__hint">Format print-ready</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Status Kesiapan & Aktivitas Terbaru */}
        <div className="qa-dashboard-column">
          {/* Status Kesiapan SAW */}
          <Card className="qa-status-card">
            <CardHeader>
              <CardTitle>Kesiapan Perhitungan SAW</CardTitle>
              <CardDescription>
                Verifikasi prasyarat matematis algoritma Simple Additive Weighting.
              </CardDescription>
            </CardHeader>
            <CardBody className="qa-status-body">
              <div className="qa-status-row">
                <div className={`qa-status-icon-check ${!isBobotValid ? 'qa-status-icon-check--warn' : ''}`}>
                  {isBobotValid ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                </div>
                <div className="qa-status-text">
                  <span className="qa-status-title">Total Bobot Kriteria ({totalBobot}%)</span>
                  <p className="qa-status-desc">
                    {isBobotValid
                      ? 'Total bobot tepat 100% — Siap untuk kalkulasi normalisasi SAW.'
                      : `Total bobot saat ini ${totalBobot}%. Wajib tepat 100% sebelum perangkingan.`}
                  </p>
                </div>
                <Badge variant={isBobotValid ? 'success' : 'danger'} size="sm">
                  {isBobotValid ? 'Valid (100%)' : 'Tidak Valid'}
                </Badge>
              </div>

              <div className="qa-status-divider" />

              <div className="qa-status-row">
                <div className={`qa-status-icon-check ${!penilaianStatus.isLengkap ? 'qa-status-icon-check--warn' : ''}`}>
                  {penilaianStatus.isLengkap ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                </div>
                <div className="qa-status-text">
                  <span className="qa-status-title">
                    Kelengkapan Penilaian Alternatif
                  </span>
                  <p className="qa-status-desc">
                    {penilaianStatus.isLengkap
                      ? `Semua ${activeAroma.length} alternatif aktif memiliki nilai kriteria lengkap.`
                      : `Ada ${penilaianStatus.missingCount} nilai kriteria kosong yang harus dilengkapi.`}
                  </p>
                </div>
                <Badge variant={penilaianStatus.isLengkap ? 'success' : 'warning'} size="sm">
                  {penilaianStatus.isLengkap ? 'Lengkap' : 'Perlu Dilengkapi'}
                </Badge>
              </div>

              <div className="qa-status-divider" />

              <div className="qa-status-cta">
                <Button
                  variant="secondary"
                  size="sm"
                  className="qa-status-btn"
                  onClick={() => onNavigate('saw')}
                >
                  Buka Matriks & Normalisasi SAW
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Aktivitas Terbaru */}
          <Card className="qa-activity-card">
            <CardHeader>
              <CardTitle>Aktivitas Terakhir (Demo)</CardTitle>
              <CardDescription>Log tindakan simulasi pada browser ini.</CardDescription>
            </CardHeader>
            <CardBody className="qa-activity-body">
              <div className="qa-activity-list">
                {activities.map((act) => (
                  <div key={act.id} className="qa-activity-item">
                    <div className="qa-activity-bullet" />
                    <div className="qa-activity-content">
                      <p className="qa-activity-desc">{act.deskripsi}</p>
                      <span className="qa-activity-time">
                        <Clock size={12} />
                        {act.waktu}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
