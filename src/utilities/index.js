
// Until we fully deprecate 0s for floors and other numbers for walls, we'll need these intermediate helpers.
export const getCellType = (cell) => {
  return cell.type;
}

export const clamp = (number, min, max) => Math.max(min, Math.min(number, max));
