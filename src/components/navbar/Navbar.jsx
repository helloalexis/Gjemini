"use client"
import Link from "next/link";
import React, { useRef, useWindowSize } from "react";
import { signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import Image from "next/image";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Projects",
    url: "/portfolio",
  },
 
  {
    id: 3,
    title: "Dashboard",
    url:"/login"
  }
];

const Navbar = () => {
    const iconRef = useRef();
    const mobileNavRef = useRef();
    const session = useSession();
    

    function toggleMobileNav(){
        iconRef.current.classList.toggle(`${styles.open}`);
        mobileNavRef.current.classList.toggle(`${styles.active}`)
    }

  return (
    <div className={styles.container}>
      <div className={styles.desktopNavContainer}>
        <div className={styles.logo}>
          <Image src="/gemini-icon.png" width={32} height={32} alt="gemini icon"></Image>
          <Link href="/">Gjemini</Link>
        </div>
        <div className={styles.links}>
          {links.map((link) => (
            <Link key={link.id} href={link.url} className={styles.link}>
              {link.title}
            </Link>
          ))}
          {session.status === "authenticated" && (
            <button onClick={signOut} className={styles.desktopSignOutBtn}>
              Sign Out
            </button>
          )}
          <Link href="/contact" className={styles.navContactLink}>
            Contact Us
          </Link>
        </div>
        <div
          className={`${styles.navIconFive} ${styles.icon}`}
          ref={iconRef}
          onClick={toggleMobileNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={`${styles.mobileNavContainer} ${styles.active}`}
        ref={mobileNavRef}
      >
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className={styles.link}
              onClick={toggleMobileNav}
            >
              {link.title}
            </Link>
           
          ))}
         
          {session.status === "authenticated" && (
            <button onClick={signOut} className={styles.mobileSignOutBtn}>
              Sign Out
            </button>
          )}
          <Link
            href="/contact"
            className={styles.mobileNavContactLink}
            onClick={toggleMobileNav}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
