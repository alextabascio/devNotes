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
        Math.floor(Math.random() * 10)

### Variables
- storing a value to a name to refer back to it later or change it later
    - start with "let" in JS
    - can use "++" or "--" to add or subtract by 1
- i++
    - stores the variable first and then updates (post increment operator)
- ++i
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
        - isLoggedIn = true;
        - currentYear = 2025;

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
    - `I counted ${3 + 4} sheep` = I counted 7 sheep
        - has to use back ticks ``
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

- Switch
    - is a control-flow syntax that can replace multiple if statements
    - weird syntax
    - Thing we want to evaluate inside switch
    - will run the code until it hits a break
    - can add a default case similar to an else

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
        - nums = [1,2,3]
        - numsCopy = nums
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
    - const person = {
        firstName: 'Alex',
        lastName: 'Tabascio',
        height: 190
        weight: 160
    }
- calling from an object literal
    - person["lastName"] or person.lastName
    - can use the square brackets to use a variable as a key. can't use that using dot syntax

- adding information to an object literal
    - change a value
        - alex.weight = 170;
    - add a new value
        - alex.gender = "Male";

- arrays and objects
    - const shoppingCart = [
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
    - shoppingCart[1].price
        - 2.49

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
    - const n = [1,2,3,4]
    - for(let i of n){
        console.log(i)
    }

- Iterating over objects
    - for in will iterate over a object
        - will just give us the key and then we can get the value using the key
    - can use a method Object.keys or Object.Values which turns it into an array
    - can then use for of like we learned before


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
    - const add = function(x,y){
        return x + y;
    }
- both will behave the same way just different syntax.
- functions are values that can be stored and pases around similar to an array
    - can pass and return functions, store them, etc.








