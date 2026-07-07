let counter = 1000;
export const nextId = (prefix = "ID") => {
  counter += 1;
  return `${prefix}-${counter}`;
};
