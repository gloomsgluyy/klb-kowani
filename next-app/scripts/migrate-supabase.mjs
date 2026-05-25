import pg from "pg"

const { Pool } = pg

const seedGuests = [
  ["A-001", "Dr. Apt. Salmah Orbaniyah, MKes", "AISYIYAH", "Delegasi"],
  ["A-002", "Tri Yulianti Setyasari, S.Sn", "WANITA TAMAN SISWA", "Delegasi"],
  ["A-003", "Elly Kusumawati Handoko", "WANITA KATHOLIK REPUBLIK INDONESIA", "Delegasi"],
  ["A-004", "Hj. Wien Yoyo S", "PASUNDAN ISTERI", "Delegasi"],
  ["A-005", "Prof. Dewi Indriani Yusuf", "PERWARI", "Delegasi"],
  ["A-006", "Pdt. Detty BT Liow Mambo, STh", "PERSATUAN WANITA KRISTEN INDONESIA", "Delegasi"],
  ["A-007", "Ir. R. Ay . Endang W. Rama Boedi, MSc", "PUTRI NARPO WANDOWO", "Delegasi"],
  ["A-008", "Dra. Damayanti Soetjahjo", "BUDI ISTERI", "Delegasi"],
  ["A-010", "Novia H Lambey SS", "PIKAT", "Delegasi"],
  ["A-011", "Hj. Rosa Muhammad Bsc, S.Pd", "PERWANAS", "Delegasi"],
  ["A-012", "Tati Subandi", "PWK-UGM", "Delegasi"],
  ["A-013", "Dr. Ade Jubaedah , S.Keb.Bdn,MM.MKM", "IKATAN BIDAN INDONESIA", "Delegasi"],
  ["A-016", "Femmy Pangkerego S.E. M.Pd", "WANITA SAHATI", "Delegasi"],
  ["A-017", "Prof.Dr. Hj. Valina Singka Subekti, M.Si", "WANITA SYARIKAT ISLAM", "Delegasi"],
  ["A-018", "Murbawi Siwi, SKM", "RUKUN WANITA INDONESIA", "Delegasi"],
  ["A-019", "Arifatul Choiri Fauzi", "MUSLIMAT NU", "Delegasi"],
  ["A-020", "Titi Suwarso", "PERSATUAN ISTERI TEKNISI INDONESIA", "Delegasi"],
  ["A-021", "DR Ir. Giwo Rubianto Wiyogo", "GERAKAN WANITA SEJAHTERA (GWS)", "Delegasi"],
  ["A-022", "Dr. Ir. Retno Sri Endah Lestari, MSc.PhD", "IKATAN SARJANA WANITA INDONESIA (ISWI)", "Delegasi"],
  ["A-028", "", "IKATAN KELUARGA WARTAWAN INDONESIA (IKWI)", "Delegasi"],
  ["A-031", "Usanti Sindia A. Permana", "IKATAN ISTERI DOKTER INDONESIA (IIDI)", "Delegasi"],
  ["A-032", "Santi Diansari Hargianto, S.H, M.H", "WANITA PERSAHI", "Delegasi"],
  ["A-034", "Dra.Hj. Marfuah Musthofa,M.Pd", "WANITA ISLAM", "Delegasi"],
  ["A-035", "Sri Meisista", "KORPS HMI - WATI (KOHATI)", "Delegasi"],
  ["A-037", "Lina Indiarti Wresniwiro, SE.MM", "PIVERI", "Delegasi"],
  ["A-041", "Endah Ade Supandi", "PERIP", "Delegasi"],
  ["A-044", "Ernawati Fauzi", "WANITA KOSGORO", "Delegasi"],
  ["A-045", "Hj. Ening Thalhah", "WANITA SATYAPRAJA", "Delegasi"],
  ["A-046", "Siti Amelia Jorjiana, S.SN.MH", "WANITA MKGR", "Delegasi"],
  ["A-047", "Dr. Rahayu Setya Wardani, SH.MH", "KERTAWREDATAMA", "Delegasi"],
  ["A-048", "Ir. Dyah Anita Prihapsari, MA", "IWAPI", "Delegasi"],
  ["A-049", "Dra. Asdirwati Ali MM", "PERWATI WANITA PERTI", "Delegasi"],
  ["A-050", "Ir. Anggraini Purnami", "PERSATUAN ISTERI INSINYUR INDONESIA (PIII)", "Delegasi"],
  ["A-052", "Hj. Netty Marliza Komarudin, S.H", "WANITA SWADIRI", "Delegasi"],
  ["A-054", "Ir. Dany Soedarsono", "HIMPUNAN WANITA KARYA (HWK)", "Delegasi"],
  ["A-055", "Brigjen TNI", "DEPWAN PEPABRI", "Delegasi"],
  ["A-056", "Ny. Venessa Supit", "KARTINI AMPI", "Delegasi"],
  ["A-057", "Prof. Dr. Unifah Rosyidi, M.Pd", "WANITA PGRI", "Delegasi"],
  ["A-058", "Dra. Anita Ariyani", "WANITA TANI INDONESIA HKTI", "Delegasi"],
  ["A-059", "Ny. Dr. Ir. Hetifah Sjaifudian, MPP", "AL-HIDAYAH", "Delegasi"],
  ["A-060", "Ny. Lucy Salim", "WANITA BUDDHIS INDONESIA", "Delegasi"],
  ["A-061", "Dwie Riawenny Nasution", "WANITA FKPPI", "Delegasi"],
  ["A-062", "Ny. Yuliarti  R Merati", "IKAI", "Delegasi"],
  ["A-064", "Hj. Margaret Aliyatul Maimunah, SS.,MSi", "FATAYAT NU", "Delegasi"],
  ["A-065", "Ny. Pia Feriasti Megananda, BA", "WIRAWATI CATUR PANCA", "Delegasi"],
  ["A-066", "Ny. Lana Trilli Naire Akademi", "WANITA SHUFIAH", "Delegasi"],
  ["A-067", "Dra. Diah A. Hadi Daryanto", "PERWITA WANA KENCANA", "Delegasi"],
  ["A-069", "Wulan AS Sari", "KOPPRI", "Delegasi"],
  ["A-070", "Prof. Dr. Zahrotun Nihayah, M.Psi", "GUPPI", "Delegasi"],
  ["A-071", "Drh. Tri Isyani Tunggadewi, MSc", "PIDHI MVI", "Delegasi"],
  ["A-072", "Dr. dr. Hj. Ulla Nuchwaty, MM", "WANITA PEMBANGUNAN INDONESIA (WPI)", "Delegasi"],
  ["A-073", "Ny. Dr, Hj. Hediati Erry", "DPP WPPKBI", "Delegasi"],
  ["A-074", "Ny. Dr. Hj. Marlinda Irwanti Poernomo, SE,M.Si", "KORPS WANITA MDI", "Delegasi"],
  ["A-075", "Dr. Ir. Anita Dewi Anggraini Kolopaking,SH.MH.FCBAr b", "YATNAWATI KERTINI", "Delegasi"],
  ["A-076", "Hj. Fifi Firman Gani", "DIAN KEMALA", "Delegasi"],
  ["A-077", "Reny Anggrayni", "PERSAUDARAAN MUSLIMAH (SALIMAH)", "Delegasi"],
  ["A-078", "Wikanti Yogi, S.Ag, MS", "WANITA HINDU DHARMA INDONESIA (WHDI)", "Delegasi"],
  ["A-079", "Retno Multriarti", "IKABOGA", "Delegasi"],
  ["A-080", "Dr Evita Nursanty MSc", "WANITA KBPPP POLRI", "Delegasi"],
  ["A-081", "Ariati Dina Puspitasari", "NASYIATUL AISYIYAH", "Delegasi"],
  ["A-082", "Ny. Dr. Hj. Marlinda Irwanti Poernomo, SE,M.Si", "FORUM PEMBERDAYAAN PEREMPUAN INDONESIA (FPPI)", "Delegasi"],
  ["A-083", "Herliani, M.Ag", "WANITA PUI", "Delegasi"],
  ["A-084", "Ir. Rahayu Murdjaningsih", "IISPI", "Delegasi"],
  ["A-085", "Revita Alvi", "HIMPUNAN WANITA DISABILITAS INDONESIA (HWDI)", "Delegasi"],
  ["A-086", "Free Heart", "PERSATUAN WANITA PENULIS INDONESIA", "Delegasi"],
  ["A-087", "M.M Sri Sumaryanti Budhisantoso", "PEREMPUAN MANDIRI REPUBLIK INDONESIA (PMRI)", "Delegasi"],
  ["A-088", "Hj. Sarimaya, SE.MSi", "SRIKANDI PEMUDA PANCASILA", "Delegasi"],
  ["A-089", "E.K. Dewi Batubara, ST.M.Sos", "PERGERAKAN SARINAH", "Delegasi"],
  ["A-090", "Hj. Ingrid Kansil S.Sos", "IKATAN PENGUSAHA MUSLIMAH INDONESIA (IPEMI)", "Delegasi"],
  ["A-091", "Hj. Andi Nurhiyari Jamaro Dulung, M.Si", "IKATAN WANITA SULAWESI SELATAN (IWSS)", "Delegasi"],
  ["A-092", "Prof. Dr.Hj. Elza Syarief,SH.MH", "PERKUMPULAN PEREMPUAN WIRAUSAHA INDONESIA (PERWIRA)", "Delegasi"],
  ["A-093", "Ratieh Sanggarwati, S.E", "KOMUNITAS IBU CERDAS INDONESIA (KICI)", "Delegasi"],
  ["A-094", "Dra.Hj. Indah Suryadharma Ali,MBA", "PPLIPI", "Delegasi"],
  ["A-095", "Dra. Hj. Nurliati Ahmad, MA", "MUSLIMAT AL WASHLIYAH", "Delegasi"],
  ["A-096", "Hj. Trisna Ningsih Yuliati,SE", "MUSLIMAT MATHLA'UL ANWAR", "Delegasi"],
  ["A-097", "bu Taty Toisuta-Leimena", "PERSATUAN WANITA MALUKU INDONESIA (PERWAMA INA)", "Delegasi"],
  ["A-098", "Hj. Rini Sujiyanti,SE.,MM", "PERSATUAN SRIKANDI KREATIF INDONESIA (PERSIKINDO)", "Delegasi"],
  ["A-099", "Veve Safitri", "PEREMPUAN PEMIMPIN INDONESIA (PERPINA)", "Delegasi"],
  ["A-100", "Linda Astuty, ST, MM", "PERKUMPULAN KONTRAKTOR PERTIWI INDONESIA (PERKOPIN)", "Delegasi"],
  ["A-101", "dr. Rosaline Irene Rumaseuw, M.Kes", "CENDEKIAWAN PEREMPUAN PAPUA (CPP)", "Delegasi"],
  ["A-102", "Hj. Ernawati Budin, B.BA", "FORUM KOMUNIKASI IBU-IBU SUMATERA BAGIAN SELATAN (FKIISBS)", "Delegasi"],
  ["A-103", "Dra. Hj. Saihun Aldjufrie, M.Pd.I", "WANITA ISLAM ALKHAIRAT", "Delegasi"],
  ["A-104", "Lana T. Kuntjoro", "PEREMPUAN INDONESIA MAJU (PIM)", "Delegasi"],
  ["A-105", "Ir. Diah Indrajati, MSc", "PEREMPUAN PENSIUNAN INDONESIA (PERPENI)", "Delegasi"],
  ["A-106", "Artika Kristanti", "JALASTORIA", "Delegasi"],
  ["A-107", "Prof.Dr.Hj. Sylviana Murni, SH.MSi", "MAJELIS ILMUWAN MUSLIMAH INDONESIA (MAI)", "Delegasi"],
  ["A-108", "Prof.Dr. Hj. Siti Nur Azizah, SH.M.Hum", "PERHIMPUNAN SAUDAGAR MUSLIMAH INDONESIA (PERSAMI)", "Delegasi"],
  ["A-109", "Hj. Melani Leimena Suharli, S.Sos.MM", "PERKUMPULAN WANITA PEJUANG '45", "Delegasi"],
  ["A-110", "IJP", "Paguyuban Keluarga Besar Purnawirawan Polisi Wanita (PKB PPRI-PP POLRI", "Delegasi"],
  ["A-111", "Hastuti Sari Sukapti , SH BrigadirJenderal TNI", "PERSATUAN PURNAWIRAWAN KORPS WANITA ANGKATAN DARAT (PP KOWAD)", "Delegasi"],
]

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function migrate() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required")
  }

  const client = await pool.connect()

  try {
    await client.query("begin")
    await client.query("create extension if not exists pgcrypto")
    await client.query(`
      create table if not exists guests (
        id uuid primary key default gen_random_uuid(),
        invitation_number text not null unique,
        full_name text not null,
        organization text not null,
        role text,
        phone text,
        notes text,
        attendance_status text not null default 'not_checked_in'
          check (attendance_status in ('not_checked_in', 'checked_in')),
        checked_in_at timestamptz,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now(),
        check (
          attendance_status = 'not_checked_in'
          or checked_in_at is not null
        )
      )
    `)

    await client.query(`
      create table if not exists attendance_records (
        id uuid primary key default gen_random_uuid(),
        guest_id uuid not null references guests(id) on delete cascade,
        invitation_number_snapshot text not null,
        full_name_snapshot text not null,
        organization_snapshot text not null,
        checked_in_at timestamptz not null,
        checkin_source text not null default 'guest_self_checkin',
        created_at timestamptz not null default now(),
        unique (guest_id)
      )
    `)

    await client.query(`
      create index if not exists guests_attendance_status_idx
      on guests (attendance_status)
    `)

    await client.query(`
      create index if not exists guests_checked_in_at_idx
      on guests (checked_in_at desc)
    `)

    // Purge any deleted organizations from the database
    const activeInvitationNumbers = seedGuests.map(g => g[0])
    await client.query(
      `delete from guests where not (invitation_number = any($1))`,
      [activeInvitationNumbers]
    )

    for (const [invitationNumber, fullName, organization, role] of seedGuests) {
      await client.query(
        `
          insert into guests (
            invitation_number,
            full_name,
            organization,
            role
          )
          values ($1, $2, $3, $4)
          on conflict (invitation_number) do update
          set
            full_name = excluded.full_name,
            organization = excluded.organization,
            role = excluded.role,
            updated_at = now()
        `,
        [invitationNumber, fullName, organization, role]
      )
    }

    await client.query("commit")
  } catch (error) {
    await client.query("rollback")
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
  .then(() => {
    console.log("Supabase schema and seed data are ready.")
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
