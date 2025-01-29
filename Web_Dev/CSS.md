# CSS ESSENTIALS

## Intro the CSS

- CSS styles what is on the page

  - describes the visual representation of the document
  - stands for cascading style sheets

- We write rules in CSS following a basic pattern
  - selector {
    property: value;
    }
  - h1 {
    color: purple
    }
- select something then set the property to a value

- There is a lot to CSS
  - easy to look up all the properties in css
  - developer.mozilla.org has a CSS reference guide

## Including styles correctly

- Inline styles within the HTML element

  - Not a good idea
    <button style="color: purple;">
  - would have to copy the syntax to every button

- Using a Style element in html

  - in <head>
  - <style>
      h2 {
          color: red;
      }

- External Style Sheet
  - write styles in a .css file
  - link to the file in any document you make
  - <head>
        <link rel = "stylesheet" href="my_style_sheet.css">
    </head>

## Basic CSS Properties

### colors

- can set all types of specified selectors to a certain color
  - color = text color
  - background-color = box color
    - background is not the same
- can use name, RGB or Hex color schemes

### Text Properties

- text align only moves it within the content box

- font weight controls boldness or lightness

  - words or numbers
  - 400 is normal and 700 is bold usually

- text decoration controls the appreance of decorative lines

- line height controls the spacing between lines

- font size
  - comes in relative or absolute measures
  - pixles
    - most common absolute measurement
    - not recommended for reactive websites
- font family
  - chnage the font of an element
  - can also make a font stack for as a list of font options

## CSS Selectors

- Universal Selectors
  - selects everything
- Element selector
  - everything of a given type
  - can use a comma to combine elements
- id selector
  - can select a single element based on id using #idname
- class selector
  - similar to an id
  - can be applied to multiple elements
  - can have groups of things than you can style together
  - .classname
- descendant selector
  - uses a space rather than a comma to show selectors nested inside other selectors
- Adjacent selector
  - h1 + p
  - paragraphs that come right after an h1
  - is on the same level (not nested)
- Direct Child
  - div > li
  - all list items directly nested inside a div
- Attribute Selector

  - input[type = "text"]
    - select all elements where the input type is a text

- Pseudo Classes

  - keyword added to a selector based on a certain state - active, checked, first, hover, etc. - has to start with a colon
    -Pseudo Elements - select a particular part of an element - first letter of every paragraph or first line - use two colons

- Casecading

  - the order of our styles matters and is reflected in the browsers
  - if two h1's exist it will take the last values it reads

- Specificity

  - what happens when there are conflicting style effecting the same element
  - how the browser applies rule when conflict is encountered
    - the browser will take the value from the most specific selector
    - ID > Class > Element

- Inheretance
  - some elements will be inhereted by child elements
  - i.e. changing the color of body to pink at that is it. every element inside the body will be pink unless another selector is used
  - takes in from the closest parent
    - a paragraph would inheret color from section over body since section would be closer

## CSS Box Model

- Idea that everything in CSS is a box with different properties or components

  - Content, Padding, Border, Margin

- Width & Height

  - set the width and height of an element
  - default is the size of the content

- Border

  - border around an element
  - can be very specific about the border properties
  - Border-width
    - thickness
  - Border-color
    - controls the color
  - Border-style

    - controls the line style

  - Border shorthand
    - width, style, width in one line

- Padding the space between the content and the border

  - can set the value of each side or all together
  - shorthand property
    - 1 value = all
    - 2 = vertical horizontal
    - 3 = top horizontal bottom
    - 4 = top right bottom left

- Margin

  - spacing on the outside of the border between elements

- Display Property

  - Inline
    - width and height are ignored by default
    - margin and padding are also respected horizontally but not vertically
  - Block
    - width and height are respected
    - padding are margin are respected on all four sides
  - Inline-Block
    - behaves like an inline element but block style elements are respected

- CSS Units Revisited
  - Pixels are the most common abosolute units
  - Relative Units
    - Percentages
      - relative to property of the parent
    - em
      - relative to the parent
      - 1em is equal to the parent
      - 2em is double the size of the parent
      - common to ems with margin
        - corresponds and scales relative to the font size of the element
        - useful you want all the elements of something to scale all at once
      - one problem is nested elements can grow or shrink very quickly such as in nested lists
    - rem
      - Root EMS
        - relative to one root font size {html} for the entire document rather than the parent
        - can set the relative font size for an entire document based on the root element

## Other CSS Properties

- Opacity and Alpha
  - Transpency
    - RGBA
      - scale between 0 and 1
      - for just the single element
      - for hex colors it scales from 00 - FF and the end of the hexdec code
    - Opacity
      - is the entire element or class and everything inside

- Position
  - static = default value for all elements
  - relative = can move an element relative to itself
    - top, left, values can be positive and negative
  - absolute
    - element is removed from the document flow
    - position relative to the body or another positioned element that is not static
  - fixed = only posiiton to the body and stays as you scroll
  - sticky
    - is fixed when you are scrolling

- Transitions
  - property name duration timing function
  - similar to the syntax as a border: width style color
    - easings.net for looking up timing functions.
    - don't do transitions all, better to single out the properties you want

- Transform
  - transforming elements
    - rotate, skew, translate, etc.
    - rotate: an object
    - transfrom: grow or skrink an object
    - translate: move an object in a direction
    - skew: skew an object
    - can combine elements at the same time
  - will apply to everything in our element that we select

- Box Shadow
  - cast a drop shadow from a frame

- Background
  - image
    - can pass in a url either for a folder or online through background-image: url()
  - size
    - can change the size of the image we pass in
  - if you are using background it has to done right after position and needs a / inbetween
    - i.e. center/cover

- Google Fonts
  - Can you free fonts for webpages
  - fonts.google.com
  - can add what fonts you want and it gives you an embed link to add it to the document which you can then implement in css
  - it will grab the fonts using the link when the page loads
  - can select multiple font families and weights

## Flexbox and Responsive CSS
- focus on the concepts not memorizing the properties

- What is flexbox
  - how do we distribute space across elements as the page expands and contrasts to create flexible layouts

- The flex-model
  - set display to flex
    - main axis
      - left to right
  - flex-direction
    - default is left to right
    - reverse
      - direction from right to left with reverse
    - column
      - our main axis goes top to bottom
    - column reverse
      - our main axis goes bottom to top
  - justify content
    - how we align items on the main axis
    - default is flex-start
      - dependes on the side where the main axis starts
    - flex-end
      - sets the start to the other side
    - center
      - centers content along the main axis
  - flex-wrap
    - how to wrap the content if there isn't enough space in the element
    - wrap and wrap reversed
    - depends on the justify content and flex-direction
  - align items
    - how we align items along the cross axis
    - has similar items to justify content
    - text items can be aligned through baseline
  -align content
    - distribute along the cross axis when there are multiple rows
    - controlling space between the rows or columns depending on the orientation
  
  - align self
    - can change the alignment for a singular item along the cross axis

### Flexing Items
  - Flex Basis
    - defines the initial size of an element
  - flex grow
    - controls the amount of space an item takes up if available

    


