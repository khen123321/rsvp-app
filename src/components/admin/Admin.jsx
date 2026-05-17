import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Login from './login';
import Scanner from './Scanner';
import './admin.css';

const GuestCard = ({ guest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`guest-card ${guest.isAttending ? 'card-attending' : 'card-declined'} ${isOpen ? 'is-open' : ''}`}>
      <button
        className="guest-card-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="guest-identity">
          <div className={`guest-avatar ${guest.isAttending ? 'avatar-attending' : 'avatar-declined'}`}>
            {guest.name.charAt(0).toUpperCase()}
          </div>
          <div className="guest-text">
            <span className="guest-name">{guest.name}</span>
            <span className="guest-subtle">#{String(guest.id).slice(0, 8)}</span>
          </div>
        </div>

        <div className="guest-toggle-indicators">
          {guest.isAttending && guest.guestsCount > 0 && (
            <span className="guest-badge" title="Additional guests">+{guest.guestsCount}</span>
          )}
          <svg className={`chevron ${isOpen ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <div className={`guest-card-content ${isOpen ? 'expanded' : ''}`}>
        <div className="guest-card-inner">
          <div className="guest-meta">
            <div className="meta-row">
              <span className="meta-label">Contact</span>
              <span className="meta-value">{guest.contact}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Ticket ID</span>
              <span className="meta-value mono">{guest.id}</span>
            </div>
            {guest.isAttending && (
              <div className="meta-row">
                <span className="meta-label">Party Size</span>
                <span className="meta-value">{1 + (guest.guestsCount || 0)}</span>
              </div>
            )}
          </div>

          {guest.message && (
            <div className="guest-message">
              <span className="message-quote">"</span>
              <p>{guest.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('isAdminLoggedIn') === 'true'
  );
  const [guests, setGuests] = useState(null);
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');

  const hasAccess = searchParams.get('access_token') === 'secret_temp_token_123';

  useEffect(() => {
    if (!hasAccess) navigate('/', { replace: true });
  }, [hasAccess, navigate]);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch('https://script.google.com/macros/s/AKfycbznkiN0O6QaZO4EOeSTenStE-LILt7mxMOP8pfldsGQIedc-_OwTTKoe5q8jKJjJOi0/exec')
      .then((res) => res.json())
      .then((data) => {
        const valid = data.filter((r) => r.fullName && String(r.fullName).trim() !== '');
        setGuests(
          valid.map((row) => ({
            id: row.ticketId || row.id || Math.random().toString(36).substr(2, 6),
            name: row.fullName,
            contact: row.contactNumber || 'No Contact',
            isAttending:
              String(row.attending || row.status).toLowerCase().trim() === 'yes',
            guestsCount: parseInt(row.guests) || 0,
            message: row.message || '',
          }))
        );
      })
      .catch(() => setGuests([]));
  }, [isLoggedIn]);

  const handleLogin = () => {
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
  };

  const { attending, declined, totalHeadcount } = useMemo(() => {
    if (!guests) return { attending: [], declined: [], totalHeadcount: 0 };
    const a = guests.filter((g) => g.isAttending);
    const d = guests.filter((g) => !g.isAttending);
    const head = a.reduce((sum, g) => sum + 1 + (g.guestsCount || 0), 0);
    return { attending: a, declined: d, totalHeadcount: head };
  }, [guests]);

  const filterGuests = (list) =>
    !search.trim()
      ? list
      : list.filter((g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          String(g.contact).toLowerCase().includes(search.toLowerCase())
        );

  const responseRate = guests && guests.length > 0
    ? Math.round((attending.length / guests.length) * 100)
    : 0;

  if (!hasAccess) return null;
  if (!isLoggedIn) return <Login onLoginSuccess={handleLogin} />;

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="header-container">
          <div className="brand">
            <div className="brand-mark">L&A</div>
            <div className="brand-text">
              <span className="brand-title">Admin Console</span>
              <span className="brand-sub">Guest Management</span>
            </div>
          </div>
          <div className="header-actions">
            <div className="status-pill">
              <span className="status-dot" />
              <span>Live</span>
            </div>
            <button className="btn-outline" onClick={handleLogout} aria-label="Sign out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="btn-label">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main fade-in">
        <div className="page-heading">
          <div>
            <h1>Dashboard</h1>
            <p className="page-sub">Real-time RSVP tracking and check-in management.</p>
          </div>
          <div className="tab-group">
            <button
              className={`tab-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              List
            </button>
            <button
              className={`tab-btn ${view === 'scanner' ? 'active' : ''}`}
              onClick={() => setView('scanner')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Scanner
            </button>
          </div>
        </div>

        {guests === null ? (
          <div className="loader-container">
            <div className="spinner" />
            <p>Syncing records…</p>
          </div>
        ) : view === 'scanner' ? (
          <Scanner guests={guests} />
        ) : (
          <>
            <div className="kpi-grid fade-in">
              <div className="kpi-card kpi-success">
                <div className="kpi-top">
                  <span className="kpi-label">Attending</span>
                  <span className="kpi-icon">✓</span>
                </div>
                <span className="kpi-value">{attending.length}</span>
                <span className="kpi-foot">of {guests.length} invited</span>
              </div>

              <div className="kpi-card kpi-info">
                <div className="kpi-top">
                  <span className="kpi-label">Headcount</span>
                  <span className="kpi-icon">◉</span>
                </div>
                <span className="kpi-value">{totalHeadcount}</span>
                <span className="kpi-foot">incl. plus-ones</span>
              </div>

              <div className="kpi-card kpi-danger">
                <div className="kpi-top">
                  <span className="kpi-label">Declined</span>
                  <span className="kpi-icon">✕</span>
                </div>
                <span className="kpi-value">{declined.length}</span>
                <span className="kpi-foot">unable to attend</span>
              </div>

              <div className="kpi-card kpi-rate">
                <div className="kpi-top">
                  <span className="kpi-label">Response</span>
                  <span className="kpi-icon">%</span>
                </div>
                <span className="kpi-value">{responseRate}<small>%</small></span>
                <div className="kpi-bar">
                  <div className="kpi-bar-fill" style={{ width: `${responseRate}%` }} />
                </div>
              </div>
            </div>

            <div className="search-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search name or contact…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-btn" onClick={() => setSearch('')} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>

            <div className="data-columns fade-in">
              <div className="data-column">
                <div className="column-header">
                  <div className="column-title">
                    <span className="status-marker marker-attending" />
                    <h2>Attending</h2>
                  </div>
                  <span className="count-badge badge-success">{filterGuests(attending).length}</span>
                </div>
                <div className="column-body">
                  {filterGuests(attending).length === 0 ? (
                    <div className="empty-state">
                      <span className="empty-icon">○</span>
                      <p>{search ? 'No matches found.' : 'No confirmed guests yet.'}</p>
                    </div>
                  ) : (
                    filterGuests(attending).map((g) => <GuestCard key={g.id} guest={g} />)
                  )}
                </div>
              </div>

              <div className="data-column">
                <div className="column-header">
                  <div className="column-title">
                    <span className="status-marker marker-declined" />
                    <h2>Declined</h2>
                  </div>
                  <span className="count-badge badge-danger">{filterGuests(declined).length}</span>
                </div>
                <div className="column-body">
                  {filterGuests(declined).length === 0 ? (
                    <div className="empty-state">
                      <span className="empty-icon">○</span>
                      <p>{search ? 'No matches found.' : 'No declined invitations.'}</p>
                    </div>
                  ) : (
                    filterGuests(declined).map((g) => <GuestCard key={g.id} guest={g} />)
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
