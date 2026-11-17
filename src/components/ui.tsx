import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
export function ButtonLink({href,children,variant='primary',className=''}:{href:string;children:ReactNode;variant?:'primary'|'outline'|'light'|'text';className?:string}){
 return <Link href={href} className={`button button-${variant} ${className}`}>{children}<ArrowUpRight size={18}/></Link>;
}
export function Eyebrow({children,light=false}:{children:ReactNode;light?:boolean}){return <p className={`eyebrow ${light?'light':''}`}><span/>{children}</p>;}
export function PageIntro({eyebrow,title,description,children}:{eyebrow:string;title:ReactNode;description:string;children?:ReactNode}){return <section className="page-intro"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><ArrowRight size={12}/><span>{eyebrow}</span></div><Eyebrow>{eyebrow}</Eyebrow><div className="intro-grid"><h1>{title}</h1><div><p className="lead">{description}</p>{children}</div></div></div></section>;}
export function CTA(){return <section className="cta"><div className="container cta-inner"><div><Eyebrow light>Let’s build something that works</Eyebrow><h2>Good buildings start<br/>with a conversation.</h2></div><div><p>Tell us what you’re planning.<br/>Let’s find the right way forward.</p><ButtonLink href="/contact" variant="light">Discuss your project</ButtonLink></div></div><span className="cta-outline" aria-hidden="true">N</span></section>;}
export function FAQ({items}:{items:{q:string;a:string}[]}){return <div className="faq-list">{items.map(({q,a})=><details key={q}><summary>{q}<Plus size={19}/></summary><p>{a}</p></details>)}</div>;}
export function EmptyState({title,description,onReset}:{title:string;description:string;onReset?:()=>void}){return <div className="empty-state"><h3>{title}</h3><p>{description}</p>{onReset&&<button className="button button-outline" onClick={onReset}>Reset filters<ArrowRight size={16}/></button>}</div>;}
