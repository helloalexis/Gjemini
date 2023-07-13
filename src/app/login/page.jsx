"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";


export const metadata = {
  title: "Gemini Login",
  description: "This is Login Page",
};

const Login = () => {
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const userPassword = e.target[1].value;

    signIn("credentials", { userName, userPassword });
  };


   if (session.status === "loading") {
     return <p>loading...</p>;
   }

   if (session.status === "authenticated") {
    setTimeout(() => {
     router?.push("/dashboard");
    }, 100);

    return null;
     
   }

  
  return (
    <div className={styles.container}>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gjemini Login</title>
        </Helmet>
      </>
      <div className={styles.loginContainer}>
        <form className={styles.login} onSubmit={handleSubmit}>
          <input type="text" placeholder="Username"></input>
          <input type="password" placeholder="Password"></input>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
