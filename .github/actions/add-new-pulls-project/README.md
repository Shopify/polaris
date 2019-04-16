# Add new pull requests to project

> ✨ GitHub action to automagically add new pull requests to projects.


## How to use

To use this action we need the project name and the name of the column for the new pull requests will go into. The project and column names will be used to get a column ID for automation.

In your project create a new workflow file `.github/main.workflow`:
```
workflow "✨Add new pull requests to projects" {
  resolves = ["alex-page/add-new-pulls-project"]
  on = "pull_requests"
}

action "alex-page/add-new-pulls-project" {
  uses = "alex-page/add-new-pulls-project@master"
  args = [ "🎒 Backlog", "To do"]
  secrets = ["GITHUB_TOKEN"]
}
```

> Note: Replace `🎒 Backlog` with your project name and `To do` with your project column.


## Release history

- v0.0.1 - First release
