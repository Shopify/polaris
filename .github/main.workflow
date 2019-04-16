workflow "✨Add new issues to project" {
  resolves = ["Add new issues to project"]
  on = "issues"
}

action "Add new issues to project" {
  uses = "alex-page/add-new-issue-project@master"
  args = ["🌌 Polaris backlog", "👀 Triage"]
  secrets = ["GITHUB_TOKEN"]
}

workflow "✨Add new pulls to projects" {
  resolves = ["Add new pull requests to project"]
  on = "pull_request"
}

action "Add new pull requests to project" {
  uses = "alex-page/add-new-pulls-project@master"
  args = ["🌌 Polaris backlog", "👀 Triage"]
  secrets = ["GITHUB_TOKEN"]
}

workflow "✨Move assigned issues to column" {
  resolves = ["Move assigned issue to column"]
  on = "issues"
}

action "Move assigned issue to column" {
  uses = "alex-page/move-assigned-issue-column@master"
  args = ["🌌 Polaris backlog", "🚀 In progress"]
  secrets = ["GITHUB_TOKEN"]
}

workflow "✨Move assigned pull requests to column" {
  resolves = ["Move assigned pull requests to column"]
  on = "pull_request"
}

action "Move assigned pull requests to column" {
  uses = "alex-page/move-assigned-pulls-column@master"
  args = ["🌌 Polaris backlog", "🚀 In progress"]
  secrets = ["GITHUB_TOKEN"]
}
