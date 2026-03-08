1. What is the difference between var, let, and const?
Answer: var,let and const are all used to declare variables in javascript but they act differently.
var is the old way of declaring variable and it can be re-declared and updated and it is function scoped.
let is the newer version.It can be updated but can not be re-declared in the same scope and it is block-scoped.
const is used for values that should not be changed and we cant reassign it after declaring it and it is block-scoped .

2. What is the spread operator (...)?
Answer: The spread operator is used to expand  elements of an array or object.For example-

let arr1=[10,20,30];
let arr2=[...arr1,90,100];
now arr2 will become =[10,20,30,90,100]


3. What is the difference between map(), filter(), and forEach()?
Answer:
map() runs a function for every element in the array and returns a new array with the modified values.
filter() runs a function for every element in the array and returns a new array with only the elements that match a condition.
forEach() runs a function for every element in the array but doesnt return a new array.

4. What is an arrow function?
Answer:An arrow function is a shorter way to write  functions in javascript using =>.
For example: normal function-
function add(a,b){
    return a+b;
}
& arrow function-
const add=(a,b)=>(a+b);
arrow function make code cleaner, shorter for small functions.

5. What are template literals?
Answer:Template literals are way to write strings in javascript more easily using backticks ``.It allow us to insert variables directly inside the string using ${}.Template literals make it easy to combine text and variables in a string.
