import Link from 'next/link';

export default function Header() {
  return (
    <div className="header">
      <Link href="/">
        <a className="title">Test</a>
      </Link>
    </div>
  );
}
