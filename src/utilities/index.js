
// Until we fully deprecate 0s for floors and other numbers for walls, we'll need these intermediate helpers.
export const getCellType = (cell) => {
  if (typeof cell === 'number') {
    return cell === 0 ? 'floor' : 'wall';
  }
  if (typeof cell === 'object' && cell != null) {
    return cell.type;
  }
  throw new Error('Cell type invalid.');
}