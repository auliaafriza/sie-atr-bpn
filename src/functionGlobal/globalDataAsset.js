export const generateArrayOfYears = () => {
  let max = new Date().getFullYear();
  let minYears = max - 5;
  let years = [];
  for (let i = minYears; i <= max; i++) {
    let temp = { id: i.toString(), value: i };
    years.push(temp);
  }
  for (let j = 1; j <= 5; j++) {
    let tahun = max + j;
    years.push({ id: tahun.toString(), value: tahun });
  }
  return years;
};

let temp = generateArrayOfYears();
export const tahunData = temp;

export const bulanDataNumberic = [
  { id: "01", value: "01", name: "Januari" },
  { id: "02", value: "02", name: "Febuari" },
  { id: "03", value: "03", name: "Maret" },
  { id: "04", value: "04", name: "April" },
  { id: "05", value: "05", name: "Mei" },
  { id: "06", value: "06", name: "Juni" },
  { id: "07", value: "07", name: "Juli" },
  { id: "08", value: "08", name: "Agustus" },
  { id: "09", value: "09", name: "September" },
  { id: "10", value: "10", name: "Oktober" },
  { id: "11", value: "11", name: "November" },
  { id: "12", value: "12", name: "Desember" },
];

export const bulanData = [
  { id: "Jan", value: "Jan", name: "Januari" },
  { id: "Feb", value: "Feb", name: "Febuari" },
  { id: "Mar", value: "Mar", name: "Maret" },
  { id: "Apr", value: "Apr", name: "April" },
  { id: "Mei", value: "Mei", name: "Mei" },
  { id: "Jun", value: "Jun", name: "Juni" },
  { id: "Jul", value: "Jul", name: "Juli" },
  { id: "Agu", value: "Agu", name: "Agustus" },
  { id: "Sep", value: "Sep", name: "September" },
  { id: "Okt", value: "Okt", name: "Oktober" },
  { id: "Nov", value: "Nov", name: "November" },
  { id: "Des", value: "Des", name: "Desember" },
];

export const semesterData = [
  { id: 1, value: 1, name: "Semester 1" },
  { id: 2, value: 2, name: "Semester 2" },
];

export const tipeData = [
  { id: "OPS", value: "OPS", name: "OPS" },
  { id: "NONOPS", value: "NONOPS", name: "NON OPS" },
];
