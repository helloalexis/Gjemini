"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { Helmet } from "react-helmet";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

const Category = () => {
   const searchParams = useSearchParams();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data} = useSWR("/api/projects", fetcher);
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
            searchParams.get("search").toLowerCase() ==
            item.category.toLowerCase()
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
