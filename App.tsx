import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X, MapPin, MoveUpRight, Phone, MessageCircle, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe3D, type GlobeMarker } from "./components/Globe3D";

gsap.registerPlugin(ScrollTrigger);

const markers: GlobeMarker[] = [
  { lat: 28.4595, lng: 77.0266, label: "Gurugram", description: "Modern residences and premium communities near Delhi NCR." },
  { lat: 28.6139, lng: 77.209, label: "New Delhi", description: "Iconic addresses and connected city living." },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", description: "Contemporary towers and waterfront living." },
  { lat: 51.5074, lng: -0.1278, label: "London", description: "Timeless architecture in a global city." },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", description: "Thoughtful urban living and design." },
];

const properties = [
  {
    id: "01",
    name: "The Aurelia",
    type: "SIGNATURE RESIDENCES",
    location: "Golf Course Extension, Gurugram",
    price: "₹ 2.45 Cr onwards",
    detail: "3 & 4 BED RESIDENCES",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    className: "property-large",
  },
  {
    id: "02",
    name: "Solstice Villas",
    type: "PRIVATE VILLAS",
    location: "New Delhi NCR",
    price: "₹ 3.80 Cr onwards",
    detail: "PRIVATE GARDEN • 4 BED",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    className: "",
  },
  {
    id: "03",
    name: "The Meridian",
    type: "URBAN LIVING",
    location: "Sector 65, Gurugram",
    price: "₹ 1.65 Cr onwards",
    detail: "2 & 3 BED RESIDENCES",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    className: "",
  },
];

const faqs = [
  ["Can I schedule a private site visit?", "Yes. Share your contact details and preferred date in the enquiry form. Our team can follow up to coordinate a visit."],
  ["Are the listed prices final?", "Prices shown in this concept are sample content only. Actual pricing, availability, taxes and charges must be confirmed with the property developer."],
  ["Can I explore different property types?", "Yes. Use the property collection to explore residences, villas and other project categories. The final site can be tailored to a developer's real inventory."],
  ["Can this website be customized for my project?", "Absolutely. Branding, colours, project photography, location details, amenities and contact options can all be customized."],
];

function App() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState<GlobeMarker>(markers[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", project: "The Aurelia", date: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title, .hero-copy, .hero-actions", {
        y: 28, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15,
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 38, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
      gsap.to(".hero-orbit", {
        rotate: 360, duration: 48, repeat: -1, ease: "none", transformOrigin: "50% 50%",
      });
      gsap.to(".float-card", {
        y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I would like to know more about ${form.project}.`);
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const submitEnquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `LUXORA Website Enquiry\nName: ${form.name}\nPhone: ${form.phone}\nProject: ${form.project}\nPreferred visit: ${form.date || "Not specified"}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    setFormSent(true);
  };

  return (
    <div className="site-shell" ref={root}>
      <div className="announcement"><Sparkles size={13} /> A NEW PERSPECTIVE ON EXCEPTIONAL LIVING <span className="announcement-line" /></div>
      <header className="nav">
        <a className="brand" href="#home" aria-label="Luxora home"><span className="brand-mark">L</span><span>LUXORA<small>REAL ESTATE EXPERIENCE</small></span></a>
        <nav className={menuOpen ? "nav-links nav-links-open" : "nav-links"}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#vision" onClick={() => setMenuOpen(false)}>Our vision</a>
          <a href="#locations" onClick={() => setMenuOpen(false)}>Locations</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
        </nav>
        <a className="nav-cta" href="#contact">Arrange a visit <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="status-dot"/> A MORE CONSIDERED WAY TO LIVE</div>
            <h1 className="hero-title">Space to live.<br/><em>Room to become.</em></h1>
            <p className="hero-copy">Exceptional places, thoughtfully imagined. Discover residences that bring architecture, nature and everyday life into balance.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#collection">Explore residences <ArrowRight size={16}/></a>
              <a className="button button-quiet" href="#vision">Discover our vision <ArrowDown size={15}/></a>
            </div>
            <div className="hero-footnote"><span>01 / 05</span><span className="footnote-line"/><span>DESIGNED FOR WHAT'S NEXT</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit"><span/><span/><span/></div>
            <div className="globe-label"><span className="globe-label-dot"/> CONNECTED BY DESIGN <span>— 05 LOCATIONS</span></div>
            <Globe3D markers={markers} onMarkerClick={setActiveMarker}/>
            <div className="float-card">
              <div className="float-card-top"><span>FEATURED LOCATION</span><MapPin size={14}/></div>
              <strong>{activeMarker.label}</strong>
              <p>{activeMarker.description}</p>
              <a href="#locations">Explore location <ArrowUpRight size={13}/></a>
            </div>
            <div className="globe-coordinates">28° 27' N <span>•</span> 77° 02' E</div>
          </div>
          <a className="scroll-cue" href="#vision"><span className="scroll-cue-line"/> SCROLL TO EXPLORE</a>
        </section>

        <section className="intro section-pad" id="vision">
          <div className="section-label reveal"><span>01</span> THE LUXORA PERSPECTIVE</div>
          <div className="intro-layout">
            <h2 className="reveal">Not just an address.<br/><em>A way of seeing life.</em></h2>
            <div className="intro-side reveal"><p>We believe the right space changes how a day feels, how a family grows and how a future takes shape. Every detail should have a reason to be there.</p><a className="text-link" href="#collection">Explore our approach <ArrowUpRight size={15}/></a></div>
          </div>
          <div className="stats-row reveal"><div><strong>01</strong><span>THOUGHTFUL DESIGN</span></div><div><strong>02</strong><span>CONNECTED LOCATIONS</span></div><div><strong>03</strong><span>HUMAN-CENTRED LIVING</span></div><div><strong>∞</strong><span>ROOM TO GROW</span></div></div>
        </section>

        <section className="collection section-pad" id="collection">
          <div className="section-heading reveal"><div><div className="section-label"><span>02</span> THE COLLECTION</div><h2>Spaces with <em>presence.</em></h2></div><p>A considered collection of places designed to feel as good as they look.</p></div>
          <div className="property-grid">
            {properties.map((p) => (
              <article className={`property-card reveal ${p.className}`} key={p.id}>
                <div className="property-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(5,8,9,.88) 100%), url("${p.image}")` }}>
                  <span className="property-number">{p.id} / 03</span><span className="property-type">{p.type}</span>
                  <button className="property-arrow" onClick={() => { setForm((old) => ({ ...old, project: p.name })); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} aria-label={`Enquire about ${p.name}`}><ArrowUpRight size={20}/></button>
                  <div className="property-info"><span className="property-location"><MapPin size={13}/>{p.location}</span><h3>{p.name}</h3><div className="property-bottom"><span>{p.detail}</span><strong>{p.price}</strong></div></div>
                </div>
              </article>
            ))}
          </div>
          <p className="sample-disclaimer">Concept demonstration only. Project names, pricing, locations and availability shown here are illustrative placeholders.</p>
        </section>

        <section className="location-section section-pad" id="locations">
          <div className="location-copy reveal"><div className="section-label"><span>03</span> A WORLD OF POSSIBILITY</div><h2>Closer to what<br/><em>matters most.</em></h2><p>Explore the places shaping a new idea of modern living. Select a glowing point on the globe to learn more about a location.</p><div className="location-selected"><span className="status-dot"/><div><small>SELECTED LOCATION</small><strong>{activeMarker.label}</strong><p>{activeMarker.description}</p></div></div><div className="location-list">{markers.map((m) => <button key={m.label} className={activeMarker.label === m.label ? "location-chip active" : "location-chip"} onClick={() => setActiveMarker(m)}>{m.label}<ArrowUpRight size={13}/></button>)}</div></div>
          <div className="location-globe reveal"><Globe3D markers={markers} onMarkerClick={setActiveMarker}/><span className="location-orbit orbit-a"/><span className="location-orbit orbit-b"/><div className="location-caption">GLOBAL OUTLOOK <span>•</span> LOCAL UNDERSTANDING</div></div>
        </section>

        <section className="manifesto section-pad">
          <div className="manifesto-bg" />
          <div className="manifesto-content reveal"><div className="section-label"><span>04</span> THE ART OF ARRIVING</div><h2>Come home to<br/><em>something extraordinary.</em></h2><p>Great design is not only what you see. It is what you feel when you walk through the door.</p><a className="button button-gold" href="#contact">Find your next address <ArrowRight size={16}/></a></div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="faq-heading reveal"><div className="section-label"><span>05</span> GOOD TO KNOW</div><h2>A few things,<br/><em>made clear.</em></h2></div>
          <div className="faq-list reveal">{faqs.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? "faq-open" : ""}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><span className="faq-plus">{openFaq === i ? "−" : "+"}</span></button>{openFaq === i && <p>{a}</p>}</div>)}</div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-copy reveal"><div className="section-label"><span>06</span> YOUR NEXT CHAPTER</div><h2>Let's find your<br/><em>place in the world.</em></h2><p>Tell us a little about what you're looking for. We'll help you take the next step.</p><div className="contact-note"><span className="contact-note-icon"><Phone size={17}/></span><div><small>PERSONAL GUIDANCE</small><strong>Arrange a conversation</strong><span>Share your details and preferred project.</span></div></div></div>
          <form className="enquiry-form reveal" onSubmit={submitEnquiry}>
            <div className="form-eyebrow">PRIVATE ENQUIRY <span>• RESPONSE REQUEST</span></div>
            <label>Your name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name"/></label>
            <label>Phone number<input required type="tel" pattern="[0-9+ ()-]{8,18}" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000"/></label>
            <label>Interested in<select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>{properties.map((p) => <option key={p.id}>{p.name}</option>)}<option>Other / Not sure yet</option></select></label>
            <label>Preferred visit date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}/></label>
            <button className="button button-gold form-submit" type="submit">{formSent ? "Send another enquiry" : "Request a conversation"} <ArrowRight size={16}/></button>
            <p className="form-privacy"><Check size={12}/> Your details will be prepared in WhatsApp for you to send.</p>
          </form>
        </section>
      </main>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">L</span><span>LUXORA<small>REAL ESTATE EXPERIENCE</small></span></a><span className="footer-center">DESIGNED WITH INTENTION. BUILT FOR LIVING.</span><a className="back-top" href="#home">BACK TO TOP <MoveUpRight size={14}/></a><div className="footer-bottom"><span>© 2026 LUXORA CONCEPT. DEMO WEBSITE.</span><span>PROJECT DETAILS AND PRICES ARE ILLUSTRATIVE.</span></div></footer>
      <a className="floating-whatsapp" href="https://wa.me/?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20properties." target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp"><MessageCircle size={20}/></a>
    </div>
  );
}

export default App;