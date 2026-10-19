import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DUMMY_AROMA, DUMMY_KRITERIA } from '../data/dummyData';
import { calculateSAW } from '../lib/sawEngine';

const DataContext = createContext(null);

const STORAGE_KEY_AROMA = 'qa_demo_aroma_data';
const STORAGE_KEY_KRITERIA = 'qa_demo_kriteria_data';
const STORAGE_KEY_RIWAYAT = 'qa_demo_riwayat_data';

export function DataProvider({ children }) {
  // 1. Inisialisasi Aroma
  const [aromaList, setAromaList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AROMA);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Gagal memuat aroma dari localStorage, menggunakan seed default:', e);
    }
    return DUMMY_AROMA;
  });

  // 2. Inisialisasi Kriteria
  const [kriteriaList, setKriteriaList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_KRITERIA);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Gagal memuat kriteria dari localStorage, menggunakan seed default:', e);
    }
    return DUMMY_KRITERIA;
  });

  // 3. Notifikasi Toast Feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Persistensi Aroma ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AROMA, JSON.stringify(aromaList));
    } catch (e) {
      console.error('Gagal menyimpan aroma ke localStorage:', e);
    }
  }, [aromaList]);

  // Persistensi Kriteria ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_KRITERIA, JSON.stringify(kriteriaList));
    } catch (e) {
      console.error('Gagal menyimpan kriteria ke localStorage:', e);
    }
  }, [kriteriaList]);

  // Kriteria Aktif & Perhitungan Total Bobot
  const activeKriteria = kriteriaList.filter((k) => k.status === 'aktif');
  const activeAroma = aromaList.filter((a) => a.status === 'aktif');

  const totalBobot = activeKriteria.reduce((sum, k) => sum + (Number(k.bobot) || 0), 0);
  const isBobotValid = Math.round(totalBobot * 10) / 10 === 100;

  // Cek Kelengkapan Nilai Penilaian
  const getPenilaianStatus = () => {
    let missingCount = 0;
    activeAroma.forEach((aroma) => {
      const p = aroma.penilaian || {};
      activeKriteria.forEach((k) => {
        const val = p[k.kode];
        if (val === undefined || val === null || val === '') {
          missingCount++;
        }
      });
    });

    return {
      isLengkap: missingCount === 0 && activeAroma.length > 0,
      missingCount,
      totalExpected: activeAroma.length * activeKriteria.length
    };
  };

  const penilaianStatus = getPenilaianStatus();

  // 4. Komputasi SAW Reaktif Otomatis
  const sawResult = useMemo(() => {
    return calculateSAW(activeAroma, activeKriteria);
  }, [activeAroma, activeKriteria]);

  // 5. Inisialisasi Riwayat Simulasi Pengunjung
  const [riwayatList, setRiwayatList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RIWAYAT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Gagal memuat riwayat dari localStorage:', e);
    }
    return [
      {
        id: 'HIST-01',
        waktu: 'Hari ini, 14:20 WIB',
        timestamp: Date.now() - 3600000,
        filterKategori: 'Musky',
        filterKebutuhan: 'Shalat Jumat & Berjamaah',
        topResult: 'Misk Thaharah',
        topResultId: 'ARM-03',
        skor: '87.00%'
      },
      {
        id: 'HIST-02',
        waktu: 'Kemarin, 09:15 WIB',
        timestamp: Date.now() - 86400000,
        filterKategori: 'Woody Oriental',
        filterKebutuhan: 'Hari Raya & Acara Khidmat',
        topResult: 'Gaharu Kalbar (Oud Kalimantan)',
        topResultId: 'ARM-02',
        skor: '74.00%'
      }
    ];
  });

  // Persistensi Riwayat ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RIWAYAT, JSON.stringify(riwayatList));
    } catch (e) {
      console.error('Gagal menyimpan riwayat ke localStorage:', e);
    }
  }, [riwayatList]);

  const addRiwayat = (entry) => {
    const id = `HIST-${String(Date.now()).slice(-4)}`;
    const now = new Date();
    const waktuStr = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const newRecord = {
      id,
      waktu: waktuStr,
      timestamp: Date.now(),
      ...entry
    };
    setRiwayatList((prev) => [newRecord, ...prev]);
    showToast('Hasil simulasi rekomendasi disimpan ke riwayat demo.', 'success');
  };

  const deleteRiwayat = (id) => {
    setRiwayatList((prev) => prev.filter((r) => r.id !== id));
    showToast('Item riwayat berhasil dihapus.', 'info');
  };

  const clearAllRiwayat = () => {
    setRiwayatList([]);
    try {
      localStorage.removeItem(STORAGE_KEY_RIWAYAT);
    } catch (e) {
      console.warn('Gagal membersihkan riwayat di localStorage:', e);
    }
    showToast('Seluruh riwayat simulasi demo telah dibersihkan.', 'info');
  };

  // --- CRUD AROMA ---
  const addAroma = (newAroma) => {
    const id = newAroma.id || `ARM-0${aromaList.length + 1}`;
    // Siapkan nilai awal default untuk kriteria aktif bila belum ada
    const defaultRatings = {};
    activeKriteria.forEach((k) => {
      defaultRatings[k.kode] = k.tipe === 'cost' ? 3 : 4;
    });

    const aromaRecord = {
      ...newAroma,
      id,
      status: newAroma.status || 'aktif',
      penilaian: newAroma.penilaian || defaultRatings
    };

    setAromaList((prev) => [aromaRecord, ...prev]);
    showToast(`Aroma "${aromaRecord.nama}" berhasil ditambahkan ke katalog demo.`, 'success');
  };

  const updateAroma = (id, updatedData) => {
    setAromaList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
    showToast(`Data aroma ${id} berhasil diperbarui.`, 'success');
  };

  const deleteAroma = (id) => {
    const target = aromaList.find((a) => a.id === id);
    setAromaList((prev) => prev.filter((item) => item.id !== id));
    showToast(`Aroma "${target?.nama || id}" berhasil dihapus dari data demo.`, 'info');
  };

  const resetAromaData = () => {
    setAromaList(DUMMY_AROMA);
    showToast('Katalog aroma dikembalikan ke data awal demo.', 'info');
  };

  // --- CRUD KRITERIA ---
  const addKriteria = (newKriteria) => {
    const kode = newKriteria.kode?.toUpperCase() || `C${kriteriaList.length + 1}`;
    // Periksa keunikan kode
    if (kriteriaList.some((k) => k.kode.toUpperCase() === kode)) {
      showToast(`Kode kriteria ${kode} sudah digunakan!`, 'danger');
      return false;
    }

    const kriteriaRecord = {
      ...newKriteria,
      kode,
      bobot: Number(newKriteria.bobot) || 0,
      status: newKriteria.status || 'aktif',
      rentang: newKriteria.rentang || '1 - 5 (Skala penilaian)'
    };

    setKriteriaList((prev) => [...prev, kriteriaRecord]);
    showToast(`Kriteria "${kriteriaRecord.nama} (${kode})" berhasil dibuat.`, 'success');
    return true;
  };

  const updateKriteria = (kode, updatedData) => {
    setKriteriaList((prev) =>
      prev.map((k) =>
        k.kode === kode
          ? {
              ...k,
              ...updatedData,
              bobot: updatedData.bobot !== undefined ? Number(updatedData.bobot) : k.bobot
            }
          : k
      )
    );
    showToast(`Kriteria ${kode} berhasil diperbarui.`, 'success');
  };

  const deleteKriteria = (kode) => {
    if (activeKriteria.length <= 2) {
      showToast('Minimal 2 kriteria harus tetap ada untuk proses SAW.', 'danger');
      return;
    }

    const target = kriteriaList.find((k) => k.kode === kode);
    setKriteriaList((prev) => prev.filter((k) => k.kode !== kode));

    // Bersihkan nilai kriteria yang dihapus dari objek penilaian aroma
    setAromaList((prev) =>
      prev.map((a) => {
        if (!a.penilaian) return a;
        const newPenilaian = { ...a.penilaian };
        delete newPenilaian[kode];
        return { ...a, penilaian: newPenilaian };
      })
    );

    showToast(`Kriteria "${target?.nama || kode}" telah dihapus.`, 'info');
  };

  const toggleKriteriaStatus = (kode) => {
    setKriteriaList((prev) =>
      prev.map((k) =>
        k.kode === kode
          ? { ...k, status: k.status === 'aktif' ? 'nonaktif' : 'aktif' }
          : k
      )
    );
    showToast(`Status kriteria ${kode} diubah.`, 'info');
  };

  const resetKriteriaData = () => {
    setKriteriaList(DUMMY_KRITERIA);
    showToast('Data kriteria & bobot dikembalikan ke konfigurasi standar demo.', 'info');
  };

  // --- MANAJEMEN BOBOT ---
  const updateBobot = (kode, newBobotVal) => {
    const val = Math.max(0, Math.min(100, Number(newBobotVal) || 0));
    setKriteriaList((prev) =>
      prev.map((k) => (k.kode === kode ? { ...k, bobot: val } : k))
    );
  };

  const normalizeBobot = () => {
    if (activeKriteria.length === 0) return;
    const currentSum = activeKriteria.reduce((s, k) => s + (Number(k.bobot) || 0), 0);

    if (currentSum === 0) {
      // Bagi rata jika semua nol
      const equalShare = Math.floor(100 / activeKriteria.length);
      const remainder = 100 - equalShare * activeKriteria.length;

      setKriteriaList((prev) =>
        prev.map((k, idx) => {
          if (k.status !== 'aktif') return k;
          return { ...k, bobot: equalShare + (idx === 0 ? remainder : 0) };
        })
      );
    } else {
      // Normalisasikan proporsional
      let accumulated = 0;
      const updated = activeKriteria.map((k, idx) => {
        if (idx === activeKriteria.length - 1) {
          return { kode: k.kode, bobot: 100 - accumulated };
        }
        const prop = Math.round((Number(k.bobot) / currentSum) * 100);
        accumulated += prop;
        return { kode: k.kode, bobot: prop };
      });

      setKriteriaList((prev) =>
        prev.map((k) => {
          const match = updated.find((u) => u.kode === k.kode);
          return match ? { ...k, bobot: match.bobot } : k;
        })
      );
    }

    showToast('Bobot kriteria aktif berhasil dinormalisasikan proporsional tepat 100%.', 'success');
  };

  const resetBobotToDefault = () => {
    setKriteriaList((prev) =>
      prev.map((k) => {
        const defaultMatch = DUMMY_KRITERIA.find((d) => d.kode === k.kode);
        return defaultMatch ? { ...k, bobot: defaultMatch.bobot } : k;
      })
    );
    showToast('Bobot kriteria dikembalikan ke bobot standar demo (Total 100%).', 'info');
  };

  // --- MANAJEMEN PENILAIAN ---
  const updatePenilaian = (aromaId, ratingsObj) => {
    setAromaList((prev) =>
      prev.map((a) => {
        if (a.id === aromaId) {
          return {
            ...a,
            penilaian: {
              ...(a.penilaian || {}),
              ...ratingsObj
            }
          };
        }
        return a;
      })
    );
    showToast(`Matriks penilaian aroma ${aromaId} berhasil diperbarui.`, 'success');
  };

  const fillMissingPenilaian = () => {
    setAromaList((prev) =>
      prev.map((a) => {
        const currentP = { ...(a.penilaian || {}) };
        activeKriteria.forEach((k) => {
          if (currentP[k.kode] === undefined || currentP[k.kode] === null || currentP[k.kode] === '') {
            currentP[k.kode] = k.tipe === 'cost' ? 3 : 4;
          }
        });
        return { ...a, penilaian: currentP };
      })
    );
    showToast('Semua nilai kriteria kosong berhasil diisi dengan nilai standar demo.', 'success');
  };

  // Reset Semua Data Demo ke Kondisi Awal
  const resetAllDemoData = () => {
    setAromaList(DUMMY_AROMA);
    setKriteriaList(DUMMY_KRITERIA);
    try {
      localStorage.removeItem(STORAGE_KEY_AROMA);
      localStorage.removeItem(STORAGE_KEY_KRITERIA);
      localStorage.removeItem(STORAGE_KEY_RIWAYAT);
    } catch (e) {
      console.warn('Gagal membersihkan localStorage demo:', e);
    }
    showToast('Semua data katalog, kriteria, bobot, dan penilaian telah direset ke seed awal.', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        aromaList,
        activeAroma,
        kriteriaList,
        activeKriteria,
        totalBobot,
        isBobotValid,
        penilaianStatus,
        sawResult,
        riwayatList,
        addRiwayat,
        deleteRiwayat,
        clearAllRiwayat,
        addAroma,
        updateAroma,
        deleteAroma,
        resetAromaData,
        addKriteria,
        updateKriteria,
        deleteKriteria,
        toggleKriteriaStatus,
        resetKriteriaData,
        updateBobot,
        normalizeBobot,
        resetBobotToDefault,
        updatePenilaian,
        fillMissingPenilaian,
        resetAllDemoData,
        toast,
        showToast
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext harus digunakan di dalam DataProvider');
  }
  return context;
}
