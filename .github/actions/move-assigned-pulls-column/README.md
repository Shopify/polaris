# Move assinged pull request to column

> ✨ GitHub action to automagically move assinged pull request to a column.


## How to use

To use this action we need the project name and the name of the column for the new pull requests will go into. The project and column names will be used to get a column ID for automation.

In your project create a new workflow file `.github/main.workflow`:
```
workflow "✨ Move assinged pull request to column" {
  resolves = ["Move assigned pull request to column"]
  on = "pull_requests"
}

action "Move assigned pull request to column" {
  uses = "alex-page/move-assigned-pulls-column@master"
  args = [ "🎒 Backlog", "In progress"]
  secrets = ["GITHUB_TOKEN"]
}
```

> Note: Replace `🎒 Backlog` with your project name and `In progress` with your project column.


## Release history

- v0.0.1 - First release
