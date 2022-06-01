import { AppProvider, VisuallyHidden } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

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
        <table>
          <thead>
            <tr>
              <th scope="col">
                <VisuallyHidden>Line item</VisuallyHidden>
              </th>
              <th scope="col">
                <VisuallyHidden>Value</VisuallyHidden>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Subtotal</th>
              <td>$184.13</td>
            </tr>
            <tr>
              <th scope="row">Tax</th>
              <td>$0.00</td>
            </tr>
            <tr>
              <th scope="row">Total</th>
              <td>$184.13</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppProvider>
  );
}

export default Example;
