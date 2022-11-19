import "../styles/globals.css";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function App({ children }: HomeLayoutProps) {
  return (
    <html lang="fr">
      <body>
        <main className="container mx-auto px-4 py-16 prose">{children}</main>
      </body>
    </html>
  );
}
