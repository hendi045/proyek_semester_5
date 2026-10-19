/**
 * Modul data dummy untuk Qodha Aromatic
 * Digunakan untuk demo prototipe front-end tanpa backend/database.
 */

export const DUMMY_KRITERIA = [
  {
    kode: 'C1',
    nama: 'Kesesuaian Riwayat Sunah',
    tipe: 'benefit',
    bobot: 25,
    rentang: '1 - 5 (Skala preferensi riwayat sunah)',
    deskripsi: 'Tingkat penyebutan dan penekanan dalam riwayat hadits/atsar sunah wewangian.',
    status: 'aktif'
  },
  {
    kode: 'C2',
    nama: 'Ketahanan Aroma (Longevity)',
    tipe: 'benefit',
    bobot: 20,
    rentang: '1 - 5 (Skala jam ketahanan aroma)',
    deskripsi: 'Daya tahan jejak aroma saat diaplikasikan pada pakaian atau kulit.',
    status: 'aktif'
  },
  {
    kode: 'C3',
    nama: 'Kelembutan Karakter Aroma',
    tipe: 'benefit',
    bobot: 20,
    rentang: '1 - 5 (Skala kelembutan vs ketajaman)',
    deskripsi: 'Keseimbangan aroma agar nyaman di hidung, tidak menyengat berlebih.',
    status: 'aktif'
  },
  {
    kode: 'C4',
    nama: 'Popularitas & Kesukaan Pengguna',
    tipe: 'benefit',
    bobot: 15,
    rentang: '1 - 5 (Skala penerimaan publik)',
    deskripsi: 'Tingkat kesukaan umum jemaah dan pelanggan terhadap profil aroma.',
    status: 'aktif'
  },
  {
    kode: 'C5',
    nama: 'Tingkat Harga / Ekonomis',
    tipe: 'cost',
    bobot: 20,
    rentang: '1 - 5 (1: sangat terjangkau, 5: sangat premium)',
    deskripsi: 'Kriteria biaya: semakin rendah nilai biaya/harga per ml, semakin menguntungkan konsumen.',
    status: 'aktif'
  }
];

export const DUMMY_AROMA = [
  {
    id: 'ARM-01',
    nama: 'Kasturi Putih (White Musk)',
    kategori: 'Musky',
    karakteristik: 'Bersih, lembut, powdery, elegan',
    deskripsi: 'Wewangian kasturi berkarakter suci dan sejuk. Sangat dianjurkan untuk ibadah shalat berjamaah dan hari Jumat.',
    kegunaan: 'Ibadah Harian, Shalat Jumat, Majelis Ilmu',
    tag: ['Sunah Utama', 'Lembut', 'Best Seller'],
    hargaDummy: 'Rp 65.000 / 6ml',
    status: 'aktif',
    penilaian: { C1: 5, C2: 4, C3: 5, C4: 5, C5: 2 }
  },
  {
    id: 'ARM-02',
    nama: 'Gaharu Kalbar (Oud Kalimantan)',
    kategori: 'Woody Oriental',
    karakteristik: 'Hangat, berasap manis, mewah, mendalam',
    deskripsi: 'Minyak wangi ekstrak gaharu alami nusantara dengan nuansa smokey berkarib, wibawa tinggi untuk momentum ibadah agung.',
    kegunaan: 'Shalat Tarawih, Hari Raya, Acara Resmi',
    tag: ['Sunah Premium', 'Tahan Lama', 'Wibawa'],
    hargaDummy: 'Rp 145.000 / 6ml',
    status: 'aktif',
    penilaian: { C1: 5, C2: 5, C3: 3, C4: 4, C5: 4 }
  },
  {
    id: 'ARM-03',
    nama: 'Misk Thaharah',
    kategori: 'Musky Floral',
    karakteristik: 'Kental, bersih seperti sabun mewah, floral halus',
    deskripsi: 'Aroma misk yang identik dengan sunah bersuci dan kesegaran setelah berwudhu. Tekstur kental harum tahan lama.',
    kegunaan: 'Bersuci, Aktivitas Harian, Rumah Tangga',
    tag: ['Sunah Bersuci', 'Segar', 'Tahan Lama'],
    hargaDummy: 'Rp 45.000 / 6ml',
    status: 'aktif',
    penilaian: { C1: 4, C2: 4, C3: 4, C4: 5, C5: 1 }
  },
  {
    id: 'ARM-04',
    nama: 'Cendana Keraton (Sandalwood)',
    kategori: 'Woody',
    karakteristik: 'Kayu lembut, creamy, menenangkan jiwa',
    deskripsi: 'Aroma kayu cendana murni yang memberikan rasa teduh, ketenangan batin, serta fokus tinggi dalam berdzikir.',
    kegunaan: 'Tadarus, Iktikaf, Dzikir Malam',
    tag: ['Menenangkan', 'Kayu Alami'],
    hargaDummy: 'Rp 85.000 / 6ml',
    status: 'aktif',
    penilaian: { C1: 4, C2: 4, C3: 5, C4: 3, C5: 3 }
  },
  {
    id: 'ARM-05',
    nama: 'Wardah Taif (Rose Nabawi)',
    kategori: 'Floral',
    karakteristik: 'Mawar manis segar, embun pagi, ceria',
    deskripsi: 'Mawar klasik timur tengah yang mengingatkan pada suasana pelataran Madinah al-Munawwarah.',
    kegunaan: 'Aktivitas Harian, Kajian, Silaturahmi',
    tag: ['Bunga Nabawi', 'Menyegarkan'],
    hargaDummy: 'Rp 70.000 / 6ml',
    status: 'aktif',
    penilaian: { C1: 3, C2: 3, C3: 4, C4: 4, C5: 2 }
  },
  {
    id: 'ARM-06',
    nama: 'Ambergris Al-Haram',
    kategori: 'Oriental Amber',
    karakteristik: 'Hangat, balsam manis, eksotis, tebal',
    deskripsi: 'Aroma amber klasik dengan ketahanan luar biasa dan proyeksi wangi yang berkarakter kuat.',
    kegunaan: 'Malam Hari, Udara Dingin, Bepergian',
    tag: ['Eksotis', 'Kuat'],
    hargaDummy: 'Rp 110.000 / 6ml',
    status: 'aktif',
    penilaian: { C1: 3, C2: 5, C3: 3, C4: 3, C5: 4 }
  }
];

export const DUMMY_DASHBOARD_STATS = {
  totalAroma: 6,
  totalKriteria: 5,
  alternatifSiap: 6,
  totalRekomendasiTersimpan: 12,
  statusBobot: {
    totalPersen: 100,
    isValid: true,
    pesan: 'Total bobot 100% — Siap dihitung'
  },
  statusPenilaian: {
    lengkap: true,
    pesan: 'Semua 6 alternatif telah memiliki skor kriteria lengkap'
  }
};

export const DUMMY_TOP_RANKING = [
  {
    rank: 1,
    id: 'ARM-01',
    nama: 'Kasturi Putih (White Musk)',
    kategori: 'Musky',
    skor: 0.9240,
    persen: '92.40%',
    status: 'Sangat Direkomendasikan',
    highlight: 'Kesesuaian Sunah & Kelembutan Tertinggi'
  },
  {
    rank: 2,
    id: 'ARM-03',
    nama: 'Misk Thaharah',
    kategori: 'Musky Floral',
    skor: 0.8850,
    persen: '88.50%',
    status: 'Direkomendasikan',
    highlight: 'Sangat Ekonomis & Kesukaan Publik Tinggi'
  },
  {
    rank: 3,
    id: 'ARM-02',
    nama: 'Gaharu Kalbar (Oud Kalimantan)',
    kategori: 'Woody Oriental',
    skor: 0.8610,
    persen: '86.10%',
    status: 'Direkomendasikan',
    highlight: 'Longevity Terbaik & Wewangian Agung'
  },
  {
    rank: 4,
    id: 'ARM-04',
    nama: 'Cendana Keraton',
    kategori: 'Woody',
    skor: 0.7920,
    persen: '79.20%',
    status: 'Cukup Direkomendasikan',
    highlight: 'Karakter Lembut & Menenangkan'
  }
];

export const DUMMY_AKTIVITAS_TERBARU = [
  {
    id: 'ACT-1',
    waktu: '10 menit yang lalu',
    tipe: 'saw',
    deskripsi: 'Simulasi perangkingan SAW dijalankan oleh Demo Admin.'
  },
  {
    id: 'ACT-2',
    waktu: '1 jam yang lalu',
    tipe: 'kriteria',
    deskripsi: 'Bobot kriteria C1 (Kesesuaian Sunah) diverifikasi pada 25%.'
  },
  {
    id: 'ACT-3',
    waktu: '3 jam yang lalu',
    tipe: 'aroma',
    deskripsi: 'Pembaruan data spesifikasi Kasturi Putih dan Gaharu Kalbar.'
  },
  {
    id: 'ACT-4',
    waktu: 'Kemarin',
    tipe: 'pengunjung',
    deskripsi: 'Pengunjung publik melakukan simulasi rekomendasi kategori Musky.'
  }
];

export const DUMMY_KATEGORI_OPTIONS = [
  'Semua Kategori',
  'Musky',
  'Woody',
  'Woody Oriental',
  'Musky Floral',
  'Floral',
  'Oriental Amber'
];

export const DUMMY_PENGGUNAAN_OPTIONS = [
  'Semua Kebutuhan',
  'Shalat Jumat & Berjamaah',
  'Bersuci & Harian',
  'Iktikaf & Dzikir Malam',
  'Hari Raya & Acara Khidmat'
];
