# Technical SRS: KLB Attendance

## 1. Ringkasan

Dokumen ini menjelaskan kebutuhan teknikal untuk sistem attendance Kongres Luar Biasa. Sistem dibuat sebagai web app online hosted dengan halaman check-in tamu dan dashboard realtime untuk resepsionis.

Sumber utama dokumen:

- `ProjectVisualitationPlan.md`
- `design.md`
- `.agents/skills/shadcn/SKILL.md` dan aturan turunannya

## 2. Tujuan Sistem

- Tamu dapat melakukan check-in dengan memasukkan nomor undangan.
- Sistem memverifikasi nomor undangan terhadap data undangan yang diimpor dari JSON.
- Sistem menampilkan identitas tamu untuk dikonfirmasi sebelum mencatat kehadiran.
- Resepsionis dapat melihat daftar hadir dan notifikasi realtime saat tamu baru berhasil check-in.
- Sistem mencegah duplikasi check-in untuk nomor undangan yang sama.

## 3. Arsitektur Rekomendasi

### 3.1 Stack

- Frontend: Next.js dengan TypeScript.
- UI: shadcn/ui.
- Backend: Next.js Route Handlers atau Server Actions.
- Database: Supabase Postgres.
- Realtime: Supabase Realtime.
- Hosting: Vercel atau platform sejenis untuk Next.js.

### 3.2 Route Utama

- `/`
  - Halaman check-in tamu.
  - Berisi input nomor undangan, verifikasi identitas, konfirmasi hadir, dan bukti hadir.

- `/receptionist?token=...`
  - Dashboard resepsionis.
  - Token pada URL adalah link rahasia untuk membatasi akses dashboard.

## 4. Data Source dan Import

Data undangan awal berasal dari file JSON. Import dapat dibuat sebagai script internal, admin-only endpoint, atau proses manual yang dijalankan sebelum acara.

Format JSON minimal:

```json
[
  {
    "invitationNumber": "A-001",
    "fullName": "Susi",
    "organization": "Organisasi A",
    "role": "Delegasi",
    "phone": "081234567890",
    "notes": "Catatan internal"
  }
]
```

Field wajib:

- `invitationNumber`
- `fullName`
- `organization`

Field opsional:

- `role`
- `phone`
- `notes`

Aturan import:

- `invitationNumber` dinormalisasi dengan trim dan uppercase.
- `invitationNumber` harus unik.
- Record dengan field wajib kosong ditolak.
- Import tidak boleh menghapus data hadir yang sudah tercatat.

## 5. Model Data

### 5.1 Guest

Mewakili satu tamu undangan.

Field utama:

- `id`: UUID.
- `invitation_number`: string unik, hasil normalisasi `invitationNumber`.
- `full_name`: string.
- `organization`: string.
- `role`: string nullable.
- `phone`: string nullable.
- `notes`: string nullable.
- `attendance_status`: enum `not_checked_in` atau `checked_in`.
- `checked_in_at`: timestamp nullable.
- `created_at`: timestamp.
- `updated_at`: timestamp.

Constraint:

- `invitation_number` unik.
- `attendance_status` default `not_checked_in`.
- Jika `attendance_status = checked_in`, maka `checked_in_at` wajib terisi.

### 5.2 AttendanceRecord

Mewakili catatan kehadiran yang berhasil.

Field utama:

- `id`: UUID.
- `guest_id`: UUID, referensi ke `Guest`.
- `invitation_number_snapshot`: string.
- `full_name_snapshot`: string.
- `organization_snapshot`: string.
- `checked_in_at`: timestamp.
- `checkin_source`: enum, default `guest_self_checkin`.
- `created_at`: timestamp.

Constraint:

- Satu `guest_id` hanya boleh memiliki satu attendance record untuk acara ini.
- Snapshot disimpan agar histori tetap stabil walaupun data tamu dikoreksi setelah check-in.

### 5.3 ReceptionistSession

Mewakili akses dashboard resepsionis berbasis link rahasia.

Field utama:

- `id`: UUID.
- `token_hash`: string.
- `label`: string, contoh `Main Reception Desk`.
- `is_active`: boolean.
- `expires_at`: timestamp nullable.
- `last_used_at`: timestamp nullable.
- `created_at`: timestamp.

Aturan:

- Token asli tidak disimpan di database, hanya hash.
- Token valid jika session aktif dan belum melewati `expires_at`.

## 6. Public Interfaces

### 6.1 Verify Guest

Endpoint:

```text
POST /api/guests/verify
```

Request:

```json
{
  "invitationNumber": "A-001"
}
```

Response sukses:

```json
{
  "status": "found",
  "guest": {
    "invitationNumber": "A-001",
    "fullName": "Susi",
    "organization": "Organisasi A",
    "role": "Delegasi",
    "attendanceStatus": "not_checked_in",
    "checkedInAt": null
  }
}
```

Response tidak ditemukan:

```json
{
  "status": "not_found",
  "message": "Nomor undangan tidak ditemukan."
}
```

Response sudah hadir:

```json
{
  "status": "already_checked_in",
  "guest": {
    "invitationNumber": "A-001",
    "fullName": "Susi",
    "organization": "Organisasi A",
    "attendanceStatus": "checked_in",
    "checkedInAt": "2026-05-22T02:30:00.000Z"
  }
}
```

### 6.2 Check In Guest

Endpoint:

```text
POST /api/attendance/check-in
```

Request:

```json
{
  "invitationNumber": "A-001"
}
```

Response sukses:

```json
{
  "status": "checked_in",
  "guest": {
    "invitationNumber": "A-001",
    "fullName": "Susi",
    "organization": "Organisasi A",
    "checkedInAt": "2026-05-22T02:30:00.000Z"
  }
}
```

Response duplikat:

```json
{
  "status": "already_checked_in",
  "guest": {
    "invitationNumber": "A-001",
    "fullName": "Susi",
    "organization": "Organisasi A",
    "checkedInAt": "2026-05-22T02:30:00.000Z"
  }
}
```

Aturan transaksi:

- Check-in harus atomic.
- Jika dua request untuk nomor yang sama masuk bersamaan, hanya satu yang boleh membuat attendance record.
- Request kedua harus mengembalikan status `already_checked_in`.

### 6.3 Receptionist Summary

Endpoint:

```text
GET /api/receptionist/summary?token=...
```

Response:

```json
{
  "totalGuests": 500,
  "totalCheckedIn": 120,
  "recentArrivals": [
    {
      "invitationNumber": "A-001",
      "fullName": "Susi",
      "organization": "Organisasi A",
      "checkedInAt": "2026-05-22T02:30:00.000Z"
    }
  ]
}
```

Aturan:

- Token wajib divalidasi server-side.
- Response tidak boleh diberikan jika token invalid, tidak aktif, atau expired.

### 6.4 Realtime Event

Channel:

```text
attendance
```

Event:

```text
guest_checked_in
```

Payload:

```json
{
  "event": "guest_checked_in",
  "guest": {
    "invitationNumber": "A-001",
    "fullName": "Susi",
    "organization": "Organisasi A",
    "checkedInAt": "2026-05-22T02:30:00.000Z"
  }
}
```

Aturan:

- Dashboard resepsionis subscribe ke channel saat token sudah tervalidasi.
- Event realtime boleh berasal dari Supabase Realtime row insert/update atau broadcast server-side.
- UI dashboard harus tetap benar walaupun event realtime terlambat, dengan fallback refresh data summary.

## 7. Alur Teknis

### 7.1 Check-in Tamu

1. Tamu membuka `/`.
2. Tamu memasukkan nomor undangan.
3. Client menormalisasi input secara ringan, lalu mengirim ke `/api/guests/verify`.
4. Server mencari `Guest` berdasarkan `invitation_number`.
5. Jika tidak ditemukan, server mengembalikan `not_found`.
6. Jika ditemukan dan belum hadir, UI menampilkan pertanyaan konfirmasi identitas.
7. Jika tamu memilih "Ya", client memanggil `/api/attendance/check-in`.
8. Server menyimpan attendance secara atomic.
9. Server mengirim event `guest_checked_in`.
10. UI tamu menampilkan bukti hadir.

### 7.2 Tamu Salah Identitas

1. Tamu memilih "Tidak" pada layar konfirmasi.
2. Sistem tidak mencatat kehadiran.
3. UI kembali ke input awal dengan pesan agar tamu menghubungi resepsionis.

### 7.3 Dashboard Resepsionis

1. Resepsionis membuka `/receptionist?token=...`.
2. Server memvalidasi token.
3. Jika valid, dashboard menampilkan ringkasan dan recent arrivals.
4. Dashboard subscribe ke realtime channel.
5. Saat event `guest_checked_in` masuk, dashboard menampilkan popup dan memperbarui list recent arrivals.

## 8. Security dan Privacy

- Service role Supabase tidak boleh dikirim ke client.
- Semua operasi tulis attendance dilakukan dari server.
- Dashboard resepsionis wajib memvalidasi token di server.
- Token dashboard disimpan sebagai hash.
- Data yang ditampilkan ke tamu hanya data yang dibutuhkan untuk konfirmasi identitas.
- Data sensitif seperti `phone` dan `notes` tidak ditampilkan di halaman tamu.
- Rate limiting direkomendasikan untuk endpoint verifikasi agar nomor undangan tidak mudah ditebak secara massal.

## 9. UI Implementation Constraints

Jika UI dibangun dengan shadcn/ui:

- Jalankan `npx shadcn@latest info` saat project Next.js sudah ada untuk mengetahui framework, alias, Tailwind version, base, style, dan icon library.
- Gunakan komponen shadcn yang sudah ada sebelum membuat markup custom.
- Form memakai `FieldGroup` dan `Field`.
- Error memakai `Alert`.
- Loading memakai `Spinner` atau `Skeleton`.
- Status memakai `Badge`.
- Card memakai struktur lengkap `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, dan `CardFooter` bila relevan.
- Spacing memakai `gap-*`, bukan `space-x-*` atau `space-y-*`.
- Warna brand dari `design.md` dipetakan ke CSS variables dan semantic tokens, bukan raw Tailwind color di component.
- Icon dalam button memakai `data-icon`.
- Jika project memakai Radix, trigger custom memakai `asChild`; jika memakai Base, trigger custom memakai `render`.

## 10. Test Plan

- Nomor undangan valid menampilkan identitas tamu yang benar.
- Nomor undangan tidak ditemukan menampilkan error yang jelas.
- Tombol "Ya" menyimpan kehadiran dan menampilkan bukti hadir.
- Tombol "Tidak" tidak menyimpan kehadiran dan mengembalikan UI ke input awal.
- Check-in kedua untuk nomor yang sama menampilkan status sudah hadir tanpa record duplikat.
- Dua request check-in bersamaan untuk nomor yang sama tetap menghasilkan satu attendance record.
- Dashboard dengan token valid dapat memuat ringkasan kehadiran.
- Dashboard tanpa token valid tidak dapat melihat data.
- Dashboard menerima update realtime dalam beberapa detik setelah check-in berhasil.
- Jika realtime terputus, dashboard tetap dapat memuat ulang data summary.

## 11. Acceptance Criteria

- Sistem bisa melakukan check-in dari data JSON yang sudah diimpor.
- Attendance tersimpan di Supabase dan dapat diaudit.
- Resepsionis melihat daftar hadir dan popup tamu baru secara realtime.
- Tidak ada duplikasi attendance untuk nomor undangan yang sama.
- Akses dashboard tidak terbuka publik tanpa token rahasia.
- UI teknis siap mengikuti design system KLB dan aturan shadcn/ui.
