import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "A Chronos isn't just a watch. It's an extension of one's legacy. I pass generation-defining moments wearing mine.",
    author: "Alexander Rothschild"
  },
  {
    quote: "The precision is unmatched. You can feel the weight of centuries of Swiss watchmaking tradition on your wrist.",
    author: "Elena Vance"
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="testimonials" ref={containerRef} style={styles.section}>
      <div className="container">
        <h2 style={styles.heading}>JOURNAL & SOCIETY</h2>
        <div style={styles.list}>
          {testimonials.map((test, index) => (
            <TestimonialCard 
              key={index}
              test={test}
              assignRef={el => itemsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ test, assignRef }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={assignRef} 
      style={{
        ...styles.card,
        background: isHovered ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        transform: isHovered ? 'translateX(15px)' : 'translateX(0)',
        borderLeft: isHovered ? '8px solid var(--accent)' : '4px solid var(--accent)',
        boxShadow: isHovered ? '-10px 15px 30px rgba(0,0,0,0.6)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p style={styles.quote}>"{test.quote}"</p>
      <p style={{
        ...styles.author,
        color: isHovered ? 'var(--accent)' : 'var(--text-muted)'
      }}>— {test.author}</p>
    </div>
  );
}

const styles = {
  section: {
    padding: '100px 0',
    backgroundColor: '#050505',
    borderTop: '1px solid var(--surface-border)',
    borderBottom: '1px solid var(--surface-border)',
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--text-main)',
    marginBottom: '3rem',
    textAlign: 'center',
    letterSpacing: '0.1em',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    padding: '2.5rem',
    borderRadius: '4px',
    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    cursor: 'default',
  },
  quote: {
    fontSize: '1.4rem',
    color: 'var(--text-main)',
    fontStyle: 'italic',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  author: {
    fontSize: '1rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'color 0.5s ease',
  }
};
