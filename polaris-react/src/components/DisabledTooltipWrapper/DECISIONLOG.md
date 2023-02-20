# Decision log

## [2023-01-17](https://github.com/Shopify/web/pull/81734)

### Context and problem statement

The original disabled tooltip was initially created [here](https://github.com/Shopify/web/pull/81020/files#diff-dec66638b9f1b717ef8b68769332c9ca15f7142bef7af617223559461cd3ef88) to be used within the IndexTable for disabled table actions.

### Considered options

This component uses the terminology "disabled" since it will first be used in the context of showing a Tooltip when an action is disabled. In the future we can
make this more generic so it can be used for all Tooltips in the admin.

### Decision makers

Shopify/inventory-states-fed

### Purpose of component

Conditionally rendering Tooltips can become quite messy since you are required to split out your markup and either wrap it within a Tooltip, or render it as
usual. This can lead to duplication of that markup, or unnecessarily breaking up your layout just to accomplish this one task. Instead, this component allows
you to keep your existing markup and simply wrap the DisabledTooltipWrapper around it, passing in conditional values to determine whether the Tooltip is active
or not.

### Architectural decisions

Same as purpose of component above, see the considered options section for future architectural improvements.
