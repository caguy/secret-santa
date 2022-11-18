import "../styles/globals.css";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function App({ children }: HomeLayoutProps) {
  return (
    <html lang="fr">
      <body>
        <main className="container mx-auto px-4 h-screen prose flex items-center">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
