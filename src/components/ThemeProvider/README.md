---
name: Theme provider
category: Structure
platforms:
  - web
fullSizeExamples: true
---

# Theme Provider

Does theme stuff

---

## Examples

### Theme Provider

Use to build your theme.

```jsx
<Frame>
  <Page title="Playground">
    <TextContainer>
      <Card
        title="Shipment 1234"
        secondaryFooterAction={{
          content: 'Cancel shipment',
          destructive: true,
        }}
        primaryFooterAction={{content: 'Add tracking number'}}
      >
        <Card.Section title="Items">
          <List>
            <List.Item>1 × Isis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Card.Section>
      </Card>
      <Card
        subdued
        title="Shipment 1234"
        secondaryFooterAction={{
          content: 'Cancel shipment',
        }}
        primaryFooterAction={{content: 'Add tracking number'}}
      >
        <Card.Section title="Items">
          <List>
            <List.Item>1 × Isis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Card.Section>
      </Card>
    </TextContainer>
  </Page>
</Frame>
```
