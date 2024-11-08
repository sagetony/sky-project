export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'meta-gradient':
          'linear-gradient(180deg, rgba(29, 168, 254, 0) 0%, #166FD5 100%)',
        'blue-gradient':
          'linear-gradient(to bottom, #66b1ee, #50a6ed, #3692e4, #1972d6)',
      },
      boxShadow: {
        'custom-inset-top': '0px 10px 5px 0px #E7FEFF40 inset',
        'custom-inset-bottom': '0px -13px 18.3px 0px #3A75C840 inset',
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
      },
      animation: {
        breathing: 'breathing 3s ease-in-out infinite',
        upAndDown: 'upAndDown 3s ease-in-out infinite',
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
