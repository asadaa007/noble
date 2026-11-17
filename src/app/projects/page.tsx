import type {Metadata} from 'next';
import {PageIntro,CTA} from '@/components/ui';
import {ProjectExplorer} from '@/components/project-explorer';
export const metadata:Metadata={title:'Project applications',description:'Explore illustrative MEP applications across commercial, healthcare, industrial and hospitality spaces.',alternates:{canonical:'/projects'}};
export default function Projects(){return <><PageIntro eyebrow="Project applications" title={<>Every space.<br/><span className="text-accent">Its own possibilities.</span></>} description="From the way a workplace feels to the way a facility operates, building services shape the everyday. Explore the systems behind different types of spaces."/><ProjectExplorer/><CTA/></>}
