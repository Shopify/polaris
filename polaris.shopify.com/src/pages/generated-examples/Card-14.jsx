import { AppProvider, Card,Popover,Button,ActionList,List } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <Card>
  <Card.Header
    actions={[
      {
        content: 'Preview',
      },
    ]}
    title="Staff accounts"
  >
    <Popover
      active
      activator={
        <Button disclosure plain>
          Add account
        </Button>
      }
      onClose={() => {}}
    >
      <ActionList items={[{content: 'Member'}, {content: 'Admin'}]} />
    </Popover>
  </Card.Header>
  <Card.Section>
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
    