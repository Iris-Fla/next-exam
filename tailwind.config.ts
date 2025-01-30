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
        'physics-gradient': 'linear-gradient(to right, #ffffff,rgb(255, 201, 187))', // オレンジ色のグラデーション
        'chemistry-gradient': 'linear-gradient(to right, #ffffff,rgb(184, 255, 233))', // 緑色のグラデーション
        // 他の科目のグラデーションを追加
      },
      fontFamily: {
        noto:['var(--font-noto)'],
        mplus:['var(--font-mplus)'],
      },
    },
  },
  plugins: [
  ],
} satisfies Config;
