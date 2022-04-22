import { AppProvider, Page,Card,ResourceList,Avatar,TextStyle } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <AppProvider
  i18n={{
    Polaris: {
      Common: {
        checkbox: 'case à cocher',
      },
      ResourceList: {
        sortingLabel: 'Trier par',
        showing: '{itemsCount} {resource} affichés',
        defaultItemPlural: 'articles',
        defaultItemSingular: 'article',
        Item: {
          viewItem: "Afficher les détails de l'{itemName}",
        },
      },
    },
  }}
>
  <Page>
    <Card>
      <ResourceList
        showHeader
        items={[
          {
            id: 341,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 256,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceList.Item id={id} url={url} media={media}>
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  </Page>
</AppProvider>
      </div>
    </AppProvider>
  );
}

export default Example;
    