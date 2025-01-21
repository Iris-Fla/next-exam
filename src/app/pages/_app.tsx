// src/pages/_app.tsx
import { AppProps } from 'next/app';
import '@/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;