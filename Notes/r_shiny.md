# R SHINY ONLINE CLASS NOTES

## Introduction

#### What is R shiny

- Using R to create reactive web applications for end users.
- Need R, R studio and install the shiny package

#### Shiny App Structure

- Every shiny app needs two files
  - ui.R and server.R - defines inputs and output
    - server file creates objects than are shown on the file
      has inputs and outputs that are defined from the ui page
  - global.R is also good for defining data, functions and packages - will only get run once - big data loads or functions

## Shiny Inputs

- Inputs are the way users interact with the shiny web app
  - text, numbers, choices, date, etc.

#### Input Examples

textInput(inputId = "name", label = "Enter your name:", placeholder = "John Smith"),
numericInput(inputId = "age", label = "Enter your age:", value = 30),
dateInput(inputId = "birthday", label = "Select your birthday:"),
selectInput(inputId = "gender", label = "Choose your gender:", choices = c("Male", "Female")),
sliderInput(inputId = "favNumber", label = "Select your favorite number", min = 0, max = 100, step = 1, value = 50)

## Shiny Outputs
