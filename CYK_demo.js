/*
  S -> AB | BC
  A -> BA | a
  B -> CC | b
  C -> AB | a
*/
const rules = [
  { left: "S", right: ["AB", "BC"] },
  { left: "A", right: ["BA", "a"] },
  { left: "B", right: ["CC", "b"] },
  { left: "C", right: ["AB", "a"] }
];

const input = "bbabaa";
// const input = "bb";

let table;
/*
[
  [ [],[],[],[],[],[], [] ],
  [ [],[],[],[],[], [] ],
  [ [],[],[],[], [] ],
  [ [],[],[], [] ],
  [ [],[], [] ],
  [ [], [] ],
];
*/
const n = input.length;

function initializeTable() {
  table = new Array(n);
  for (let i = 0; i < n; i++) {
    table[i] = new Array(n - i + 1).fill(true).map(() => new Set());
  }
}


function printTable() {
  console.log('printTable: ');
  table.forEach(row => {
    let rowStr = '[ ';
    row.forEach(rSet => {
      rowStr += '[ '
      rSet.forEach(c => rowStr += (c + ','))
      rowStr += ' ], ';
    });
    rowStr += ' ],';
    console.log(rowStr);
  });
}

initializeTable();
for (let len = 1; len <= n; len++) {
  for (let idx = 0; idx + len <= n; idx++) {
    isDrive(idx, len);
  }
}
printTable();

if (table[0][n].has(rules[0].left)) {
  console.log("parse success")
  return true;
} else {
  console.log("parse fail")
  return false;
}

function isDrive(idx, len) {
  const substr = input.substring(idx, idx + len);
  
  if (len === 1) {
    rules.forEach(rule => {
      if (rule.right.includes(substr)) {
        table[idx][len].add(rule.left);
      }
    });
  } else {
    for (let leftLen = 1; leftLen < len; leftLen++) {
      const left = table[idx][leftLen];
      const right = table[idx + leftLen][len - leftLen];
      left.forEach(leftItem => {
        right.forEach(rightItem => {
          rules.forEach(rule => {
            if (rule.right.includes(leftItem + rightItem)) {
              table[idx][len].add(rule.left);
            }
          });
        })
      })
    }
  }
}
