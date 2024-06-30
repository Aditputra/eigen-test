function maxEl(str) {
  const splitStr = str.split(" ");
  return splitStr.reduce((a, b) => (a.length >= b.length ? a : b));
}
const str = "Saya sangat senang mengerjakan soal algoritma";
console.log(maxEl(str));
