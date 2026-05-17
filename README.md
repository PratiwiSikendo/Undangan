# Undangan Pernikahan Digital - Premium Cinematic Edition

Selamat! Anda telah mendapatkan *source code* undangan digital berkelas premium dengan konsep **Warm Luxury Cinematic** layaknya *Apple website* dan video viral TikTok.

## 📂 Struktur Project
```
d:\Documents\Undangan\
│
├── index.html     (Struktur halaman utama)
├── style.css      (Desain, warna, dan animasi CSS)
├── script.js      (Logika countdown, nama dinamis, music, dan slider)
├── README.md      (Dokumentasi panduan ini)
└── assets/        (Folder untuk menyimpan foto & musik)
    ├── gambar pria.jpeg
    ├── gambar wanita.jpeg
    ├── prewed3.jpeg
    ├── full hitam.jpeg
    └── Westlife - Beautiful in white (Lyrics).mp3
```

---

## 🎨 Cara Mengubah Data & Aset

### 1. Mengubah Foto Profil dan Background
Semua foto diletakkan di dalam folder `assets/`.
Untuk mengubahnya:
- Ganti file foto di folder `assets/` dengan foto Anda sendiri.
- Buka `index.html` lalu cari kata kunci `assets/`.
- Ubah nama file di tag `<img>` atau di dalam style `background-image: url('assets/FOTO_BARU.jpeg');` agar sesuai dengan nama file Anda.

### 2. Mengubah Background Music (BGM)
- Siapkan lagu berformat `.mp3` dan masukkan ke dalam folder `assets/`.
- Buka file `index.html`.
- Cari kode berikut (di bawah section Opening Screen):
  ```html
  <audio id="bg-music" loop>
      <source src="assets/NAMA_LAGU_ANDA.mp3" type="audio/mpeg">
  </audio>
  ```
- Ganti `src` dengan nama lagu yang baru.

### 3. Mengubah Teks dan Tanggal
- Buka `index.html`.
- Anda dapat mengubah nama pengantin dengan mengedit bagian `Christian & Anggita` di teks `<h1>`.
- Untuk **Countdown Timer**:
  Buka file `script.js`, lalu cari baris:
  ```javascript
  const weddingDate = new Date("May 30, 2026 08:30:00").getTime();
  ```
  Ubah ke tanggal acara Anda (format: Bulan Tanggal, Tahun Jam:Menit:Detik, contoh: `Dec 25, 2026 10:00:00`).

---

## 🔗 Cara Generate Nama Tamu (Dynamic URL)

Nama tamu otomatis berubah di Cover (Opening Screen) dengan menambahkan link parameter `?to=NAMA+TAMU`. 

**Contoh Penggunaan:**
Jika domain atau link website Anda adalah `https://weddingku.com`, maka untuk mengundang:
1. Bapak Budi: `https://weddingku.com/?to=Bapak Budi`
2. Andi & Keluarga: `https://weddingku.com/?to=Andi %26 Keluarga`
*(Gunakan `%20` untuk spasi atau biarkan kosong, dan `%26` untuk karakter '&')*

Logika ini otomatis dibaca oleh `script.js` pada blok awal:
```javascript
const params = new URLSearchParams(window.location.search);
let guest = params.get("to");
// Akan memunculkan "TAMU UNDANGAN" jika link tidak memiliki ?to=
```

---

## 🚀 Cara Deploy ke Vercel (Gratis & Cepat)

Untuk membuat undangan Anda online dan bisa diakses oleh semua orang, Anda bisa menggunakan layanan **Vercel** secara gratis.

### Opsi 1: Menggunakan Vercel CLI (Jika sudah menginstall NodeJS)
1. Buka Terminal / Command Prompt di folder `d:\Documents\Undangan`.
2. Ketik perintah: `npm i -g vercel` (Untuk install Vercel, cukup 1 kali)
3. Ketik perintah: `vercel`
4. Ikuti instruksi login dan konfirmasi dengan menekan `Enter` (Set-up and deploy -> `Y`, Pilih direktori default, dll).
5. Vercel akan memberikan link *production* (Misal: `https://undangan-christian-anggita.vercel.app`).

### Opsi 2: Upload Manual via GitHub (Rekomendasi)
1. Buat repository baru di [GitHub](https://github.com).
2. Upload semua file dari folder `d:\Documents\Undangan` (beserta folder `assets`) ke repository tersebut.
3. Buka [Vercel](https://vercel.com) lalu Login menggunakan akun GitHub.
4. Klik **Add New...** -> **Project**.
5. Import repository GitHub yang baru saja Anda buat.
6. Framework preset biarkan di `Other` (karena ini HTML/CSS/JS murni).
7. Klik **Deploy**.
8. Selesai! Website akan mendapatkan link live dan bisa langsung disebar ke tamu.
