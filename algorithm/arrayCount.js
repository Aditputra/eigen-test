function arrayCount(input, query) {
  let map = [];
  if (input.length && query.length) {
    map = Object.values(
      query.reduce((a, b) => {
        a[b] = input.filter((c) => b === c).length;
        return a;
      }, {})
    );
  }

  return map;
}
const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];
console.log(arrayCount(input, query));
