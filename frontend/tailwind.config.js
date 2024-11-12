export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'meta-gradient':
          'linear-gradient(180deg, rgba(29, 168, 254, 0) 0%, #166FD5 100%)',
        'blue-gradient':
          'linear-gradient(to bottom, #66b1ee, #50a6ed, #3692e4, #1972d6)',
        card: 'linear-gradient(180deg, #2A86E0 0%, #1968B6 100%)',
        footer:
          'linear-gradient(180deg, rgba(105, 204, 244, 0) 0%, rgba(4, 54, 102, 0.5) 100%)',
        content:
          ' linear-gradient(to bottom, #1b78d9, #2b8ee5, #5dc4f5, #68ccf5)',
        mapsbtn: 'linear-gradient(180deg, #2A86E0 0%, #1968B6 100%)',
        login: 'linear-gradient(180deg, #2A86E0 0%, #17497A 100%)',
        pages: 'linear-gradient(180deg, #17497A 0%, #79b6ed 100%)',
        btn: 'linear-gradient(180deg, #69CBF4 0%, #5DB5E3 100%)',
      },

      boxShadow: {
        'custom-inset-top': '0px 10px 5px 0px #E7FEFF40 inset',
        'custom-inset-bottom': '0px -13px 18.3px 0px #3A75C840 inset',
        section: '0px 6px 14.4px 0px #00000040',
        card: ' 0px 4px 4px 0px #00000040',
        'deep-top': '0 -10px 15px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        upAndDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        breathing: 'breathing 3s ease-in-out infinite',
        upAndDown: 'upAndDown 3s ease-in-out infinite',
        'slide-in-right': 'slideInFromRight 0.5s ease forwards',
        'slide-in-left': 'slideInFromLeft 0.5s ease forwards',
      },
      fontFamily: {
        fredoka: '"Fredoka", sans-serif',
        gurajada: ' "Gurajada", sans-serif',
        itim: ' "Itim", cursive',
        inter: '"Inter", sans-serif;',
      },
    },
  },
  plugins: [],
};
