# R Packages

## First Overview
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