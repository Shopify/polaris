---
title: Working with the Polaris team
description: When you contribute to Polaris, you help the Shopify community create better experiences for merchants, faster. Contribution takes thoughtful planning.
keywords:
  - service level agreement
  - SLA
  - contributing to polaris
  - open source
  - contribution guide
---

Through supporting teams, we’ve learned what works well, and not so well. We’ve outlined these things so that you can create a successful plan. This guide goes into detail, but here are the highlights.

### TL;DR

- High pressure deadlines are stressful, but the Polaris team can’t be pulled in to unblock. Think about the system early in the design process and plan for any system updates or additions ahead of the build stage. The Polaris team is here to support you while planning. Start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/6750) for a larger contribution. For smaller contributions like bug fixes, read the [contribution guide](/contributing).
- For the system to stay healthy and scale, contributions require a certain level of [quality](/contributing/quality-contributions)
- If you make a custom solution, your team is responsible for maintaining it. Be aware of the impact if other teams use or tweak your custom solution. Always use Polaris tokens. Learn more about [when to make a contribution](/contributing/#when-to-contribute) vs a custom solution.
- The best way to get support is to start a [Github discussion](https://github.com/Shopify/polaris/discussions/6750) or reach out in the #polaris channel (if you’re a Shopify employee). Please avoid direct messaging Polaris team members about a system inquiry.

### Polaris support

Our community is important to us. For our community support to scale, we rely on operations that distribute our efforts, while also giving us time to work on system projects. We lean on asynchronous collaboration as much as possible since our team is internationally distributed. Here’s how we mainly provide support:

- Through a support rotation during working hours. The scheduled support pair monitors the internal #polaris Slack channel and [Github](https://github.com/Shopify/polaris), and makes an effort to respond within 24 hours for inquiries and 72 hours for collaboration requests
- Ad hoc pairing sessions and asynchronous collaboration for system contributions

## Product team tips
With some early planning and intentional systems thinking, the build stage will go a lot smoother.

### Plan for systems changes ahead of time

The Polaris team should never be pulled in to unblock a team from shipping something quickly—we’re here to support and guide teams when they’re planning their strategic system changes ahead of time. Teams at Shopify should start working on their system needs early in the design and build process and are expected to make [quality system contributions](link to new quality guidelines) ahead of their ship dates. 

### Aim to systematize your custom solutions

Things don’t always go according to plan. If a team is still learning how to plan for system changes and finds themselves under pressure to quickly ship something custom, they’re responsible for owning any custom components they ship. The components should use [Polaris tokens](https://polaris.shopify.com/tokens/colors) and the team should make an effort to systematize the custom solution down the road. When product-wide changes happen in the future, the product team will be responsible for updating their custom components.

## Collaborations and system contributions

When an opportunity for a collaboration related to a system contribution comes up, we’ll add it to our [backlog](https://github.com/orgs/Shopify/projects/2250/views/5) for triaging. Collaboration opportunities can be worked on through cross-product team pairings and don't always have to be with Polaris.

### Triaging considerations

During our triaging process, teams can expect that the Polaris team will help:

- figure out how a component can be composed and/or how a pattern can be systematized
- see if and where the contribution should be added to the system
- identify system dependencies for making the contribution
- identify other teams that could join the collaboration (and determine if the Polaris team needs to be involved)

The Polaris team will prioritize collaborating on contributions that:

- have the highest number of community upvotes in Github discussions
- help other teams solve similar problems so that we make the best possible impact on the merchant experience, such as the addition of new patterns
- align with ongoing system improvement projects, for example, a team wants to make layout improvements while the Polaris team improves the layout foundations
- break down large and complex composite components into primitive, foundational components

### Polaris support during collaborations

If the Polaris team is the main collaborator on a system contribution, the Polaris team will:

- pair with the contributor(s) asynchronously, or when it's more efficient, through ad hoc video calls
- direct internal contributors to the #Admin-UX community if extra feedback is needed on the solution being explored
- offer systems coaching to the subject matter experts with the most context on the merchant problem that's being solved
- help the contributor with any systems tooling related to shipping the solution

## Polaris on-call support

The Polaris team rotation schedule assigns one UXer and one developer to cover system inquiries and collaboration requests. Coverage is during their distributed working hours, Monday to Friday. The pair on rotation will:

- direct internal #polaris Slack questions to a resolution
- direct large requests for collaboration to @polaris-enablement for triaging
- review, clean up, or close GitHub issues
- provide PR reviews where necessary
- participate in GitHub discussions where necessary

If an issue doesn’t get resolved by the end of their work day, it’s passed along to the next scheduled support pair.

If a Polaris team member is individually DM’d, they’ill forward the inquiry/request to the internal #polaris channel for the pair on call to respond.

Admin pattern questions should be posted in the #admin-ux channel and if a question relates to #polaris, it should be forwarded to the #polaris channel.

## Response time goals

These response time goals are for GitHub and our internal #polaris Slack channel.

| Request type                                                                                                                                 | Initial response time                                                                         | Time to resolve                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production grade bug in shopify/web and shopify/polaris                                                                                      | @here in the internal #polaris channel and the support person on call will respond.           | As soon as possible                                                                                                                                                                             |
| **System inquiry**<br/> A response would help move things along but the problem can continue to be solved without the response               | 24 hours                                                                                      | 48 hours                                                                                                                                                                                        |
| **Collaboration request**<br/> An opportunity has been identified for an individual or team to collaborate with Polaris to evolve the system | 72 hours: [Github discussion](https://github.com/Shopify/polaris/discussions/6750) is started | 1 week: Discussions identified for a larger Polaris team collaboration have an issue added to the [Polaris backlog](https://github.com/orgs/Shopify/projects/2250/views/5) for project triaging |


## Third party developer response times

Polaris is an open source project used by Shopify employees, and Shopify Partners building apps. We value all feedback, feature requests, issues, and pull requests from our open source community. However, we aren’t able to accommodate every request and take longer than we’d like to respond to everyone. We review every request and prioritize them against our product roadmap based on user needs. Below is the process for every open source contribution:

| Contribution type                                                                | Team response                                                                                                                                                                                                                                | How you can help                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bug report                                                                       | Prioritized against our backlog and roadmap. If there's a clear or urgent need for a fix we'll add it to our backlog.                                                                                                                        | Leave comments with additional information on how to reproduce the bug and how it's affecting your use case.<br/><br/> If you're interested in a fix, [upvote](https://github.com/Shopify/polaris/discussions/6750) the bug report to let the team know. |
| Feature request                                                                  | For now, feature requests will be closed and reviewed against our existing backlog and roadmap. We'll evaluate interest in the request and prioritize it for development if there is enough interest and alignment with our product roadmap. | If you're interested in the feature please upvote the request in [GitHub](https://github.com/Shopify/polaris/discussions/6750) to let the team know.                                                                                                     |
| Pull request                                                                     | Will review [PRs](https://github.com/Shopify/polaris/pulls) for system alignment, user need, and contribution quality.                                                                                                                       | Leave comments for code review.<br/><br/> Upvote the request in [GitHub](https://github.com/Shopify/polaris/discussions/6750) to express interest and let the team know you want this feature.                                                           |
| Start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/6750) | Review discussions and close or respond as needed                                                                                                                                                                                            | Participate in a discussion to express interest or share your opinion.                                                                                                                                                                                   |