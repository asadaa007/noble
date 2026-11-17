import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import './globals.css';
import { Header, Footer, FloatingActions } from '@/components/site-shell';
import { company } from '@/lib/company';
export const metadata: Metadata = {metadataBase:new URL(company.siteUrl),title:{default:'Noble MEP Solutions — Engineering better environments',template:'%s | Noble MEP Solutions'},description:'An integrated approach to mechanical, electrical, plumbing, HVAC and building systems. Explore Noble MEP Solutions and discuss your next project.',robots:{index:process.env.SITE_LAUNCH_READY==='true',follow:process.env.SITE_LAUNCH_READY==='true'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body><Header/><main id="main">{children}</main><Footer/><FloatingActions/></body></html>;}
