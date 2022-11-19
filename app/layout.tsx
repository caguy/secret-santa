import "../styles/globals.css";
import SantaSvg from "./assets/santa.svg";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function App({ children }: HomeLayoutProps) {
  return (
    <html lang="fr">
      <body>
        <main className="container mx-auto px-4 prose">
          <div>
            <SantaSvg className="[&_*]:fill-red-700" />
          </div>
          <div className="py-8">{children}</div>
        </main>
        <footer>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/free-vector/greeting-christmas-card-with-flat-christmas-objects_11053047.htm#query=secret%20santa&position=4&from_view=search&track=sph"
          >
            Image by BiZkettE1
          </a>
          on Freepik
        </footer>
      </body>
    </html>
  );
}
