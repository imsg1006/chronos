import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const lineRef = useRef(null);
  const imageRef = useRef(null);
  const shapeRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Text reveal
      tl.from(textRefs.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      }, 0);

      // Line expanding
      tl.from(lineRef.current, {
        width: 0,
        duration: 1,
        ease: 'power3.inOut'
      }, 0.2);

      // Deep Parallax inner abstract shape reveal
      tl.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
      }, 0);

      // Parallax effect on the image container during scroll
      gsap.to(imageRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Continuous subtle ambient animation on the image
      gsap.to(shapeRef.current, {
        scale: 1.08,
        rotation: 3,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="about" ref={containerRef} style={styles.section}>
      <div className="container">
        <div style={styles.grid}>
          <div style={styles.textContent}>
            <h2 ref={el => textRefs.current[0] = el} style={styles.heading}>OUR HERITAGE</h2>
            <div ref={lineRef} style={styles.line}></div>
            <p ref={el => textRefs.current[1] = el} style={styles.paragraph}>
              Since 1928, Chronos has been at the forefront of horological innovation. 
              Our master watchmakers combine centuries-old techniques with cutting-edge 
              materials to create timepieces that are not just instruments, but heirlooms.
            </p>
            <p ref={el => textRefs.current[2] = el} style={styles.paragraph}>
              Each movement is assembled by hand in our Swiss atelier, ensuring 
              uncompromising precision and peerless reliability.
            </p>
          </div>
          <div ref={imageRef} style={styles.imagePlaceholder}>
             <img ref={shapeRef} src="/watch-movement.png" alt="Chronos Heritage" style={styles.watchImage} />
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 0',
    backgroundColor: '#050505',
    position: 'relative',
    overflow: 'hidden'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '6rem',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  heading: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: 'var(--text-main)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  line: {
    width: '80px',
    height: '2px',
    background: 'var(--accent)',
    boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: 'var(--text-muted)',
    lineHeight: 1.8,
    maxWidth: '500px',
  },
  imagePlaceholder: {
    width: '100%',
    height: '500px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    background: 'radial-gradient(circle at center, rgba(17, 17, 17, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  watchImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.9,
    filter: 'contrast(1.2) brightness(0.8)',
  }
};
