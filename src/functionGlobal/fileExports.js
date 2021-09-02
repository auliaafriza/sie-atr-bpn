export const dataTable = {
  name: "",
  selector: "",
  sortable: false,
  key: "",
  format: "",
  label: "",
};

export const elipsisString = (keyword, length) => {
  let str = keyword;
  if (typeof keyword == "string" && keyword.length > length) {
    str = keyword.slice(0, length) + "...";
  }
  return str;
};

export const loadDataColumnTable = (header) => {
  let columns = [];
  header && header.length != 0
    ? header.forEach((temp) => {
        let tempDataTable = { ...dataTable };
        tempDataTable.name = temp.label;
        tempDataTable.selector = temp.value;
        tempDataTable.key = temp.value;
        tempDataTable.minWidth = "200px";
        tempDataTable.format = (row) => elipsisString(row[temp.value], 25);
        columns.push(tempDataTable);
      })
    : null;
  return columns;
};
