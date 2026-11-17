import Link from 'next/link';
export function Brand({light=false}:{light?:boolean}) {
  return <Link href="/" aria-label="Noble MEP Solutions home" className={`brand ${light?'brand-light':''}`}>
    <svg viewBox="0 0 40 44" aria-hidden="true"><path d="M4 39V5l16 17V5h16v34L20 22v17Z" fill="none" stroke="currentColor" strokeWidth="2.4"/><path d="M4 5h9l23 34h-9Z" fill="currentColor" opacity=".18"/></svg>
    <span><strong>NOBLE<span className="brand-dot">.</span></strong><small>MEP SOLUTIONS</small></span>
  </Link>;
}
