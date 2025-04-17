// app/layout.tsx
import CssBaseline from "@mui/material/CssBaseline";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        
          {children}

      </body>
    </html>
  );
}
