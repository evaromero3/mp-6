import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <link rel="icon" type="image" href="/nhl-shield.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>CS391 | Final Project</title>
      </head>
      <body>
        <Header />
        <CssBaseline />
        
          {children}

      </body>
    </html>
  );
}