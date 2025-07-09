export default {
  mode: 'jit',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      serif: [
        'Merriweather',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif'
      ]
    },
    extend: {
      colors: {
        ivory: '#FFFFF0',
        charcoal: '#333333',
        mutedgold: '#C2B280'
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: []
};
