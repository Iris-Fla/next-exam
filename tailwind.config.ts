import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'physics-gradient': 'linear-gradient(to right, #ffffff, rgb(255, 201, 187))',
        'chemistry-gradient': 'linear-gradient(to right, #ffffff, rgb(184, 255, 233))',
        'biology-gradient': 'linear-gradient(to right, #ffffff, #8bc34a)',
        'hygiene-gradient': 'linear-gradient(to right, #ffffff, #4dd0e1)',
        'pharmacology-gradient': 'linear-gradient(to right, #ffffff, #ab47bc)',
        'pharmacy-gradient': 'linear-gradient(to right, #ffffff, #ffa726)',
        'pathology-pharmacotherapy-gradient': 'linear-gradient(to right, #ffffff, #ec407a)',
        'legal-system-gradient': 'linear-gradient(to right, #ffffff, #757575)',
        'ethics-gradient': 'linear-gradient(to right, #ffffff, #78909c)',
        'practice-gradient': 'linear-gradient(to right, #ffffff, #009688)',
      },
      fontFamily: {
        noto:["var(--font-Noto-Sans-JP)"],
        mplus:["var(--font-M-PLUS-Rounded-1c)"],
      },
    },
  },
  plugins: [
  ],
} satisfies Config;
