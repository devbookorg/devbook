"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <button onClick={() => signIn()}>로그인</button>
      <br />
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </>
  );
}
