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

