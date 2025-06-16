import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  
  // Determine active link for styling
  const isActive = (path) => {
    return router.pathname === path ? 
      { color: '#0369a1', fontWeight: 'bold', borderBottom: '2px solid #0369a1' } : 
      {};
  };

  return (
    <header style={{
      width: '100%',
      padding: '1rem 2rem',
      background: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div className="logo">
        <Link href="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#0369a1',
          textDecoration: 'none'
        }}>
          KnowBeforeYouGo
        </Link>
      </div>
      
      <nav>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '2rem',
          margin: 0,
          padding: 0
        }}>
          <li>
            <Link href="/" style={{
              textDecoration: 'none',
              color: '#333',
              padding: '0.5rem 0',
              ...isActive('/')
            }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/advice" style={{
              textDecoration: 'none',
              color: '#333',
              padding: '0.5rem 0',
              ...isActive('/advice')
            }}>
              Report
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
