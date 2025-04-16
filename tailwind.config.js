export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007367",      // already added ✅
        subtitle: "#939598",     // new subtitle/body text color
      },
    },
  },
  plugins: [],
};
