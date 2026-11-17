import { cities } from '@/lib/company';
import { LocationPage } from '@/components/location-page';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services } from '@/lib/services';
import { products, guideSlugs } from '@/lib/products';
import { EquipmentGuide } from '@/components/equipment-guide';
import { ServiceDetail } from '@/components/service-detail';
export function generateStaticParams(){return [...services.map(s=>({slug:s.slug})),...guideSlugs.map(slug=>({slug})),...cities.map(c=>({slug:`hvac-contractor-${c.toLowerCase()}`}))];}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const city=cities.find(c=>slug===`hvac-contractor-${c.toLowerCase()}`);const s=services.find(s=>s.slug===slug);return {title:city?`MEP project enquiries in ${city}`:s?.title||products.find(p=>p.guide===slug)?.name||'Page not found',description:s?.description||products.find(p=>p.guide===slug)?.description,alternates:{canonical:`/${slug}`}};}
export default async function DetailPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const s=services.find(s=>s.slug===slug);if(s)return <ServiceDetail service={s}/>;const p=products.find(p=>p.guide===slug&&guideSlugs.includes(slug));if(p)return <EquipmentGuide product={p}/>;const city=cities.find(c=>slug===`hvac-contractor-${c.toLowerCase()}`);if(city)return <LocationPage city={city}/>;notFound();}
