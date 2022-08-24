module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './plugins/docusaurus-theme-extends/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          0: 'var(--taichi-grey-0)',
          1: 'var(--taichi-grey-1)',
          2: 'var(--taichi-grey-2)',
          3: 'var(--taichi-grey-3)',
          4: 'var(--taichi-grey-4)',
        },
        'dark-grey-0': 'var(--taichi-dark-grey-0)',
        'dark-grey-1': 'var(--taichi-dark-grey-1)',
        'dark-grey-2': 'var(--taichi-dark-grey-2)',
        'dark-grey-3': 'var(--taichi-dark-grey-3)',
        'dark-grey-4': 'var(--taichi-dark-grey-4)',
        'light-grey-0': 'var(--taichi-light-grey-0)',
        'light-grey-1': 'var(--taichi-light-grey-1)',
        'light-grey-2': 'var(--taichi-light-grey-2)',
        'light-grey-3': 'var(--taichi-light-grey-3)',
        'light-grey-4': 'var(--taichi-light-grey-4)',
        'brand-cyan': 'var(--taichi-brand-cyan)',
        'brand-blue': 'var(--taichi-brand-blue)',
        'brand-cyan-dark': 'var(--taichi-brand-cyan-dark)',
        red: {
          main: 'var(--taichi-red-main)',
        },
        yellow: {
          main: 'var(--taichi-yellow-main)',
        },
        white: '#ffff',
      },
      screens: {
        desktop: '997px',
      },
      maxWidth: {
        'docmain': '1160px',
        'articlemain': '792px',
      },
      width: {
        'docsidebar': '362px',
        'dochiddensidebar': '0px',
        'docmain': '1160px',
      },
    },
  },
  plugins: [],
};
