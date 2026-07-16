import { useState, useEffect, useMemo } from 'react';
import Login from './login';
import Scanner from './Scanner';

const kpiCardBase = `relative overflow-hidden rounded-[10px] border border-[#e6e8ec] bg-white px-[1.35rem] py-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08),0_2px_6px_-2px_rgba(15,23,42,0.04)] max-[640px]:px-4 max-[640px]:py-[0.95rem]`;
const kpiIconBase = `grid h-6 w-6 place-items-center rounded-md bg-[#eef0f4] text-[0.75rem] font-bold text-[#475063] max-[640px]:h-[22px] max-[640px]:w-[22px] max-[640px]:text-[0.7rem]`;
const tabButtonBase = `inline-flex min-h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[7px] border-0 bg-transparent px-3.5 py-2 text-[0.825rem] font-medium text-[#475063] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#0b1220] max-md:w-full`;

const GuestCard = ({ guest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const attending = guest.isAttending;

  return (
    <div className={`relative rounded-md border bg-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:rounded-l-md before:transition-colors before:duration-200 hover:border-[#d4d8df] hover:shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] ${attending ? `border-[#e6e8ec] before:bg-[#0d9b6c]` : `border-[#e6e8ec] bg-[#fcfcfd] before:bg-[#d7263d] before:opacity-70`} ${isOpen ? `z-10 -translate-y-0.5 border-[#0b1220] shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08),0_2px_6px_-2px_rgba(15,23,42,0.04)]` : ''}`}>
      <button className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-2 border-0 bg-transparent py-3 pl-[1.1rem] pr-4 text-left max-[640px]:py-[0.7rem] max-[640px]:pl-[0.95rem] max-[640px]:pr-[0.85rem]" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className={`grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-[0.85rem] font-semibold max-[640px]:h-8 max-[640px]:w-8 max-[640px]:text-[0.8rem] ${attending ? `bg-[#e8f7f0] text-[#0d9b6c]` : `bg-[#fdecee] text-[#d7263d]`}`}>
            {guest.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className={`overflow-hidden text-ellipsis whitespace-nowrap text-[0.9rem] font-semibold tracking-[-0.01em] text-[#0b1220] max-[640px]:text-[0.875rem]`}>{guest.name}</span>
            <span className={`overflow-hidden text-ellipsis whitespace-nowrap font-['SF_Mono',Menlo,monospace] text-[0.7rem] text-[#8b94a6] max-[640px]:text-[0.68rem]`}>#{String(guest.id).slice(0, 8)}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <svg className={`shrink-0 text-[#8b94a6] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? '[grid-template-rows:1fr]' : '[grid-template-rows:0fr]'}`}>
        <div className="min-h-0 overflow-hidden p-0">
          <div className={`flex flex-col gap-0 border-t border-dashed border-[#e6e8ec] px-[1.1rem] py-3 last:pb-[1.1rem]`}>
            <div className="flex items-center justify-between gap-3 py-[0.4rem] text-[0.825rem] max-[640px]:py-[0.35rem] max-[640px]:text-[0.8rem]">
              <span className={`shrink-0 font-medium text-[#8b94a6]`}>Contact</span>
              <span className={`min-w-0 break-words text-right font-medium text-[#0b1220]`}>{guest.contact}</span>
            </div>
            <div className="flex items-center justify-between gap-3 py-[0.4rem] text-[0.825rem] max-[640px]:py-[0.35rem] max-[640px]:text-[0.8rem]">
              <span className={`shrink-0 font-medium text-[#8b94a6]`}>Ticket ID</span>
              <span className={`min-w-0 break-all rounded bg-[#eef0f4] px-2 py-0.5 text-right font-['SF_Mono',Menlo,monospace] text-[0.78rem] font-medium text-[#0b1220] max-[640px]:text-[0.72rem]`}>{guest.id}</span>
            </div>
          </div>

          {guest.message && (
            <div className={`relative mx-[1.1rem] mb-[1.1rem] mt-2 rounded-md border border-[#e6e8ec] bg-[#fafbfc] py-[0.85rem] pl-9 pr-4`}>
              <span className={`absolute left-2 top-[-0.25rem] font-georgia text-[2.5rem] leading-none text-[#d4d8df]`}>"</span>
              <p className={`m-0 whitespace-pre-wrap break-words text-[0.85rem] italic leading-[1.55] text-[#475063] [overflow-wrap:anywhere] max-[640px]:text-[0.8rem]`}>{guest.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('isAdminLoggedIn') === 'true'
  );
  const [guests, setGuests] = useState(null);
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');

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
            isAttending: String(row.attending || row.status).toLowerCase().trim() === 'yes',
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

  const { attending, declined } = useMemo(() => {
    if (!guests) return { attending: [], declined: [] };
    const a = guests.filter((g) => g.isAttending);
    const d = guests.filter((g) => !g.isAttending);
    return { attending: a, declined: d };
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

  if (!isLoggedIn) return <Login onLoginSuccess={handleLogin} />;

  const renderColumn = (title, list, type) => {
    const successCol = type === 'success';
    const filtered = filterGuests(list);
    return (
      <div className={`flex flex-col rounded-[10px] border border-[#e6e8ec] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}>
        <div className={`flex items-center justify-between rounded-t-[10px] border-b border-[#e6e8ec] bg-[#fafbfc] px-5 py-3.5 max-[640px]:px-4 max-[640px]:py-3`}>
          <div className="flex items-center gap-2.5">
            <span className={`inline-block h-2 w-2 rounded-full ${successCol ? `bg-[#0d9b6c] shadow-[0_0_0_3px_#e8f7f0]` : `bg-[#d7263d] shadow-[0_0_0_3px_#fdecee]`}`} />
            <h2 className={`m-0 text-[0.9rem] font-semibold tracking-[-0.01em] text-[#0b1220] max-[640px]:text-[0.85rem]`}>{title}</h2>
          </div>
          <span className={`rounded-full px-2.5 py-[3px] text-[0.72rem] font-semibold tabular-nums ${successCol ? `bg-[#e8f7f0] text-[#0d9b6c]` : `bg-[#fdecee] text-[#d7263d]`}`}>{filtered.length}</span>
        </div>
        <div className="flex flex-col gap-3 rounded-b-[10px] p-4 max-[640px]:gap-2 max-[640px]:p-3">
          {filtered.length === 0 ? (
            <div className={`flex flex-col items-center gap-2 py-10 text-center text-[0.875rem] text-[#8b94a6]`}>
              <span className={`text-[1.75rem] leading-none text-[#d4d8df]`}>○</span>
              <p className="m-0">{search ? 'No matches found.' : successCol ? 'No confirmed guests yet.' : 'No declined invitations.'}</p>
            </div>
          ) : (
            filtered.map((g) => <GuestCard key={g.id} guest={g} />)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] bg-[radial-gradient(circle_at_0%_0%,rgba(42,109,244,0.04),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(13,155,108,0.03),transparent_40%)] font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] tracking-[-0.01em] text-[#0b1220] antialiased">
      <header className={`sticky top-0 z-50 border-b border-[#e6e8ec] bg-[rgba(255,255,255,0.85)] backdrop-blur-xl [-webkit-backdrop-filter:saturate(180%)_blur(12px)]`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-6 py-3.5 max-[640px]:px-[0.875rem] max-[640px]:py-3 max-[420px]:gap-2">
          <div className="flex min-w-0 items-center gap-3 max-[640px]:gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[linear-gradient(135deg,#0b1220,#2d3957)] text-[0.75rem] font-bold tracking-[0.02em] text-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] max-[640px]:h-8 max-[640px]:w-8 max-[640px]:text-[0.7rem]">L&A</div>
            <div className="flex min-w-0 flex-col leading-[1.2]">
              <span className={`overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem] font-semibold text-[#0b1220] max-[640px]:text-[0.875rem]`}>Admin Console</span>
              <span className={`text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#8b94a6] max-[640px]:hidden`}>Guest Management</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className={`inline-flex items-center gap-1.5 rounded-full bg-[#e8f7f0] px-2.5 py-1 text-[0.72rem] font-semibold text-[#0d9b6c] max-[640px]:hidden`}>
              <span className={`h-1.5 w-1.5 rounded-full bg-[#0d9b6c] animate-[adminPulse_2s_infinite]`} />
              <span>Live</span>
            </div>
            <button className={`inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e6e8ec] bg-white px-[0.9rem] py-2 text-[0.825rem] font-medium text-[#475063] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-[#0b1220] hover:bg-[#0b1220] hover:text-white max-[640px]:px-[0.7rem] max-[640px]:text-[0.78rem]`} onClick={handleLogout} aria-label="Sign out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="max-[640px]:hidden">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-6 pb-16 pt-9 animate-[adminFadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)] max-[1024px]:px-5 max-[1024px]:pb-12 max-[1024px]:pt-8 max-[640px]:px-[0.875rem] max-[640px]:pb-12 max-[640px]:pt-5">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 max-md:items-stretch">
          <div>
            <h1 className={`m-0 mb-1 text-[1.75rem] font-bold tracking-[-0.025em] text-[#0b1220] max-[640px]:text-[1.35rem] max-[420px]:text-[1.2rem]`}>Dashboard</h1>
            <p className={`m-0 text-[0.9rem] text-[#8b94a6] max-[640px]:text-[0.825rem]`}>Real-time RSVP tracking and check-in management.</p>
          </div>
          <div className={`inline-flex rounded-[10px] border border-[#e6e8ec] bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)] max-md:grid max-md:w-full max-md:grid-cols-2`}>
            <button className={`${tabButtonBase} ${view === 'list' ? `bg-[#0b1220] text-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]` : ''}`} onClick={() => setView('list')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              List
            </button>
            <button className={`${tabButtonBase} ${view === 'scanner' ? `bg-[#0b1220] text-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]` : ''}`} onClick={() => setView('scanner')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              Scanner
            </button>
          </div>
        </div>

        {guests === null ? (
          <div className={`flex flex-col items-center justify-center py-20 text-[0.875rem] text-[#8b94a6]`}>
            <div className={`mb-4 h-7 w-7 rounded-full border-[2.5px] border-[#e6e8ec] border-t-[#0b1220] animate-spin`} />
            <p>Syncing records…</p>
          </div>
        ) : view === 'scanner' ? (
          <Scanner guests={guests} />
        ) : (
          <>
            <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 animate-[adminFadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)] max-[1024px]:grid-cols-2 max-[640px]:mb-5 max-[640px]:gap-2.5 max-[420px]:grid-cols-1">
              <div className={`${kpiCardBase} before:bg-[#0d9b6c]`}>
                <div className="mb-3 flex items-center justify-between"><span className={`text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#8b94a6] max-[640px]:text-[0.65rem] max-[640px]:tracking-[0.05em]`}>Attending</span><span className={`${kpiIconBase} bg-[#e8f7f0] text-[#0d9b6c]`}>✓</span></div>
                <span className={`block text-[2rem] font-bold leading-none tracking-[-0.03em] text-[#0b1220] max-[1024px]:text-[1.75rem] max-[640px]:text-[1.4rem] max-[420px]:text-[1.65rem]`}>{attending.length}</span>
                <span className={`mt-[0.6rem] block text-[0.75rem] text-[#8b94a6] max-[640px]:mt-[0.45rem] max-[640px]:text-[0.7rem]`}>of {guests.length} invited</span>
              </div>

              <div className={`${kpiCardBase} before:bg-[#d7263d]`}>
                <div className="mb-3 flex items-center justify-between"><span className={`text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#8b94a6] max-[640px]:text-[0.65rem] max-[640px]:tracking-[0.05em]`}>Declined</span><span className={`${kpiIconBase} bg-[#fdecee] text-[#d7263d]`}>✕</span></div>
                <span className={`block text-[2rem] font-bold leading-none tracking-[-0.03em] text-[#0b1220] max-[1024px]:text-[1.75rem] max-[640px]:text-[1.4rem] max-[420px]:text-[1.65rem]`}>{declined.length}</span>
                <span className={`mt-[0.6rem] block text-[0.75rem] text-[#8b94a6] max-[640px]:mt-[0.45rem] max-[640px]:text-[0.7rem]`}>unable to attend</span>
              </div>

              <div className={`${kpiCardBase} before:bg-[linear-gradient(90deg,#2a6df4,#0d9b6c)]`}>
                <div className="mb-3 flex items-center justify-between"><span className={`text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#8b94a6] max-[640px]:text-[0.65rem] max-[640px]:tracking-[0.05em]`}>Response</span><span className={kpiIconBase}>%</span></div>
                <span className={`block text-[2rem] font-bold leading-none tracking-[-0.03em] text-[#0b1220] max-[1024px]:text-[1.75rem] max-[640px]:text-[1.4rem] max-[420px]:text-[1.65rem]`}>{responseRate}<small className={`ml-0.5 text-base font-semibold text-[#8b94a6] max-[640px]:text-[0.85rem]`}>%</small></span>
                <div className={`mt-3 h-1 overflow-hidden rounded-full bg-[#eef0f4]`}><div className={`h-full rounded-full bg-[linear-gradient(90deg,#2a6df4,#0d9b6c)] transition-[width] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]`} style={{ width: `${responseRate}%` }} /></div>
              </div>
            </div>

            <div className={`relative mb-5 flex items-center gap-2 rounded-[10px] border border-[#e6e8ec] bg-white px-[0.9rem] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:border-[#0b1220] focus-within:shadow-[0_0_0_3px_rgba(11,18,32,0.08)] max-[640px]:px-3`}>
              <svg className={`shrink-0 text-[#8b94a6]`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input className={`min-w-0 flex-1 border-0 bg-transparent py-[0.7rem] [font-family:inherit] text-base text-[#0b1220] outline-none placeholder:text-[#8b94a6] max-[640px]:py-[0.65rem]`} type="text" placeholder="Search name or contact…" value={search} onChange={(e) => setSearch(e.target.value)} />
              {search && <button className={`grid h-[22px] w-[22px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-[#eef0f4] text-base leading-none text-[#475063] transition-all duration-150 hover:bg-[#0b1220] hover:text-white`} onClick={() => setSearch('')} aria-label="Clear search">×</button>}
            </div>

            <div className="grid grid-cols-2 items-start gap-5 animate-[adminFadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)] max-md:grid-cols-1 max-md:gap-4">
              {renderColumn('Attending', attending, 'success')}
              {renderColumn('Declined', declined, 'danger')}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
