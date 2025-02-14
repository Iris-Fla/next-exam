import Link from 'next/link';

export const Header = () => {
  return (
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
        </ul>
      </nav>
  );
}