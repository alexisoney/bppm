export function createNumber(index) {
  return index < 9 ? `0${index + 1}` : index + 1;
}
