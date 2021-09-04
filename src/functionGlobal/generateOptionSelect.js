export const generateOptions = ({ data, keyId, keyVal = "value", keyName }) => {
  return data
    ? data.map((e, i) => ({
        id: keyId ? e[keyId] : e[keyVal],
        value: e[keyVal],
        name: keyName ? e[keyName] : e[keyVal],
      }))
    : [];
};
