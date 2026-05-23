# UX SRS: KLB Attendance

## 1. Ringkasan

Dokumen ini menjelaskan kebutuhan UX untuk sistem attendance Kongres Luar Biasa. Fokus utama UX adalah membuat proses check-in terasa jelas, cepat, resmi, dan hangat untuk tamu undangan, sekaligus membantu resepsionis memantau kedatangan secara realtime.

Sumber utama dokumen:

- `ProjectVisualitationPlan.md`
- `design.md`
- `.agents/skills/shadcn/SKILL.md` dan aturan turunannya

## 2. Prinsip Pengalaman

- Single purpose: setiap layar harus membantu pengguna menyelesaikan satu tugas utama.
- Formal dan hangat: bahasa UI harus sopan, jelas, dan cocok untuk acara kongres.
- Recognition moment: ketika tamu berhasil hadir, UI harus terasa seperti momen penyambutan.
- Low friction: tamu tidak perlu login, scan rumit, atau mengisi data tambahan.
- Accessible by default: semua state penting harus bisa dibaca oleh screen reader dan tidak hanya bergantung pada warna.

## 3. Persona

### 3.1 Tamu Undangan

Kebutuhan:

- Memasukkan nomor undangan dengan mudah.
- Melihat identitas yang ditemukan sistem.
- Mengonfirmasi apakah data tersebut benar.
- Mendapat bukti hadir yang bisa ditunjukkan kepada resepsionis.

Konteks penggunaan:

- Digunakan di area venue, kemungkinan dari ponsel pribadi atau perangkat yang disediakan panitia.
- Pengguna mungkin sedang terburu-buru atau berada dalam antrean.

### 3.2 Resepsionis

Kebutuhan:

- Melihat daftar tamu yang sudah hadir.
- Melihat tamu terbaru yang baru check-in.
- Mendapat popup/notifikasi saat ada check-in baru.
- Mengecek status kehadiran secara cepat saat ada pertanyaan dari tamu.

Konteks penggunaan:

- Digunakan di laptop/tablet meja registrasi.
- Layar harus mudah dipindai selama acara berlangsung.

## 4. Guest Check-in Flow

### 4.1 Initial State

Konten utama:

- Header: `KONGRES LUAR BIASA`
- Subheader: `Kongres Wanita Indonesia`
- Instruksi: `Masukkan Nomor Undangan Anda`
- Label input: `Nomor Undangan`
- Placeholder: `Contoh: A-001`
- Tombol utama: `Verifikasi Kehadiran`

Behavior:

- Input otomatis trim dan uppercase saat diproses.
- Tombol disabled saat input kosong.
- Submit bisa dilakukan dengan tombol atau Enter.

### 4.2 Loading State

Konten:

- Tombol menampilkan loading indicator.
- Teks tombol: `Memverifikasi...`

Behavior:

- Input dan tombol disabled sementara request berjalan.
- Tidak boleh ada layout shift yang mengganggu.

### 4.3 Guest Found State

Konten:

- Judul: `Konfirmasi Identitas`
- Pertanyaan: `Apakah benar Anda {fullName} dari {organization}?`
- Tombol utama: `Ya, Saya Hadir`
- Tombol sekunder: `Tidak`

Behavior:

- Tombol "Ya" mencatat kehadiran.
- Tombol "Tidak" tidak mencatat kehadiran dan mengembalikan pengguna ke input.

### 4.4 Success State

Konten:

- Judul: `Selamat Datang!`
- Pesan: `Terima kasih, {fullName}, sudah menghadiri Kongres Luar Biasa.`
- Detail:
  - `Nama Lengkap`
  - `Organisasi / Asal`
  - `Nomor Undangan`
  - `Waktu Hadir`
- Instruksi: `Silakan tunjukkan halaman ini kepada resepsionis.`
- Tombol sekunder: `Cek Peserta Lain`

Behavior:

- Success state harus terlihat sebagai bukti hadir.
- Data utama tidak boleh tersembunyi di bawah fold pada layar mobile kecil.
- Tombol `Cek Peserta Lain` mengembalikan UI ke initial state.

### 4.5 Not Found State

Konten:

- Pesan error: `Nomor undangan tidak ditemukan. Silakan periksa kembali atau hubungi resepsionis.`

Behavior:

- Error muncul dekat input.
- Focus kembali ke input.
- Pesan error memakai `role="alert"` atau area `aria-live`.

### 4.6 Wrong Identity State

Konten:

- Pesan: `Silakan periksa kembali nomor undangan Anda atau hubungi resepsionis.`

Behavior:

- Sistem tidak mencatat attendance.
- Input dikosongkan atau tetap berisi nomor terakhir, dengan focus kembali ke input. Default: input tetap berisi nomor terakhir agar mudah diperbaiki.

### 4.7 Already Checked In State

Konten:

- Judul: `Kehadiran Sudah Tercatat`
- Pesan: `{fullName} sudah tercatat hadir pada {checkedInAt}.`
- Detail identitas sama seperti success state.
- Tombol sekunder: `Cek Peserta Lain`

Behavior:

- Tidak ada attendance record baru.
- State ini tidak dianggap error keras untuk tamu.

### 4.8 Connection Problem State

Konten:

- Pesan: `Koneksi bermasalah. Silakan coba lagi dalam beberapa saat.`
- Tombol: `Coba Lagi`

Behavior:

- Jika request gagal, jangan mengubah status attendance di UI menjadi success.
- UI harus membantu pengguna retry tanpa mengetik ulang nomor undangan.

## 5. Receptionist Dashboard Flow

### 5.1 Dashboard Access

URL:

```text
/receptionist?token=...
```

Behavior:

- Jika token valid, dashboard terbuka.
- Jika token invalid, tampilkan halaman akses ditolak.

Copy akses ditolak:

- Judul: `Akses Tidak Valid`
- Pesan: `Link dashboard tidak valid atau sudah tidak aktif.`

### 5.2 Dashboard Layout

Konten utama:

- Header: `Dashboard Resepsionis`
- Summary:
  - Total undangan.
  - Total hadir.
  - Belum hadir.
  - Persentase kehadiran.
- Recent arrivals:
  - Nama.
  - Organisasi.
  - Nomor undangan.
  - Waktu hadir.
- List tamu hadir:
  - Search berdasarkan nama, organisasi, atau nomor undangan.
  - Sort default berdasarkan waktu hadir terbaru.

Behavior:

- Recent arrivals otomatis bertambah saat event realtime masuk.
- Popup muncul saat tamu baru berhasil check-in.
- Dashboard tetap bisa digunakan jika popup ditutup.

### 5.3 Realtime Notification

Konten popup/toast:

- `Susi sudah hadir di KLB.`
- Detail kecil: `Organisasi A - A-001`

Behavior:

- Popup tidak boleh menutup kontrol penting.
- Popup hilang otomatis setelah beberapa detik.
- Data tetap masuk ke recent arrivals walaupun popup sudah hilang.

### 5.4 Empty State

Konten:

- Judul: `Belum Ada Tamu Hadir`
- Pesan: `Kehadiran terbaru akan muncul otomatis di sini.`

Behavior:

- Gunakan empty state yang tenang, bukan error.

## 6. Visual Design Requirements

Mengikuti `design.md`:

- Primary color: Deep Maroon `#8B2E3D`.
- Accent: Warm Gold `#D4AF37`.
- Surface: Ivory `#F5F3F0`.
- Text utama: Charcoal `#2C2C2C`.
- Success: Green `#4CAF50`.
- Error: Red `#E63946`.
- Font display: Poppins.
- Font body: Inter.
- Base spacing: 8px.
- Card check-in max width: 520px.
- Mobile padding: 16px.
- Tablet padding: 32px.
- Desktop padding: 48px.

Catatan implementasi:

- Karena project akan memakai shadcn/ui, warna brand dipetakan ke semantic CSS variables seperti `--primary`, `--primary-foreground`, `--background`, `--card`, `--ring`, dan `--destructive`.
- Component JSX tidak menggunakan raw color Tailwind untuk styling utama.
- Letter spacing mengikuti aturan design, tetapi implementasi harus menjaga keterbacaan dan tidak menyebabkan teks terpotong.

## 7. shadcn UI Constraints

Jika pengalaman ini dibangun dengan shadcn/ui:

- Form nomor undangan memakai `FieldGroup`, `Field`, `FieldLabel`, dan `Input`.
- Tombol memakai `Button` dengan variant yang sesuai.
- Loading pada tombol memakai `Spinner` dengan `data-icon`, bukan prop `isLoading`.
- Error memakai `Alert`, bukan custom callout.
- Success atau status attendance memakai `Badge` bila berbentuk label ringkas.
- Loading list dashboard memakai `Skeleton`.
- Empty dashboard memakai `Empty`.
- Popup realtime memakai `sonner` toast.
- Pemisah visual memakai `Separator`, bukan `<hr>` custom.
- Card memakai komposisi lengkap: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, dan `CardFooter` jika ada action.
- Spacing memakai `gap-*`, bukan `space-x-*` atau `space-y-*`.
- Icon dalam tombol memakai `data-icon`.
- Jangan mengasumsikan `lucide-react`; gunakan icon library dari `npx shadcn@latest info` saat project aplikasi sudah dibuat.

## 8. Accessibility Requirements

- Semua input memiliki label yang terlihat atau label screen-reader yang sah.
- Error menggunakan `role="alert"` atau `aria-live`.
- Dynamic success dan already checked in state diumumkan ke screen reader.
- Focus order logis dari header, input, tombol, hasil.
- Focus indicator harus terlihat jelas dengan warna gold/ring token.
- Minimum body text 16px pada mobile.
- Color contrast minimal memenuhi WCAG 2.1 AA.
- Semua aksi menggunakan elemen `button`, bukan clickable `div`.

## 9. Responsive Requirements

### Mobile

- Layout satu kolom.
- Check-in card memenuhi lebar container.
- Tombol mudah ditekan.
- Detail success tersusun vertikal.
- Tidak ada teks tombol yang terpotong.

### Tablet

- Check-in card tetap centered dengan max width 520px.
- Dashboard boleh memakai grid dua kolom untuk summary.

### Desktop

- Check-in page tetap fokus di tengah layar.
- Dashboard mengutamakan kepadatan informasi yang mudah dipindai.
- Recent arrivals dan list tamu hadir terlihat tanpa dekorasi berlebihan.

## 10. UX Acceptance Criteria

- Tamu dapat menyelesaikan check-in valid tanpa bantuan resepsionis.
- Tamu memahami apa yang harus dilakukan saat nomor undangan tidak ditemukan.
- Tamu yang salah identitas tidak mencatat kehadiran secara tidak sengaja.
- Tamu yang sudah hadir mendapat pesan yang jelas dan tidak terasa seperti kegagalan.
- Resepsionis dapat melihat tamu terbaru tanpa refresh manual.
- Popup realtime cukup jelas tetapi tidak mengganggu penggunaan dashboard.
- Seluruh state utama dapat dipahami tanpa bergantung pada warna saja.
- UI terasa resmi, hangat, dan sesuai dengan design system Kongres Luar Biasa.
