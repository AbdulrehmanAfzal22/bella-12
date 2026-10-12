import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import Container from './common/Container';
import LuxuryProductGrid from './shop/LuxuryProductGrid';
import {ErrorState} from './Feedback';
import '../styles/shop.css';
import '../styles/home-products.css';

export default function HomeProducts({products=[],loading,error,retry}){
  const [columns,setColumns]=useState(()=>window.innerWidth<=600?2:window.innerWidth<=1000?3:4);
  useEffect(()=>{const update=()=>setColumns(window.innerWidth<=600?2:window.innerWidth<=1000?3:4);window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update);},[]);
  return <section className="home-products" aria-labelledby="home-products-title"><Container width="wide"><header className="home-products__heading"><div><p className="eyebrow">The Bella by RT collection</p><h2 id="home-products-title">Shop our products</h2><p>Discover our latest beauty essentials.</p></div><Link className="luxury-text-link" to="/shop">View More <ArrowUpRight size={17}/></Link></header>{error?<ErrorState error={error} retry={retry}/>:<LuxuryProductGrid products={products.slice(0,columns*4)} loading={loading} emptyTitle="Our collection is coming soon" emptyDescription="New products will appear here as they are published."/>}<div className="home-products__more"><Link className="button" to="/shop">View More <ArrowUpRight size={17}/></Link></div></Container></section>;
}
