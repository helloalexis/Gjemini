import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <h1>Get in Touch</h1>
        <h3>
          We’re here to help. If you have any questions or concerns, don’t
          hesitate to contact us. We’ll get back to you as soon as possible!
        </h3>
      </div>

      <div className={styles.secOneContainer}>
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2382.455760767258!2d120.81868999422541!3d14.874910633337624!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1688284165870!5m2!1sen!2sph"
            width={600}
            height={450}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className={styles.flexContainer}>
          <div className={styles.location}>
            <div className={styles.details}>
              <Image src="/placeholder.png" width={32} height={32} alt="pin icon"></Image>
              <div>
                <h4>Address</h4>
                <p>Looban Pinagbakahan Malolos City Bulacan</p>
              </div>
            </div>

            <div className={styles.details}>
              <Image src="/phone-call.png" width={32} height={32} alt="phone icon"></Image>
              <div>
                <h4>Phone</h4>
                <p>09956441943</p>
              </div>
            </div>

            <div className={styles.details}>
              <Image src="/email.png" width={32} height={32} alt="email icon"></Image>
              <div>
                <h4>Email</h4>
                <p>torralbaalexisjoseph@gmail.com</p>
              </div>
            </div>
          </div>
          <div className={styles.location}>
            <h3>Send us a message</h3>
            <p>
              If you have any questions, you can send us a message from here.
            </p>
            <form action="https://formspree.io/f/mknlwebg" method="POST">
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
                placeholder="Your comment or message..."
                className={styles.userInput}
                rows="
                10"
                required
              ></textarea>
              <input type="submit" value="SUBMIT" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
