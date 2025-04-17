"use client";

import Button from "@mui/material/Button";

export default function SignInButton() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        window.location.href = "/api/auth/google";
      }}
    >
      Sign in with Google
    </Button>
  );
}