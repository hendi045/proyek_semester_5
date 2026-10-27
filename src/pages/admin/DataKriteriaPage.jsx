import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Info,
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import './DataKriteriaPage.css';

export function DataKriteriaPage() {
  const {
    kriteriaList,
    totalBobot,
    isBobotValid,
    addKriteria,
    updateKriteria,
    deleteKriteria,
    toggleKriteriaStatus,
    resetKriteriaData
  } = useDataContext();

  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingKriteria, setEditingKriteria] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingKriteria, setDeletingKriteria] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    tipe: 'benefit',
    bobot: 20,
    rentang: '1 - 5 (Skala penilaian)',
    deskripsi: '',
    status: 'aktif'
  });
  const [formErrors, setFormErrors] = useState({});

  const benefitCount = kriteriaList.filter((k) => k.tipe === 'benefit').length;
  const costCount = kriteriaList.filter((k) => k.tipe === 'cost').length;

  const handleOpenAddModal = () => {
    setEditingKriteria(null);
    setFormData({
      kode: `C${kriteriaList.length + 1}`,
      nama: '',
      tipe: 'benefit',
      bobot: 0,
      rentang: '1 - 5 (Skala penilaian)',
      deskripsi: '',
      status: 'aktif'
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (kriteria) => {
    setEditingKriteria(kriteria);
    setFormData({
      kode: kriteria.kode,
      nama: kriteria.nama,
      tipe: kriteria.tipe,
      bobot: kriteria.bobot,
      rentang: kriteria.rentang || '1 - 5 (Skala penilaian)',
      deskripsi: kriteria.deskripsi || '',
      status: kriteria.status || 'aktif'
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (kriteria) => {
    setDeletingKriteria(kriteria);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.kode.trim()) errors.kode = 'Kode kriteria wajib diisi.';
    if (!formData.nama.trim()) errors.nama = 'Nama kriteria wajib diisi.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      kode: formData.kode.trim().toUpperCase(),
      nama: formData.nama.trim(),
      tipe: formData.tipe,
      bobot: Number(formData.bobot) || 0,
      rentang: formData.rentang.trim(),
      deskripsi: formData.deskripsi.trim() || 'Kriteria evaluasi SAW wewangian sunah.',
      status: formData.status
    };

    if (editingKriteria) {
      updateKriteria(editingKriteria.kode, payload);
      setIsFormModalOpen(false);
    } else {
      const success = addKriteria(payload);
      if (success) setIsFormModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingKriteria) {
      deleteKriteria(deletingKriteria.kode);
      setIsDeleteModalOpen(false);
      setDeletingKriteria(null);
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
            <span className="qa-breadcrumb__active">Data Kriteria SAW</span>
          </div>
          <h1 className="qa-page-title">Master Data Kriteria SAW</h1>
          <p className="qa-page-desc">
            Konfigurasi kriteria evaluasi (C1-Cn), penentuan tipe benefit/cost, dan skala penilaian preferensi wewangian sunah.
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={RotateCcw}
            onClick={resetKriteriaData}
            title="Kembalikan ke kriteria standar demo (C1-C7)"
          >
            Reset Standar C1-C7
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={handleOpenAddModal}
          >
            Tambah Kriteria
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="qa-kpi-strip">
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Total Kriteria</span>
          <span className="qa-kpi-strip__val">{kriteriaList.length}</span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Kriteria Benefit (Keuntungan)</span>
          <span className="qa-kpi-strip__val" style={{ color: 'var(--color-success)' }}>
            {benefitCount}
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Kriteria Cost (Biaya)</span>
          <span className="qa-kpi-strip__val" style={{ color: 'var(--color-warning)' }}>
            {costCount}
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Total Akumulasi Bobot</span>
          <div className="flex items-center gap-2">
            <span
              className={`qa-kpi-strip__val ${
                isBobotValid ? 'qa-kpi-strip__val--highlight' : ''
              }`}
              style={{ color: !isBobotValid ? 'var(--color-danger)' : undefined }}
            >
              {totalBobot}%
            </span>
            <Badge variant={isBobotValid ? 'success' : 'danger'} size="sm">
              {isBobotValid ? 'Tepat 100%' : 'Belum 100%'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Educational Banner - Penjelasan SAW Benefit vs Cost */}
      <Card className="qa-education-card">
        <CardBody className="qa-education-body">
          <div className="qa-education-header">
            <Info size={20} className="qa-education-icon" />
            <h3 className="qa-education-title">
              Panduan Matematis Sifat Kriteria pada Metode Simple Additive Weighting (SAW)
            </h3>
          </div>
          <div className="qa-education-grid">
            <div className="qa-education-box qa-education-box--benefit">
              <div className="qa-education-box__title">
                <TrendingUp size={16} />
                <span>Kriteria Tipe Benefit (Keuntungan)</span>
              </div>
              <p className="qa-education-box__text">
                Semakin <strong>tinggi nilai alternatif</strong>, semakin diinginkan dan menguntungkan. Pada wewangian sunah: kesesuaian hadits, ketahanan aroma (jam), dan kelembutan.
              </p>
              <code className="qa-formula-snippet">
                Normalisasi: r_ij = x_ij / Max(x_j)
              </code>
            </div>

            <div className="qa-education-box qa-education-box--cost">
              <div className="qa-education-box__title">
                <TrendingDown size={16} />
                <span>Kriteria Tipe Cost (Biaya)</span>
              </div>
              <p className="qa-education-box__text">
                Semakin <strong>rendah nilai alternatif</strong>, semakin hemat/menguntungkan bagi pembeli. Pada wewangian: tingkat harga / biaya per ml (skala 1=sangat terjangkau).
              </p>
              <code className="qa-formula-snippet">
                Normalisasi: r_ij = Min(x_j) / x_ij
              </code>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Table Kriteria Card */}
      <Card>
        <CardHeader className="qa-table-header">
          <div>
            <CardTitle>Daftar Kriteria Evaluasi ({kriteriaList.length})</CardTitle>
            <p className="qa-table-sub">
              Daftar variabel penentu keputusan dan batas skala penilaian yang digunakan.
            </p>
          </div>
        </CardHeader>
        <CardBody className="qa-table-body-wrapper">
          <div className="qa-table-container">
            <table className="qa-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Kode</th>
                  <th>Nama Kriteria</th>
                  <th>Sifat / Tipe</th>
                  <th>Bobot Tersimpan</th>
                  <th>Rentang Nilai</th>
                  <th>Keterangan / Indikator</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right', width: '130px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kriteriaList.map((item) => (
                  <tr key={item.kode} className={item.status === 'nonaktif' ? 'qa-row--muted' : ''}>
                    <td>
                      <span className="qa-code-pill">{item.kode}</span>
                    </td>
                    <td>
                      <strong className="qa-kriteria-name">{item.nama}</strong>
                    </td>
                    <td>
                      <Badge
                        variant={item.tipe === 'benefit' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {item.tipe === 'benefit' ? 'Benefit (Keuntungan)' : 'Cost (Biaya)'}
                      </Badge>
                    </td>
                    <td>
                      <div className="qa-bobot-cell">
                        <span className="qa-bobot-text">{item.bobot}%</span>
                        <div className="qa-mini-progress">
                          <div
                            className="qa-mini-progress__bar"
                            style={{ width: `${Math.min(100, item.bobot)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="qa-text-muted">{item.rentang || '1 - 5'}</td>
                    <td className="qa-text-muted" style={{ maxWidth: '280px' }}>
                      {item.deskripsi || '-'}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="qa-status-toggle-btn"
                        onClick={() => toggleKriteriaStatus(item.kode)}
                        title="Klik untuk ubah status aktif/nonaktif"
                      >
                        <Badge
                          variant={item.status === 'aktif' ? 'success' : 'default'}
                          size="sm"
                        >
                          {item.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="qa-action-buttons">
                        <button
                          type="button"
                          className="qa-icon-btn qa-icon-btn--edit"
                          onClick={() => handleOpenEditModal(item)}
                          title="Ubah Kriteria"
                          aria-label={`Ubah ${item.nama}`}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="qa-icon-btn qa-icon-btn--delete"
                          onClick={() => handleOpenDeleteModal(item)}
                          title="Hapus Kriteria"
                          aria-label={`Hapus ${item.nama}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* MODAL FORM TAMBAH / EDIT KRITERIA */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingKriteria ? `Ubah Data Kriteria (${editingKriteria.kode})` : 'Tambah Kriteria Baru'}
        confirmLabel={editingKriteria ? 'Simpan Perubahan' : 'Tambah Kriteria'}
        onConfirm={handleFormSubmit}
        maxWidth="560px"
      >
        <form onSubmit={handleFormSubmit} className="qa-form-grid">
          <div className="qa-form-row qa-form-row--2col">
            <Input
              id="kriteriaKode"
              label="Kode Kriteria"
              placeholder="Contoh: C6"
              value={formData.kode}
              disabled={!!editingKriteria}
              onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
              error={formErrors.kode}
              helperText="Format kode standar: C1, C2, dst."
              required
            />
            <Select
              id="kriteriaTipe"
              label="Sifat / Tipe Kriteria"
              value={formData.tipe}
              onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
              options={[
                { value: 'benefit', label: 'Benefit (Maksimal Lebih Baik)' },
                { value: 'cost', label: 'Cost (Minimal Lebih Baik)' }
              ]}
              required
            />
          </div>

          <Input
            id="kriteriaNama"
            label="Nama Kriteria"
            placeholder="Contoh: Ketahanan Aroma (Longevity)"
            value={formData.nama}
            onChange={(e) => {
              setFormData({ ...formData, nama: e.target.value });
              if (formErrors.nama) setFormErrors({ ...formErrors, nama: null });
            }}
            error={formErrors.nama}
            required
          />

          <div className="qa-form-row qa-form-row--2col">
            <Input
              id="kriteriaBobot"
              label="Bobot Kriteria (%)"
              type="number"
              min="0"
              max="100"
              value={formData.bobot}
              onChange={(e) => setFormData({ ...formData, bobot: e.target.value })}
              helperText="Persentase bobot kepentingan (0-100)"
            />
            <Input
              id="kriteriaRentang"
              label="Rentang Skala Penilaian"
              placeholder="Contoh: 1 - 5 (Skala penilaian)"
              value={formData.rentang}
              onChange={(e) => setFormData({ ...formData, rentang: e.target.value })}
            />
          </div>

          <Select
            id="kriteriaStatus"
            label="Status Kriteria"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'aktif', label: 'Aktif (Digunakan dalam normalisasi SAW)' },
              { value: 'nonaktif', label: 'Nonaktif (Dikecualikan dari perhitungan)' }
            ]}
          />

          <Textarea
            id="kriteriaDeskripsi"
            label="Deskripsi & Panduan Penilaian"
            placeholder="Jelaskan arti indikator nilai atau dasar penilaian kriteria ini..."
            rows={3}
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
          />
        </form>
      </Modal>

      {/* MODAL KONFIRMASI HAPUS KRITERIA */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Hapus Kriteria"
        confirmLabel="Ya, Hapus Kriteria"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        maxWidth="460px"
      >
        <div className="qa-delete-confirm-content">
          <div className="qa-delete-warning-icon">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="qa-delete-text">
              Hapus kriteria <strong>{deletingKriteria?.nama}</strong> ({deletingKriteria?.kode})?
            </p>
            <p className="qa-delete-sub">
              Menghapus kriteria akan menghilangkan kolom penilaian kriteria ini dari seluruh alternatif aroma pada penyimpanan demo lokal browser Anda.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
