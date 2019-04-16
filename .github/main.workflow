workflow "✨Add new issues to project" {
  resolves = ["Add new issues to project"]
  on = "issues"
}

action "Add new issues to project" {
  uses = "./.github/actions/add-new-issue-project/"
  args = ["🌌 Polaris backlog", "👀 Triage"]
  secrets = ["GITHUB_TOKEN"]
}

workflow "✨Add new pulls to projects" {
  resolves = ["Add new pull requests to project"]
  on = "pull_request"
}

action "Add new pull requests to project" {
  uses = "./.github/actions/add-new-pulls-project/"
  args = ["🌌 Polaris backlog", "👀 Triage"]
  secrets = ["GITHUB_TOKEN"]
}

workflow "✨Move assigned issues to column" {
  resolves = ["Move assigned issue to column"]
  on = "issues"
}

action "Move assigned issue to column" {
  uses = "./.github/actions/move-assigned-issue-column/"
  args = ["🌌 Polaris backlog", "🚀 In progress"]
  secrets = ["GITHUB_TOKEN"]
}

workflow "✨Move assigned pull requests to column" {
  resolves = ["Move assigned pull requests to column"]
  on = "pull_request"
}

action "Move assigned pull requests to column" {
  uses = "./.github/actions/move-assigned-pulls-column/"
  args = ["🌌 Polaris backlog", "🚀 In progress"]
  secrets = ["GITHUB_TOKEN"]
}
