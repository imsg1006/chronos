import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <nav ref={navRef} style={styles.nav}>
      <div className="container" style={styles.container}>
        <div style={styles.logo}>CHRONOS</div>
        <div style={styles.links}>
          <a href="#about" style={styles.link}>About</a>
          <a href="#products" style={styles.link}>Collections</a>
          <a href="#testimonials" style={styles.link}>Journal</a>
          <a href="#contact" className="btn-primary" style={{ marginLeft: '1rem' }}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1.5rem 0',
    zIndex: 100,
    backdropFilter: 'blur(10px)',
    background: 'rgba(3, 3, 3, 0.4)',
    borderBottom: '1px solid var(--surface-border)'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: 'var(--text-main)'
  },
  links: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  link: {
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--text-main)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'color 0.3s ease'
  }
};

export default Navbar;
