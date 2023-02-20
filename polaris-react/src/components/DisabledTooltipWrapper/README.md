---
category: Behavior
tags:
  - tooltip
---

# DisabledTooltipWrapper

Conditionally rendering Tooltips can become quite messy since you are required to split out your markup and either wrap it within a Tooltip, or render it as
usual. This can lead to duplication of that markup, or unnecessarily breaking up your layout just to accomplish this one task. Instead, this component allows
you to keep your existing markup and simply wrap the DisabledTooltipWrapper around it, passing in conditional values to determine whether the Tooltip is active
or not.

This component uses the terminology "disabled" since it will first be used in the context of showing a Tooltip when an action is disabled. In the future we can
make this more generic so it can be used for all Tooltips in the admin.

TBD: Allow for Polaris TooltipProps to pass additional values other than TooltipInfo and children

## Best practices

Export and make use of the DisabledInfo interface. It contains two values: isDisabled and tooltipMessage message. You are required to pass both in order to
render a Tooltip.

If you are rendering a Tooltip around a Popover activator, instead move the TooltipWrapper higher up and wrap it around the Popover itself. You will also need
to wrap the activator with an enclosing div in order to prevent the Popover from losing its root ref when DisabledTooltip conditionally renders the Tooltip. This
will become obvious if you notice the open popover being disconnected from the activator, i.e, the popover content appearing at the top left of your screen.

TBD: Example with link

## Research and development

- First implemented and used [here](https://github.com/Shopify/web/pull/81020/files#diff-dec66638b9f1b717ef8b68769332c9ca15f7142bef7af617223559461cd3ef88)
- Will be used for disabled IndexTable actions [here](https://github.com/Shopify/web/pull/81531) and [here](https://github.com/Shopify/web/pull/81567)
