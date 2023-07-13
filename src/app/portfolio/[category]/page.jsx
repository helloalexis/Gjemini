"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { Helmet } from "react-helmet";

export const metadata = {
  title: "Gemini Projects",
  description: "This is Projects Page",
};

async function getData() {
  
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Category = async ({ searchParams }) => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gjemini Projects</title>
        </Helmet>
      </>
      <div className={styles.galleryContainer}>
        {data?.map((item) => {
          if (
            searchParams.search.toLowerCase() == item.category.toLowerCase()
          ) {
            return (
              <div className={styles.card} key={item._id}>
                <Image
                  src={item.image}
                  fill={true}
                  alt={`Image of ${item.title}`}
                ></Image>
                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                  <p>{item.subTitle}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Category;
