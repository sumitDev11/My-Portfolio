import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Code, Rocket, Target } from 'lucide-react';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const boxesRef = useRef([]);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Skills data
  const skillsData = [
    {
      icon: Code,
      title: 'Technical Expertise',
      description: 'Full-stack development with modern technologies including React, Node.js, and cloud platforms. Focused on clean, scalable code architecture.',
      color: '#6366f1',
      delay: 0.2,
    },
    {
      icon: Rocket,
      title: 'Innovation & Growth',
      description: 'Passionate about emerging technologies and continuous learning. Always exploring new frameworks and development methodologies.',
      color: '#a855f7',
      delay: 0.4,
    },
    {
      icon: Target,
      title: 'Vision & Goals',
      description: 'Creating seamless digital experiences that make a real difference. Delivering high-quality, impactful solutions through innovation.',
      color: '#ec4899',
      delay: 0.6,
    },
  
  ];

  // Detect mobile/tablet devices
  const checkMobile = useCallback(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileDevice = /android|blackberry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    setIsMobile(isMobileDevice || isSmallScreen);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Enhanced loading with preload
  useEffect(() => {
    const preloadAssets = async () => {
      const video = document.createElement('video');
      video.src = videoWebM;
      video.preload = 'metadata';
      
      const videoLoadPromise = new Promise((resolve) => {
        video.oncanplaythrough = () => {
          setVideoLoaded(true);
          resolve();
        };
        video.onerror = () => {
          setVideoLoaded(false);
          resolve();
        };
      });

      await videoLoadPromise;
      
      setTimeout(() => {
        setIsLoaded(true);
      }, 150);
    };

    preloadAssets();
  }, []);

  // Intersection Observer with improved threshold
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          animateElements();
        }
      },
      { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: isMobile ? '50px' : '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isVisible, isMobile]);

  // Optimized animation with reduced motion support
  const animateElements = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReducedMotion ? 0 : isMobile ? 50 : 100;

    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateY(0)';
      }
    }, delay);

    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
    }, delay * 2);

    setTimeout(() => {
      if (paraRef.current) {
        paraRef.current.style.opacity = '1';
        paraRef.current.style.transform = 'translateY(0)';
      }
    }, delay * 3);

    boxesRef.current.forEach((box, index) => {
      if (box) {
        setTimeout(() => {
          box.style.opacity = '1';
          box.style.transform = 'translateY(0) scale(1)';
        }, delay * 4 + index * (isMobile ? 100 : 150));
      }
    });
  }, [isMobile]);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking && !isMobile) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const sectionTop = sectionRef.current?.offsetTop || 0;
          const sectionHeight = sectionRef.current?.offsetHeight || 0;
          const windowHeight = window.innerHeight;
          
          if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const parallaxValue = (scrolled - sectionTop) * 0.2;
            
            if (videoRef.current && videoLoaded) {
              videoRef.current.style.transform = `translateY(${parallaxValue}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    let mouseTicking = false;
    const handleMouseMove = (e) => {
      if (!mouseTicking && !isMobile) {
        requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const deltaX = (clientX - centerX) / centerX;
          const deltaY = (clientY - centerY) / centerY;

          boxesRef.current.forEach((box, index) => {
            if (box && !box.matches(':hover')) {
              const factor = (index + 1) * 0.015;
              const x = deltaX * factor * 15;
              const y = deltaY * factor * 15;
              
              box.style.transform = `translateY(0) scale(1) translate(${x}px, ${y}px)`;
            }
          });
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, videoLoaded]);

  return (
    <div 
      id="About" 
      className="about-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '3rem 0' : '5rem 0',
      }}
    >
      {/* Video Background */}
      <div 
        className="video-background"
        style={{
          position: 'absolute', top: isMobile ? '0' : '-10%', left: isMobile ? '0' : '-10%', width: isMobile ? '100%' : '120%', height: isMobile ? '100%' : '120%', zIndex: 1,
        }}
      >
        {videoLoaded && (
          <video
            ref={videoRef} autoPlay loop muted playsInline
            style={{
              width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) contrast(1.1) hue-rotate(180deg)', transition: 'opacity 0.5s ease',
            }}
          >
            <source src={videoWebM} type="video/webm" />
          </video>
        )}
      </div>

      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2,
          background: isMobile 
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)'
            : `radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
               linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%)`,
        }}
      />

      {/* Animated Grid (desktop only) */}
      {!isMobile && (
        <div 
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2,
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'gridMove 25s linear infinite',
          }}
        />
      )}

      {/* Floating Elements (desktop only) */}
      {!isMobile && [...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${20 + i * 10}px`, height: `${20 + i * 10}px`, borderRadius: '50%',
            background: `linear-gradient(45deg, ${['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'][i]}, transparent)`,
            opacity: 0.1, top: `${10 + i * 15}%`, left: `${5 + i * 20}%`,
            animation: `float ${3 + i}s ease-in-out infinite`, zIndex: 2,
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        className="about-content"
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 3, maxWidth: '1200px', width: '100%',
          padding: isMobile ? '0 1rem' : '0 2rem', opacity: 0, transform: 'translateY(60px)',
          transition: `all ${isMobile ? 0.8 : 1.2}s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {/* Title Section */}
        <div 
          className="title-section"
          ref={titleRef}
          style={{
            textAlign: 'center', marginBottom: isMobile ? '2rem' : '3rem', opacity: 0,
            transform: 'translateY(40px)', transition: `all ${isMobile ? 0.8 : 1.2}s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          <h2 
            style={{
              fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700', color: '#ffffff', marginBottom: '1rem',
              textShadow: '0 0 30px rgba(99, 102, 241, 0.3)', lineHeight: '1.2',
            }}
          >
            About{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Me
            </span>
          </h2>
          <div style={{
            width: isMobile ? '80px' : '100px', height: isMobile ? '3px' : '4px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            margin: '0 auto', borderRadius: '2px',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          }} />
        </div>

        {/* Description */}
        <div 
          className="description-section"
          ref={paraRef}
          style={{
            textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem', opacity: 0,
            transform: 'translateY(30px)', transition: `all ${isMobile ? 0.8 : 1.2}s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#d1d5db', maxWidth: isMobile ? '100%' : '700px', margin: '0 auto',
            lineHeight: '1.8', padding: isMobile ? '0 0.5rem' : '0',
          }}>
            I'm a{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontWeight: '600',
            }}>
              dedicated Full-Stack Web Developer
            </span>{' '}
            passionate about crafting intuitive, scalable, and visually appealing digital solutions. 
            With expertise in modern technologies, I focus on delivering seamless user experiences 
            that make a real impact.
          </p>
        </div>

        {/* Skills Grid */}
        <div 
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile 
              ? '1fr' 
              : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                ref={(el) => (boxesRef.current[index] = el)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease-out, opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  opacity: 0,
                  transform: 'translateY(40px) scale(0.9)',
                  position: 'relative',
                  overflow: 'hidden',
                  touchAction: 'manipulation',
                }}
                onMouseEnter={(e) => {
                  // MODIFICATION: Removed the !isMobile check to allow hover on all devices with a pointer
                  const currentTransform = e.currentTarget.style.transform;
                  const baseTransform = currentTransform.includes('translate(') ? currentTransform.split(')')[1] : '';
                  e.currentTarget.style.transform = `translateY(-10px) scale(1.02)${baseTransform}`;
                  e.currentTarget.style.boxShadow = `
                    0 0 25px ${skill.color}99, 
                    0 0 50px ${skill.color}60
                  `;
                }}
                onMouseLeave={(e) => {
                  // MODIFICATION: Removed the !isMobile check
                  const currentTransform = e.currentTarget.style.transform;
                  const baseTransform = currentTransform.includes('translate(') ? currentTransform.split(')')[1] : '';
                  e.currentTarget.style.transform = `translateY(0) scale(1)${baseTransform}`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onTouchStart={(e) => {
                  // MODIFICATION: Removed the isMobile check to allow touch interaction on any touch device
                  e.currentTarget.style.transform = 'scale(0.98)';
                  e.currentTarget.style.boxShadow = `
                    0 0 25px ${skill.color}99, 
                    0 0 50px ${skill.color}60
                  `;
                }}
                onTouchEnd={(e) => {
                  // MODIFICATION: Removed the isMobile check
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div 
                  style={{
                    width: isMobile ? '60px' : '80px', height: isMobile ? '60px' : '80px',
                    borderRadius: '50%', background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                    boxShadow: `0 0 30px ${skill.color}40`,
                  }}
                >
                  <Icon size={isMobile ? 24 : 32} color="#ffffff" />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem', fontWeight: '600', color: '#ffffff',
                  marginBottom: '1rem', lineHeight: '1.3',
                }}>
                  {skill.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: isMobile ? '0.9rem' : '1rem', color: '#d1d5db', lineHeight: '1.6', margin: 0,
                }}>
                  {skill.description}
                </p>

                {/* Hover Effect */}
                <div 
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`,
                    transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .skills-grid > div:hover div:last-child {
          transform: scaleX(1);
        }
        
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;