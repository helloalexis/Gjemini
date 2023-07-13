"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero-img.jpg";
import Link from "next/link";
import React, { useRef } from "react";
import useSWR from "swr";

export const metadata = {
  title: "Gemini Home",
  description: "This is Home Page",
};

const Home = () => {
  const msgRef = useRef();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: cardsData } = useSWR("/api/posts", fetcher);

  const { data: secThreeData } = useSWR(
    "/api/landingPage/sectionThree",
    fetcher
  );

  const wrapperRef = useRef();
  const cardRef = useRef();

  function scrollRight() {
    if (cardRef.current) {
      wrapperRef.current.scrollLeft += cardRef.current.offsetWidth;
    }
  }

  function scrollLeft() {
    if (cardRef.current) {
      wrapperRef.current.scrollLeft -= cardRef.current.offsetWidth;
    }
  }

  function clearInputField() {
    msgRef.current.reset();
  }

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroFlexContainer}>
          <div className={styles.heroTitleContainer}>
            <h1>Quality Aluminum And Glass Solutions</h1>
            <p>
              Brighten up your home with Gjemini! Our aluminum windows and
              cabinets are sleek, sturdy and eco-friendly. Do not miss this
              chance to upgrade your space with Gemini!
            </p>
            <a href="/contact" className={styles.heroContactLink}>
              Free Quotation
            </a>
          </div>
          <Image
            src={Hero}
            className={styles.heroBackgroundImage}
            alt="Hero image"
          />
        </div>
      </div>

      <div className={styles.outerSectionTwo}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.sectionTwo}>
          <div className={styles.secTwoTitles}>
            <div>
              <h3>Choose a Category</h3>
              <h1 className={styles.secTwoTitle}>
                <span>Featured</span> Projects
              </h1>
              <p className={styles.secTwoSubTitle}>
                We provide a wide range of products that are designed to meet
                your unique needs.
              </p>
            </div>
            <div>
              <Link href="/portfolio" className={styles.button52}>
                View Projects
              </Link>
            </div>
          </div>

          <div className={styles.wrapperContainer}>
            <div className={styles.wrapper} ref={wrapperRef}>
              {cardsData?.map((item) => (
                <div className={styles.card} key={item._id} ref={cardRef}>
                  <Image
                    src={item.image}
                    fill={true}
                    alt={`Image of ${item._title}`}
                  ></Image>
                  <div className={styles.cardContent}>
                    <h3>{item.title}</h3>
                    <p>{item.subTitle}</p>
                    <Link href="/portfolio" className={styles.contactButton}>
                      Visit Collection
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div onClick={scrollLeft}>
              <span className={`${styles.arrow} ${styles.arrowLeft}`}></span>
            </div>
            <div onClick={scrollRight}>
              <span className={`${styles.arrow} ${styles.arrowRight}`}></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionThree}>
        {secThreeData?.map((item) => (
          <div className={styles.secThreeContainer} key={item._id}>
            <div className={styles.secThreeImage}>
              <Image
                src={item.image}
                fill={true}
                alt="Aluminum product image"
              ></Image>
            </div>
            <div className={styles.secThreeBlog}>
              <h3>Who we are</h3>
              <h1>{item.title}</h1>
              <p>{item.subTitle}</p>
              <Link href="#" className={styles.heroContactLink}>
                View Projects
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sectionFour}>
        <div className={styles.contactContainer}>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2382.455760767258!2d120.81868999422541!3d14.874910633337624!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1688284165870!5m2!1sen!2sph"
              width={600}
              height={450}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <h1>GET IN TOUCH</h1>

            <form
              ref={msgRef}
              action="https://formspree.io/f/mknlwebg"
              method="POST"
            >
              <input
                name="name"
                type="text"
                placeholder="Name"
                className={styles.userInput}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={styles.userInput}
                required
              />
              <textarea
                name="text"
                placeholder="You can send us a message from here."
                className={styles.userInput}
                rows="
                10"
                required
              ></textarea>
              <input type="submit" value="SUBMIT" onClick={clearInputField} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
