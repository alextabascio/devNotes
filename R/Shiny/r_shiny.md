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

- textInput(inputId = "name", label = "Enter your name:", placeholder = "John Smith"),
- numericInput(inputId = "age", label = "Enter your age:", value = 30),
- dateInput(inputId = "birthday", label = "Select your birthday:"),
- selectInput(inputId = "gender", label = "Choose your gender:", choices = c("Male", "Female")),
- sliderInput(inputId = "favNumber", label = "Select your favorite number", min = 0, max = 100, step = 1, value = 50)

## Shiny Outputs

- Ouput are the way to display and visualize outputs to your users

#### Output Examples

- need to install the "DT" table package for renderDT

- data("mtcars")
  mtcars$cyl <- as.factor(mtcars$cyl)
  output$datatable1 <- renderDT(datatable(mtcars))
  output$plot1 <- renderPlot({
  ggplot(data = mtcars, aes(x = wt, y = mpg, color = cyl)) + geom_point()
  })

## Reactivity

- Allows the app to react to the users input. Heart of all shiny web apps

#### Reactivity Outputs

- How the app visuals change based on the user input

#### Reactive Expressions

- what parts of your apps update and when
- filter the data based on input
- create a reactive expression that can then be implentied when visualizing outputs

  - filteredData = reactive ({
    filteredData = airquality %>% filter(Month == input$Month)

        return(filteredData)

    })

#### Controlling Reactions

- We can delay the reactions of inputs by, for example, pressing a button when refreshing changes

  - can create an action button within the ui page

    - actionButton("refreshplot", label = "Refresh")

  - can add "eventReactive" to an output in the server script which will regenerate ouputs one the condition changes
    - plot1 = eventReactive(input$refreshplot, {
      ggplot(data = filteredData(), aes(x = "Day", y = "Index")) + geom_point()
      })
    - output$p1 = renderPlot(plot1)

## Single Page Layouts

#### Fluid Rows

- each fluid row has a width of 12 so all columns must add to 12

#### Sidebar Panel

- common styling to include a sidebarPanel to the left and a mainPanel to the right

#### Conditional Panel

- Only show to the user if an existing input is set

- checkboxInput("showtitle", label = "Please select to enter title", value = FALSE)
  conditionalPanel(condition = "input.showtitle == TRUE",
  textInput("title", label = "Enter Title", placeholder = "Title"))

- can be incorporated into outputs

## Multipage Layouts

- allow the ability to show a lot of information with each sections getting a conserdable amount of space
  compared to a single page layout

#### Tabset Panel

works within you main panel or body
tabsetPanel(
tabePanel(Output)
tabePanel(Output 2)
)

can also get a navbarPage(navbar title,
tabPanel("Inputs"),
navBarMenu())
