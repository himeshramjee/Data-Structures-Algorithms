import { HighlightSpanKind } from "typescript";

const inputString = "abcdef";

const alpharray1: Array<string> = new Array<string>();
const alpharray2: Array<string> = new Array<string>();

inputString.split('').map(c => {
  alpharray1.push(c);
  alpharray2.unshift(c);
});

console.log(alpharray1);
console.log("and now with unshift...\n")
console.log(alpharray2);

const numArray1: number[] = [];
numArray1.push(1);
numArray1.push(2);
numArray1.push(3);
console.log(`${numArray1} or [${numArray1[0]}, ${numArray1[1]}, ${numArray1[2]}]`);
class MyArrayClass1 {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
let mac1: MyArrayClass1 = new MyArrayClass1(111, "my array 111");
let mac2: MyArrayClass1 = new MyArrayClass1(222, "my array 222");
let mac3: MyArrayClass1 = new MyArrayClass1(333, "my array 333");
let macs: Array<MyArrayClass1> = new Array<MyArrayClass1>();
macs.push(mac1);
macs.push(mac2);
macs.push(mac3);
for (let i = 0; i < 3; i++) {
  console.log(`mac1: ${macs[0].id}, mac2: ${macs[1].id}, mac3: ${macs[2].id}`);
}