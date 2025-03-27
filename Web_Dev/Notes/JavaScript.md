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


## Arrays
- an ordered collection of values
    - made using []