import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const productsData = [
  { id: 1, name: 'ASTRAL TOURBILLON', price: '$125,000', code: 'Ref 4890-A', image: '/watch-1.png' },
  { id: 2, name: 'LUNAR PERPETUAL', price: '$89,500', code: 'Ref 2150-L', image: '/watch-2.png' },
  { id: 3, name: 'SOLARIS CHRONO', price: '$45,000', code: 'Ref 1100-S', image: '/watch-3.png' }
];

export default function Products() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const circlesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cards Enter Animation
      gsap.fromTo(cardsRef.current, 
        { y: 150, opacity: 0, scale: 0.9, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );

      // Continuous rotation for the "watch" placeholder circles
      circlesRef.current.forEach((circle, i) => {
        gsap.to(circle, {
          rotation: 360,
          duration: 20 + i * 5, // slightly different speeds constraint
          repeat: -1,
          ease: 'linear',
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="products" ref={containerRef} style={styles.section}>
      <div className="container" style={{ perspective: '1000px' }}>
        <h2 style={styles.heading}>MASTERPIECES</h2>
        <div style={styles.grid}>
          {productsData.map((prod, index) => (
            <ProductCard 
              key={prod.id} 
              prod={prod} 
              assignCardRef={el => cardsRef.current[index] = el}
              assignCircleRef={el => circlesRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for internal hover state management
function ProductCard({ prod, assignCardRef, assignCircleRef }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={assignCardRef}
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        borderColor: isHovered ? 'var(--accent)' : 'var(--surface-border)',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageArea}>
        <div 
          ref={assignCircleRef} 
          style={{
            ...styles.placeholderCircle,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            borderColor: isHovered ? 'var(--accent)' : 'rgba(212, 175, 55, 0.3)',
            boxShadow: isHovered ? '0 0 60px rgba(212, 175, 55, 0.2)' : '0 0 40px rgba(212, 175, 55, 0.1)'
          }}
        >
          {/* Inner details to make it look like a minimalist watch face */}
          <div style={styles.circleNotch}></div>
          <div style={{...styles.circleNotch, bottom: '5px', top: 'auto'}}></div>
          <div style={{...styles.circleNotch, left: '5px', top: '50%', transform: 'translateY(-50%) rotate(90deg)'}}></div>
          <div style={{...styles.circleNotch, right: '5px', left: 'auto', top: '50%', transform: 'translateY(-50%) rotate(90deg)'}}></div>
        </div>

        {/* The Real Image Overlaid */}
        {prod.image && (
          <img 
            src={prod.image} 
            alt={prod.name} 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '190px',
              height: '190px',
              objectFit: 'cover',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 2,
              filter: 'drop-shadow(0px 15px 15px rgba(0,0,0,0.8))',
              transform: isHovered ? 'translate(-50%, -50%) scale(1.15) rotate(5deg)' : 'translate(-50%, -50%) scale(1) rotate(0deg)',
              transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
            }} 
          />
        )}
      </div>
      <div style={styles.details}>
        <span style={styles.code}>{prod.code}</span>
        <h3 style={styles.name}>{prod.name}</h3>
        <div style={styles.priceRow}>
          <span style={styles.price}>{prod.price}</span>
          <button style={{
            ...styles.exploreBtn,
            color: isHovered ? 'var(--accent)' : 'var(--text-main)',
          }}>
            Explore <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
    padding: '120px 0',
    backgroundColor: 'var(--bg-color)',
  },
  heading: {
    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
    textAlign: 'center',
    marginBottom: '5rem',
    color: 'var(--text-main)',
    letterSpacing: '0.1em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
  },
  card: {
    background: '#0a0a0a',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
  },
  imageArea: {
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle at top, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholderCircle: {
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    border: '2px dashed rgba(212, 175, 55, 0.3)',
    boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)',
    transition: 'all 0.5s ease',
    position: 'relative',
  },
  circleNotch: {
    position: 'absolute',
    top: '5px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '15px',
    background: 'var(--accent)',
    borderRadius: '2px',
    opacity: 0.5,
  },
  details: {
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  code: {
    color: 'var(--accent)',
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    fontWeight: 600,
  },
  name: {
    fontSize: '1.5rem',
    color: 'var(--text-main)',
    letterSpacing: '0.05em',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
  },
  price: {
    color: 'var(--text-muted)',
    fontSize: '1.2rem',
    fontFamily: 'monospace',
  },
  exploreBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    transition: 'color 0.3s ease',
  }
};
