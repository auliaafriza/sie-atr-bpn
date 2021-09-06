import { Home, SupervisorAccount, Public } from "@material-ui/icons";
import { BiMoney, BiLineChart, BiBriefcase } from "react-icons/bi";
import { FaCertificate, FaHandshake } from "react-icons/fa";

// *****************************************************************************
// * silahkan ubah attribute link sesuai dengan yang ada initial pada file app.js
// * dan isi juga parent link. contoh dapat dilihat pada menu sertifikasi
// *****************************************************************************
// * Jika ingin menambahkan menu tanpa subMenu silahkan tambahkan object dibawah
// * !!!!!! CATATAN ID HARUS URUT !!!!!!
// *  {
//      id: 0, // harus berurutan
// *    icon: <Home />,
// *    name: "Dashboard",
// *    link: "/Dashboard", //default null
// *  },
// ******************************************************************************
// * Jika ingin menambahkan menu dengan subMenu silahkan tambahkan object dibawah
// * !!!!!! CATATAN ID HARUS URUT !!!!!!
// *  {
// *  	id: 0,  // harus berurutan
// *  	icon: <Home />, //default null
// *  	name: "Dashboard",
// *  	subMenus: [
// *  		{
// *  			icon: <Home />, //default null
// *  			name: "Sub Dashboard",
// *  			link: '/Dashboard', // default null
// *  		},
// *  	],
// *  },
// *****************************************************************************
export const MENU_LIST = [
  {
    id: 0,
    icon: <Home />,
    name: "Dashboard",
    link: "/Dashboard",
    parentLink: "/Dashboard",
  },
  {
    id: 1,
    icon: <BiMoney size={24} />,
    name: "Aset & Keuangan",
    parentLink: "null",
    subMenus: [
      {
        icon: null,
        name: "PNBP",
        link: null,
      },
      {
        icon: null,
        name: "BPHTB",
        link: null,
      },
    ],
  },
  {
    id: 2,
    icon: <SupervisorAccount />,
    name: "Kepegawaian",

    parentLink: "null",
    subMenus: [
      {
        icon: null,
        name: "Pegawai ATR/BPN",
        link: null,
      },
      {
        icon: null,
        name: "Organisasi",
        link: null,
      },
    ],
  },
  {
    id: 3,
    icon: <FaHandshake size={24} />,
    name: "Mitra",

    parentLink: "null",
    subMenus: [
      {
        icon: null,
        name: "Statistik Kemitraan",
        link: null,
      },
    ],
  },
  {
    id: 4,
    icon: <BiLineChart size={24} />,
    name: "Kinerja Layanan",
    parentLink: "KinerjaLayanan",
    subMenus: [
      {
        icon: null,
        name: "IKPA",
        link: null,
      },
      {
        icon: null,
        name: "IKK/IKU",
        link: null,
      },
      {
        icon: null,
        name: "Tunggakan",
        link: null,
      },
      {
        icon: null,
        name: "Layanan Umum",
        link: "/KinerjaLayanan/LayananUmum",
      },
    ],
  },
  {
    id: 5,
    icon: <BiBriefcase size={24} />,
    name: "PSN",
    parentLink: "PSN",
    subMenus: [
      {
        icon: null,
        name: "Percepatan Rencana Detail Tata Ruang",
        link: null,
      },
      {
        icon: null,
        name: "Pendaftaran Tanah Sistematis Lengkap",
        link: "/PSN/PTSL",
      },
      {
        icon: null,
        name: "Reforma Agraria",
        link: null,
      },
      {
        icon: null,
        name: "Pengadaan Tanah",
        link: "/PSN/PengadaanTanah",
      },
      {
        icon: null,
        name: "Transformasi Digital & Layanan Elektronik",
        link: null,
      },
      {
        icon: null,
        name: "Pengendalian dan Penanganan Sengketa",
        link: null,
      },
    ],
  },
  {
    id: 6,
    icon: <FaCertificate size={24} />,
    name: "Sertifikasi",
    parentLink: "Sertifikasi",
    subMenus: [
      {
        icon: null,
        name: "Statistik Sertifikat",
        link: "/Sertifikasi/StatistikSertifikat",
      },
      {
        icon: null,
        name: "Tanah Aset Pemerintah",
        link: null,
      },
      {
        icon: null,
        name: "Hak Tanggungan Elektronik",
        link: "/Sertifikasi/HakTanggunganElektronik",
      },
      {
        icon: null,
        name: "Peta Pendaftaran Tanah",
        link: null,
      },
    ],
  },
  {
    id: 7,
    icon: <Public />,
    name: "Info Geo-spasial",

    parentLink: "null",
    subMenus: [
      {
        icon: null,
        name: "Tanah Terlantar",
        link: null,
      },
      {
        icon: null,
        name: "Nilai Tanah",
        link: null,
      },
      {
        icon: null,
        name: "Peta Lainnya",
        link: null,
      },
    ],
  },
];

// *****************************************************
// * seluruh link yang tidak ingin memiliki header ataupun
// * navbar silahkan masukkan ke dalam array
// *****************************************************
export const HIDE_HEADER = [
  "/",
  "/Login",
  "/PrintData",
  "/embed/sie-pnbp-pagu-mp",
  "/embed/sie-pnbp-realisasi-anggaran",
  "/embed/sie-psn-ptsl-5peringkat",
  "/embed/sie-layanan-jumlah-perjenis",
];

// *****************************************************
// * seluruh link yang tidak ingin memiliki footer silahkan
// * masukkan ke dalam array
// *****************************************************
export const HIDE_FOOTER = [
  "/",
  "/Login",
  "/PrintData",
  "/embed/sie-pnbp-pagu-mp",
  "/embed/sie-pnbp-realisasi-anggaran",
  "/embed/sie-psn-ptsl-5peringkat",
  "/embed/sie-layanan-jumlah-perjenis",
];
