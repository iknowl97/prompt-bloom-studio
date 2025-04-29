export const theme = {
  colors: {
    primary: '#A7C7E7',    // soft blue
    secondary: '#FFE5E5',  // light pink
    accent: '#C8E6C9',     // mint green
    background: '#FAFAFA', // off-white
    text: '#2D3748',       // dark slate
    // Additional shades
    primaryDark: '#86A6C6',
    primaryLight: '#C8E8FF',
    secondaryDark: '#E6C4C4',
    secondaryLight: '#FFF6F6',
    accentDark: '#A7C5A8',
    accentLight: '#E9F7EA',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  transitions: {
    default: '0.2s ease-in-out',
    slow: '0.3s ease-in-out',
    fast: '0.1s ease-in-out',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
}

export type Theme = typeof theme;
