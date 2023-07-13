import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Dashboard",
    url: "/login",
  },
];

const Footer = () => {
   const fetcher = (...args) => fetch(...args).then((res) => res.json());

   const { data } = useSWR("/api/contact", fetcher);


  return (
    <div className={styles.container}>
      <footer>
        {data?.map((item) => (
          <div className={styles.flexContainer} key={item._id}>
            <div className={styles.flexItem}>
              <h1>Gjemini</h1>
              <div className={styles.navLinks}>
                {links.map((link) => (
                  <Link key={link.id} href={link.url} className={styles.link}>
                    {link.title}
                  </Link>
                ))}
              </div>
              <p className={styles.companyName}>
                Gjemini Aluminum and Glass © 2023
              </p>
            </div>
            <div className={`${styles["flexItem"]} ${styles["contactInfo"]}`}>
              <div>
                <Image src="/placeholder.png" width={32} height={32} alt="pin icon"></Image>
                <p>{item.address}</p>
              </div>
              <div>
                <Image src="/phone-call.png" width={32} height={32} alt="phone image"></Image>
                <p>{item.contactNumber}</p>
              </div>
              <div>
                <Image src="/email.png" width={32} height={32} alt="email icon"></Image>
                <p className={styles.emailAdd}>{item.email}</p>
              </div>
              <div className={styles.socMedia}>
                <Link href="#">
                  <Image src="/facebook.png" width={32} height={32} alt="facebook icon"></Image>
                </Link>
                <Link href="https://www.facebook.com/Gemaluminumworks" target="_blank">
                  Visit our facebook page
                </Link>
              </div>
            </div>
            <div className={styles.flexItem}>
              <h4>About Us</h4>
              <p>{item.about}</p>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Footer;
