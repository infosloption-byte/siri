/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0D10",
        surface: "#14171C",
        surface2: "#1B1F26",
        border: "#262B33",
        copper: "#C1743F",
        copperDim: "#8A5230",
        phosphor: "#6FCF97",
        phosphorDim: "#3E7A56",
        ink: "#EDEAE3",
        muted: "#8A8F98",
        mutedDim: "#5B6068",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(237,234,227,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
}

