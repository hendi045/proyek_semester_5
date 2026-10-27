import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  Info,
  ChevronRight,
  Filter,
  BookmarkPlus,
  BarChart2,
  Check
} from 'lucide-react';
import {
  DUMMY_KATEGORI_OPTIONS,
  DUMMY_PENGGUNAAN_OPTIONS
} from '../../data/dummyData';
import { useDataContext } from '../../context/DataContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import './PublicRekomendasiPage.css';

export function PublicRekomendasiPage() {
  const { activeAroma, activeKriteria, sawResult, addRiwayat } = useDataContext();
  const [selectedKategori, setSelectedKategori] = useState('Semua Kategori');
  const [selectedPenggunaan, setSelectedPenggunaan] = useState('Semua Kebutuhan');
  const [selectedAromaDetail, setSelectedAromaDetail] = useState(null);
  const [savedSimulations, setSavedSimulations] = useState({});

  // Filter dan urutkan aroma kandidat berdasarkan skor SAW yang dihitung
  const sortedAndFilteredAroma = useMemo(() => {
    // 1. Filter awal berdasarkan kategori dan penggunaan
    const filtered = activeAroma.filter((item) => {
      const matchKategori =
        selectedKategori === 'Semua Kategori' ||
        item.kategori.toLowerCase().includes(selectedKategori.toLowerCase());

      const matchPenggunaan =
        selectedPenggunaan === 'Semua Kebutuhan' ||
        item.kegunaan.toLowerCase().includes(selectedPenggunaan.toLowerCase());

      return matchKategori && matchPenggunaan;
    });

    // 2. Urutkan berdasarkan hasil ranking SAW jika valid
    if (sawResult.isValid && sawResult.rankings.length > 0) {
      return [...filtered].sort((a, b) => {
        const rankA = sawResult.rankings.find((r) => r.id === a.id);
        const rankB = sawResult.rankings.find((r) => r.id === b.id);
        const scoreA = rankA ? rankA.score : 0;
        const scoreB = rankB ? rankB.score : 0;
        return scoreB - scoreA;
      });
    }

    return filtered;
  }, [activeAroma, selectedKategori, selectedPenggunaan, sawResult]);

  const handleSaveToHistory = () => {
    if (sortedAndFilteredAroma.length === 0) return;
    const topItem = sortedAndFilteredAroma[0];
    const topRankInfo = sawResult.isValid
      ? sawResult.rankings.find((r) => r.id === topItem.id)
      : null;

    addRiwayat({
      filterKategori: selectedKategori,
      filterKebutuhan: selectedPenggunaan,
      topResult: topItem.nama,
      topResultId: topItem.id,
      skor: topRankInfo ? topRankInfo.scorePercent : '85.00%'
    });

    setSavedSimulations((prev) => ({
      ...prev,
      [`${selectedKategori}-${selectedPenggunaan}`]: true
    }));
  };

  const isCurrentSaved = Boolean(savedSimulations[`${selectedKategori}-${selectedPenggunaan}`]);

  return (
    <div className="qa-public-rekomendasi">
      {/* Hero Section */}
      <section className="qa-hero">
        <div className="container qa-hero__inner">
          <div className="qa-hero__logo-wrapper">
            <img
              src="/logo-qodha.jpg"
              alt="Logo Qodha Aromatic"
              className="qa-hero__logo-img"
            />
          </div>

          <div className="qa-hero__badge">
            <Sparkles size={14} />
            <span>Sistem Pendukung Keputusan • Qodha Aromatic Kota Bogor</span>
          </div>

          <h1 className="qa-hero__title">
            Sistem Pendukung Keputusan Penentuan Rekomendasi Aroma Wewangian Sunah Menggunakan Metode Simple Additive Weighting (SAW) pada Qodha Aromatic Kota Bogor
          </h1>

          <p className="qa-hero__desc">
            Sistem cerdas penentu rekomendasi wewangian sunah terbaik berbasis analisis multikriteria: kesesuaian riwayat sunah, karakter aroma, ketahanan, intensitas, harga, tujuan penggunaan, dan tingkat kesukaan aroma secara objektif dan terukur.
          </p>

          {/* Interactive Preference Box */}
          <div className="qa-filter-panel">
            <div className="qa-filter-panel__header">
              <Filter size={18} className="qa-filter-icon" />
              <span>Tentukan Preferensi Anda</span>
            </div>

            <div className="qa-filter-grid">
              <Select
                id="kategori-filter"
                label="Keluarga / Karakter Aroma"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                options={DUMMY_KATEGORI_OPTIONS}
              />

              <Select
                id="penggunaan-filter"
                label="Tujuan Penggunaan"
                value={selectedPenggunaan}
                onChange={(e) => setSelectedPenggunaan(e.target.value)}
                options={DUMMY_PENGGUNAAN_OPTIONS}
              />

              <div className="qa-filter-btn-wrapper">
                <Button
                  variant="primary"
                  size="md"
                  icon={Compass}
                  className="qa-filter-apply-btn"
                  onClick={() => {}}
                >
                  Terapkan Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container qa-results-section">
        <div className="qa-results-header">
          <div>
            <h2 className="qa-results-title">Hasil Analisis & Rekomendasi Aroma</h2>
            <p className="qa-results-sub">
              Diurutkan berdasarkan perolehan skor preferensi tertinggi model Simple Additive Weighting ($V_i$).
            </p>
          </div>
          <div className="qa-results-actions flex items-center gap-3">
            <Button
              variant={isCurrentSaved ? 'secondary' : 'outline'}
              size="sm"
              icon={isCurrentSaved ? Check : BookmarkPlus}
              onClick={handleSaveToHistory}
              disabled={sortedAndFilteredAroma.length === 0}
            >
              {isCurrentSaved ? 'Simulasi Tersimpan' : 'Simpan ke Riwayat Saya'}
            </Button>
            <Badge variant="orange" size="md">
              {sortedAndFilteredAroma.length} Alternatif Ditemukan
            </Badge>
          </div>
        </div>

        {/* Note on active weights */}
        <div className="qa-results-notice">
          <Info size={16} />
          <span>
            <strong>Keterangan SAW:</strong> Filter preferensi menyaring kandidat wewangian yang relevan. Urutan ranking ditentukan oleh akumulasi bobot kriteria aktif ({activeKriteria.map((k) => `${k.nama} ${k.bobot}%`).join(', ')}).
          </span>
        </div>

        {/* Cards Grid */}
        {sortedAndFilteredAroma.length > 0 ? (
          <div className="qa-aroma-cards-grid">
            {sortedAndFilteredAroma.map((aroma) => {
              const rankInfo = sawResult.isValid
                ? sawResult.rankings.find((r) => r.id === aroma.id)
                : null;
              const scorePercent = rankInfo ? rankInfo.scorePercent : '85.00%';

              return (
                <Card key={aroma.id} className="qa-aroma-card" hover>
                  <CardBody className="qa-aroma-card__body">
                    <div className="qa-aroma-card__top">
                      <div className="qa-aroma-card__category">
                        <Badge variant="neutral" size="sm">{aroma.kategori}</Badge>
                        {rankInfo && (
                          <Badge
                            variant={rankInfo.rank === 1 ? 'orange' : 'neutral'}
                            size="sm"
                          >
                            Peringkat #{rankInfo.rank}
                          </Badge>
                        )}
                      </div>
                      <div className="qa-aroma-score-pill">
                        <span className="qa-pill-label">Skor SAW</span>
                        <span className="qa-pill-val">{scorePercent}</span>
                      </div>
                    </div>

                    <h3 className="qa-aroma-card__name">{aroma.nama}</h3>
                    <p className="qa-aroma-card__desc">{aroma.deskripsi}</p>

                    <div className="qa-aroma-tags">
                      {aroma.tag && aroma.tag.map((t, tIdx) => (
                        <span key={tIdx} className="qa-aroma-tag">#{t}</span>
                      ))}
                    </div>

                    <div className="qa-aroma-card__meta">
                      <div className="qa-aroma-meta-item">
                        <span className="qa-meta-label">Kegunaan Sunah:</span>
                        <span className="qa-meta-val">{aroma.kegunaan}</span>
                      </div>
                      <div className="qa-aroma-meta-item">
                        <span className="qa-meta-label">Harga Dummy:</span>
                        <span className="qa-meta-val">{aroma.hargaDummy}</span>
                      </div>
                    </div>

                    <div className="qa-aroma-card__action">
                      <Button
                        variant="secondary"
                        size="md"
                        icon={ChevronRight}
                        iconPosition="right"
                        className="qa-btn-block"
                        onClick={() => setSelectedAromaDetail(aroma)}
                      >
                        Lihat Rincian Alternatif & Skor
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Filter}
            title="Tidak Ada Aroma yang Sesuai"
            description="Tidak ditemukan alternatif wewangian yang cocok dengan kombinasi filter preferensi yang Anda pilih. Silakan atur kembali kategori atau tujuan penggunaan."
            actionLabel="Reset Semua Filter"
            onAction={() => {
              setSelectedKategori('Semua Kategori');
              setSelectedPenggunaan('Semua Kebutuhan');
            }}
          />
        )}
      </section>

      {/* Detail Modal */}
      {selectedAromaDetail && (
        <Modal
          isOpen={Boolean(selectedAromaDetail)}
          onClose={() => setSelectedAromaDetail(null)}
          title={`Detail Alternatif & Skor SAW: ${selectedAromaDetail.nama}`}
          cancelLabel="Tutup"
          maxWidth="620px"
        >
          <div className="qa-detail-modal-content">
            <div className="qa-detail-row">
              <span className="qa-detail-label">Keluarga Aroma:</span>
              <span className="qa-detail-val">{selectedAromaDetail.kategori}</span>
            </div>
            <div className="qa-detail-row">
              <span className="qa-detail-label">Karakteristik:</span>
              <span className="qa-detail-val">{selectedAromaDetail.karakteristik}</span>
            </div>
            <div className="qa-detail-row">
              <span className="qa-detail-label">Rujukan & Sunah:</span>
              <span className="qa-detail-val">{selectedAromaDetail.kegunaan}</span>
            </div>
            <div className="qa-detail-row">
              <span className="qa-detail-label">Deskripsi Lengkap:</span>
              <p className="qa-detail-desc">{selectedAromaDetail.deskripsi}</p>
            </div>

            {/* Rincian Skor SAW & Kontribusi Tiap Kriteria */}
            <div className="qa-detail-criteria-box">
              <div className="flex items-center justify-between mb-2">
                <h4 className="qa-detail-criteria-title flex items-center gap-2">
                  <BarChart2 size={16} className="text-orange" />
                  <span>Rincian Kontribusi Skor SAW per Kriteria</span>
                </h4>
                {sawResult.isValid && (
                  <Badge variant="orange" size="sm">
                    {(() => {
                      const r = sawResult.rankings.find((item) => item.id === selectedAromaDetail.id);
                      return r ? `Peringkat #${r.rank} (${r.scorePercent})` : '';
                    })()}
                  </Badge>
                )}
              </div>

              <div className="qa-detail-criteria-grid">
                {activeKriteria.map((k) => {
                  const rankItem = sawResult.isValid
                    ? sawResult.rankings.find((r) => r.id === selectedAromaDetail.id)
                    : null;
                  const b = rankItem?.breakdown?.[k.kode];

                  return (
                    <div key={k.kode} className="qa-score-cell">
                      <div className="flex items-center justify-between">
                        <span className="qa-cell-code">{k.kode} ({k.nama})</span>
                        <Badge variant={k.tipe === 'benefit' ? 'success' : 'warning'} size="sm">
                          {k.tipe}
                        </Badge>
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="qa-cell-num">
                          Nilai: <strong>{selectedAromaDetail.penilaian?.[k.kode] ?? '-'}</strong>
                        </span>
                        {b && (
                          <span className="qa-cell-contrib">
                            +{b.contribution.toFixed(3)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="qa-detail-hint">
                *Skor preferensi akhir V_i dihitung dari penjumlahan perkalian bobot (w_j) dengan nilai normalisasi (r_ij).
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
