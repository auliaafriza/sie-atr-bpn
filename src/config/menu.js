import { Home, SupervisorAccount, Public } from "@material-ui/icons";
import {
  BiMoney,
  BiLineChart,
  BiBriefcase,
  BiBuildingHouse,
  BiBuildings,
} from "react-icons/bi";
import { FaCertificate, FaHandshake, FaCalendarCheck } from "react-icons/fa";
import { GrMoney, GrBarChart, GrLineChart, GrTableAdd } from "react-icons/gr";
import { RiHandCoinFill, RiServiceFill } from "react-icons/ri";
import {
  MdPeople,
  MdAddShoppingCart,
  MdTransform,
  MdSettingsRemote,
  MdInsertChart,
  MdLandscape,
} from "react-icons/md";
import { GiOrganigram, GiMoneyStack, GiEarthAsiaOceania } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { BsNewspaper, BsArchiveFill } from "react-icons/bs";
import { FcDebt } from "react-icons/fc";
import { IoMdMap } from "react-icons/io";

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
    parentLink: "/AssetKeuangan/",
    subMenus: [
      {
        icon: <GrMoney size={24} />,
        name: "PNBP",
        link: "/AssetKeuangan/PNBP",
      },
      {
        icon: <RiHandCoinFill size={24} />,
        name: "BPHTB",
        link: "/AssetKeuangan/BPHTB",
      },
    ],
  },
  {
    id: 2,
    icon: <SupervisorAccount />,
    name: "Kepegawaian",
    parentLink: "/Kepegawaian",
    // link: "/Kepegawaian/LandingPagePegawai",
    subMenus: [
      {
        icon: <GoGraph size={24} />,
        name: "Dashboard pegawai",
        link: "/Kepegawaian/DashboardKepegawaian",
      },
      {
        icon: <MdPeople size={24} />,
        name: "Statistik Pegawai",
        link: "/Kepegawaian/StatistikPegawai",
      },
      {
        icon: <MdPeople size={24} />,
        name: "Jumlah Pegawai per Golongan",
        link: "/Kepegawaian/JumlahPegawaperGolonganAtr",
      },
      {
        icon: <MdPeople size={24} />,
        name: "Jumlah Pegawai per Pendidikan",
        link: "/Kepegawaian/JumlahPegawaperPendidikanAtr",
      },
      {
        icon: <MdPeople size={24} />,
        name: "Jumlah Pegawai per Jabatan",
        link: "/Kepegawaian/JumlahPegawaperJabatanAtr",
      },
      {
        icon: <MdPeople size={24} />,
        name: "Jumlah Pegawai per Jenis Kelamin",
        link: "/Kepegawaian/JumlahPegawaperJenisKelaminAtr",
      },
      {
        icon: <MdPeople size={24} />,
        name: "Prediksi Pegawai Pensiun",
        link: "/Kepegawaian/PrediksiPegawaiAtrPensiun",
      },
      // {
      //   icon: <GiOrganigram size={24} />,
      //   name: "Organisasi",
      //   link: "/Kepegawaian/Organisasi",
      // },
    ],
  },
  {
    id: 3,
    icon: <FaHandshake size={24} />,
    name: "Mitra",
    parentLink: "/Mitra",
    subMenus: [
      {
        icon: <GrBarChart size={24} />,
        name: "Statistik Kemitraan",
        link: "/Mitra/StatistikKemitraan",
      },
    ],
  },
  {
    id: 4,
    icon: <BiLineChart size={24} />,
    name: "Kinerja Layanan",
    parentLink: "/KinerjaLayanan/",
    subMenus: [
      // {
      //   icon: <BsNewspaper size={22} />,
      //   name: "IKPA",
      //   link: null,
      // },
      // {
      //   icon: <GrLineChart size={24} />,
      //   name: "IKK/IKU",
      //   link: null,
      // },
      // {
      //   icon: <GrMoney size={24} />,
      //   name: "PNBP",
      //   link: "/KinerjaLayanan/PNBP",
      // },
      {
        icon: <BsArchiveFill size={24} />,
        name: "Penyelesaian Berkas",
        link: "/KinerjaLayanan/PenyelesaianBerkas",
      },
      {
        icon: <FcDebt size={24} />,
        name: "Tunggakan",
        link: "/KinerjaLayanan/Tunggakan",
      },
      // {
      //   icon: <RiServiceFill size={24} />,
      //   name: "Layanan Umum",
      //   link: "/KinerjaLayanan/LayananUmum",
      // },
    ],
  },
  {
    id: 5,
    icon: <BiBriefcase size={24} />,
    name: "PSN",
    parentLink: "/PSN",
    subMenus: [
      // {
      //   icon: <FaCalendarCheck size={22} />,
      //   name: "Percepatan Rencana Detail Tata Ruang (RDTR)",
      //   link: "/PSN/RDTR",
      // },
      // {
      //   icon: <GrTableAdd size={22} />,
      //   name: "Pendaftaran Tanah Sistematis Lengkap (PTSL)",
      //   link: "/PSN/PTSL",
      // },
      // {
      //   icon: <BiBuildingHouse size={24} />,
      //   name: "Reforma Agraria",
      //   link: "/PSN/RA",
      // },
      {
        icon: <MdAddShoppingCart size={24} />,
        name: "Pengadaan Tanah",
        link: "/PSN/PengadaanTanah",
      },
      {
        icon: <MdLandscape size={24} />,
        name: "Index Tanah",
        link: "/PSN/IndexTanah",
      },
      // {
      //   icon: <MdTransform size={24} />,
      //   name: "Transformasi Digital & Layanan Elektronik",
      //   link: null,
      // },
      // {
      //   icon: <MdSettingsRemote size={24} />,
      //   name: "Pengendalian dan Penanganan Sengketa",
      //   link: null,
      // },
    ],
  },
  {
    id: 6,
    icon: <FaCertificate size={24} />,
    name: "Sertifikasi",
    parentLink: "/Sertifikasi",
    subMenus: [
      {
        icon: <MdInsertChart size={24} />,
        name: "Statistik Sertipikat",
        link: "/Sertipikasi/StatistikSertipikat",
      },
      {
        icon: <MdInsertChart size={24} />,
        name: "Sertipikat Diagunkan",
        link: "/Sertipikasi/SertipikatDiagunkan",
      },
      {
        icon: <MdInsertChart size={24} />,
        name: "Jumlah Sertipikat dan Luas",
        link: "/Sertipikasi/JumlahSertipikasidanLuas",
      },
      {
        icon: <MdInsertChart size={24} />,
        name: "Jangka Waktu Hak Sertipikat",
        link: "/Sertipikasi/JangkaWaktuHakSertipikasi",
      },
      {
        icon: <MdInsertChart size={24} />,
        name: "Luas Bidang Berdasarkan Jenis Sertipikat ",
        link: "/Sertipikasi/LuasBidangSertipikasi",
      },
      {
        icon: <FaCertificate size={24} />,
        name: "Tanah Aset Pemerintah",
        link: "/Sertifikasi/TanahAssetPemerintah",
      },
      {
        icon: <BiBuildings size={24} />,
        name: "Hak Tanggungan Elektronik",
        link: "/Sertifikasi/HakTanggunganElektronik",
      },
      // {
      //   icon: <IoMdMap size={24} />,
      //   name: "Peta Pendaftaran Tanah",
      //   link: null,
      // },
    ],
  },
  // {
  //   id: 7,
  //   icon: <Public />,
  //   name: "Info Geo-spasial",

  //   parentLink: "null",
  //   subMenus: [
  //     {
  //       icon: <MdLandscape size={24} />,
  //       name: "Tanah Terlantar",
  //       link: null,
  //     },
  //     {
  //       icon: <GiMoneyStack size={24} />,
  //       name: "Nilai Tanah",
  //       link: null,
  //     },
  //     {
  //       icon: <GiEarthAsiaOceania size={24} />,
  //       name: "Peta Lainnya",
  //       link: null,
  //     },
  //   ],
  // },
];

// *****************************************************
// * seluruh link yang tidak ingin memiliki header ataupun
// * navbar silahkan masukkan ke dalam array
// *****************************************************
export const HIDE_HEADER = [
  "/Login",
  "/PrintData",
  "/embed/sie-pnbp-pagu-mp",
  "/embed/sie-pnbp-pagu-mp-ops-non",
  "/embed/sie-pengembalian-pnbp",
  "/embed/sie-peringkat-realisasi",
  "/embed/sie-pnbp-realisasi-anggaran",
  "/embed/sie-pnbp-alokasi-anggaran",
  "/embed/sie-pnbp-berkas-peringkat-wilayah",
  "/embed/sie-pnbp-berkas-peringkat",
  "/embed/sie-pnbp-berkas-wilayah",
  "/embed/sie-pnbp-kinerja-berkas",
  "/embed/sie-pnbp-persentase-realisasi-belanja",
  "/embed/sie-pnbp-realisasi-penerimaan",
  "/embed/sie-pnbp-realisasi-penggunaan",
  "/embed/sie-pnbp-realisasi-target-penerimaan",
  "/embed/sie-psn-ptsl-5peringkat",
  "/embed/sie-layanan-jumlah-perjenis",
  "/embed/bphtb-jumlah-berkas",
  "/embed/bphtb-jumlah-terintegrasi",
  "/embed/kepegawaian-atr-bpn-golongan",
  "/embed/kepegawaian-atr-bpn-jabatan",
  "/embed/kepegawaian-atr-bpn-JK",
  "/embed/kepegawaian-atr-bpn-mutasi",
  "/embed/kepegawaian-atr-bpn-pendidikan",
  "/embed/kepegawaian-atr-bpn-usia",
  "/embed/kepegawaian-organisasi",
  "/embed/sie-layanan-jumlah-perjenis",
  "/embed/sie-layanan-kebutuhan-kantor-pertanahan",
  "/embed/sie-psn-rdtr",
  "/embed/sie-psn-ptsl-5-peringkat",
  "/embed/sie-ptsl-realisasi-perkegiatan",
  "/embed/sie-statistik-kemitraan",
  "/embed/sie-psn-luas-pengadaaan-tanah",
  "/embed/sie-ht-ditutup-perkantor",
  "/embed/sie-ht-jumlah-kantor-tahun",
  "/embed/sie-ht-terbit-tanpa-periksa",
  "/embed/sie-ht-upload-ppat-ip-sama",
  "/embed/sie-sertifikasi-aset-pemerintah",
  "/embed/sie-reforma-agria",
  "/embed/sie-sertifikasi-tahun",
  "/embed/sie-sertifikasi-target-realisasi",
  "/embed/sie-sertifikasi-jangka-waktu-hak",
  "/embed/sie-sertifikasi-konsolidasi-kota",
  "/embed/sie-sertifikasi-luas-jumlah",
  "/embed/sie-tunggakan",
  "/embed/sie-index-tanah",
  "/embed/sie-tunggakan-wilayah",
  "/embed/sie-psn-nilai-bphtb",
  "/embed/sie-psn-nilai-pnbp",
  "/embed/sie-psn-nilai-ht",
  "/embed/sie-psn-nilai-jual-beli",
  "/embed/sie-psn-nilai-tanah-perkantah",
  "/embed/sie-dashboard-pegawai",
  "/embed/sie-statistik-pegawai",
];

// *****************************************************
// * seluruh link yang tidak ingin memiliki footer silahkan
// * masukkan ke dalam array
// *****************************************************
export const HIDE_FOOTER = [
  "/Login",
  "/PrintData",
  "/embed/sie-pnbp-pagu-mp",
  "/embed/sie-pnbp-pagu-mp-ops-non",
  "/embed/sie-pengembalian-pnbp",
  "/embed/sie-peringkat-realisasi",
  "/embed/sie-pnbp-realisasi-anggaran",
  "/embed/sie-pnbp-alokasi-anggaran",
  "/embed/sie-pnbp-berkas-peringkat-wilayah",
  "/embed/sie-pnbp-berkas-peringkat",
  "/embed/sie-pnbp-berkas-wilayah",
  "/embed/sie-pnbp-kinerja-berkas",
  "/embed/sie-pnbp-persentase-realisasi-belanja",
  "/embed/sie-pnbp-realisasi-penerimaan",
  "/embed/sie-pnbp-realisasi-penggunaan",
  "/embed/sie-pnbp-realisasi-target-penerimaan",
  "/embed/sie-psn-ptsl-5peringkat",
  "/embed/sie-layanan-jumlah-perjenis",
  "/embed/bphtb-jumlah-berkas",
  "/embed/bphtb-jumlah-terintegrasi",
  "/embed/kepegawaian-atr-bpn-golongan",
  "/embed/kepegawaian-atr-bpn-jabatan",
  "/embed/kepegawaian-atr-bpn-JK",
  "/embed/kepegawaian-atr-bpn-mutasi",
  "/embed/kepegawaian-atr-bpn-pendidikan",
  "/embed/kepegawaian-atr-bpn-usia",
  "/embed/kepegawaian-organisasi",
  "/embed/sie-layanan-jumlah-perjenis",
  "/embed/sie-layanan-kebutuhan-kantor-pertanahan",
  "/embed/sie-psn-rdtr",
  "/embed/sie-psn-ptsl-5-peringkat",
  "/embed/sie-ptsl-realisasi-perkegiatan",
  "/embed/sie-statistik-kemitraan",
  "/embed/sie-psn-luas-pengadaaan-tanah",
  "/embed/sie-ht-ditutup-perkantor",
  "/embed/sie-ht-jumlah-kantor-tahun",
  "/embed/sie-ht-terbit-tanpa-periksa",
  "/embed/sie-ht-upload-ppat-ip-sama",
  "/embed/sie-sertifikasi-aset-pemerintah",
  "/embed/sie-reforma-agria",
  "/embed/sie-sertifikasi-tahun",
  "/embed/sie-sertifikasi-target-realisasi",
  "/embed/sie-sertifikasi-jangka-waktu-hak",
  "/embed/sie-sertifikasi-konsolidasi-kota",
  "/embed/sie-sertifikasi-luas-jumlah",
  "/embed/sie-tunggakan",
  "/embed/sie-index-tanah",
  "/embed/sie-tunggakan-wilayah",
  "/embed/sie-psn-nilai-bphtb",
  "/embed/sie-psn-nilai-pnbp",
  "/embed/sie-psn-nilai-ht",
  "/embed/sie-psn-nilai-jual-beli",
  "/embed/sie-psn-nilai-tanah-perkantah",
  "/embed/sie-dashboard-pegawai",
  "/embed/sie-statistik-pegawai",
];
