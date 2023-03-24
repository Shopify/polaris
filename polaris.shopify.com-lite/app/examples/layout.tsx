import '@shopify/polaris/build/esm/styles.css';

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
