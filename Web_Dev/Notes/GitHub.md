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


# Git Fundamentals

## Repository
- Git is a version control system whose original purpose was to help groups of developers work collaboratively on big software projects. Git manages the evolution of a set of files – called a repository or repo – in a highly structured way.
- The daily workflow is probably not dramatically different from what you do currently. You work in the usual way, writing R scripts or authoring reports in LaTeX or R Markdown. But instead of only saving individual files, periodically you make a commit, which takes a snapshot of all the files in the entire project.

## Commits, diffs, tags
- Recall that a repository or repo is just a directory of files that Git manages holistically. A commit functions like a snapshot of all the files in the repo, at a specific moment. 
- Consider version A of a file and a modified version, version B. Assume that version A was part of one Git commit and version B was part of the next commit. The set of differences between A and B is called a “diff” and Git users contemplate diffs a lot. Diff inspection is how you re-explain to yourself how version A differs from version B. Diff inspection is not limited to adjacent commits. You can inspect the diffs between any two commits.
- Every time you make a commit you must also write a short commit message. Ideally, this conveys the motivation for the change. Remember, the diff will show the content. When you revisit a project after a break or need to digest recent changes made by a colleague, looking at the history, by reading commit messages and skimming through diffs, is an extremely efficient way to get up to speed.

## Git Commands
- clone: create a new local version
- commit: stage local changes
- diff: compare versions
- push: push local main to GitHub main
- pull: pull commits from GitHub
- checkout [branch name]: switch to a branch

## Branches
- Branching means that you take a detour from the main stream of development and do work without changing the main stream. It allows one or many people to work in parallel without overwriting each other’s work. It allows a someone working solo to work incrementally on an experimental idea, without jeopardizing the state of the main product. Branching in Git is very lightweight, which means creating a branch and switching between branches is nearly instantaneous. This means Git encourages workflows which create small branches for exploration or new features, often merging them back together quickly.

### Create a new branch
- You can create a new branch with `git branch`, then checkout the branch with `git checkout`. To distinguish it from the main stream of development, presumably on main, we’ll call this a “feature branch”.
```
git branch issue-5
git checkout issue-5
```

### Switching branches
- You use `git checkout` to switch between branches.

- But what do you do if you are working on a branch and need to switch, but the work on the current branch is not complete? One option is the Git stash, but generally a better option is to safeguard the current state with a temporary commit. Here I use “WIP” as the commit message to indicate work in progress.
```
git commit --all -m "WIP"
git checkout main
```
- Then when you come back to the branch and continue your work, you need to undo the temporary commit by resetting your state. Specifically, we want a mixed reset. This is “working directory safe”, i.e. it does not affect the state of any files. But it does peel off the temporary WIP commit. Below, the reference HEAD^ says to roll the commit state back to the parent of the current commit (HEAD).
```
git checkout issue-5
git reset HEAD^
```

### Merging
Once you have done your work and committed it to the feature branch, you can switch back to main and merge the feature branch.
```
git checkout main
git merge issue-5
```

### Dealing with conflicts
- Most of the time, the merge will go smoothly. However if both the branches you are merging changed the same part of the same file you will get a merge conflict.

- The first thing to do is NOT PANIC. Merge conflicts are not the end of the world and most are relatively small and straightforward to resolve.

- The first step to solving a merge conflict is determining which files are in conflict, which you can do with `git status`

- To resolve the conflict, edit this section until it reflects the state you want in the merged result. Pick one version or the other or create a hybrid. Also remove the conflict markers <<<<<<, ====== and >>>>>>.

#### Bailing out
- If, during the merge, you get confused about the state of things or make a mistake, use git merge --abort to abort the merge and go back to the state prior to running git merge. Then you can try to complete the merge again.


# Daily Workflows

## Repeated Append




