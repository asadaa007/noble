import {NextRequest,NextResponse} from 'next/server';
import {validateEnquiry,enquiryBrief} from '@/lib/enquiry';
export const runtime='nodejs';
const recent=new Map<string,number[]>();
const MAX_BODY=24_000;
function reply(message:string,status:number,errors?:Record<string,string>){return NextResponse.json({message,errors},{status,headers:{'Cache-Control':'no-store'}})}
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');
 let sameOrigin=false;try{const source=new URL(origin||'');sameOrigin=source.origin===origin&&['http:','https:'].includes(source.protocol)&&source.host===request.headers.get('host');}catch{}
 if(!sameOrigin)return reply('Please submit the form from this website.',403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply('Use a JSON enquiry.',415);
 if(Number(request.headers.get('content-length')||0)>MAX_BODY)return reply('This enquiry is too large.',413);
 let raw='';const reader=request.body?.getReader();if(!reader)return reply('The enquiry is empty.',400);
 const decoder=new TextDecoder();let bytes=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>MAX_BODY){await reader.cancel();return reply('This enquiry is too large.',413);}raw+=decoder.decode(value,{stream:true});}raw+=decoder.decode();}catch{return reply('The enquiry could not be read.',400);}
 let input:unknown;try{input=JSON.parse(raw)}catch{return reply('The enquiry could not be read.',400)}
 const {data,errors}=validateEnquiry(input);if(!data)return reply('Please check the highlighted fields.',400,errors);
 if(data.website)return reply('This enquiry could not be accepted.',400);
 const endpoint=process.env.ENQUIRY_WEBHOOK_URL;
 if(!endpoint)return reply('Online delivery is not available yet. Your enquiry has not been sent. Save your brief below and contact us when our contact details are published.',503);
 let target:URL;try{target=new URL(endpoint);if(target.protocol!=='https:')throw new Error()}catch{return reply('Online delivery is temporarily unavailable. Your enquiry has not been sent.',503)}
 // Single-process guard. Production deployments must also enforce a shared edge rate limit.
 const key=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';const now=Date.now();
 for(const [id,times] of recent)if(times.every(t=>now-t>600_000))recent.delete(id);
 const times=(recent.get(key)||[]).filter(t=>now-t<600_000);if(times.length>=5||recent.size>10000)return reply('Too many attempts. Please try again in ten minutes.',429);recent.set(key,[...times,now]);
 try{const result=await fetch(target,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.ENQUIRY_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify({type:'website-enquiry',enquiry:data,brief:enquiryBrief(data),submittedAt:new Date().toISOString()}),signal:AbortSignal.timeout(12000),redirect:'error',cache:'no-store'});if(!result.ok)throw new Error();return reply('Your enquiry has been accepted. Thank you for sharing your project brief.',200)}catch{return reply('We could not confirm delivery. Please save your brief and try again later.',502)}
}
