import React from 'react';
import faker from 'faker';
import {Card, ResourceList, Avatar, TextStyle} from '../src';

interface Props {
  customers?: number;
}

function CustomerList({customers: customersAmount}: Props) {
  const customers = new Array(customersAmount ? customersAmount : 3)
    .fill({})
    .map(() => ({
      id: 341,
      url: '#/customers/341',
      name: faker.name.findName(),
      location: `${faker.address.city()}, ${faker.address.country()}`,
    }));
  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={customers}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceList.Item
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  );
}

export default CustomerList;
