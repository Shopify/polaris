/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import HTML, {DOCTYPE} from '@shopify/react-html';
import {Helmet} from 'react-helmet';

export default function render(scripts, data) {
  return (
    DOCTYPE +
    renderToString(
      <HTML scripts={scripts} data={data}>
        <Helmet
          defaultTitle="Polaris React component examples"
          script={[
            {
              src: 'https://www.googletagmanager.com/gtag/js?id=UA-49178120-48',
              async: true,
            },
            {
              innerHTML: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-49178120-48');
              `,
            },
          ]}
        >
          <meta charSet="utf-8" />
          {/* Same viewport meta as in the admin: */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
          />
        </Helmet>
      </HTML>,
    )
  );
}
