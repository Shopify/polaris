workflow "✨Add new issues to project" {
  resolves = ["Add new issues to project"]
  on = "issues"
}

action "Add new issues to project" {
  uses = "alex-page/add-new-issue-project@master"
  args = ["🌌 Polaris backlog", "👀 Triage"]
  secrets = [
    "GITHUB_TOKEN",
    "GH_PAT",
  ]
}

workflow "✨Move assigned issues to column" {
  resolves = ["Move assigned issue to column"]
  on = "issues"
}

action "Move assigned issue to column" {
  uses = "alex-page/move-assigned-issue-column@master"
  args = ["🌌 Polaris backlog", "🚀 In progress"]
  secrets = [
    "GITHUB_TOKEN",
    "GH_PAT",
  ]
}
