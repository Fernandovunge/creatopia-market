
export const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const slideUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: 10,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const slideDown = (delay: number = 0) => ({
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const scaleIn = (delay: number = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

// For staggered children animations
export const staggerContainer = (staggerChildren: number = 0.05, delayChildren: number = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Hover animations
export const hoverScale = {
  whileHover: { 
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  whileTap: { 
    scale: 0.98 
  }
};
