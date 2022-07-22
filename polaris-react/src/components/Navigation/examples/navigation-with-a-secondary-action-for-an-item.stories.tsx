<Frame>
  <Navigation location="/">
    <Navigation.Section
      items={[
        {
          url: '/path/to/place',
          label: 'Home',
          icon: HomeMinor,
        },
        {
          url: '/path/to/place',
          label: 'Orders',
          icon: OrdersMinor,
          secondaryAction: {
            url: '/admin/orders/add',
            accessibilityLabel: 'Add an order',
            icon: CirclePlusOutlineMinor,
            tooltip: {
              content: 'Add an order',
            },
          },
        },
        {
          url: '/path/to/place',
          label: 'Products',
          icon: ProductsMinor,
        },
      ]}
    />
  </Navigation>
</Frame>