'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { company } from '@/lib/company';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Hello Noble MEP Solutions, I would like to discuss a project.');
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const number = company.whatsapp.replace(/\D/g, '');

  useEffect(() => {
    if (!open) return;
    close.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !trigger.current?.contains(target)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  if (!number) return null;
  const href = `https://wa.me/${number}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}`;
  return <div className="whatsapp-widget">
    {open && <div ref={panel} className="whatsapp-panel" id="whatsapp-panel" role="dialog" aria-labelledby="whatsapp-heading">
      <div className="whatsapp-panel-header">
        <span className="whatsapp-avatar"><MessageCircle size={24} aria-hidden="true" /></span>
        <div><h2 id="whatsapp-heading">Noble MEP Solutions</h2><p>Let’s talk about your project</p></div>
        <button ref={close} type="button" className="whatsapp-close" aria-label="Close WhatsApp chat" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={19} /></button>
      </div>
      <div className="whatsapp-panel-body">
        <p className="whatsapp-welcome">Have a question about MEP, cooling or building services? Start a conversation with our team.</p>
        <label htmlFor="whatsapp-message">Your message</label>
        <textarea id="whatsapp-message" value={message} onChange={event => setMessage(event.target.value)} rows={3} maxLength={1500} />
        <a className="whatsapp-send" href={href} target="_blank" rel="noopener noreferrer">Continue to WhatsApp <ArrowUpRight size={18} /></a>
        <p className="whatsapp-note">Opens WhatsApp. Review your message there and press Send.</p>
        <span className="whatsapp-number">+{number}</span>
      </div>
    </div>}
    <button ref={trigger} type="button" className="whatsapp-launcher" aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'} aria-expanded={open} aria-controls="whatsapp-panel" onClick={() => setOpen(value => !value)}>
      {open ? <X size={25} aria-hidden="true" /> : <MessageCircle size={27} aria-hidden="true" />}
    </button>
  </div>;
}
