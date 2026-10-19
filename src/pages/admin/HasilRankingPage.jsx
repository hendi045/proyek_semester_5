import React, { useState, useMemo } from 'react';
import {
  Crown,
  Search,
  Calculator,
  Printer,
  ChevronRight,
  AlertTriangle,
  Scale,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { DUMMY_KATEGORI_OPTIONS } from '../../data/dummyData';
import './HasilRankingPage.css';

export function HasilRankingPage({ onNavigate }) {
  const {
    activeKriteria,
    isBobotValid,
    penilaianStatus,
    sawResult
  } = useDataContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua Kategori');
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Filtered rankings
  const filteredRankings = useMemo(() => {
    if (!sawResult.isValid) return [];
    return sawResult.rankings.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.karakteristik.toLowerCase().includes(searchQuery.toLowerCase());

      const matchKategori =
        selectedKategori === 'Semua Kategori' ||
        item.kategori.toLowerCase().includes(selectedKategori.toLowerCase());

      return matchSearch && matchKategori;
    });
  }, [sawResult, searchQuery, selectedKategori]);

  const top1 = sawResult.isValid && sawResult.rankings.length > 0 ? sawResult.rankings[0] : null;
  const top2 = sawResult.isValid && sawResult.rankings.length > 1 ? sawResult.rankings[1] : null;
  const top3 = sawResult.isValid && sawResult.rankings.length > 2 ? sawResult.rankings[2] : null;

  // Average score
  const avgScore = useMemo(() => {
    if (!sawResult.isValid || sawResult.rankings.length === 0) return 0;
    const sum = sawResult.rankings.reduce((acc, curr) => acc + curr.score, 0);
    return ((sum / sawResult.rankings.length) * 100).toFixed(2);
  }, [sawResult]);

  return (
    <div className="qa-data-page qa-ranking-page">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <div className="qa-breadcrumb">
            <span>Analisis SAW</span>
            <span>/</span>
            <span className="qa-breadcrumb__active">Hasil Perangkingan</span>
          </div>
          <h1 className="qa-page-title">Hasil Perangkingan Alternatif SAW</h1>
          <p className="qa-page-desc">
            Daftar urutan preferensi alternatif wewangian sunah dari skor tertinggi (V_max) berdasarkan akumulasi perkalian matriks normalisasi dan bobot kriteria aktif.
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={Calculator}
            onClick={() => onNavigate && onNavigate('saw')}
          >
            Lihat Tahapan Proses SAW
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Printer}
            onClick={() => onNavigate && onNavigate('laporan')}
          >
            Cetak Dokumen Laporan
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="qa-kpi-strip">
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Rekomendasi Utama (#1)</span>
          <span className="qa-kpi-strip__val qa-kpi-strip__val--highlight">
            {top1 ? top1.nama : '-'}
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Skor Tertinggi (V_max)</span>
          <span className="qa-kpi-strip__val">
            {top1 ? top1.scorePercent : '-'}
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Rata-Rata Skor (V_avg)</span>
          <span className="qa-kpi-strip__val">{avgScore}%</span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Total Kandidat Diranking</span>
          <span className="qa-kpi-strip__val">
            {sawResult.isValid ? sawResult.rankings.length : 0} Alternatif
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
                Hasil Perangkingan Tidak Tersedia
              </h3>
              <p className="qa-saw-error-desc">
                Perangkingan membutuhkan total bobot tepat 100% dan kelengkapan nilai kriteria pada seluruh alternatif aktif.
              </p>
              <div className="qa-saw-error-actions">
                {!isBobotValid && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Scale}
                    onClick={() => onNavigate && onNavigate('bobot')}
                  >
                    Sesuaikan Bobot Kriteria
                  </Button>
                )}
                {!penilaianStatus.isLengkap && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Calculator}
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

      {/* JIKA SAW VALID: PODIUM TOP 3 + TABEL DETAIL */}
      {sawResult.isValid && (
        <>
          {/* Top 3 Podium Cards */}
          <div className="qa-podium-grid">
            {/* Rank 2 */}
            {top2 && (
              <Card className="qa-podium-card qa-podium-card--rank2">
                <CardBody className="qa-podium-body">
                  <div className="qa-podium-badge qa-podium-badge--silver">#2</div>
                  <Badge variant="neutral" size="sm">{top2.kategori}</Badge>
                  <h3 className="qa-podium-name">{top2.nama}</h3>
                  <p className="qa-podium-desc">{top2.karakteristik}</p>
                  <div className="qa-podium-score">
                    <span className="qa-score-label">Skor Preferensi</span>
                    <span className="qa-podium-score-val">{top2.scorePercent}</span>
                    <span className="qa-podium-raw">(V = {top2.score.toFixed(4)})</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={() => setSelectedDetailItem(top2)}
                  >
                    Lihat Breakdown
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Rank 1 (Main Hero) */}
            {top1 && (
              <Card className="qa-podium-card qa-podium-card--rank1">
                <CardBody className="qa-podium-body">
                  <div className="qa-crown-wrapper">
                    <Crown size={28} className="qa-crown-icon" />
                  </div>
                  <div className="qa-podium-badge qa-podium-badge--gold">#1 Rekomendasi Utama</div>
                  <Badge variant="orange" size="sm">{top1.kategori}</Badge>
                  <h3 className="qa-podium-name qa-podium-name--lg">{top1.nama}</h3>
                  <p className="qa-podium-desc">{top1.karakteristik}</p>
                  <div className="qa-podium-score qa-podium-score--gold">
                    <span className="qa-score-label">Skor Preferensi Tertinggi</span>
                    <span className="qa-podium-score-val qa-podium-score-val--lg">
                      {top1.scorePercent}
                    </span>
                    <span className="qa-podium-raw">(V = {top1.score.toFixed(4)})</span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    icon={Sparkles}
                    onClick={() => setSelectedDetailItem(top1)}
                  >
                    Detail Nilai & Kontribusi
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Rank 3 */}
            {top3 && (
              <Card className="qa-podium-card qa-podium-card--rank3">
                <CardBody className="qa-podium-body">
                  <div className="qa-podium-badge qa-podium-badge--bronze">#3</div>
                  <Badge variant="neutral" size="sm">{top3.kategori}</Badge>
                  <h3 className="qa-podium-name">{top3.nama}</h3>
                  <p className="qa-podium-desc">{top3.karakteristik}</p>
                  <div className="qa-podium-score">
                    <span className="qa-score-label">Skor Preferensi</span>
                    <span className="qa-podium-score-val">{top3.scorePercent}</span>
                    <span className="qa-podium-raw">(V = {top3.score.toFixed(4)})</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={() => setSelectedDetailItem(top3)}
                  >
                    Lihat Breakdown
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Filter & Search Toolbar */}
          <Card className="qa-toolbar-card">
            <CardBody className="qa-toolbar-body">
              <div className="qa-search-box">
                <Input
                  id="searchRanking"
                  placeholder="Cari aroma atau karakteristik dalam ranking..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={Search}
                />
              </div>

              <div className="qa-filter-group">
                <div className="qa-filter-item">
                  <Select
                    id="filterKategoriRanking"
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    options={DUMMY_KATEGORI_OPTIONS}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Table Data Card */}
          <Card>
            <CardHeader className="qa-table-header">
              <div>
                <CardTitle>Tabel Ranking Lengkap ({filteredRankings.length} Alternatif)</CardTitle>
                <p className="qa-table-sub">
                  Urutan keputusan final SAW berdasarkan preferensi V_i = ∑ (w_j × r_ij) secara menurun.
                </p>
              </div>
            </CardHeader>
            <CardBody className="qa-table-body-wrapper">
              <div className="qa-table-container">
                <table className="qa-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px', textAlign: 'center' }}>Rank</th>
                      <th style={{ width: '100px' }}>Kode</th>
                      <th>Nama Alternatif Aroma</th>
                      <th>Kategori</th>
                      <th style={{ textAlign: 'center' }}>Nilai Preferensi ($V_i$)</th>
                      <th style={{ textAlign: 'center' }}>Skor Akhir (%)</th>
                      <th>Status Rekomendasi</th>
                      <th style={{ textAlign: 'right', width: '130px' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRankings.map((item) => (
                      <tr key={item.id} className={item.rank === 1 ? 'qa-row--rank1' : ''}>
                        <td style={{ textAlign: 'center' }}>
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
                        <td style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 700 }}>
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
                        <td style={{ textAlign: 'right' }}>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={BarChart3}
                            onClick={() => setSelectedDetailItem(item)}
                          >
                            Breakdown
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </>
      )}

      {/* Modal Detail Breakdown Skor SAW */}
      {selectedDetailItem && (
        <Modal
          isOpen={Boolean(selectedDetailItem)}
          onClose={() => setSelectedDetailItem(null)}
          title={`Detail Skor SAW: ${selectedDetailItem.nama}`}
          cancelLabel="Tutup"
          maxWidth="640px"
        >
          <div className="qa-modal-breakdown">
            <div className="qa-breakdown-summary">
              <div className="qa-summary-rank">
                <span className={`qa-rank-badge qa-rank-badge--${selectedDetailItem.rank}`}>
                  #{selectedDetailItem.rank}
                </span>
                <div>
                  <h4 className="qa-summary-title">{selectedDetailItem.nama}</h4>
                  <Badge variant="orange" size="sm">{selectedDetailItem.kategori}</Badge>
                </div>
              </div>
              <div className="qa-summary-score">
                <span className="qa-summary-score-val">{selectedDetailItem.scorePercent}</span>
                <span className="qa-summary-score-v">V = {selectedDetailItem.score.toFixed(4)}</span>
              </div>
            </div>

            <p className="qa-breakdown-desc">{selectedDetailItem.deskripsi}</p>

            <div className="qa-breakdown-list-wrapper">
              <h4 className="qa-breakdown-heading">
                Rincian Kontribusi Nilai Tiap Kriteria Terbobot (w_j × r_ij):
              </h4>
              <div className="qa-breakdown-list">
                {activeKriteria.map((k) => {
                  const b = selectedDetailItem.breakdown[k.kode];
                  if (!b) return null;
                  const percentOfTotal = (b.contribution / selectedDetailItem.score) * 100;

                  return (
                    <div key={k.kode} className="qa-breakdown-item">
                      <div className="qa-b-header">
                        <div className="qa-b-title-group">
                          <span className="qa-code-pill">{k.kode}</span>
                          <span className="qa-b-name">{k.nama}</span>
                          <Badge
                            variant={k.tipe === 'benefit' ? 'success' : 'warning'}
                            size="sm"
                          >
                            {k.tipe === 'benefit' ? 'Benefit' : 'Cost'} ({k.bobot}%)
                          </Badge>
                        </div>
                        <span className="qa-b-val">
                          +{b.contribution.toFixed(4)} ({b.percentContribution})
                        </span>
                      </div>

                      <div className="qa-b-math">
                        <span>Nilai Asli ($x$): <strong>{b.raw}</strong></span>
                        <span>Normalisasi ($r$): <strong>{b.normalized.toFixed(4)}</strong></span>
                        <span>Bobot ($w$): <strong>{b.weight.toFixed(2)}</strong></span>
                      </div>

                      <div className="qa-b-progress-track">
                        <div
                          className="qa-b-progress-fill"
                          style={{ width: `${Math.min(100, percentOfTotal)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
