import React from 'react';
import faker from 'faker';
import {AppProvider} from '../src';

interface Props {
  children: React.ReactNode;
}

function customers(amount: number) {
  return Array.from({length: amount}, (_, index) => {
    return {
      id: index,
      url: `#/customers/${index}`,
      name: faker.name.findName(),
      location: `${faker.address.city()}, ${faker.address.country()}`,
    };
  });
}

window.data = {customers};

export default function PlayroomAppProvider({children}: Props) {
  return <AppProvider>{children}</AppProvider>;
}
