import type {MetadataRoute} from 'next';
import {company} from '@/lib/company';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(process.env.SITE_LAUNCH_READY==='true'?{allow:'/',disallow:'/api/'}:{disallow:'/'})},sitemap:`${company.siteUrl.replace(/\/$/,'')}/sitemap.xml`}}
