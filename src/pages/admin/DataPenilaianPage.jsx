import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import './DataPenilaianPage.css';

// Deskripsi panduan skala nilai 1-5
const SKALA_GUIDE = {
  benefit: {
    1: '1 - Sangat Rendah / Kurang',
    2: '2 - Cukup Rendah',
    3: '3 - Sedang / Rata-rata',
    4: '4 - Baik / Memuaskan',
    5: '5 - Sangat Istimewa / Sangat Sesuai'
  },
  cost: {
    1: '1 - Sangat Terjangkau / Paling Ekonomis (Terbaik)',
    2: '2 - Terjangkau',
    3: '3 - Menengah / Standar Pasar',
    4: '4 - Cukup Tinggi',
    5: '5 - Sangat Premium / Mahal'
  }
};

export function DataPenilaianPage() {
  const {
    activeAroma,
    activeKriteria,
    penilaianStatus,
    updatePenilaian,
    fillMissingPenilaian,
    resetAromaData
  } = useDataContext();

  const [editingAroma, setEditingAroma] = useState(null);
  const [formRatings, setFormRatings] = useState({});

  const handleOpenEditModal = (aroma) => {
    setEditingAroma(aroma);
    const initial = {};
    activeKriteria.forEach((k) => {
      initial[k.kode] = aroma.penilaian?.[k.kode] !== undefined ? aroma.penilaian[k.kode] : 3;
    });
    setFormRatings(initial);
  };

  const handleRatingChange = (kode, val) => {
    setFormRatings((prev) => ({
      ...prev,
      [kode]: Number(val)
    }));
  };

  const handleSaveRatings = (e) => {
    e.preventDefault();
    if (editingAroma) {
      updatePenilaian(editingAroma.id, formRatings);
      setEditingAroma(null);
    }
  };

  return (
    <div className="qa-data-page">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <div className="qa-breadcrumb">
            <span>Data Master</span>
            <span>/</span>
            <span className="qa-breadcrumb__active">Data Penilaian Aroma</span>
          </div>
          <h1 className="qa-page-title">Matriks Penilaian Alternatif Aroma</h1>
          <p className="qa-page-desc">
            Matriks keputusan awal (X) berisi skor evaluasi setiap alternatif wewangian sunah terhadap seluruh kriteria aktif pada skala 1-5.
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={RotateCcw}
            onClick={resetAromaData}
            title="Kembalikan nilai ke set data awal demo"
          >
            Reset Nilai Demo
          </Button>
          {!penilaianStatus.isLengkap && (
            <Button
              variant="secondary"
              size="md"
              icon={Sparkles}
              onClick={fillMissingPenilaian}
              title="Isi nilai kosong dengan nilai acuan demo"
            >
              Isi Nilai Kosong Otomatis
            </Button>
          )}
        </div>
      </div>

      {/* MATRIX COMPLETION STATUS BANNER */}
      <div
        className={`qa-penilaian-banner ${
          penilaianStatus.isLengkap
            ? 'qa-penilaian-banner--complete'
            : 'qa-penilaian-banner--incomplete'
        }`}
        role="status"
      >
        <div className="qa-penilaian-banner__icon">
          {penilaianStatus.isLengkap ? (
            <CheckCircle2 size={24} />
          ) : (
            <AlertTriangle size={24} />
          )}
        </div>
        <div className="qa-penilaian-banner__content">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="qa-penilaian-banner__title">
              {penilaianStatus.isLengkap
                ? `Matriks Penilaian Lengkap (${activeAroma.length} Alternatif × ${activeKriteria.length} Kriteria)`
                : `Matriks Belum Lengkap: Ada ${penilaianStatus.missingCount} Nilai Kosong`}
            </h3>
            <Badge
              variant={penilaianStatus.isLengkap ? 'success' : 'warning'}
              size="md"
            >
              {penilaianStatus.isLengkap ? 'Status: 100% Siap' : 'Perlu Dilengkapi'}
            </Badge>
          </div>
          <p className="qa-penilaian-banner__desc">
            {penilaianStatus.isLengkap
              ? 'Seluruh alternatif aktif memiliki nilai lengkap untuk semua kriteria aktif. Matriks keputusan siap dinormalisasikan pada tahap perhitungan SAW (Phase 4).'
              : 'Pada metode SAW, setiap alternatif yang dihitung wajib memiliki nilai untuk semua kriteria aktif guna mencegah terjadinya nilai NaN atau pembagian nol (division by zero).'}
          </p>
        </div>
      </div>

      {/* DECISION MATRIX TABLE (X) */}
      <Card>
        <CardHeader className="qa-table-header">
          <div>
            <CardTitle>Matriks Keputusan Awal (X)</CardTitle>
            <p className="qa-table-sub">
              Tabel nilai mentah x_ij sebelum dilakukan proses normalisasi r_ij.
            </p>
          </div>
        </CardHeader>
        <CardBody className="qa-table-body-wrapper">
          <div className="qa-table-container">
            <table className="qa-table qa-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>Alternatif</th>
                  <th>Nama Aroma</th>
                  {activeKriteria.map((k) => (
                    <th key={k.kode} style={{ textAlign: 'center', minWidth: '110px' }}>
                      <div className="qa-matrix-th-col">
                        <span className="qa-code-pill">{k.kode}</span>
                        <span className="qa-matrix-th-name">{k.nama}</span>
                        <Badge
                          variant={k.tipe === 'benefit' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {k.tipe === 'benefit' ? 'Benefit' : 'Cost'}
                        </Badge>
                      </div>
                    </th>
                  ))}
                  <th style={{ textAlign: 'center', width: '120px' }}>Status</th>
                  <th style={{ textAlign: 'right', width: '110px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {activeAroma.map((aroma) => {
                  const ratings = aroma.penilaian || {};
                  const isAromaComplete = activeKriteria.every(
                    (k) => ratings[k.kode] !== undefined && ratings[k.kode] !== ''
                  );

                  return (
                    <tr key={aroma.id}>
                      <td>
                        <span className="qa-code-pill">{aroma.id}</span>
                      </td>
                      <td>
                        <strong className="qa-aroma-row-title">{aroma.nama}</strong>
                        <span className="qa-aroma-row-sub">{aroma.kategori}</span>
                      </td>

                      {/* Kolom Kriteria C1...Cn */}
                      {activeKriteria.map((k) => {
                        const val = ratings[k.kode];
                        const isValSet = val !== undefined && val !== null && val !== '';

                        return (
                          <td key={k.kode} style={{ textAlign: 'center' }}>
                            {isValSet ? (
                              <span
                                className={`qa-score-pill ${
                                  k.tipe === 'cost' ? 'qa-score-pill--cost' : 'qa-score-pill--benefit'
                                }`}
                              >
                                {val}
                              </span>
                            ) : (
                              <span className="qa-score-pill qa-score-pill--empty">
                                Kosong
                              </span>
                            )}
                          </td>
                        );
                      })}

                      <td style={{ textAlign: 'center' }}>
                        <Badge variant={isAromaComplete ? 'success' : 'warning'} size="sm">
                          {isAromaComplete ? 'Lengkap' : 'Belum'}
                        </Badge>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Edit3}
                          onClick={() => handleOpenEditModal(aroma)}
                        >
                          Ubah Nilai
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* MODAL EDIT PENILAIAN ALTERNATIF */}
      <Modal
        isOpen={!!editingAroma}
        onClose={() => setEditingAroma(null)}
        title={`Ubah Nilai Kriteria — ${editingAroma?.nama || ''}`}
        confirmLabel="Simpan Nilai"
        onConfirm={handleSaveRatings}
        maxWidth="580px"
      >
        {editingAroma && (
          <form onSubmit={handleSaveRatings} className="qa-ratings-form">
            <div className="qa-ratings-form__hero">
              <div>
                <span className="qa-code-pill">{editingAroma.id}</span>
                <h4 className="qa-ratings-aroma-name">{editingAroma.nama}</h4>
                <p className="qa-ratings-aroma-cat">{editingAroma.kategori} • {editingAroma.hargaDummy}</p>
              </div>
            </div>

            <div className="qa-ratings-field-list">
              {activeKriteria.map((k) => {
                const currentVal = formRatings[k.kode] ?? 3;
                const guideMap = SKALA_GUIDE[k.tipe] || SKALA_GUIDE.benefit;

                return (
                  <div key={k.kode} className="qa-rating-input-row">
                    <div className="qa-rating-input-row__header">
                      <div className="flex items-center gap-2">
                        <span className="qa-code-pill">{k.kode}</span>
                        <strong className="qa-rating-k-title">{k.nama}</strong>
                      </div>
                      <Badge variant={k.tipe === 'benefit' ? 'success' : 'warning'} size="sm">
                        {k.tipe === 'benefit' ? 'Benefit (Maksimal Terbaik)' : 'Cost (Minimal Terbaik)'}
                      </Badge>
                    </div>

                    <p className="qa-rating-k-desc">{k.deskripsi}</p>

                    {/* Skala 1-5 Button Selector */}
                    <div className="qa-scale-buttons">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`qa-scale-btn ${
                            currentVal === val ? 'qa-scale-btn--active' : ''
                          }`}
                          onClick={() => handleRatingChange(k.kode, val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>

                    <div className="qa-scale-guide-text">
                      <span>Keterangan nilai terpilih:</span>
                      <strong>{guideMap[currentVal]}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
