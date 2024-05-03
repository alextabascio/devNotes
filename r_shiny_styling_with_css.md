# Styling R Shiny Apps with HTML and CSS

## Introduction

- can make a real difference to your application
- go from a basic r shiny app to a custon css styled application

  - shadows, buttons, panel, custon font and colors etc.

- Shiny apps already use the basic web development structure
  - html + css + js
- Shiny also uses bootstrap a CSS framework (although the r version is an older version)

Shiny to HTML - all the ui part of your app shiny is just converting it to HTML - titlePanel() -> <h2></h2>

- you can take any shiny app and write it all in html and css and run it

Bootstrap

- Once you start using ui as html you can use bootstrap
  - using keywords within the framework for styling

bslib

- let's you use bootstrap 5 as well as adjusting the styling keywords

  - theme = bs_theme(version = 5, danger = "#FFAOOO")
  - can add html and css into our shiny app using html and bslib

- can tweak the layouts as well

you can also create your own css styling files that you can load into shiny

Using HTML in shiny

- you can use htmltemplate to just code with html

## Shiny HTML and CSS example

- bslib is a shiny dependency

- can change fluid page to bootstrap page
  - will take out the default padding and margins from fluid page
  - sidebarPanel -> div(class = "container,
    div(class = "row",
    div(class = "col-6",
    textInput....),
    div(class = "col-6")
    )
    )

can add a background, and padding before the code above
div(class = "bg-light my-5 py-3",
rest of the previous code

)

key takeaway is you can add the html instead of using the shiny code

#### some shiny elements won't let you directly add html styling

workaround

- can inspect the element when the app is running in browser to get the converted html that is being translated
- can copy it and paste it directly in the ui with HTML()
- any html that shiny generates you can paste into shiny and it will still work with the server script
  - now you can edit certain class items

you can copy and paste html from your shiny components

## Adding a custom CSS file and dynamic html styling

dynamic styling in output. renderUI is better than renderText because you can add custom text syling

    - glue is a good for adding variables inside your text

- example

  - output$text = renderUI({
        if (results()$type == guess()){
    value = "correct"
    } else{
    value = "incorrect
    }
    HTML(glue("<h3>{guess()} is {value}</h3>))
    })

- within the code folder add a 'www' folder, and then make a new 'site.css' text file

  - within the css file you can now add custom styling
    .correct-value {
    color: #8ea604
    }

  .incorrect-value{
  color: #bf3100
  }

within the ui metadata add

- tags$head(
    tags$link(rel = "stylesheet", type="text/css", href = "site.css")
  )

and then add the styling to the text
output$text = renderUI({
        if (results()$type == guess()){
value = "correct"
value_style = "correct-value"
} else{
value = "incorrect
value_style = "incorrect-value"
}
HTML(glue("<h3>{guess()} is <span class= '{value_style}>{value}</span></h3>))
})
