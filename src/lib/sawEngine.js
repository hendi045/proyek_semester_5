/**
 * sawEngine.js
 * Modul logika murni algoritma Simple Additive Weighting (SAW) untuk Qodha Aromatic.
 * Terpisah dari komponen UI sehingga dapat diuji secara independen.
 */

/**
 * Validasi parameter awal sebelum proses SAW dijalankan.
 * @param {Array} alternatives - Daftar alternatif aroma aktif
 * @param {Array} criteria - Daftar kriteria aktif
 * @returns {Object} { isValid, errors }
 */
export function validateSAWInput(alternatives, criteria) {
  const errors = [];

  if (!criteria || criteria.length < 2) {
    errors.push('Minimal 2 kriteria aktif diperlukan untuk melakukan proses perangkingan SAW.');
  }

  if (!alternatives || alternatives.length === 0) {
    errors.push('Tidak ada alternatif wewangian aktif yang dapat dievaluasi.');
  }

  // Hitung total bobot
  const totalWeight = (criteria || []).reduce((sum, c) => sum + (Number(c.bobot) || 0), 0);
  const roundedWeight = Math.round(totalWeight * 10) / 10;
  if (roundedWeight !== 100) {
    errors.push(
      `Total akumulasi bobot kriteria saat ini adalah ${totalWeight}%. Total bobot wajib tepat 100% sebelum perhitungan dijalankan.`
    );
  }

  // Periksa kelengkapan nilai alternatif
  if (alternatives && criteria) {
    alternatives.forEach((alt) => {
      criteria.forEach((c) => {
        const val = alt.penilaian?.[c.kode];
        if (val === undefined || val === null || val === '') {
          errors.push(
            `Nilai kriteria ${c.kode} (${c.nama}) untuk alternatif ${alt.nama} (${alt.id}) belum diisi.`
          );
        } else if (Number(val) <= 0 && c.tipe === 'cost') {
          errors.push(
            `Nilai kriteria cost ${c.kode} untuk alternatif ${alt.nama} bernilai ${val}. Nilai kriteria cost harus lebih besar dari 0 untuk mencegah pembagian nol.`
          );
        }
      });
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Menghitung seluruh tahapan Simple Additive Weighting (SAW).
 * 
 * Rumus:
 * - Benefit: r_ij = x_ij / max(x_j)
 * - Cost:    r_ij = min(x_j) / x_ij
 * - Nilai V: V_i = Σ (w_j * r_ij)
 * 
 * @param {Array} alternatives - Daftar alternatif wewangian aktif
 * @param {Array} criteria - Daftar kriteria aktif
 * @returns {Object} Hasil komputasi SAW lengkap
 */
export function calculateSAW(alternatives, criteria) {
  const validation = validateSAWInput(alternatives, criteria);
  if (!validation.isValid) {
    return {
      isValid: false,
      errors: validation.errors,
      matrixX: [],
      matrixR: [],
      weightsW: {},
      weightedMatrix: [],
      rankings: []
    };
  }

  // 1. Ekstraksi Vektor Bobot W_j (desimal: bobot / 100)
  const weightsW = {};
  criteria.forEach((c) => {
    weightsW[c.kode] = Number(c.bobot) / 100;
  });

  // 2. Matriks Keputusan Awal (X) & Penentuan Min/Max per Kriteria
  const extrema = {}; // { C1: { min, max }, ... }
  criteria.forEach((c) => {
    const values = alternatives.map((a) => Number(a.penilaian[c.kode]));
    extrema[c.kode] = {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  });

  const matrixX = alternatives.map((a) => {
    const row = { id: a.id, nama: a.nama, values: {} };
    criteria.forEach((c) => {
      row.values[c.kode] = Number(a.penilaian[c.kode]);
    });
    return row;
  });

  // 3. Matriks Normalisasi (R)
  const matrixR = alternatives.map((a) => {
    const normRow = { id: a.id, nama: a.nama, normalized: {} };
    criteria.forEach((c) => {
      const val = Number(a.penilaian[c.kode]);
      let r_ij = 0;

      if (c.tipe === 'benefit') {
        const maxVal = extrema[c.kode].max;
        r_ij = maxVal > 0 ? val / maxVal : 0;
      } else {
        // Cost
        const minVal = extrema[c.kode].min;
        r_ij = val > 0 ? minVal / val : 0;
      }

      normRow.normalized[c.kode] = r_ij;
    });
    return normRow;
  });

  // 4. Perkalian Terbobot & Perhitungan Nilai Preferensi (V_i)
  const weightedMatrix = [];
  const rankingsRaw = alternatives.map((a) => {
    const rRow = matrixR.find((r) => r.id === a.id);
    let totalScoreV = 0;
    const breakdown = {};
    const weightedRowValues = {};

    criteria.forEach((c) => {
      const r_ij = rRow.normalized[c.kode];
      const w_j = weightsW[c.kode];
      const weightedContribution = w_j * r_ij;

      totalScoreV += weightedContribution;
      weightedRowValues[c.kode] = weightedContribution;

      breakdown[c.kode] = {
        kode: c.kode,
        nama: c.nama,
        tipe: c.tipe,
        raw: Number(a.penilaian[c.kode]),
        normalized: r_ij,
        weight: w_j,
        contribution: weightedContribution,
        percentContribution: (weightedContribution * 100).toFixed(2) + '%'
      };
    });

    weightedMatrix.push({
      id: a.id,
      nama: a.nama,
      weighted: weightedRowValues,
      totalV: totalScoreV
    });

    return {
      id: a.id,
      nama: a.nama,
      kategori: a.kategori,
      karakteristik: a.karakteristik,
      deskripsi: a.deskripsi,
      kegunaan: a.kegunaan,
      hargaDummy: a.hargaDummy,
      tag: a.tag || [],
      score: totalScoreV,
      scorePercent: (totalScoreV * 100).toFixed(2) + '%',
      breakdown
    };
  });

  // 5. Sorting Rangking Descending berdasarkan V_i
  rankingsRaw.sort((a, b) => b.score - a.score);

  // Sematkan nomor peringkat & label status rekomendasi
  const rankings = rankingsRaw.map((item, idx) => {
    const rank = idx + 1;
    let statusRecommendation = 'Cukup Direkomendasikan';
    if (rank === 1) {
      statusRecommendation = 'Sangat Direkomendasikan (Pilihan Utama)';
    } else if (rank <= 3) {
      statusRecommendation = 'Direkomendasikan';
    }

    return {
      ...item,
      rank,
      statusRecommendation
    };
  });

  return {
    isValid: true,
    errors: [],
    extrema,
    matrixX,
    matrixR,
    weightsW,
    weightedMatrix,
    rankings
  };
}
