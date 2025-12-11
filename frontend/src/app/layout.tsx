import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Next Teste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className=" text-gray-900">
        <div className="space-y-6 ">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
