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
