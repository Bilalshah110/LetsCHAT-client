import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/allusers">Users</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
        <li>
          <Link href="/message">Messages</Link>
        </li>
      </ul>
    </>
  );
}
