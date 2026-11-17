import {products} from './products';
import {services} from './services';
export type Enquiry={name:string;email:string;phone:string;organisation:string;city:string;message:string;services:string[];products:string[];consent:boolean;website:string};
export function validateEnquiry(value:unknown):{data?:Enquiry;errors:Record<string,string>}{
 const errors:Record<string,string>={};
 if(!value||typeof value!=='object'||Array.isArray(value))return {errors:{form:'Please provide a valid enquiry.'}};
 const obj=value as Record<string,unknown>;
 const read=(key:string,max:number,required=false)=>{const val=typeof obj[key]==='string'?(obj[key] as string).trim():'';if((required&&!val)||val.length>max)errors[key]=required&&!val?'This field is required.':`Use no more than ${max} characters.`;return val;};
 const name=read('name',100,true),email=read('email',254,true),phone=read('phone',40),organisation=read('organisation',160),city=read('city',100),message=read('message',5000,true),website=read('website',200);
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email='Enter a valid email address.';
 if(message&&message.length<20)errors.message='Please add at least 20 characters about your project.';
 const selection=(key:string,allowed:string[])=>{const v=obj[key];if(!Array.isArray(v)||v.length>allowed.length||v.some(x=>typeof x!=='string'||!allowed.includes(x))){errors[key]='Please choose valid options.';return [];}return [...new Set(v)] as string[];};
 const selectedServices=selection('services',services.map(s=>s.slug)),selectedProducts=selection('products',products.map(p=>p.id));
 if(obj.consent!==true)errors.consent='Please allow us to respond to this enquiry.';
 const data={name,email,phone,organisation,city,message,services:selectedServices,products:selectedProducts,consent:obj.consent===true,website};
 return Object.keys(errors).length?{errors}:{errors,data};
}
export function enquiryBrief(data:Partial<Enquiry>){return ['NOBLE MEP SOLUTIONS — PROJECT ENQUIRY','',`Name: ${data.name||''}`,`Email: ${data.email||''}`,`Phone: ${data.phone||''}`,`Organisation: ${data.organisation||''}`,`Project location: ${data.city||''}`,'',`Services: ${(data.services||[]).map(id=>services.find(s=>s.slug===id)?.title).filter(Boolean).join(', ')||'To discuss'}`,`Equipment: ${(data.products||[]).map(id=>products.find(p=>p.id===id)?.name).filter(Boolean).join(', ')||'To discuss'}`,'','Project brief:',data.message||'','', 'This is an enquiry, not a confirmed quotation or order.'].join('\n');}
