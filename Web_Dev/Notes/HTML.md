# HTML ESSENTIALS

## Intro to HTML

- HTML controls what is on the page
  - Not a programming language
  - just about marking up a document
- Was created to describe the structure of academic research papers
- HTML elements

  - opening and closing tag <p> </p>

### Mozilla Developer Network

- Mozilla developer network
  - covers the basics for all wed developers
  - documentation for all web development elements
    - open source
  - Reference -> element reference

### HTML Elements

- Paragraphs <p></p>

  - takes up a block of space

- Headings and Section Headings
  - H1 - H6
  - have a default size that can be saved using CSS

### Chrome Inspector

- Right Click -> Inspect

### HTML Skeleton

- <head> - includes all the meta data of your document
- <ul> for unordered list and <ol> for ordered list, <li> for list items
- <img> image tag has no closing tag

## HTML Next Steps and Semantics

### What is HTML 5

- latest standard that defines HTML
  - also refers to other technologies for web development
- HTML is defined as a set of instructions for how HTML should work and be implemented

### Block vs Inline Elements

- Inline elements fit alongside other elements
  - not forced on it's own line
  - link and images are inline elements
- Block elements take up all the space along

  - paragraphs and headings

- <div> content division element
    - a generic container to group elements on a page
    - block level element
    - used in CSS to group content together

- <span>
    - is a generic inline element
        - that we can then style with css later
        - the inline equivalent of a div

### Other elements

- <hr> horizontal rule
    - a horizontal line across a page that can be styled

- <br> makes a line break with a paragraph

- <sup> superscript text like an exponent or citation to a footnote

- <sub> subsrcipt for text

### HTML Entities

- special symbols or sequences that will result in different characters that can't be typed on a keyboard
  - copyright logo or percent symbol
  - starts with & then a string of numbers and ends with ;
    - using &lt; rather than using < which is reserved in HTML

### Semantic Markup

- what purpose does that html element have
  - <main>, <head>, <section>, <nav>, <header>, <footer>, <section>, <article>, <aside>, <figure>
  - rather than just <div> which is just a generic container
  - helps to distinguish elements on a page and more meaning to a html Markup

## HTML Forms and Tables

### Tables Basics

- Structured data table made up of rows and columns

  - can have headers and subheaders, links, images, etc.
  - can also styled with css

- <td> = table data cell (a single cell)
- <tr> = table row
- <th> = table header

- colspan and rowspan are used to span multiple columns or rows when making tables

### Form Basics

- <form>
  - container for the form elements
    - inputs, buttons, links, etc.
  - "action" points to where the data should be sent once the form is complete

  - i.e. reddit search bar -> /search/
    - http request goes to /search on reddit.com
    - passing in our data through a form
    - reddit's server then scans its database for what you searched and send its results back to the client

- groups input and sends them to a specified destination

### what goes inside <form>

- <input>
  - checkbox, text, date picker, scale, etc.
  - done through the "type"

- <label>
  - labels are linked to an input
    - also makes the label clickable
  - better for accessibility if someone is using a screen reader
  - input has to have an id
    - set that id to the for attribute in the label

- <button>
  - text inside is used to label the button
  - used to submit the form unless to declare it using type = "button"

### Submitting the Form

- name = "username"
  - name holds a variable (username) that stores the input from the form and gets sent to the server

### HTML 5 Form Validation

- two types of validation
  - server side validation (when the form is submitted)
  - client side validation (as you fill out the form reactively)

HTML attribute: Required
