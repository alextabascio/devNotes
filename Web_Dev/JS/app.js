/*console.log("Hello World")

if(1 + 1 === 2){
    console.log("Math Still Works")
}*/

// Nested Operators

/* const password = prompt("Please enter a password");
if (password.length >= 6){
    // Password can't include a space
    if (password.indexOf(' ') === -1){
        console.log("Valid Password")
    } else {
        console.log("Can't contain a space")
}
} else {
    console.log("Too short")
} */

// Logical operators

/*const password = prompt("Please enter a password");
if (password.length >= 6 && password.indexOf(' ') === -1){
    console.log("valid")
} else {
    console.log("incorrect")
} */

// Switch Operator
/*const day = 2;
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
}*/

// For Loops
/*for(let i = 1; i <= 10; i++) { 
    console.log(i)
} */

/*const animals = ['lions', 'tigers', 'bears']

for(let i = 0; i < animals.length; i++){
    console.log(animals[i])
}*/

// While loops

/*const secretCode = "BabyHippo";

let guess = prompt("enter the password")

while(guess !== secretCode){
    guess = prompt("enter the password")
}

console.log("You got the password!!") */

//Breaking a while loop
/*let input = prompt("Say Something")
while(true) {
    input = prompt(input);
    if(input.toLowerCase() === "stop copying me"){
        break;
    }
}

console.log("fine")*/


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


// Iterating over objects

/*
const testScores = {
    alex: 89,
    sarah:99
}

for (let person in testScores){
    console.log(`${person} scored ${testScores[person]}`);
}

let total = 0
let scores = Object.values(testScores);
for (let socre of scores){
    total += score;
}
console.log(total / scores.length)
*/


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

