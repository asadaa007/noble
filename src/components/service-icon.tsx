import { Layers, Wind, Flame, Zap, Droplets, Building2, SlidersHorizontal } from 'lucide-react';
import type { Service } from '@/lib/services';
const icons={layers:Layers,wind:Wind,flame:Flame,bolt:Zap,water:Droplets,building:Building2,control:SlidersHorizontal};
export function ServiceIcon({name,size=28}:{name:Service['icon'];size?:number}){const Icon=icons[name];return <Icon size={size} strokeWidth={1.3}/>;}
