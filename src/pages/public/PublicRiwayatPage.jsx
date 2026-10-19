import React, { useState } from 'react';
import {
  History,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Trash2,
  Compass
} from 'lucide-react';
import { useDataContext } from '../../context/DataContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import './PublicRiwayatPage.css';

export function PublicRiwayatPage({ onNavigateToRekomendasi }) {
  const { riwayatList, deleteRiwayat, clearAllRiwayat } = useDataContext();
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleConfirmClearAll = () => {
    clearAllRiwayat();
    setIsClearAllModalOpen(false);
  };

  const handleConfirmDeleteSingle = () => {
    if (deletingId) {
      deleteRiwayat(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="qa-public-riwayat container">
      {/* Page Header */}
      <div className="qa-page-header">
        <div className="qa-page-header__meta">
          <h1 className="qa-page-title">Riwayat Simulasi Rekomendasi</h1>
          <p className="qa-page-desc">
            Daftar hasil pencarian preferensi dan perolehan rekomendasi wewangian sunah teratas yang Anda simpan pada browser ini.
          </p>
        </div>
        <div className="qa-page-header__actions">
          {riwayatList.length > 0 && (
            <Button
              variant="outline"
              size="md"
              icon={Trash2}
              onClick={() => setIsClearAllModalOpen(true)}
            >
              Hapus Semua Riwayat
            </Button>
          )}
          <Button
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={onNavigateToRekomendasi}
          >
            Kembali ke Rekomendasi
          </Button>
        </div>
      </div>

      {/* Local Storage Disclaimer */}
      <div className="qa-history-disclaimer">
        <ShieldCheck size={18} />
        <span>
          <strong>Penyimpanan Demo:</strong> Riwayat simulasi tersimpan secara lokal pada memori browser ini (localStorage demo) dan tidak tersinkronisasi ke perangkat lain atau akun server.
        </span>
      </div>

      {/* History List */}
      {riwayatList.length > 0 ? (
        <div className="qa-history-list">
          {riwayatList.map((item) => (
            <Card key={item.id} className="qa-history-card">
              <CardBody className="qa-history-card__body">
                <div className="qa-history-icon-col">
                  <div className="qa-history-icon-circle">
                    <History size={20} />
                  </div>
                </div>

                <div className="qa-history-main-col">
                  <div className="qa-history-timestamp">
                    <Clock size={13} />
                    <span>{item.waktu}</span>
                    <Badge variant="neutral" size="sm">ID: {item.id}</Badge>
                  </div>

                  <h3 className="qa-history-top-result">
                    Rekomendasi Teratas: <strong>{item.topResult}</strong>
                  </h3>

                  <div className="qa-history-tags">
                    <span className="qa-history-tag">
                      Keluarga Aroma: <strong>{item.filterKategori || 'Semua'}</strong>
                    </span>
                    <span className="qa-history-tag">
                      Kebutuhan: <strong>{item.filterKebutuhan || 'Semua'}</strong>
                    </span>
                  </div>
                </div>

                <div className="qa-history-score-col">
                  <span className="qa-score-label">Skor Preferensi</span>
                  <span className="qa-score-badge">{item.skor}</span>
                  <button
                    type="button"
                    className="qa-history-del-btn"
                    onClick={() => setDeletingId(item.id)}
                    title="Hapus riwayat ini"
                    aria-label={`Hapus riwayat ${item.id}`}
                  >
                    <Trash2 size={15} />
                    <span>Hapus</span>
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title="Belum Ada Riwayat Rekomendasi"
          description="Anda belum menyimpan riwayat pencarian rekomendasi wewangian sunah. Cobalah simulasikan preferensi aroma Anda sekarang."
          actionLabel="Mulai Simulasi Rekomendasi"
          onAction={onNavigateToRekomendasi}
        />
      )}

      {/* Modal Konfirmasi Hapus Semua */}
      <Modal
        isOpen={isClearAllModalOpen}
        onClose={() => setIsClearAllModalOpen(false)}
        title="Bersihkan Semua Riwayat Simulasi?"
        confirmLabel="Ya, Hapus Semua"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={handleConfirmClearAll}
      >
        <p>
          Tindakan ini akan menghapus seluruh data riwayat rekomendasi dari penyimpanan lokal browser Anda. Data tidak dapat dipulihkan kembali.
        </p>
      </Modal>

      {/* Modal Konfirmasi Hapus Single */}
      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        title="Hapus Item Riwayat Ini?"
        confirmLabel="Hapus"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={handleConfirmDeleteSingle}
      >
        <p>
          Item riwayat ID <strong>{deletingId}</strong> akan dihapus dari penyimpanan demo browser.
        </p>
      </Modal>
    </div>
  );
}
