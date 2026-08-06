import '@diniz/webcomponents/style.css';

export const metadata = {
  title: 'Web Components Next Starter',
  description: 'Next.js client component starter for @diniz/webcomponents'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
