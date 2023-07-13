"use client";
import useSWR from "swr";
import React, { useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { Helmet } from "react-helmet";


const Portfolio = () => {
  const wrapperRef = useRef();
  const cardRef = useRef();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR("/api/projectCategory", fetcher);

  function scrollRight() {
    if (cardRef.current){
       wrapperRef.current.scrollLeft += cardRef.current.offsetWidth;
    }
   
  }

  function scrollLeft() {
    if (cardRef.current){
      wrapperRef.current.scrollLeft -= cardRef.current.offsetWidth;
    }
    
  }

  return (
    <div className={styles.container}>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gjemini Project Categories</title>
        </Helmet>
      </>
      <div className={styles.headingContainer}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <h3>Choose a Category</h3>
        <h1>Our Works</h1>
        <h3>
          Welcome to our gallery. Choose a category and explore our latest
          designs that can elevate your space
        </h3>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.scrollingWrapper} ref={wrapperRef}>
          {data?.map((item) => (
            <div className={styles.card} key={item._id} ref={cardRef}>
              <Image
                src={item.image}
                fill={true}
                alt={`Image of ${item.category}`}
              ></Image>
              <div className={styles.cardContent}>
                <h3>{`${item.category}s`}</h3>
                <p>{item.subTitle}</p>
                <Link
                  href={{
                    pathname: `/portfolio/${item.category}`,
                    query: {
                      search: item.category,
                    },
                  }}
                >
                  Visit Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div>
          <span
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={scrollLeft}
          ></span>
        </div>
        <div>
          <span
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={scrollRight}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
