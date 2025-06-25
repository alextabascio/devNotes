# Introduction

source for these notes: https://happygitwithr.com/

## Benefits
- Exposure: If someone needs to see your work or if you want them to try out your code, they can easily get it from GitHub. If they use Git, they can clone or fork your repository

- Be a keener! If you care deeply about someone else’s project, such as an R package you use heavily, you can track its development on GitHub. You can watch the repository to get notified of major activity. You can fork it to keep your own copy. You can modify your fork to add features or fix bugs and send them back to the owner as a proposed change.

- Collaboration: If you need to collaborate on data analysis or code development, then everyone should use Git. Use GitHub as your clearinghouse: individuals work independently, then send work back to GitHub for reconciliation and transmission to the rest of the team.

## Special Features
- Issues. Remember how we’re high-jacking software development tools? Well, this is the bug tracker. It’s a list of things … bugs, feature requests, to dos, whatever.
    - Issues are tightly integrated with email and therefore allow you to copy/embed important conversations in the associated repo.
    - Issues can be assigned to people (e.g., to dos) and tagged (“bug” or “progress-report”).
    - Issues are tightly integrated with commits and therefore allow you to record that the changes in this commit solve that problem which was discussed in that issue.
    - As a new user of GitHub, one of the most productive things you can do is to use GitHub issues to provide a clear bug report or feature request for a package you use.

- Pull Requests
    - Pull requests. Git allows a project to have multiple, independent branches of development, with the notion that some should eventually be merged back into the main development branch
    - A pull request is a formal proposal that says: “Here are some changes I would like to make.” It might be linked to a specific issue: “Related to #14.” or “Fixes #56”. GitHub facilitates and preserves the discussion of the proposal, holistically and line-by-line.


# Installation of R and Git



# Connect Git, GitHub and RStudio

## Personal Access Tokens
- This is a very minimal account of getting and storing a PAT. This might be all you need when you’re first getting yourself set up. You can always come back later and read other parts of this chapter.

Generating a PAT

- The usethis approach takes you to a pre-filled form where we have pre-selected some recommended scopes, which you can look over and adjust before clicking “Generate token”. At the time of writing, the usethis-recommended scopes are “repo”, “user”, “gist”, and “workflow”.

`usethis::create_github_token()`


Storing a PAT

- You could even get out ahead of this and store the PAT explicitly right now. In R, call `gitcreds::gitcreds_set()` to get a prompt where you can paste your PAT:

- Paste the PAT in response to the dialogue in the console:

```
? Enter password or token: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-> Adding new credentials...
-> Removing credentials from cache...
-> Done.
```

If you already have a stored credential, gitcreds::gitcreds_set() reveals this and will even let you inspect it. This helps you decide whether to keep the existing credential or replace it. When in doubt, embrace a new, known-to-be-good credential over an old one, of dubious origins.

You can check that you’ve stored a credential with `gitcreds_get()`

### HTTPS vs SSH
- I find HTTPS easier to get working quickly and strongly recommend it when you first start working with Git/GitHub

- A properly configured PAT means all of this will “just work”:
    - Remote HTTPS operations via command line Git and, therefore, via RStudio
    - Remote HTTPS operations via the gert R package and, therefore, usethis
    - GitHub API operations via the gh R package and, therefore, usethis


## Connect Git, GitHub and R Studio

1. Make a repo on GitHub

2. Clone the repo to your computer via R studio

3. Make local chnages, save, commit

4. Push your changes to GitHub

5. Confirm local changes propagated to GitHub remote
