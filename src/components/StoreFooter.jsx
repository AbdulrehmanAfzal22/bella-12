import {subscribe as subscribeNewsletter} from '../services/newsletter';
import {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {toast} from 'sonner';
import {customerNavigation,exploreNavigation} from '../config/navigation';
import BrandLogo from './BrandLogo';

export default function StoreFooter(){
  const [email,setEmail]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');

  async function subscribe(event){event.preventDefault();if(busy)return;setBusy(true);setMessage('');setError('');try{await subscribeNewsletter(email);setEmail('');setMessage('You are subscribed to new-arrival emails.');toast.success('Subscription saved.');}catch(err){setError(err.message||'Please try again.');}finally{setBusy(false);}}

  return <footer className="luxury-footer">
    <div className="luxury-footer__journal"><div><p className="eyebrow">Notes from the studio</p><h2>Join the Bella by RT journal</h2><p>Occasional letters on shades, beauty favourites and everyday rituals.</p></div><form className="luxury-footer__signup" onSubmit={subscribe}><label className="visually-hidden" htmlFor="journal-email">Email address</label><input id="journal-email" type="email" autoComplete="email" placeholder="Your email address" required value={email} onChange={event=>setEmail(event.target.value)}/><button type="submit" aria-label="Subscribe to the Bella by RT journal" disabled={busy}>{busy?'Subscribing…':'Subscribe'} <ArrowUpRight size={16}/></button></form>{message&&<p role="status">{message}</p>}{error&&<p role="alert" className="error">{error}</p>}<small>Subscribe to new-arrival emails. Unsubscribe anytime.</small></div>
    <div className="luxury-footer__columns">
      <div className="luxury-footer__brand"><Link className="luxury-wordmark" to="/" aria-label="Bella by RT home"><BrandLogo className="luxury-wordmark__image" alt=""/></Link><p>A little colour.<br/>A little more you.</p></div>
      <div><h3>Explore</h3>{exploreNavigation.map(item=><Link to={item.to} key={item.to}>{item.label}</Link>)}</div>
      <div><h3>Your beauty collection</h3>{customerNavigation.map(item=><Link to={item.to} key={item.to}>{item.label}</Link>)}</div>
      <div className="luxury-footer__contact"><h3>The studio</h3><Link className="luxury-footer__contact-button" to="/contact-support">Contact us <ArrowUpRight size={16} aria-hidden="true"/></Link></div>
    </div>
    <div className="luxury-footer__legal"><small>© {new Date().getFullYear()} Bella by RT</small><small>Considered, always.</small></div>
  </footer>;
}
