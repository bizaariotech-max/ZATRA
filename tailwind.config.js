/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: " 1.5rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        // // Design system colors
        // 'bizario': {
        //   primary: '#52677D',
        //   sidebar: '#BDC4D480',
        //   'sidebar-accent': '#BDC4D44D',
        //   'text-secondary': '#000000B3',
        // },
        // Existing theme colors mapped to CSS variables (HEX values)
        webborder: "var(--web-border)",
        webinput: "var(--web-input)",
        webring: "var(--web-ring)",
        webBg: "var(--web-background)",
        webforeground: "var(--web-foreground)",
        webPara: "var(--web-card-foreground)",
        para: "var(--text-para)",
        lightTheme: "var(--light-theme)",
        webprimary: {
          DEFAULT: "var(--web-primary)",
          foreground: "var(--weprimary-foreground)",
        },
        websecondary: {
          DEFAULT: "var(--web-secondary)",
          foreground: "var(--web-secondary-foreground)",
        },
        webdestructive: {
          DEFAULT: "var(--web-destructive)",
          foreground: "var(--web-destructive-foreground)",
        },
        webmuted: {
          DEFAULT: "var(--web-muted)",
          foreground: "var(--web-muted-foreground)",
        },
        webaccent: {
          DEFAULT: "var(--web-accent)",
          foreground: "var(--web-accent-foreground)",
        },
        webPopover: {
          DEFAULT: "var(--web-popover)",
          foreground: "var(--web-popover-foreground)",
        },
        webcard: {
          DEFAULT: "var(--web-card)",
          foreground: "var(--web-card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      boxShadow: {
        card: "0 0 14px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        lg: "var(--web-radius)",
        md: "calc(var(--web-radius) - 2px)",
        sm: "calc(var(--web-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        growDown: {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.1)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "growDown": "growDown .8s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};