export function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

export const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
