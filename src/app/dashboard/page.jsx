"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: featuredData, mutate: mutateFeatured } = useSWR(
    "/api/posts",
    fetcher
  );

  const { data: content, mutate } = useSWR("/api/projects", fetcher);

  const { data: categoryData, mutate: mutateCategory } = useSWR(
    "/api/projectCategory",
    fetcher
  );

  if (session.status === "loading") {
    return <p>loading...</p>;
  }

  if (session.status === "unauthenticated") {
    setTimeout(() => {
      router?.push("/login");
    }, 100);

    return null;
  }

  const handleFeaturedSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const subTitle = e.target[2].value;
    const image = e.target[1].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          subTitle,
          image,
        }),
      });
      mutateFeatured();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeaturedDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutateFeatured();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = e.target[2].value;
    const title = e.target[0].value;
    const subTitle = e.target[3].value;
    const image = e.target[1].value;

    try {
      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({
          category,
          title,
          subTitle,
          image,
        }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const category = e.target[0].value;
    const subTitle = e.target[2].value;
    const image = e.target[1].value;

    try {
      await fetch("/api/projectCategory", {
        method: "POST",
        body: JSON.stringify({
          category,
          subTitle,
          image,
        }),
      });
      mutateCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      await fetch(`/api/projectCategory/${id}`, {
        method: "DELETE",
      });
      mutateCategory();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Dashboard</title>
          </Helmet>
        </>
        <h1 className={styles.sectionTitle}>Your Featured Projects</h1>
        <div className={styles.wrapper}>
          <div className={styles.uploadedProjects}>
            {featuredData?.map((item) => (
              <div className={styles.card} key={item._id}>
                <Image
                  src={item.image}
                  fill={true}
                  alt={`Image of ${item.title}`}
                ></Image>
                <div className={styles.cardContent}>
                  <h2>{item.title}</h2>
                  <p>{item.subTitle}</p>
                </div>
                <a
                  role="button"
                  onClick={() => handleFeaturedDelete(item._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </a>
              </div>
            ))}
          </div>
          <div className={styles.inputField}>
            <form onSubmit={handleFeaturedSubmit}>
              <input
                type="text"
                placeholder="Title"
                className={styles.userInput}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className={styles.userInput}
                required
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={styles.description}
                placeholder="Write Something About This Project..."
                required
              ></textarea>

              <input type="submit" className={styles.submitButton} />
            </form>
          </div>
        </div>

        <h1 className={styles.sectionTitle}>Your Projects</h1>
        <div className={styles.wrapper}>
          <div className={styles.uploadedProjects}>
            {content?.map((item) => (
              <div className={styles.card} key={item._id}>
                <Image
                  src={item.image}
                  fill={true}
                  alt={`Image of ${item.title}`}
                ></Image>
                <div className={styles.cardContent}>
                  <h2>{item.title}</h2>
                  <p>{item.subTitle}</p>
                </div>
                <a
                  role="button"
                  onClick={() => handleDelete(item._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </a>
              </div>
            ))}
          </div>
          <div className={styles.inputField}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className={styles.userInput}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className={styles.userInput}
                required
              />

              <select
                name=""
                id=""
                className={styles.userInput}
                defaultValue={"DEFAULT"}
                required
              >
                <option value="DEFAULT" disabled>
                  Select Project Category
                </option>
                {categoryData?.map((item) => (
                  <option value={item.category} key={item._id}>
                    {item.category}
                  </option>
                ))}
              </select>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={styles.description}
                placeholder="Write Something About This Project..."
                required
              ></textarea>

              <input type="submit" className={styles.submitButton} />
            </form>
          </div>
        </div>
        <h1 className={styles.sectionTitle}>Your Project Categories</h1>
        <div className={styles.wrapperTwo}>
          <div className={styles.uploadedProjects}>
            {categoryData?.map((item) => (
              <div className={styles.card} key={item._id}>
                <Image
                  src={item.image}
                  fill={true}
                  alt={`Image of ${item.category}`}
                ></Image>
                <div className={styles.cardContent}>
                  <h2>{`${item.category}s`}</h2>
                  <p>{item.subTitle}</p>
                </div>
                <a
                  role="button"
                  onClick={() => handleCategoryDelete(item._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </a>
              </div>
            ))}
          </div>

          <div className={styles.inputField}>
            <form onSubmit={handleCategorySubmit}>
              <input
                type="text"
                placeholder="Category Title"
                className={styles.userInput}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className={styles.userInput}
                required
              />

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={styles.description}
                placeholder="Write Something About This Category..."
                required
              ></textarea>

              <input type="submit" className={styles.submitButton} />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
