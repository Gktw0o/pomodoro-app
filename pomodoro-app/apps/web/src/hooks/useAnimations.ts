'use client'

import { useCallback } from 'react'
import { Variants } from 'framer-motion'

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Stagger container variants
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// Stagger item variants
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Card hover variants
export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.98
  }
}

// Button variants
export const buttonVariants: Variants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

// Modal variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2
    }
  }
}

// Backdrop variants
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

// Slide variants
export const slideVariants = {
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  },
  slideDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  },
  slideLeft: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  slideRight: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  }
}

// Timer pulse animation
export const timerPulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Progress bar variants
export const progressVariants: Variants = {
  initial: {
    width: 0
  },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  })
}

// Notification variants
export const notificationVariants: Variants = {
  initial: {
    opacity: 0,
    y: -50,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
}

// Loading spinner variants
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
}

// Typewriter effect
export const typewriterVariants: Variants = {
  hidden: {
    width: 0
  },
  visible: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'easeInOut'
    }
  }
}

// Custom hook for animations
export const useAnimations = () => {
  // Bounce animation
  const bounceAnimation = useCallback((delay = 0) => ({
    initial: { y: -10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
        delay
      }
    }
  }), [])

  // Fade in animation
  const fadeInAnimation = useCallback((delay = 0, duration = 0.5) => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration,
        delay
      }
    }
  }), [])

  // Scale animation
  const scaleAnimation = useCallback((delay = 0) => ({
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay
      }
    }
  }), [])

  // Rotate animation
  const rotateAnimation = useCallback((degrees = 360, duration = 1) => ({
    animate: {
      rotate: degrees,
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }), [])

  // Shake animation
  const shakeAnimation = useCallback(() => ({
    animate: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.4
      }
    }
  }), [])

  // Pulse animation
  const pulseAnimation = useCallback((scale = 1.05, duration = 1) => ({
    animate: {
      scale: [1, scale, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }), [])

  // Glow animation
  const glowAnimation = useCallback((color = 'rgba(239, 68, 68, 0.5)') => ({
    animate: {
      boxShadow: [
        `0 0 0 0 ${color}`,
        `0 0 0 10px transparent`,
        `0 0 0 0 transparent`
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  }), [])

  // Float animation
  const floatAnimation = useCallback((distance = 10, duration = 3) => ({
    animate: {
      y: [-distance, distance, -distance],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }), [])

  return {
    bounceAnimation,
    fadeInAnimation,
    scaleAnimation,
    rotateAnimation,
    shakeAnimation,
    pulseAnimation,
    glowAnimation,
    floatAnimation
  }
}

// Spring configurations
export const springConfigs = {
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14
  },
  wobbly: {
    type: 'spring',
    stiffness: 180,
    damping: 12
  },
  stiff: {
    type: 'spring',
    stiffness: 400,
    damping: 30
  },
  slow: {
    type: 'spring',
    stiffness: 60,
    damping: 15
  }
}

// Easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  standard: [0.4, 0, 0.2, 1]
}