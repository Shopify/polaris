# Tophatting 🎩

## Summary

This is a collection of lessons learned from breaking things. It’s not enough to rely on automated tests.

As you make changes, non-obvious things can break. Manual testing (we call it “tophatting”, or 🎩 for short) adds that extra degree of certainty that what you’re shipping works and behaves as expected. Both you, as the author of a PR, and someone on your team, should 🎩 before merging.

## When should you 🎩?

- When you’re adding a feature and want to make sure it works
- When you’re refactoring existing code and need to make sure the current behavior is still there

## What should you 🎩?

**Do a thorough 🎩 when making a big or potentially breaking change.** Obvious problems often won’t be caught in the console on page load. This is why it’s good to try at least one realistic workflow to test your changes. This might seem tedious (a few extra clicks), but catching bugs before they reach users is much less expensive. Depending on the nature of the change, a 🎩 could range from UI only, or it could mean ad hoc testing on the API, or both.

**Consider testing:**

- Existing functionality which could break as a result of the changes in the PR (if you are changing anything global, expect it to break easily)
- New functionality being introduced. Ensure that it meets the intended behavior
- All different permutations (flows, states, conditions, etc) that are possible
- If you are modifying something which is used in multiple places, 🎩 all affected areas not just what you intend to change

## Approach to writing tophatting instructions

Spending the extra time to provide clear instructions saves everybody time, and reviewers will thank you for making their job easy.

- Start by guiding users on how to achieve a clean state
- Consider writing step-by-step instructions on which areas need 🎩 and how to interact with them
- Include how to 🎩 any conditional situations in your code
- Be explicit about the scope of your changes so that unrelated bugs don’t block the PR
- Be explicit about your own 🎩, and any areas or interactions you might be unsure about
- Include a screenshot of the expected result of a successful 🎩
- Be grateful (for example, “Thanks for catching that!”) – reviewers are taking time out of their day to help you and that’s a special kind of gift

## Approach to tophatting someone’s PR

Giving someone a thorough 🎩 builds trust and trains your attention to detail.

- Make sure you understand the scope and purpose of the author’s PR – if not, don’t hesitate to ask the author to clarify
- Consider any areas the author’s change may break, and test those
- Detail what steps you took for 🎩 and your findings
- Remember that unrelated bugs are better done in a separate PR. Don’t block something unless it’s necessary
- Include a screenshot with any issues that arise

## Cross browser testing

We support the [following browsers](https://help.shopify.com/en/manual/shopify-admin/supported-browsers). Here is a checklist for browser tophatting. Please feel free to use it in your PRs:

```md
I’ve tophatted these changes in the following browsers:

- [ ] Chrome latest
- [ ] FF latest
- [ ] Safari latest
- [ ] Edge
- [ ] In at least one of the above browsers, test both retina and non-retina displays
- [ ] iPhone (5/SE/X) (10+) Safari Mobile
- [ ] iPad (10+) Safari Mobile
- [ ] Android device (5.x) Chrome
```

**🔥 Tips**

- Tophat using real devices with [Simple Proxy](https://github.com/dfmcphee/simple-proxy) instead of an emulator. [Microsoft offers free virtual machines](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) for Edge testing.

## History of the phrase

The 🎩 emoji began its life at Shopify in 2013 on the admin team. When doing PR reviews in GitHub the team would always give a thumbs up if code review was good. This was before GitHub had the review feature. For web UI work we realized that code reviews and automated tests were not enough, especially since the code needed to be tested in multiple browsers to confirm it rendered properly and we weren’t missing any polyfills. So the team quite randomly decided on:

🎩
💯

Eventually we dropped the 💯 and it was shortened to 🎩. That emoji lives on today.
