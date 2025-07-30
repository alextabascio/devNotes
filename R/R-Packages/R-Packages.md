# Getting Started

## Chapter 1: First Overview
- `create_package("file_path_to_your_package")`
    - .Rbuildignore: lists files that we need to have around but that should not be included when building the R package from source
    - .gitignore: anticipates Git usage and tells Git to ignore some standard, behind-the-scenes files created by R and RStudio.
    - .DESCRIPTION: provides metadata about your package. We edit this shortly and Chapter 9 covers the general topic of the DESCRIPTION file.
    - NAMESPACE: declares the functions your package exports for external use and the external functions your package imports from other packages. At this point, it is empty, except for a comment declaring that this is a file you should not edit by hand.
    - R: the “business end” of your package. It will soon contain .R files with function definitions
    - regexcite.Rproj:  is the file that makes this directory an RStudio Project. Even if you don’t use RStudio, this file is harmless.

- `use_git()`
    - Now we make it also a Git repository, with use_git(). (By the way, use_git() works in any project, regardless of whether it’s an R package.)

- `use_r()`
    - The helper use_r() creates and/or opens a script below R/. It really shines in a more mature package, when navigating between .R files and the associated test file. But, even here, it’s useful to keep yourself from getting too carried away while working in Untitled4.
    - Put the definition of strsplit1() and only the definition of strsplit1() in R/strsplit1.R and save it.
    - The file R/strsplit1.R should NOT contain any of the other top-level code we have recently executed, such as the definition of our practice input x, library(devtools), or use_git().
        - This foreshadows an adjustment you’ll need to make as you transition from writing R scripts to R packages. Packages and scripts use different mechanisms to declare their dependency on other packages and to store example or test code.

- `load_all()`
    - simulates the process of building, installing, and attaching the regexcite package.
    - As your package accumulates more functions, some exported, some not, some of which call each other, some of which call functions from packages you depend on, load_all() gives you a much more accurate sense of how the package is developing than test driving functions defined in the global environment.

- `check()`
    - R CMD check, executed in the shell, is the gold standard for checking that an R package is in full working order. check() is a convenient way to run this without leaving your R session.

- `docuent()`
    - We write a specially formatted comment right above strsplit1(), in its source file, and then let a package called roxygen2 handle the creation of man/strsplit1.Rd.
    - If you use RStudio, open R/strsplit1.R in the source editor and put the cursor somewhere in the strsplit1() function definition. Now do Code > Insert roxygen skeleton. A very special comment should appear above your function, in which each line begins with #'. RStudio only inserts a barebones template, so you will need to edit it to look something like that below.
```
#' Split a string
#'
#' @param x A character vector with one element.
#' @param split What to split on.
#'
#' @return A character vector.
#' @export
#'
#' @examples
#' x <- "alfa,bravo,charlie,delta"
#' strsplit1(x, split = ",")
```
- We still need to trigger the conversion of this new roxygen comment into man/strsplit1.Rd with document()
    - You should now be able to preview your help file like so `?strsplit1`
    - this documentation is present in your package’s source, but is not yet present in an installed package. In fact, we haven’t installed regexcite yet, but we will soon. If ?strsplit1 doesn’t work for you, you may need to call load_all() first, then try again.


- `use_testthat()`
    - We can formalize this as a unit test. This means we express a concrete expectation about the correct strsplit1() result for a specific input.
    - First, we declare our intent to write unit tests and to use the testthat package for this, via use_testthat():
    - The helper use_test() opens and/or creates a test file. You can provide the file’s basename or, if you are editing the relevant source file in RStudio, it will be automatically generated.
        - `use_test(strsplit1)`
        - This creates the file tests/testthat/test-strsplit1.R. If it had already existed, use_test() would have just opened it. You will notice that there is an example test in the newly created file - delete that code and replace it with you own test
```
test_that("strsplit1() splits a string", {
  expect_equal(strsplit1("a,b,c", split = ","), c("a", "b", "c"))
})
```
- Going forward, your tests will mostly run en masse and at arm’s length via test():
    - Your tests are also run whenever you check() the package. In this way, you basically augment the standard checks with some of your own, that are specific to your package.

- `use_package()`
    - You will inevitably want to use a function from another package in your own package. We will need to use package-specific methods for declaring the other packages we need (i.e. our dependencies) and for using these packages in ours.
    - First, declare your general intent to use some functions from the stringr namespace with use_package():
        - example `use_package(stringr)`
    - in code you would use package::function notation. i.e. `stringr::str_split()`

- `use_github()`
    - How would you connect your local regexcite package and Git repository to a companion repository on GitHub? Here are three approaches:
        - 1. use_github() is a helper that we recommend for the long-term. We won’t demonstrate it here because it requires some credential setup on your end. We also don’t want to tear down and rebuild the public regexcite package every time we build this book.
        - 2. Set up the GitHub repo first! It sounds counter-intuitive, but the easiest way to get your work onto GitHub is to initiate there, then use RStudio to start working in a synced local copy
        - 3. Command line Git can always be used to add a remote repository post hoc. This is described in the Happy Git workflow

- `use_readme_rmd()`
    - Now that your package is on GitHub, the README.md file matters. It is the package’s home page and welcome mat, at least until you decide to give it a website
    - this function inits a basic executable README.Rmd ready for you to edit
        - In addition to creating README.Rmd, this adds some lines to .Rbuildignore, and creates a Git pre-commit hook to help you keep README.Rmd and README.md in sync.

        - README.Rmd already has sections that prompt you to:

            - Describe the purpose of the package.
            - Provide installation instructions. If a GitHub remote is detected when use_readme_rmd() is called, this section is pre-filled with instructions on how to install from GitHub.
            - Show a bit of usage.

    - Don’t forget to render it to make README.md! The pre-commit hook should remind you if you try to commit README.Rmd, but not README.md, and also when README.md appears to be out-of-date.

    - The very best way to render README.Rmd is with `build_readme()`, because it takes care to render with the most current version of your package, i.e. it installs a temporary copy from the current source.


- Review
    - Here is a review of the key functions you’ve seen in this chapter, organized roughly by their role in the development process.

    - These functions setup parts of the package and are typically called once per package:
        - create_package()
        - use_git()
        - use_mit_license()
        - use_testthat()
        - use_github()
        - use_readme_rmd()

        You will call these functions on a regular basis, as you add functions and tests or take on dependencies:
        - use_r()
        - use_test()
        - use_package()

You will call these functions multiple times per day or per hour, during development:
        - load_all()
        - document()
        - test()
        - check()


## Chapter 2: System Setup

### Preparing your system
- install the following packages
    `install.packages(c("devtools", "roxygen2", "testthat", "knitr"))`
- install the latest version of R studio

### devtools, usethis, and you
- How to approach using dev tools in package development
    - If you are using the functions interactively to help you develop your package, you should think of devtools as the provider of your favorite functions for package development.
        - attach devtools with `library(devtools)` and call the functions without qualification (e.g., `load_all()`)
    - If you are using functions from devtools and friends within the package code you are writing, you should NOT depend on devtools, but should instead access functions via the package that is their primary home.
        - For example, if you are creating a function in your package in which you need to query the state of the user’s R session, use `sessioninfo::session_info()` in your package instead of `devtools::session_info()`
    - The usethis package is the one constituent package that more people may be aware of and that they may use directly. It holds the functions that act on the files and folders in an R project, most especially for any project that is also an R package. devtools makes it easy to access usethis functions interactively, as when you call library(devtools), usethis is also attached. Then you can use any function in usethis without qualification
        - If you choose to specify the namespace, such as when working in a more programmatic style, then make sure you qualify the call with usethis, e.g., usethis::use_testthat()

## Chapter 3: Package structure and state

### Package States
- 5 states an R package can be in
    - source
    - bundled
    - binary
    - installed
    - in-memory

Source
- A source package is just a directory of files with a specific structure. It includes particular components, such as a DESCRIPTION file, an R/ directory containing .R files, and so on. Most of the remaining chapters in this book are dedicated to detailing these components.
Bundled
- a package that's been reduced to a single file.
- In the rare case that you need to make a bundle from a package you’re developing locally, use devtools::build().
Binary
- If you want to distribute your package to an R user who doesn’t have package development tools, you’ll need to provide a binary package. The primary maker and distributor of binary packages is CRAN, not individual maintainers.
- Like a package bundle, a binary package is a single file. Unlike a bundled package, a binary package is platform specific and there are two basic flavors: Windows and macOS.
Installed
- An installed package is a binary package that’s been decompressed into a package library
- Most useRs understandably like to install packages from the comfort of an R session and directly from CRAN. The built-in function install.packages() meets this need. It can download the package, in various forms, install it, and optionally attend to the installation of dependencies.
- `install_github()` is the most useful of these functions and is also featured in Figure 3.2. It is the flagship example of a family of functions that can download a package from a remote location that is not CRAN and do whatever is necessary to install it and its dependencies
In-memory
- `library(usethis)`
    - Assuming usethis is installed, this call makes its functions available for use

### Package Libraries
- A directory containing installed packages, sort of like a library for books
- When you call library(somepackage), R looks through the current libraries for an installed package named “somepackage” and, if successful, it makes somepackage available for use.
- As your R usage grows more sophisticated, it’s common to start managing package libraries with more intention.   
    - For example, tools like renv (and its predecessor packrat) automate the process of managing project-specific libraries.
    - This can be important for making data products reproducible, portable, and isolated from one another.

- Finally, it’s important to note that library() should NEVER be used inside a package. Packages and scripts rely on different mechanisms for declaring their dependencies and this is one of the biggest adjustments you need to make in your mental model and habits.

## Chapter 4: Fundamental development workflows

### Creating a package

#### Naming your package
- There are three formal requirements:
    - The name can only consist of letters, numbers, and periods, i.e., ..
    - It must start with a letter.
    - It cannot end with a period.
    - Unfortunately, this means you can’t use either hyphens or underscores, i.e., - or _, in your package name.
    - We recommend against using periods in package names, due to confusing associations with file extensions and S3 methods.

- Things to consider
    - Don't pick a name that's already in use
    - Avoid using both upper and lower case letters
    - Don't get sued lol

#### Package Creation
- call `usethis::create_package()`
- In RStudio, do File > New Project > New Directory > R Package. This ultimately calls usethis::create_package() so really there’s just one way.
    - This produces the smallest possible working package, with three components:
    1. An R/ directory, which you’ll learn about in Chapter 6.
    2. A basic DESCRIPTION file, which you’ll learn about in Chapter 9.
    3. A basic NAMESPACE file, which you’ll learn about in Section 10.2.2.
- where should you do this
    - The main and only required argument to create_package() is the path where your new package will live:
    - `create_package("path/to/package/pkgname")`

### RStudio Projects
- recommend that each source package is an r studio project
    - easy to start a new instance with the file browser and working directory
    - each project is isolated
    - `create_package()` will make each new package an r project if working in r studio
    - if you already have a project setup use this workflow
        - file > new project > existing directory (or version controlled for github)
        - call create_package() with the path to the pre-existing directory
        - call `usethis::use_rstudio()`

### Test Drive with load_all()
- the most important part of function workflow
- load_all() is the key step in this “lather, rinse, repeat” cycle of package development:
    - Tweak a function definition.
    - load_all()
    - Try out the change by running a small example or some tests.
- The `library()` function can only load a package that has been installed, whereas `load_all()` gives a high-fidelity simulation of this, based on the current package source.

#### Benefits of load_all
- You can iterate quickly, which encourages exploration and incremental progress.
- You get to develop interactively under a namespace regime that accurately mimics how things are when someone uses your installed package, with the following additional advantages:
    - You can call your own internal functions directly, without using ::
    - You can also call functions from other packages that you’ve imported into your NAMESPACE, without being tempted to attach these dependencies via library().
- load_all() removes friction from the development workflow and eliminates the temptation to use workarounds that often lead to mistakes around namespace and dependency management.

### check() and R CMD check
- It is essential to pass R CMD check if you plan to submit your package to CRAN
- reccomended way to run R CMD check is with `devtools::check()`
- A rookie mistake that we see often in new package developers is to do too much work on their package before running R CMD check. Then, when they do finally run it, it’s typical to discover many problems, which can be very demoralizing.
- It’s counter-intuitive but the key to minimizing this pain is to run R CMD check more often: the sooner you find a problem, the easier it is to fix

### Workflow
1. Run devtools::check(), or press Ctrl/Cmd + Shift + E.
2. Fix the first problem.
3. Repeat until there are no more problems.

- R CMD check returns three types of messages:
    - ERRORs: Severe problems that you should fix regardless of whether or not you’re submitting to CRAN.

    - WARNINGs: Likely problems that you must fix if you’re planning to submit to CRAN (and a good idea to look into even if you’re not).

    - NOTEs: Mild problems or, in a few cases, just an observation. If you are submitting to CRAN, you should strive to eliminate all NOTEs, even if they are false positives.


## Chapter 5: The Package Within
- This chapter looks at converting a data analysis script into a package

### Alpha: An initial data script
```
infile <- "swim.csv"
(dat <- read.csv(infile))

dat$english[dat$where == "beach"] <- "US"
dat$english[dat$where == "coast"] <- "US"
dat$english[dat$where == "seashore"] <- "UK"
dat$english[dat$where == "seaside"] <- "UK"

dat$temp[dat$english == "US"] <- (dat$temp[dat$english == "US"] - 32) * 5/9
dat

now <- Sys.time()
timestamp <- format(now, "%Y-%B-%d_%H-%M-%S")
(outfile <- paste0(timestamp, "_", sub("(.*)([.]csv$)", "\\1_clean\\2", infile)))
write.csv(dat, file = outfile, quote = FALSE, row.names = FALSE)
```

### Bravo: An improved script
- loaded in tidyverse, converted a few repetitive steps to objects or functions
```
library(tidyverse)

infile <- "swim.csv"
dat <- read_csv(infile, col_types = cols(name = "c", where = "c", temp = "d"))

lookup_table <- tribble(
      ~where, ~english,
     "beach",     "US",
     "coast",     "US",
  "seashore",     "UK",
   "seaside",     "UK"
)

dat <- dat %>% 
  left_join(lookup_table)

f_to_c <- function(x) (x - 32) * 5/9

dat <- dat %>% 
  mutate(temp = if_else(english == "US", f_to_c(temp), temp))
dat

now <- Sys.time()
timestamp <- function(time) format(time, "%Y-%B-%d_%H-%M-%S")
outfile_path <- function(infile) {
  paste0(timestamp(now), "_", sub("(.*)([.]csv$)", "\\1_clean\\2", infile))
}
write_csv(dat, outfile_path(infile))
```

### Charlie: Creating a Helper Function
- typical next step is to move reusable data and logic out of the analysis script and into one or more seperate files. 
- converted the word coversions into a csv table

`beach-lookup-table.csv`
```
where,english
beach,US
coast,US
seashore,UK
seaside,UK
```

Here is the content of `cleaning-helpers.r`
```
library(tidyverse)

localize_beach <- function(dat) {
  lookup_table <- read_csv(
    "beach-lookup-table.csv",
    col_types = cols(where = "c", english = "c")
  )
  left_join(dat, lookup_table)
}

f_to_c <- function(x) (x - 32) * 5/9

celsify_temp <- function(dat) {
  mutate(dat, temp = if_else(english == "US", f_to_c(temp), temp))
}

now <- Sys.time()
timestamp <- function(time) format(time, "%Y-%B-%d_%H-%M-%S")
outfile_path <- function(infile) {
  paste0(timestamp(now), "_", sub("(.*)([.]csv$)", "\\1_clean\\2", infile))
}
```
- We’ve added some high-level helper functions, localize_beach() and celsify_temp(), to the pre-existing helpers (f_to_c(), timestamp(), and outfile_path()).

Here is the new data cleaning script. Notice that the script is getting shorter and, hopefully, easier to read and modify, because repetitive and fussy clutter has been moved out of sight.
```
library(tidyverse)
source("cleaning-helpers.R")

infile <- "swim.csv"
dat <- read_csv(infile, col_types = cols(name = "c", where = "c", temp = "d"))

(dat <- dat %>% 
    localize_beach() %>% 
    celsify_temp())

write_csv(dat, outfile_path(infile))
```
### Delta: a failed package
- While this first attempt to create a package will end in failure, it’s still helpful to go through some common missteps.
- Here are the simplest steps that you might take, in an attempt to convert cleaning-helpers.R into a proper package:
    1. Use usethis::create_package("path/to/delta") to scaffold a new R package, with the name “delta”.
        - This is a good first step!
    2. Copy cleaning-helpers.R into the new package, specifically, to R/cleaning-helpers.R.
        - This is morally correct, but mechanically wrong in several ways, as we will soon see.
    3. Copy beach-lookup-table.csv into the new package. But where? Let’s try the top-level of the source package.
        - This is not going to end well. Shipping data files in a package is a special topic
    4. Install this package, perhaps using devtools::install() or via Ctrl + Shift + B (Windows & Linux) or Cmd + Shift + B in RStudio.
        - Despite all of the problems identified above, this actually works!

- Here is the new version of the data cleaning script with the new delta package installed
```
library(tidyverse)
library(delta)

infile <- "swim.csv"
dat <- read_csv(infile, col_types = cols(name = "c", where = "c", temp = "d"))

dat <- dat %>% 
  localize_beach() %>% 
  celsify_temp()

write_csv(dat, outfile_path(infile))
```

#### What went wrong part 1
- None of the helper functions are actually available for use, even though you call library(delta)! In contrast to source()ing a file of helper functions, attaching a package does not dump its functions into the global workspace. By default, functions in a package are only for internal use. You need to export localize_beach(), celsify_temp(), and outfile_path() so your users can call them.

- In the devtools workflow, we achieve this by putting @export in the special roxygen comment above each function
```
#' @export
celsify_temp <- function(dat) {
  mutate(dat, temp = if_else(english == "US", f_to_c(temp), temp))
}
```
- After you add the @export tag to `localize_beach()`, `celsify_temp()`, and `outfile_path()`, you run `devtools::document()` to (re)generate the NAMESPACE file, and re-install the delta package. Now when you re-execute the data cleaning script, it works!

- Correction: it sort of works sometimes. Specifically, it works if and only if the working directory is set to the top-level of the source package. From any other working directory, you still get an error:

```
dat <- dat %>% 
  localize_beach() %>% 
  celsify_temp()
#> Error: 'beach-lookup-table.csv' does not exist in current working directory ('/Users/jenny/tmp').
```
- The lookup table consulted inside localize_beach() cannot be found. One does not simply dump CSV files into the source of an R package and expect things to “just work”. 

#### what went wrong part 2
- This is a sobering reminder that you should be running R CMD check, probably via `devtools::check()`, very often during development.

- check fails for this package imediately
```
 * installing *source* package ‘delta’ ...
 ** using staged installation
 ** R
 ** byte-compile and prepare package for lazy loading
 Error in library(tidyverse) : there is no package called ‘tidyverse’
 Error: unable to load R code in package ‘delta’
 Execution halted
 ERROR: lazy loading failed for package ‘delta’
 * removing ‘/Users/jenny/rrr/delta.Rcheck/delta’
```
- This error is what happens when the strictness of R CMD check meets the very first line of R/cleaning-helpers.R:
    - In a package you can't declare a package as `library(tidyverse)`
    - This is also not how you make functions in another package available for use in yours. Dependencies must be declared in DESCRIPTION

### Echo: a working package
- Here is the new version of R/cleaning-helpers.R
```
lookup_table <- dplyr::tribble(
      ~where, ~english,
     "beach",     "US",
     "coast",     "US",
  "seashore",     "UK",
   "seaside",     "UK"
)

#' @export
localize_beach <- function(dat) {
  dplyr::left_join(dat, lookup_table)
}

f_to_c <- function(x) (x - 32) * 5/9

#' @export
celsify_temp <- function(dat) {
  dplyr::mutate(dat, temp = dplyr::if_else(english == "US", f_to_c(temp), temp))
}

now <- Sys.time()
timestamp <- function(time) format(time, "%Y-%B-%d_%H-%M-%S")

#' @export
outfile_path <- function(infile) {
  paste0(timestamp(now), "_", sub("(.*)([.]csv$)", "\\1_clean\\2", infile))
}
```
- We’ve gone back to defining the lookup_table with R code, since the initial attempt to read it from CSV created some sort of filepath snafu. 
    - This is OK for small, internal, static data, but remember to see Chapter 7 for more general techniques for storing data in a package.
- All of the calls to tidyverse functions have now been qualified with the name of the specific package that actually provides the function,dplyr::mutate().
- It is also our strong recommendation that no one depend on the tidyverse meta-package in a package. Instead, it is better to identify the specific package(s) you actually use. In this case, the package only uses dplyr.
- The library(tidyverse) call is gone and instead we declare the use of dplyr in the Imports field of DESCRIPTION:
```
Package: echo
(... other lines omitted ...)
Imports: 
    dplyr
```
- This, together with the use of namespace-qualified calls, like dplyr::left_join(), constitutes a valid way to use another package within yours.
- All of the user-facing functions have an @export tag in their roxygen comment, which means that devtools::document() adds them correctly to the NAMESPACE file.
    - Note that f_to_c() is currently only used internally, inside celsify_temp(), so it is not exported (likewise for timestamp()).

#### check()ing our package
- This version of the package can be installed, used, AND it technically passes R CMD check, though with 1 warning and 1 note.
```
* checking R code for possible problems ... NOTE
celsify_temp: no visible binding for global variable ‘english’
celsify_temp: no visible binding for global variable ‘temp’
Undefined global functions or variables:
  english temp
```
- The “no visible binding” note is a peculiarity of using dplyr and unquoted variable names inside a package, where the use of bare variable names (english and temp) looks suspicious.
- You can add this line to any file below R/ to eliminate this note
`utils::globalVariables(c("english", "temp"))`

- Important note about tidyverse and dplyr packages
    - These packages prioritize the experience of the typical end user, at the expense of making them trickier to depend on. The two options shown above for suppressing the “no visible binding” note, represent entry-level solutions. For a more sophisticated treatment of these issues, see `vignette("in-packages", package = "dplyr")` and `vignette("programming", package = "dplyr")`.


### Concluding Thoughts

#### Script vs Package
- Typically, you identify certain recurring operations that occur across multiple projects and this is what you extract into an R package.
- You will still have R scripts, R Markdown reports, and Shiny apps, but by moving specific pieces of code into a formal package, your data products tend to become more concise and easier to maintain.

#### Finding the package within
- You typically start with a collection of idiosyncratic and related R scripts, scattered across different projects. Over time, you begin to notice that certain needs come up over and over again.
- Each time you revisit a similar analysis, you might try to elevate your game a bit, compared to the previous iteration. You refactor copy/paste-style code using more robust patterns and start to encapsulate key “moves” in helper functions, which might eventually migrate into their own file.
- Once you reach this stage, you’re in a great position to take the next step and create a package.

#### Package code is different
- Writing package code is a bit different from writing R scripts and it’s natural to feel some discomfort when making this adjustment. Here are the most common gotchas that trip many of us up at first:
    - Package code requires new ways of working with functions in other packages. The DESCRIPTION file is the principal way to declare dependencies; we don’t do this via library(somepackage).
    - If you want data or files to be persistently available, there are package-specific methods of storage and retrieval. You can’t just put files in the package and hope for the best.
    - It’s necessary to be explicit about which functions are user-facing and which are internal helpers. By default, functions are not exported for use by others.
    - A new level of discipline is required to ensure that code runs at the intended time (build time vs. run time) and that there are no unintended side effects.




# Package Components 

## Chapter 6: R Code

### Organising functions into files
- must store its function definitions in .r scripts that live in directory /R
- file name should be meaningful and convey what the functions are defined within the script do
- Often a single .r file will contain multiple function definitions such as a main function and its supporting helper functions.
- If you write helpers that serve multiple functions consider putting them in a `R/utils.R`

### Fast Feedback via load_all()
- As you add or modify functions defined in files below R/, you will naturally want to try them out. We want to reiterate our strong recommendation to use devtools::load_all()

### Code Style via styler package
- `styler::style_pkg()` restyles an entire R package.
- `styler::style_dir()` restyles all files in a directory.
- `usethis::use_tidy_style()` is wrapper that applies one of the above functions depending on whether the current project is an R package or not.
- `styler::style_file()` restyles a single file.
- `styler::style_text()` restyles a character vector.

### Executing Code
- code in a package is run when the package is built
- When you source() a script, every line of code is executed and the results are immediately made available
- Things are different with package code, because it is loaded in two steps. When the binary package is built (often, by CRAN) all the code in R/ is executed and the results are saved. When you attach a package with library(), these cached results are re-loaded and certain objects (mostly functions) are made available for your use.
    - this goes back to the build time vs run time discussion in previous chapters
-  
### Respect the R landscape
- Another big difference between a script and a package is that other people are going to use your package. This means you need to pay attention to the R landscape, which includes not just the available functions and objects, but all the global settings.
- You have changed the R landscape if you’ve loaded a package with library(), or changed a global option with options(), or modified the working directory with setwd().

- There are some functions that modify global settings that you should never use because there are better alternatives:
    - Don't use `library()` or `require()`. hese modify the search path, affecting what functions are available from the global environment. Instead, you should use the DESCRIPTION to specify your package’s requirements
    - Never use source() to load code from a file. source() modifies the current environment, inserting the results of executing the code
- Other functions that you should use with caution
    - options()
    - par()
    - setwd()
    - Sys.setenv()
    - Sys.setlocale()
    - set.seed() 
- If you need to modify the R landscape inside a function, then it is important to ensure your change is reversed on exit of that function
    - use on.exit() inside a function to register code to run later, that restores the landscape to its original state.
    - We usually manage state using the withr package, which provides a flexible, on.exit()-like toolkit (on.exit() itself is covered in the next section).

### Isolate side effects
- Creating plots and printing output to the console are two other ways of affecting the global R environment and these often can't be avoided
    - it’s good practice to isolate them in functions that only produce output. This also makes it easier for other people to repurpose your work for new uses.

### When you do need side effects
- Occasionally, packages do need side-effects. This is most common if your package talks to an external system — you might need to do some initial setup when the package loads. To do that, you can use two special functions: .`onLoad()` and `.onAttach()`.
- example
    - Startup messages are one place where you should use .onAttach() instead of .onLoad().
```
.onAttach <- function(libname, pkgname) {
  packageStartupMessage("Welcome to my package")
}
```
- .onLoad() and .onAttach() are called with two arguments: libname and pkgname.
    - They give the path where the package is installed (the “library”), and the name of the package.

- If you use `.onLoad()`, consider using `.onUnload()` to clean up any side effects. By convention, .onLoad() and friends are usually saved in a file called `R/zzz.R`

### Constant Health Checks
- typical sequence of calls when using devtools for package development:

1. Edit one or more files below R/.
2. document() (if you’ve made any changes that impact help files or NAMESPACE)
3. load_all()
4. Run some examples interactively.
5. test() (or test_active_file())
6. check()

1. Edit one or more files below R/.
2. Build, install, and use the package. Iterate occasionally with previous step.
3. Write documentation (once the code is “done”).
4. Write tests (once the code is “done”).
5. Run R CMD check right before submitting to CRAN or releasing in some other way.

## Chapter 7: Data
- If the primary purpose of a package is to distribute useful functions, example datasets make it easier to write excellent documentation. These datasets can be hand-crafted to provide compelling use cases for the functions in the package.
- Some packages exist solely for the purpose of distributing data, along with its documentation. These are sometimes called “data packages”.
- Finally, many packages benefit from having internal data that is used for internal purposes, but that is not directly exposed to the users of the package.

### Exported Data
- most common location for package data is in `data/`
    - recommend that each file is an .rda file created by `save()`.
    - The easiest way to achieve this is to use `usethis::use_data().`
- example
```
my_pkg_data <- sample(1000)
usethis::use_data(my_pkg_data)
```
- The snippet above creates data/my_pkg_data.rda inside the source of the pkg package and adds LazyData: true in your DESCRIPTION. This makes the my_pkg_data R object available to users of pkg via pkg::my_pkg_data
    - The snippet above is something the maintainer executes once (or every time they need to update my_pkg_data). This is workflow code and should not appear in the R/ directory of the source package. 
    - For larger datasets, you may want to experiment with the compression setting, which is under the control of the compress argument
- We recommend that you include LazyData: true in your DESCRIPTION if you are shipping .rda files below data/. If you use use_data() to create such datasets, it will automatically make this modification to DESCRIPTION for you.
- Often, the data you include in `data/` is a cleaned up version of raw data you’ve gathered from elsewhere. We highly recommend taking the time to include the code used to do this in the source version of your package. This makes it easy for you to update or reproduce your version of the data.

#### Preserve the origin story of package data
- We suggest that you keep this code in one or more .R files below data-raw/. You don’t want it in the bundled version of your package, so this folder should be listed in .Rbuildignore.
- use_data_raw() creates the data-raw/ folder and lists it in .Rbuildignore. A typical script in data-raw/ includes code to prepare a dataset and ends with a call to use_data().

#### Documenting Datasets
- Documenting data is like documenting a function with a few minor differences. Instead of documenting the data directly, you document the name of the dataset and save it in R/. For example, the roxygen2 block used to document the who data in tidyr is saved in R/data.R and looks something like this:
```
#' World Health Organization TB data
#'
#' A subset of data from the World Health Organization Global Tuberculosis
#' Report ...
#'
#' @format ## `who`
#' A data frame with 7,240 rows and 60 columns:
#' \describe{
#'   \item{country}{Country name}
#'   \item{iso2, iso3}{2 & 3 letter ISO country codes}
#'   \item{year}{Year}
#'   ...
#' }
#' @source <https://www.who.int/teams/global-tuberculosis-programme/data>
"who"
```
- two roxygen tags that are especially important
    - @format gives an overview of the dataset. For data frames, you should include a definition list that describes each variable. It’s usually a good idea to describe variables’ units here.
    - @source provides details of where you got the data, often a URL.

- never @export a data set

### Internal Data
- Sometimes your package functions need access to pre-computed data. If you put these objects in data/, they’ll also be available to package users, which is not appropriate. 
    - if data objects are small and simple enough that you can define them with c() or data.frame() in the code below R/, perhaps in R/data.R.
    - Larger or more complicated objects should be stored in your package’s internal data in R/sysdata.rda, so they are lazy-loaded on demand
- The easiest way to create R/sysdata.rda is to use usethis::use_data(internal = TRUE):
```
internal_this <- ...
internal_that <- ...

usethis::use_data(internal_this, internal_that, internal = TRUE)
```
- Unlike data/, where you use one .rda file per exported data object, you store all of your internal data objects together in the single file R/sysdata.rda.

- The advice for external data remains for internal data
    - It’s a good idea to store the code that generates your individual internal data objects, as well as the use_data() call that writes all of them into R/sysdata.rda. This is workflow code that belongs below data-raw/, not below R/.
    - usethis::use_data_raw() can be used to initiate the use of data-raw/ or to initiate a new .R script there.
    - If your package is uncomfortably large, experiment with different values of compress in use_data(internal = TRUE).

- Key Distinctions
    - Objects in R/sysdata.rda are not exported (they shouldn’t be), so they don’t need to be documented.

### Raw data file
- If you want to show examples of loading/parsing raw data, put the original files in inst/extdata/.
    - When the package is installed, all files (and folders) in inst/ are moved up one level to the top-level directory, which is why they can’t have names that conflict with standard parts of an R package
    - The files below inst/extdata/ in the source package will be located below extdata/ in the corresponding installed package. 

- The main reason to include such files is when a key part of a package’s functionality is to act on an external file. Examples of such packages include:
    - readr, which reads rectangular data out of delimited files
    - readxl, which reads rectangular data out of Excel spreadsheets

### Internal State
- Sometimes there’s information that multiple functions from your package need to access that:
    - Must be determined at load time (or even later), not at build time. It might even be dynamic.
    - Doesn’t make sense to pass in via a function argument.
- A great way to manage such data is to use an environment.1 This environment must be created at build time, but you can populate it with values after the package has been loaded and update those values over the course of an R session
- Example: My Favourite Letters
```
favorite_letters <- letters[1:3]

#' Report my favorite letters
#' @export
mfl <- function() {
  favorite_letters
}

#' Change my favorite letters
#' @export
set_mfl <- function(l = letters[24:26]) {
  old <- favorite_letters
  favorite_letters <<- l
  invisible(old)
}
```
- favorite_letters is initialized to (“a”, “b”, “c”) when the package is built. The user can then inspect favorite_letters with mfl(), at which point they’ll probably want to register their favorite letters with set_mfl()
- Unfortunately, a call to set_mfl() fails like so
```
mfl()
#> [1] "a" "b" "c"

set_mfl(c("j", "f", "b"))
#> Error in set_mfl() : 
#>   cannot change value of locked binding for 'favorite_letters'
```
- you can’t change the binding for objects in the package namespace (well, at least not without trying harder than this). Defining favorite_letters this way only works if you will never need to modify it.
- However, if we maintain state within an internal package environment, we can modify objects contained in the environment, and even add new objects
```
the <- new.env(parent = emptyenv())
the$favorite_letters <- letters[1:3]

#' Report my favorite letters
#' @export
mfl2 <- function() {
  the$favorite_letters
}

#' Change my favorite letters
#' @export
set_mfl2 <- function(l = letters[24:26]) {
  old <- the$favorite_letters
  the$favorite_letters <- l
  invisible(old)
}
```
- Note that this new value for the$favorite_letters persists only for the remainder of the current R session 
- At load time, the environment the is reset to an environment containing exactly one object, named favorite_letters, with value (“a”, “b”, “c”).
- use “the” as the name of an internal package environment. This lets you refer to the objects inside in a very natural way, such as the$token, meaning “the token”. It is also important to specify parent = emptyenv() when defining an internal environment, as you generally don’t want the environment to inherit from any other (nonempty) environment.

### Persistent user data
- Sometimes there is data that your package obtains, on behalf of itself or the user, that should persist even across R sessions.
    - For the data to persist this way, it has to be stored on disk and the big question is where to write such a file.

- The primary function you should use to derive acceptable locations for user data is `tools::R_user_dir()`
```
tools::R_user_dir("pkg", which = "data")
#> [1] "/home/runner/.local/share/R/pkg"
tools::R_user_dir("pkg", which = "config")
#> [1] "/home/runner/.config/R/pkg"
tools::R_user_dir("pkg", which = "cache")
#> [1] "/home/runner/.cache/R/pkg"
```

## Chapter 8: Other Components
- this chapter demystifies some package parts that are not needed in every package, but that are nice to be aware of.

### Other Directories
- `src/`
    - source and header files for compiled code, most often C and C++. This is an important technique that is used to make R packages more performant and to unlock the power of external libraries for R users.
- `inst/`
    - inst/: for arbitrary additional files that you want to include in your package. This includes a few special files, like the CITATION
- `tools/`
    - auxiliary files needed during configuration, usually found in the company of a configure script.

### Installed files
- When a package is installed, everything in inst/ is copied into the top-level directory of the installed package
- Here are some of the most common files and folders found in inst/:
    - inst/CITATION: how to cite the package, see below for details.
    - inst/extdata: additional external data for examples and vignettes.


# Package Metadata

- DESCRIPTION and NAMESPACE are two important files that provide metadata about your package. The DESCRIPTION file provides overall metadata about the package, such as the package name and which other packages it depends on. The NAMESPACE file specifies which functions your package makes available for others to use and, optionally, imports functions from other packages.

## Chapter 9: DESCRIPTION

### The DESCRIPTION FILE
- The job of the DESCRIPTION file is to store important metadata about your package. When you first start writing packages, you’ll mostly use these metadata to record what packages are needed to run your package. However, as time goes by, other aspects of the metadata file will become useful to you, such as revealing what your package does (via the Title and Description) and whom to contact (you!) if there are any problems.

- Every package must have a DESCRIPTION
    - `usethis::create_package("mypackage")` automatically adds a bare-bones DESCRIPTION file. This will allow you to start writing the package without having to worry about the metadata until you need to. This minimal DESCRIPTION will vary a bit depending on your settings, but should look something like this:
```
Package: mypackage
Title: What the Package Does (One Line, Title Case)
Version: 0.0.0.9000
Authors@R: 
    person("First", "Last", , "first.last@example.com", role = c("aut", "cre"))
Description: What the package does (one paragraph).
License: `use_mit_license()`, `use_gpl3_license()` or friends to pick a
    license
Encoding: UTF-8
Roxygen: list(markdown = TRUE)
RoxygenNote: 7.3.2
```

### Title and Description
- The Title and Description fields describe what the package does. They differ only in length:
    - Title is a one line description of the package, and is often shown in a package listing. It should be plain text (no markup), capitalised like a title, and NOT end in a period. Keep it short: listings will often truncate the title to 65 characters.
    - Description is more detailed than the title. You can use multiple sentences, but you are limited to one paragraph. If your description spans multiple lines (and it should!), each line must be no more than 80 characters wide. Indent subsequent lines with 4 spaces.

### Author
- Use the Authors@R field to identify the package’s author, and whom to contact if something goes wrong. This field is unusual because it contains executable R code rather than plain text. Here’s an example:
```
Authors@R: person("Hadley", "Wickham", email = "hadley@posit.co",
  role = c("aut", "cre"))
```
### URL and BUG Reports
- As well as the maintainer’s email address, it’s a good idea to list other places people can learn more about your package. The URL field is commonly used to advertise the package’s website (Chapter 19) and to link to a public source repository, where development happens.
-  BugReports is the URL where bug reports should be submitted, e.g., as GitHub issues. For example, devtools has:
```
URL: https://devtools.r-lib.org/, https://github.com/r-lib/devtools
BugReports: https://github.com/r-lib/devtools/issues
```
- If you use usethis::use_github() to connect your local package to a remote GitHub repository, it will automatically populate URL and BugReports for you. If a package is already connected to a remote GitHub repository, usethis::use_github_links() can be called to just add the relevant links to DESCRIPTION.

### License
- The License field is mandatory and must specify your package’s license in a standard form recognized by R. The official tooling aims to identify standard open source licenses, so it’s important to appreciate that License is basically a machine-readable field.

### Imports, Suggests, and friends
- Two of the most important and commonly used DESCRIPTION fields are Imports and Suggests, which list other packages that your package depends on
```
Imports:
    dplyr,
    tidyr
```
- Packages listed in Suggests are either needed for development tasks or might unlock optional functionality for your users. The lines below indicate that, while your package can take advantage of ggplot2 and testthat, they’re not absolutely required:
```
Suggests:
    ggplot2,
    testthat
```
- Both Imports and Suggests take a comma-separated list of package names. We recommend putting one package on each line, and keeping them in alphabetical order
- The easiest way to add a package to Imports or Suggests is with usethis::use_package()
```
usethis::use_package("dplyr") # Default is "Imports"
#> ✔ Adding dplyr to 'Imports' field in DESCRIPTION.
#> ☐ Refer to functions with `dplyr::fun()`.

usethis::use_package("ggplot2", "Suggests")
#> ✔ Adding ggplot2 to 'Suggests' field in DESCRIPTION.
#> ☐ Use `requireNamespace("ggplot2", quietly = TRUE)` to test if
#>   ggplot2 is installed.
#> ☐ Then directly refer to functions with `ggplot2::fun()`.
```

#### Minimum Vectors
- If you need a specific version of a package, specify it in parentheses after the package name:
```
Imports:
    dplyr (>= 1.0.0),
    tidyr (>= 1.1.0)
```
- Versioning is most important if you will release your package for use by others. Usually people don’t have exactly the same versions of packages installed that you do.
    - If someone has an older package that doesn’t have a function your package needs, they’ll get an unhelpful error message if your package does not advertise the minimum version it needs. However, if you state a minimum version, they’ll automatically get an upgrade when they install your package.

### Other fields
- A few other DESCRIPTION fields are heavily used and worth knowing about:

    - `Version` is very important as a way of communicating where your package is in its lifecycle and how it is evolving over time. Learn more in Chapter 21.

    - `LazyData` is relevant if your package makes data available to the user. If you specify LazyData: true, the datasets are lazy-loaded, which makes them more immediately available.

    - `Encoding` describes the character encoding of files throughout your package. Our tooling will set this to Encoding: UTF-8 as this is the most common encoding in use today, and we are not aware of any reasons to use a different value.

    - `Collate` controls the order in which R files are sourced. This only matters if your code has side-effects; most commonly because you’re using S4. If needed, Collate is typically generated by roxygen2 through use of the @include tag. See ?roxygen2::update_collate for details.

    - `VignetteBuilder` lists any package that your package needs as a vignette engine. Our recommended vignette workflow is described in Section 17.1, which will list the knitr package in VignetteBuilder.

    - `SystemRequirements` is where you describe dependencies external to R. This is a plain text field and does not, for example, actually install or check for anything, so you might need to include additional installation details in your README (Section 18.1).