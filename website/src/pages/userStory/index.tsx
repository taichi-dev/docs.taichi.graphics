import React, { Component } from 'react';
import image from './img/image-palace.png';
import Dot from './img/Vector.png';
import ManyLine from './img/Line.png';
import styles from './index.module.scss';
import ETH from './img/ETH.png';
import Sand from './img/sand.mp4';
import './tailwind.css';
import './index.css';

function Article() {
  const manyLineStyle: object = {
    marginBottom: '-1074px',
    opacity: '0.2',
    zIndex: '1',
    userSelect: 'none',
    height: '1074px',
  };
  const contantObj = {
    Goal: [
      'Select an efficient parallel programming language and use it to implement a physically based simulation project.',
    ],
    Challenges: [
      'The bar to parallel programming is set high: Few students have previous experience with CUDA.',
      'The language must provide rich utilities, such as 3D visualization, to facilitate development.',
      'Run the same parallel programming projects from different computing platforms.',
    ],
    'Why Taichi': [
      'Seamlessly embedded in Python: Easier to learn, more intuitive, and as fast as CUDA.',
      "Taichi's GGUI system makes 3D rendering a breeze.",
      "A single-source framework: Automatically falls back to CPUs if your system doesn't have CUDA or a powerful GPU.",
      'An active community and a wide range of reference code make it easy to get started.',
    ],
    Results: [
      '90% of the projects chose Taichi, and all were completed with flying colors.',
      'Achieved comparable performance to C++/CUDA with much less code.',
    ],
    'Requests for improvement: The future': [
      'Enriched GGUI tooling.',
      'More descriptive error reports.',
      'Move comprehensive benchmark reports.',
      'Further reduced compile time.',
    ],
  };
  const placeImgStyle = {
    backgroundImage: image,
  };

  return (
    <div className={styles.box}>
      <div className={styles.placeBox}>
        <div>
          {/* <img
            src={image}
            className={styles.placeImg}
            style={{ width: '100%', marginBottom: '-5px' }}
          /> */}
          <div className={styles.placeImgBg} style={placeImgStyle}></div>
        </div>
        <div className={styles.placeText}>
          <div>Taichi, a perfect programming framework for computer graphics courses</div>
          <div className={styles.ethBox}>
            <img
              src={ETH}
              className={styles.placeImg}
            />
          </div>
        </div>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.content}>
          <div className={styles.para}>
            <div className={styles.paraPart}>
              <div style={{ lineHeight: '25px', fontWeight: 500 }}>
                In Fall 2021, the Computer Graphics Laboratory (CGL) at ETH Zurich offered a course
                on physically based simulation, which requires students to create a small game or a
                demo scene using techniques they learned in class.
              </div>
            </div>
            <div className={styles.paraPart} style={{ marginTop: '15px', fontWeight: 500 }}>
              <div >
                The vast majority of the student groups chose the Taichi programming language for
                real-time physical simulation.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.manyLines}></div>
        {Object.keys(contantObj).map((item, index) => {
          return (
            <div className={styles.content} key={`${item}${index}`}>
              <div className={styles.title}>{item}</div>
              <div className={styles.para}>
                {contantObj[item].map((item, index, array) => {
                  return (
                    <div className={styles.paraPart} key={`${item}${index}`}>
                      {array.length === 1 ? (
                        ''
                      ) : (
                        <img src={Dot} className={styles.dotImg} alt="" />
                      )}
                      <div>{item}</div>
                    </div>
                  );
                })}
                {item === 'Results' ? (
                  <div style={{ marginTop: '20px' }}>
                    <video src={Sand} width="900" height="421" controls></video>
                    {/* <iframe
                    width="908"
                    height="421"
                    src="https://www.youtube.com/embed/_Uaf5wF9wjo"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe> */}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Article;
