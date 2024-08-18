// User.find({ age: { $gt: 40 } });

const user = [
  {
    name: "abc1",
    age: 23,
  },
  {
    name: "abc2",
    age: 25,
  },
  {
    name: "abc3",
    age: 25,
  },
];

// [23, 25]

// function solve() {
//   let result = [];

//   for (let item of user) {
//     if (!result.includes(item.age)) {
//       result.push(item.age);
//     }
//   }

//   return result;
// }

console.log(solve(user));

function solve(user) {
  let uniqueAges = new Set(user.map((item) => item.age));
  return [...uniqueAges];
}
