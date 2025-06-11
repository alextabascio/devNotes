# BASICS

## Introduction
- your ability to make dynamic applications grows exponentially.
- more logic heavy and creative than html and css

## Primitive types in Javascript
- Types of information that it can handle
    - numeric, boolean, strings, nulls, undefined etc.

- running code in the console in chrome
    - easiest place to start
    - REPL
        - Read. Evaluate. Print. Loop.
### Numbers
- JS has one number type
    - can be positive or negative, whole numbers or decimals
- Can do basic math operations

- NaN
    - not a number
    - anything / 0 or 1 + NaN

- Math Object
    - built in
    - Math.PI or Math.abs
    - Can also do random numbers i.e. between 1 and 10
        `Math.floor(Math.random() * 10)`

### Variables
- storing a value to a name to refer back to it later or change it later
    - start with "let" in JS
    - can use "++" or "--" to add or subtract by 1
`i++`
    - stores the variable first and then updates (post increment operator)
`++i`
    - changes the increment first and the stores (pre-increment operator)

- Const and Var
    - Const = Constant
        - can not change it after it is set
    - Var was the old way to make variables
        - only use let and const
### Booleans
    - true or false
- Naming variables
    - can't start with a digit
    - most common to do camel-case
        `isLoggedIn = true;`
        `currentYear = 2025;`

### Strings
- can use double or single quotes
- can concatenate using the +, js will coerce into a common type when possible
    - 1 + "hi" = "1hi"
- string methods
    - actions we can take on a string
    - variableName.toUpperCase()
    - can also chain methods variablename.trim().toUpperCase()
    - methods can have no arguments or arguments

- template literals
    `I counted ${3 + 4} sheep` = I counted 7 sheep
        - has to use back ticks
    - whatever is inside "${}" is taken as an expression
    - can also embed variables inside the string

### Null and Undefined
- Null
    - Intentional absence of any value
    - Must be assigned
    - let loggedInUser = null;
- Undefined
    - Variables that don't have an assigned value

## Conditional Statements and decision making in Java Script
- different outcomes depending on the input
- comparison operators
    - greater than, less than, equal to, etc.
    - chacaters can also be compared based on their unicode
    - double equals doesn't care about type. triple equal cares about the type

### Truthy and Falsy values
- all values have an inherent truthy or falsy value

- Falsy Values
        - false
        - 0
        - ""
        - null
        -undefined
        - NaN
- everything else is truthy

### Logical Operators
- && = AND 
- || = OR
- ! = NOT

```
const password = prompt("Please enter a password");
if (password.length >= 6){
    // Password can't include a space
    if (password.indexOf(' ') === -1){
        console.log("Valid Password")
    } else {
        console.log("Can't contain a space")
}
} else {
    console.log("Too short")
}
```

- Switch
    - is a control-flow syntax that can replace multiple if statements
    - weird syntax
    - Thing we want to evaluate inside switch
    - will run the code until it hits a break
    - can add a default case similar to an else
```
// Switch Operator
const day = 2;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
    case 7:
        console.log("weekend");
        break;
    default:
        console.log("Error");
        break;
}
```

## Running Javascript code general notes
- console.log() is similar to print()
- prompt() asks the user for input
    - if it's a number you can convert input using parseInt()
- running Java Script from a script
    - script tag in an html document
    - good practice to put the script at the end of the body



# Arrays
- an ordered collection of values
    - made using []
    - use the indicies to access certain elements
- Modifying arrays
    - push/pop = add and remove items from the end of an array
    - shift/unshift = remove and add from the start of an array
        - shift removes and unshift adds
    - concat = merge two arrays together
        - array1.concat(array2)
    - includes = returns true or false if a value is present in the array
    - indexof = find the index of an element in the array. will be -1 if not present
    - reverse = reverses the order of an array. affects the original array
    - slice = get a portion of an array
    - splice = method add and/or removes array elements
    - sort = sort an array based on unicode values
- Reference Types and Equality
    - each array has it's own reference in memory and won't be equal even if the content inside is the same
    - you can refer multiple arrays to the same location in memory
    ```
        nums = [1,2,3]
        numsCopy = nums
    ```
- can change the values of an array that was defined by const but can't change the data type



# Object Literals
- objects are a set of properties with a label attached to them
- unordered pieces of information
    - can store all different types of information together
- stored using key-value pairs
    - all keys are converted to string no matter the type
- are accessed using custom keys rather than an index for an array
    - username: 'alex.t34'

- creating an object literal
```
    const person = {
        firstName: 'Alex',
        lastName: 'Tabascio',
        height: 190
        weight: 160
    }
```
- calling from an object literal
    `person["lastName"]` or `person.lastName`
    - can use the square brackets to use a variable as a key. can't use that using dot syntax

- adding information to an object literal
    - change a value
        `alex.weight = 170;`
    - add a new value
        `alex.gender = "Male";`

- arrays and objects
```
    const shoppingCart = [
        {
            product: 'bananas',
            price: 0.99,
            quantity: 1
        },
        {
            product: 'kale',
            price: 2.49,
            quantity: 2
        }
    ]
```


# Loops
## for loops
    - for (initial expression, condition, incremental expression)
- looping over arrays
    - start i = 0 and then iterate through until the end
- loop inside of loops
    - i and j
    - good for working through nested arrays

## while loops
    - good for a varied amount of counts or until certain instances are met
    - game loops

## Break
    - a way to break out of a while loop

## For...of
    - good for iterating over arrays or other iterable objects (such as strings)
```
    const n = [1,2,3,4]
    for(let i of n){
        console.log(i)
    }
```

```
// GUESSING GAME CODE

/* let maxNum = parseInt(prompt("Enter the maximum number!"));
while (!maxNum){
    maxNum = parseInt(prompt("Enter a valid number"));
}

const targetNum = Math.floor(Math.random() * maxNum) + 1;

let guess = parseInt(prompt("Enter your first guess"));
let attempts = 1;

while(parseInt(guess !== targetNum)){
    if(guess === 'q') break;
    attempts++;
    if(guess > targetNum){
        guess = (prompt("Too high. Enter a new guess"));
    } else {
        guess = (prompt("Too high. Enter a new guess"));
    }
}
if(guess === 'q'){
    console.log("Okay quitting")
} else {
    console.log(`You got it! It took you ${attempts} guesses`)
} */
```


- Iterating over objects
    - for in will iterate over a object
        - will just give us the key and then we can get the value using the key
    - can use a method Object.keys or Object.Values which turns it into an array
    - can then use for of like we learned before

```
// TODO LIST CODING DEMO

const toDoList = ['Laundry', 'Meal Prep'];
let input = prompt("What would you like to do?");

while(input !== "quit"){
    if(input === "list"){
        console.log("*************")
        for (let i = 0; i < toDoList.length; i++){
            console.log(`${i}: ${toDoList[i]}`)
        }
        console.log("*************")
    } else if(input === "new"){
        const newToDo = prompt("What is the new To Do?")
        toDoList.push(newToDo)
        console.log(`${newToDo} added to the list`)
    } else if (input === "delete"){
        const index = parseInt(prompt("Ok, enter an index to delete"));
        if(!Number.isNaN(index)){
            const deleted = toDoList.splice(index, 1);
            console.log(`Okay, you deleted ${deleted[0]}`);
        } else {
            console.log("Unknown");
        }
    }
    input = prompt("What would you like to do?");
}
console.log("You quit the app!")
```



# Functions

## Introduction
- reusable procedures of code
- have to define the function so that we can run it later on
- defining a function
    - function funcName(){
        // code script
    }
- running a function
    - funcName()

## Arguments
- creating functions that accept inputs
    - if an expected argument is not put in it is undefined
    - can pass in multiple arguments that are seperated by a comma
        - will be defined by order
- can use multiple types of input in a function

## Output
- return is a built method that will return a value
- return will stop the execution of the function

## Scope
- defines where we have acess to that variable in code
    - global can be referenced everywhere unless there is a closer version i.e. if it is defined and called inside a function
- block scope
    - let and const are blocked scoped
        - will not be defined outside blocks like loops or if statements
- lexical scope
    - an inner fucntion nested inside a parent function has access to all variables within the parent function

## Expressions
- storing a function within a variable
```
    const add = function(x,y){
        return x + y;
    }
```
- both will behave the same way just different syntax.
- functions are values that can be stored and pases around similar to an array
    - can pass and return functions, store them, etc.

## Higher Ordered Functions
- functions that accept other functions, or functions that return functions
- pass through the function not the value of the function

```
// calling a function
function callTwice(func){
    func();
    func();
}

function rollDie(){
    const roll = Math.floor(Math.random() * 6) + 1
    console.log(roll)
}

callTwice(rollDie)


// returning a function
function mysteryFunc(){
    const rand = Math.random();
    if(rand > 0.5){
        return function() {
            console.log("I am a good function")
        }
    } else{
        return function() {
            alert("I am a bad function")
        }
    }
}
```

## Returns
- have to hold the function when returning a function
    - const func = makeMysteryFunc()

- call also be used to create a new function (factory function) based on the parameters inputted to the first function
    - example: return a function to find between the min and max based on the two numbers inputted as arguements with the first function

## Methods
- functions that are added as properties on an object
- every method is a function but not every function is a method
```
// METHODS
const myMath = {
    PI: 3.14159,
    square(num) { 
        return num * num;
    },
    cube(num){
        return num ** 3;
    }
}
```

## This
- a keyword in JS used to access properties from the same object
- it actually depends on how we call the function
```
// THIS
const cat = {
    name: 'Frodo',
    color: 'white',
    breed: 'raga muffin',
    meow(){
        console.log(`${this.name} says MEOOOOW`);
    }
}
```

## Try/Catch
- used to catch errors and prevent them from breaking your code
```
try {
    hello.toUpperCase();
} catch {
    console.log("Error")
}
```

# Callbacks and Array Methods
- methods that expect a function to be passed in

## forEach
- calls the function once per array
- was used before for loops were created (not used very often)

## Map
- similar to foreach but creates a new array with the output
```
// Map
const numbers = [1,2,3,4,5]
const doubles = numbers.map(function(num){
    return num * 2;
})
```

## Arrow Functions
- Newer syntax for defining functions more compact than a regular function
```
    const square = (x) => {
        return x * x;
    }
```
- can do implicit return
    - leaves off return in certain situations
- replace the {} with ()
- can also remove the () if it's all on one line
- CAN ONLY USE THIS FOR A SINGLE EXPRESSION

- more examples
```
// Arrow Function
const doubles = numbers.map(num => (
    num * 2
))

const newdoubles = number.map(num => num *2)
```

## setTimeout and setInterval
- will execute code after a certain amount of time (milliseconds)
```
    setTimeout(() =>{
        console.log("are you there?")
    }, 3000)
```
- will continue to call the function at a certain interval
```
    const id = setInterval(() => {
        console.log(Math.random())
    }, 2000);
    
    clearInterval(id); // will stop it
```

## filter
- make a subset in a new array based on a rule or callback
```
    const goodMovies = movies.filter(movie => {
        return move.score > 80;
    })
```    
- can chain methods together
    `const badMovies = movies.filter(m => m.score < 30).map(=> m.title);`

## Some and every
- Every: returns true or false if every element return True
- Some: very similar but returns true is any element returns True
    `movies.some(movie => movie.year > 2015)`

## reduce
- executes a reducer function on each element of the array resulting in a single value in a similar way to a for loop
- element.reduce((accumulator, current) => math operation i.e. accumulator + current)
- can also specify the initial value


## Arrow functions and this
- the keyword this behaves differently in arrow function compared to a regular function
```
// reduce
const prices = [9.99, 1.50, 19.99, 30.50];
const total = prices.reduce((total, price) => {
    return total + price;
})
```


# New Features in Java Script

## Default params
```
function rollDie(numSides = 6){
    return math.floor(math.random() * numSides) + 1
}
```
- don't have to handle undefined with an if statement

## Spread
In function Calls
- Spreading an array in a function call
`Math.max(13,4,6,28,7)`
    - uses arguments for each number
`const nums = [13,4,6,28,7]`
    - Math.max(nums) won't work
    - Can use ... to spread nums across into seperate arguments
`Math.max(...nums)`
- can also spread with strings to pass in each character

With Array Literals
- Can copy and/or combine arrays easily
```
const cats = ['Frodo', 'Loki']
const dogs = ['Lila', 'Rielly']
const allPets = [...cats, ...dogs, 'Turtle', 'Binx'] 
```

With Objects
- can copy properites from one object into another object similar to arrays
```
const feline = {legs: 4, family: 'Felidae'};
const canine = {isFurry: true, family: 'Caninae'};
```
- Can copy and add in properties
`{...feline, color = 'black'}`
- And combine
    - `const CatDog = {...feline, ...canine}`
    - when there is a conflict (both objects had a family property) the last object's values has precidence

## Rest
- Will hold the arguements passed into a function like an array, but doesn't have array arguements
    - the Rest Parameter will collect all arguments and put them into an array so we can use different elements
    - decalred in the function arguments
```
function sum(...nums){
    return nums.reduce((total, el) => total + el)
}
```

## Destructuring
- A clean syntax to extract values
From and Array
```
const scores = [984931, 899431, 565607, 334533, 69785]
const [gold, silver, bronze, ...everyoneElse] = scores;
```
- The order of the elements matter

From an Object
- can extract elements from an object into there own varaibles
- can also add default values
```
const user = {
    email: 'johnsmith@gmail.com,
    password: `password124`,
    firstName: John,
    lastName: Smith,
    born: 1999
}

// can deconstruct rather than extracting every property into its own variable
const { email, firstName, lastName, born: birthYear, died = 'N/A'} = user;
```

From Parameters
- can destructre from an object in the parameters
```
function fullName({firstname},{lastName}) {
    return `${firstName} ${lastName}`
}

const user = {
    email: 'johnsmith@gmail.com,
    password: `password124`,
    firstName: John,
    lastName: Smith,
    born: 1999
}

fullName(user)
```
