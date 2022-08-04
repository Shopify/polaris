---
title: Working with the polaris team
description: When you contribute to Polaris, you help the Shopify community create better experiences for merchants, faster. Contribution takes thoughtful planning.
keywords:
  - service level agreement
  - SLA
  - contributing to polaris
  - open source
  - contribution guide
---

## Tl;dr

Through supporting teams, we’ve learned what works well, and not so well. We’ve outlined these things so that you can create a successful plan. This guide goes into detail, but here are the highlights:

**The Polaris team is here to support your team while planning.**

- High pressure deadlines are stressful, but the Polaris team can’t be pulled in last minute to unblock you.
- For the system to stay healthy and scale, contributions require a certain level of [quality](/contributing/quality-contributions).
- Think about the system in the prototype phase of your project so your team can plan for contribution ahead of the build phase.
- For smaller contributions like bug fixes, follow the [contribution guidance](/contributing).
- Start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/6750) for a larger contribution.

**Product teams are responsible for maintenance of custom components.**

- Be aware of the impact if other teams use or tweak your already custom solution.
- Always use Polaris tokens.
- Learn more about [when to make a contribution](/contributing/#when-to-contribute) vs a custom solution.

**The best way to get help is through Polaris support channels.**

- Engage the community by starting a [Github discussion](https://github.com/Shopify/polaris/discussions/6750).
- You can also reach out in the #polaris Slack channel if you work at Shopify.
- Avoid direct messaging Polaris team members with system inquiries so the rest of the community can benefit from the support you receive.

## Support model

Our community is important to us. For our community support to scale, we rely on operations that distribute our efforts to give us time to work on system projects. We lean on asynchronous collaboration as much as possible since our team is internationally distributed. We provide support through:

- A scheduled rotation of a pair internal Polaris community members who monitor and facilitate support of the internal #polaris Slack channel and the Polaris [Github repository](https://github.com/Shopify/polaris).
- Ad hoc pairing sessions and asynchronous collaboration for system contributions

We make an effort to respond within 24 hours for inquiries and 72 hours for collaboration requests.

## On-call rotation

The Polaris team's support rotation schedule assigns one UXer and one Developer to cover system inquiries and collaboration requests. Coverage is during their distributed working hours, Monday through Friday. The pair on rotation:

- Directs internal #polaris Slack questions to a resolution
- Directs large requests for collaboration to @polaris-enablement for triaging
- Reviews, cleans up, or closes GitHub issues
- Facilitates PR reviews and GitHub discussions

If an issue doesn’t get resolved by the end of their work day, it’s passed along to the next scheduled support pair.

If a Polaris team member is direct messaged, they’ll forward the inquiry/request to the internal #polaris channel for the pair on call to respond.

## Response time goals

Think about the system early in the design process. Learn about [when to work with the Polaris team](/contributing/#when-to-contribute).

### GitHub and internal Slack

| Request type                                                                                                                                 | Initial response time                                                                         | Time to resolve                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production grade bug in shopify/web and shopify/polaris                                                                                      | @here in the internal #polaris channel and the support person on call will respond.           | As soon as possible                                                                                                                                                                             |
| **System inquiry**<br/> A response would help move things along but the problem can continue to be solved without the response               | 24 hours                                                                                      | 48 hours                                                                                                                                                                                        |
| **Collaboration request**<br/> An opportunity has been identified for an individual or team to collaborate with Polaris to evolve the system | 72 hours: [Github discussion](https://github.com/Shopify/polaris/discussions/6750) is started | 1 week: Discussions identified for a larger Polaris team collaboration have an issue added to the [Polaris backlog](https://github.com/orgs/Shopify/projects/2250/views/5) for project triaging |

### Third party developer response times

Polaris is an open source project used by Shopify employees and Shopify Partners building apps. We value all feedback, feature requests, issues, and pull requests from our open source community. However, we aren’t able to accommodate every request and may take longer than we’d like to respond to everyone. We review every request and prioritize them against our roadmap based on user needs.

Below is the process for every open source contribution:

| Contribution type                                                                | Team response                                                                                                                                                                                                                                | How you can help                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bug report                                                                       | Prioritized against our backlog and roadmap. If there's a clear or urgent need for a fix we'll add it to our backlog.                                                                                                                        | Leave comments with additional information on how to reproduce the bug and how it's affecting your use case.<br/><br/> If you're interested in a fix, [upvote](https://github.com/Shopify/polaris/discussions/6750) the bug report to let the team know. |
| Feature request                                                                  | For now, feature requests will be closed and reviewed against our existing backlog and roadmap. We'll evaluate interest in the request and prioritize it for development if there is enough interest and alignment with our product roadmap. | If you're interested in the feature please upvote the request in [GitHub](https://github.com/Shopify/polaris/discussions/6750) to let the team know.                                                                                                     |
| Pull request                                                                     | Will review [PRs](https://github.com/Shopify/polaris/pulls) for system alignment, user need, and contribution quality.                                                                                                                       | Leave comments for code review.<br/><br/> Upvote the request in [GitHub](https://github.com/Shopify/polaris/discussions/6750) to express interest and let the team know you want this feature.                                                           |
| Start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/6750) | Review discussions and close or respond as needed                                                                                                                                                                                            | Participate in a discussion to express interest or share your opinion.                                                                                                                                                                                   |

### What we're not responsible for

The Polaris team will not be pulled in to unblock a team from shipping something quickly. Teams are responsible for thinking about their needs from the system early in their project process. The Polaris team is here to support and guide teams when planning their strategic system changes ahead of time.

Read the [guide to contribution](/contributing) to learn more about how to evolve the system.

### Shopify's internal #admin-ux channel

When UX employees at Shopify have questions about how to design for the admin, like if a pattern they're exploring would best solve a merchant problem, questions should be posted in #admin-ux. The admin UX community can help make contextual decisions that require a more in-depth understanding of the product and the merchant problem.

We welcome the general UX community to help people think about the system. If a question relates to #polaris, it can be forwarded to the #polaris channel.

### Collaborations and system contributions

When Polaris or another team identifies an opportunity for a cross-team collaboration related to a system contribution, we'll add the opportunity to our [backlog](https://github.com/orgs/Shopify/projects/2250/views/5) for triaging.

## Triaging considerations

Teams are encouraged to collaborate with other product teams on Polaris contributions---the Polaris team doesn't always need to be the main collaborator. During our triaging process, teams can expect that the Polaris team will help:

- figure out how a component can be composed and/or how a pattern can be systematized

- see if and where the contribution should be added to the system

- identify system dependencies for making the contribution

- identify other teams that could join the collaboration (and determine if the Polaris team needs to be involved)

The Polaris team will prioritize collaborating on contributions that:

- have the highest number of community upvotes in Github discussions

- help other teams solve similar problems so that we make the best possible impact on the merchant experience, such as the addition of new patterns

- align with ongoing system improvement projects, for example, a team wants to make layout improvements while the Polaris team improves the layout foundations

- break down large and complex composite components into primitive, foundational components

## Collaborations and for contributions

If the Polaris team is the main collaborator on a system contribution, the Polaris team will:

- Pair with the contributor(s) asynchronously, or when it's more efficient, through ad hoc video calls
- Direct internal contributors to the #admin-ux community if extra feedback is needed on the solution being explored
- Offer systems coaching to the subject matter experts with the most context on the merchant problem that's being solved
- Help the contributor with any systems tooling related to shipping the solution

## Product team considerations

### Plan for systems changes ahead of time

Teams at Shopify should start working on their system needs early in the design and build process and are expected to make [quality system contributions](link to new quality guidelines) ahead of their ship dates.

The Polaris team should never be pulled in to unblock a team from shipping something quickly. The Polaris team is here to support and guide teams when they’re planning their strategic system changes ahead of time.

### Aim to systematize your custom solutions

Things don’t always go according to plan. If a team is still learning how to plan for system changes and finds themselves under pressure to ship something custom quickly, they’re responsible for owning their custom components.

The components should use [Polaris tokens](https://polaris.shopify.com/tokens/colors) and they should make an effort to systematize the custom solution down the road. When product-wide changes happen in the future, the product team will be responsible for updating their custom components and any other places where their custom solution is copied to other features.
