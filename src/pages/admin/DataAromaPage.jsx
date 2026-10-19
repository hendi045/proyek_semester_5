import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  AlertCircle,
  Eye,
  Package
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { DUMMY_KATEGORI_OPTIONS } from '../../data/dummyData';
import './DataAromaPage.css';

export function DataAromaPage() {
  const {
    aromaList,
    activeKriteria,
    addAroma,
    updateAroma,
    deleteAroma,
    resetAromaData
  } = useDataContext();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('semua');

  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAroma, setEditingAroma] = useState(null); // null if adding new

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAroma, setDeletingAroma] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewingAroma, setViewingAroma] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    kategori: 'Musky',
    karakteristik: '',
    deskripsi: '',
    kegunaan: '',
    tagString: '',
    hargaDummy: 'Rp 65.000 / 6ml',
    status: 'aktif'
  });
  const [formErrors, setFormErrors] = useState({});

  // Filtered List
  const filteredList = useMemo(() => {
    return aromaList.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.karakteristik.toLowerCase().includes(searchQuery.toLowerCase());

      const matchKategori =
        selectedKategori === 'Semua Kategori' ||
        item.kategori.toLowerCase().includes(selectedKategori.toLowerCase());

      const matchStatus =
        selectedStatus === 'semua' || item.status === selectedStatus;

      return matchSearch && matchKategori && matchStatus;
    });
  }, [aromaList, searchQuery, selectedKategori, selectedStatus]);

  // Open Form for Adding
  const handleOpenAddModal = () => {
    setEditingAroma(null);
    setFormData({
      id: `ARM-0${aromaList.length + 1}`,
      nama: '',
      kategori: 'Musky',
      karakteristik: '',
      deskripsi: '',
      kegunaan: 'Ibadah Harian, Shalat Berjamaah',
      tagString: 'Sunah, Lembut',
      hargaDummy: 'Rp 65.000 / 6ml',
      status: 'aktif'
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  // Open Form for Editing
  const handleOpenEditModal = (aroma) => {
    setEditingAroma(aroma);
    setFormData({
      id: aroma.id,
      nama: aroma.nama,
      kategori: aroma.kategori,
      karakteristik: aroma.karakteristik || '',
      deskripsi: aroma.deskripsi || '',
      kegunaan: aroma.kegunaan || '',
      tagString: Array.isArray(aroma.tag) ? aroma.tag.join(', ') : '',
      hargaDummy: aroma.hargaDummy || 'Rp 65.000 / 6ml',
      status: aroma.status || 'aktif'
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  // Open Delete Confirmation
  const handleOpenDeleteModal = (aroma) => {
    setDeletingAroma(aroma);
    setIsDeleteModalOpen(true);
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.nama.trim()) errors.nama = 'Nama aroma wajib diisi.';
    if (!formData.kategori.trim()) errors.kategori = 'Kategori wajib dipilih.';
    if (!formData.karakteristik.trim()) errors.karakteristik = 'Karakteristik wajib diisi.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const tags = formData.tagString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      nama: formData.nama.trim(),
      kategori: formData.kategori.trim(),
      karakteristik: formData.karakteristik.trim(),
      deskripsi: formData.deskripsi.trim() || 'Aroma wewangian sunah dengan formulasi berkah.',
      kegunaan: formData.kegunaan.trim() || 'Ibadah Harian & Sunah',
      tag: tags.length > 0 ? tags : ['Sunah'],
      hargaDummy: formData.hargaDummy.trim() || 'Rp 65.000 / 6ml',
      status: formData.status
    };

    if (editingAroma) {
      updateAroma(editingAroma.id, payload);
    } else {
      addAroma({ ...payload, id: formData.id });
    }

    setIsFormModalOpen(false);
  };

  // Confirm Delete Action
  const handleConfirmDelete = () => {
    if (deletingAroma) {
      deleteAroma(deletingAroma.id);
      setIsDeleteModalOpen(false);
      setDeletingAroma(null);
    }
  };

  // Check how many ratings are filled for an aroma
  const getRatingsBadge = (aroma) => {
    const ratings = aroma.penilaian || {};
    const filledCount = activeKriteria.filter((k) => ratings[k.kode] !== undefined && ratings[k.kode] !== '').length;
    const isComplete = filledCount === activeKriteria.length && activeKriteria.length > 0;

    return (
      <Badge variant={isComplete ? 'success' : 'warning'} size="sm">
        {isComplete ? 'Lengkap (5/5)' : `Belum Lengkap (${filledCount}/${activeKriteria.length})`}
      </Badge>
    );
  };

  return (
    <div className="qa-data-page">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <div className="qa-breadcrumb">
            <span>Data Master</span>
            <span>/</span>
            <span className="qa-breadcrumb__active">Data Aroma Wewangian</span>
          </div>
          <h1 className="qa-page-title">Katalog & Data Aroma Wewangian</h1>
          <p className="qa-page-desc">
            Kelola daftar alternatif wewangian sunah sebagai objek evaluasi dalam sistem pendukung keputusan SAW.
          </p>
        </div>
        <div className="qa-page-header__actions">
          <Button
            variant="outline"
            size="md"
            icon={RotateCcw}
            onClick={resetAromaData}
            title="Kembalikan katalog ke data dummy awal"
          >
            Reset Dummy
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={handleOpenAddModal}
          >
            Tambah Aroma
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="qa-kpi-strip">
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Total Alternatif</span>
          <span className="qa-kpi-strip__val">{aromaList.length}</span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Alternatif Aktif</span>
          <span className="qa-kpi-strip__val qa-kpi-strip__val--highlight">
            {aromaList.filter((a) => a.status === 'aktif').length}
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Kategori Aroma</span>
          <span className="qa-kpi-strip__val">
            {new Set(aromaList.map((a) => a.kategori)).size}
          </span>
        </div>
        <div className="qa-kpi-strip__item">
          <span className="qa-kpi-strip__label">Nilai Kriteria Lengkap</span>
          <span className="qa-kpi-strip__val">
            {aromaList.filter((a) => {
              const p = a.penilaian || {};
              return activeKriteria.every((k) => p[k.kode] !== undefined && p[k.kode] !== '');
            }).length} / {aromaList.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="qa-toolbar-card">
        <CardBody className="qa-toolbar-body">
          <div className="qa-search-box">
            <Input
              id="searchAroma"
              placeholder="Cari nama aroma, kode, atau karakteristik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
          </div>

          <div className="qa-filter-group">
            <div className="qa-filter-item">
              <Select
                id="filterKategori"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                options={DUMMY_KATEGORI_OPTIONS}
              />
            </div>

            <div className="qa-filter-item">
              <Select
                id="filterStatus"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={[
                  { value: 'semua', label: 'Semua Status' },
                  { value: 'aktif', label: 'Status: Aktif' },
                  { value: 'nonaktif', label: 'Status: Nonaktif' }
                ]}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Table Data Card */}
      <Card>
        <CardHeader className="qa-table-header">
          <div>
            <CardTitle>Daftar Alternatif Aroma ({filteredList.length})</CardTitle>
            <p className="qa-table-sub">
              Data dummy lokal untuk proses pembobotan dan perangkingan SAW.
            </p>
          </div>
        </CardHeader>
        <CardBody className="qa-table-body-wrapper">
          {filteredList.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Aroma Tidak Ditemukan"
              description="Tidak ada data aroma yang sesuai dengan kriteria pencarian atau filter yang dipilih."
              actionLabel="Reset Pencarian"
              onAction={() => {
                setSearchQuery('');
                setSelectedKategori('Semua Kategori');
                setSelectedStatus('semua');
              }}
            />
          ) : (
            <div className="qa-table-container">
              <table className="qa-table">
                <thead>
                  <tr>
                    <th style={{ width: '90px' }}>Kode</th>
                    <th>Nama & Karakteristik</th>
                    <th>Kategori</th>
                    <th>Kegunaan Ibadah</th>
                    <th>Harga Demo</th>
                    <th>Status</th>
                    <th>Nilai SAW</th>
                    <th style={{ textAlign: 'right', width: '130px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item) => (
                    <tr key={item.id} className={item.status === 'nonaktif' ? 'qa-row--muted' : ''}>
                      <td>
                        <span className="qa-code-pill">{item.id}</span>
                      </td>
                      <td>
                        <div className="qa-aroma-cell">
                          <button
                            type="button"
                            className="qa-aroma-title-btn"
                            onClick={() => {
                              setViewingAroma(item);
                              setIsDetailModalOpen(true);
                            }}
                          >
                            {item.nama}
                          </button>
                          <p className="qa-aroma-karakteristik">{item.karakteristik}</p>
                          {item.tag && item.tag.length > 0 && (
                            <div className="qa-tag-list">
                              {item.tag.map((t, idx) => (
                                <span key={idx} className="qa-mini-tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <Badge variant="outline" size="sm">
                          {item.kategori}
                        </Badge>
                      </td>
                      <td className="qa-text-muted">{item.kegunaan || '-'}</td>
                      <td>
                        <span className="qa-price-tag">{item.hargaDummy || 'Rp 65.000'}</span>
                      </td>
                      <td>
                        <Badge
                          variant={item.status === 'aktif' ? 'success' : 'default'}
                          size="sm"
                        >
                          {item.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </td>
                      <td>{getRatingsBadge(item)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="qa-action-buttons">
                          <button
                            type="button"
                            className="qa-icon-btn qa-icon-btn--view"
                            onClick={() => {
                              setViewingAroma(item);
                              setIsDetailModalOpen(true);
                            }}
                            title="Lihat Detail"
                            aria-label={`Lihat detail ${item.nama}`}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="qa-icon-btn qa-icon-btn--edit"
                            onClick={() => handleOpenEditModal(item)}
                            title="Ubah Data"
                            aria-label={`Ubah data ${item.nama}`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type="button"
                            className="qa-icon-btn qa-icon-btn--delete"
                            onClick={() => handleOpenDeleteModal(item)}
                            title="Hapus Data"
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
          )}
        </CardBody>
      </Card>

      {/* MODAL FORM TAMBAH / EDIT AROMA */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingAroma ? 'Ubah Data Aroma Wewangian' : 'Tambah Aroma Wewangian Baru'}
        confirmLabel={editingAroma ? 'Simpan Perubahan' : 'Tambah Alternatif'}
        onConfirm={handleFormSubmit}
        maxWidth="620px"
      >
        <form onSubmit={handleFormSubmit} className="qa-form-grid">
          <div className="qa-form-row qa-form-row--2col">
            <Input
              id="formId"
              label="Kode Alternatif"
              value={formData.id}
              disabled={!!editingAroma}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              helperText="Kode identitas unik dalam model SAW"
              required
            />
            <Select
              id="formStatus"
              label="Status Alternatif"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'aktif', label: 'Aktif (Ikut Dihitung SAW)' },
                { value: 'nonaktif', label: 'Nonaktif (Dikecualikan)' }
              ]}
              required
            />
          </div>

          <Input
            id="formNama"
            label="Nama Aroma Wewangian"
            placeholder="Contoh: Kasturi Putih (White Musk)"
            value={formData.nama}
            onChange={(e) => {
              setFormData({ ...formData, nama: e.target.value });
              if (formErrors.nama) setFormErrors({ ...formErrors, nama: null });
            }}
            error={formErrors.nama}
            required
          />

          <div className="qa-form-row qa-form-row--2col">
            <Select
              id="formKategori"
              label="Keluarga / Kategori Aroma"
              value={formData.kategori}
              onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
              options={[
                'Musky',
                'Woody',
                'Woody Oriental',
                'Musky Floral',
                'Floral',
                'Oriental Amber'
              ]}
              required
            />
            <Input
              id="formHarga"
              label="Harga Dummy (Per 6ml)"
              placeholder="Contoh: Rp 75.000 / 6ml"
              value={formData.hargaDummy}
              onChange={(e) => setFormData({ ...formData, hargaDummy: e.target.value })}
              helperText="Representasi atribut biaya (C5)"
            />
          </div>

          <Input
            id="formKarakteristik"
            label="Karakteristik Aroma Ringkas"
            placeholder="Contoh: Bersih, lembut, powdery, elegan"
            value={formData.karakteristik}
            onChange={(e) => {
              setFormData({ ...formData, karakteristik: e.target.value });
              if (formErrors.karakteristik) setFormErrors({ ...formErrors, karakteristik: null });
            }}
            error={formErrors.karakteristik}
            required
          />

          <Input
            id="formKegunaan"
            label="Kegunaan Momen Sunah / Ibadah"
            placeholder="Contoh: Shalat Jumat, Iktikaf, Majelis Ilmu"
            value={formData.kegunaan}
            onChange={(e) => setFormData({ ...formData, kegunaan: e.target.value })}
          />

          <Input
            id="formTags"
            label="Tag Preferensi (Pisahkan dengan koma)"
            placeholder="Contoh: Sunah Utama, Lembut, Best Seller"
            value={formData.tagString}
            onChange={(e) => setFormData({ ...formData, tagString: e.target.value })}
            helperText="Digunakan untuk badge dan penyaringan pada rekomendasi publik"
          />

          <Textarea
            id="formDeskripsi"
            label="Deskripsi Riwayat & Catatan Khasiat"
            placeholder="Tuliskan latar belakang sunah wewangian atau catatan aromaterapi..."
            rows={3}
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
          />
        </form>
      </Modal>

      {/* MODAL KONFIRMASI HAPUS */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Hapus Alternatif"
        confirmLabel="Ya, Hapus Data"
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
              Apakah Anda yakin ingin menghapus aroma{' '}
              <strong>{deletingAroma?.nama}</strong> (Kode: {deletingAroma?.id})?
            </p>
            <p className="qa-delete-sub">
              Tindakan ini akan menghapus alternatif dari katalog lokal browser serta menghapus nilai penilaian terkait dari matriks SAW.
            </p>
          </div>
        </div>
      </Modal>

      {/* MODAL DETAIL AROMA */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Spesifikasi Alternatif — ${viewingAroma?.nama || ''}`}
        cancelLabel="Tutup"
        maxWidth="540px"
      >
        {viewingAroma && (
          <div className="qa-detail-view">
            <div className="qa-detail-hero">
              <div>
                <span className="qa-code-pill">{viewingAroma.id}</span>
                <h3 className="qa-detail-name">{viewingAroma.nama}</h3>
                <p className="qa-detail-category">{viewingAroma.kategori}</p>
              </div>
              <Badge variant={viewingAroma.status === 'aktif' ? 'success' : 'default'} size="md">
                {viewingAroma.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
              </Badge>
            </div>

            <div className="qa-detail-grid">
              <div className="qa-detail-item">
                <span className="qa-detail-label">Karakteristik</span>
                <span className="qa-detail-val">{viewingAroma.karakteristik}</span>
              </div>
              <div className="qa-detail-item">
                <span className="qa-detail-label">Momen Ibadah</span>
                <span className="qa-detail-val">{viewingAroma.kegunaan}</span>
              </div>
              <div className="qa-detail-item">
                <span className="qa-detail-label">Estimasi Harga</span>
                <span className="qa-detail-val qa-price-tag">{viewingAroma.hargaDummy}</span>
              </div>
            </div>

            <div className="qa-detail-desc-box">
              <span className="qa-detail-label">Catatan Riwayat & Karakter</span>
              <p className="qa-detail-desc">{viewingAroma.deskripsi}</p>
            </div>

            <div className="qa-detail-ratings-box">
              <span className="qa-detail-label">Skor Nilai Kriteria Saat Ini</span>
              <div className="qa-detail-ratings-grid">
                {activeKriteria.map((k) => (
                  <div key={k.kode} className="qa-detail-rating-chip">
                    <span className="qa-detail-rating-k">{k.kode} ({k.nama})</span>
                    <span className="qa-detail-rating-v">
                      {viewingAroma.penilaian?.[k.kode] ?? '-'} / 5
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
