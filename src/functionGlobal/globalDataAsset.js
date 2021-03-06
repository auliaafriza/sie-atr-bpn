import axios from "axios";
import { url } from "../api/apiClient";

export const generateArrayOfYears = () => {
  let max = new Date().getFullYear();
  let minYears = max - 10;
  let years = [];
  for (let i = minYears; i <= max; i++) {
    let temp = { id: i.toString(), value: i };
    years.push(temp);
  }
  for (let j = 1; j <= 10; j++) {
    let tahun = max + j;
    years.push({ id: tahun.toString(), value: tahun });
  }
  return years;
};

export const generateArrayOfYearsV2 = () => {
  let max = new Date().getFullYear();
  let minYears = max - 10;
  let years = [];
  for (let i = minYears; i <= max; i++) {
    let temp = { label: i.toString(), name: i };
    years.push(temp);
  }
  for (let j = 1; j <= 10; j++) {
    let tahun = max + j;
    years.push({ label: tahun.toString(), name: tahun });
  }
  return years;
};

let temp = generateArrayOfYears();
export const tahunData = temp;
export const tahunDataV2 = generateArrayOfYearsV2();

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

export const DataFormater = (number) => {
  if (number > 1000000000000000000) {
    return (number / 1000000000000000000).toString() + "Qi";
  } else if (number > 1000000000000000) {
    return (number / 1000000000000000).toString() + "Quar";
  } else if (number > 1000000000000) {
    return (number / 1000000000000).toString() + "T";
  } else if (number > 1000000000) {
    return (number / 1000000000).toString() + "M";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "Jt";
  } else if (number > 1000) {
    return (number / 1000).toString() + "Rb";
  } else {
    return number.toString();
  }
};

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const deleteDuplicates = (data, key) => {
  const duplicateIds = data
    .map((e) => e[key])
    .map((e, i, final) => final.indexOf(e) !== i && i)
    .filter((obj) => data[obj])
    .map((e) => data[e][key]);
  let result = [];
  console.log("res", duplicateIds);
  data.map((item, index) =>
    item[key] == duplicateIds[0] ? null : result.push(item)
  );
  return result;
};
