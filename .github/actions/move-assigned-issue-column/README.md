# Move assinged issue to column

> ✨ GitHub action to automagically move assinged issue to a column.


## How to use

To use this action we need the project name and the name of the column for the new issues will go into. The project and column names will be used to get a column ID for automation.

In your project create a new workflow file `.github/main.workflow`:
```
workflow "✨ Move assinged issue to column" {
  resolves = ["Move assigned issue to column"]
  on = "issue"
}

action "Move assigned issue to column" {
  uses = "alex-page/move-assigned-issue-column@master"
  args = [ "🎒 Backlog", "In progress"]
  secrets = ["GITHUB_TOKEN"]
}
```

> Note: Replace `🎒 Backlog` with your project name and `In progress` with your project column.


## Release history

- v0.0.1 - First release
