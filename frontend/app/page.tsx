import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '64rem', color: 'white' }}>
        <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Nexura Protocol
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
          Trustless Smart Invoice Ecosystem for SMEs
        </p>
        <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '3rem', maxWidth: '42rem', margin: '0 auto 3rem' }}>
          Stop waiting 30-60 days for payment. Lock funds in escrow, earn yield while waiting, and receive instant settlements on delivery confirmation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚡</div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Instant Liquidity</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No more 30-60 day payment delays</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔒</div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Escrow Safety</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Funds secured until delivery verified</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🤖</div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Automated Payouts</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Smart contracts release funds automatically</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #9333ea, #db2777)',
              color: 'white',
              fontWeight: '600',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none'
            }}
          >
            Launch Dashboard →
          </Link>
          <Link
            href="/create-invoice"
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: '600',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none'
            }}
          >
            Create Invoice
          </Link>
        </div>
      </div>
    </div>
  );
}