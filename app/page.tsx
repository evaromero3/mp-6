"use client";

import { useEffect, useState } from "react";
import SignInButton from "../components/SignInButton";

export default function Home() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    picture: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("user");
    if (raw) {
      try {
        const profile = JSON.parse(decodeURIComponent(raw));
        setUser(profile);
        // clean the URL so the param disappears
        window.history.replaceState({}, "", "/");
      } catch (e) {
        console.error("Invalid user JSON", e);
      }
    }
  }, []);

  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <img
          src={user.picture}
          alt={user.name}
          width={80}
          height={80}
          style={{ borderRadius: "50%" }}
        />
        <h2>Welcome, {user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }

  return (
    <div> 
      <div style={{ textAlign: "center", marginTop: 64 }}>
        <h1>Login Below!</h1>
        <SignInButton />
        </div>
    </div>
    
  );
}