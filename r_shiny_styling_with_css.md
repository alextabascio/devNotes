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
