function reverseString(str) {
  const str1 = str.substring(0, str.length - 1);
  const str2 = str.substring(str.length - 1);
  return str1.split("").reverse().join("") + str2;
}
const str = "EIGEN1";
console.log(reverseString(str));
