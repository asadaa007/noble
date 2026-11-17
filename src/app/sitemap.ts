import type {MetadataRoute} from 'next';
import {company,cities} from '@/lib/company';
import {services} from '@/lib/services';
import {guideSlugs} from '@/lib/products';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/about','/services','/products','/projects','/contact',...services.map(s=>`/${s.slug}`),...guideSlugs.map(s=>`/${s}`),...cities.map(c=>`/hvac-contractor-${c.toLowerCase()}`)].map(path=>({url:`${company.siteUrl.replace(/\/$/,'')}${path}`,changeFrequency:'monthly',priority:path===''?1:.7}))}
