export const company = {
  name: 'Noble MEP Solutions',
  legalName: 'NOBLE MEP SOLUTIONS (PRIVATE) LIMITED',
  registration: '0365456',
  incorporated: '10 November 2026',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '',
  mapUrl: process.env.NEXT_PUBLIC_MAP_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};
export const navigation = [
  {label:'About us',href:'/about'}, {label:'Expertise',href:'/services'},
  {label:'Equipment',href:'/products'}, {label:'Projects',href:'/projects'},
];
export const cities = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar'];
export const photos = {
  hero: '/images/architecture.jpg',
  building: '/images/building.jpg',
  interior: '/images/interior.jpg',
  industrial: '/images/industrial.jpg',
};
