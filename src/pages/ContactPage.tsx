import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageVariants } from '../animations/motion';
import Contact from '../components/sections/Contact';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const faqs = [
  { q: 'How long does a typical interior design project take?', a: 'Project timelines vary by scope. A single room typically takes 4–8 weeks from concept to completion. Full home renovations can range from 3–6 months. We provide detailed timelines at the start of every project.' },
  { q: 'Do you work with a fixed budget?', a: 'Absolutely. We tailor every design solution to your specific budget, ensuring the best possible outcome within your financial parameters. We are transparent about costs from the very first consultation.' },
  { q: 'Can I see 3D visualizations before work begins?', a: 'Yes — 3D visualization is a core part of our process. You will see photorealistic renders of your space before a single nail is hammered, so you can approve or refine the design with full confidence.' },
  { q: 'Do you handle the full construction and renovation?', a: 'Yes, we offer full end-to-end service including coordination with contractors, vendors, and craftsmen. We manage the entire execution process so you experience a completely stress-free transformation.' },
  { q: 'What areas do you serve?', a: 'We are currently based in Hosur and serve clients throughout Tamil Nadu. We also take select projects across South India and can discuss remote consultation services for other regions.' },
];

const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Page Hero */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '72px',
          background: 'linear-gradient(180deg, rgba(52,211,153,0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '300px', height: '300px', background: 'rgba(201,169,110,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '14px', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>Contact</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 70px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Let's{' '}
              <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Connect
              </span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '520px', lineHeight: 1.7 }}>
              Whether you're starting a home renovation or exploring ideas, we'd love to hear from you. Every great space begins with a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map + Info Strip */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0', background: 'var(--color-bg-secondary)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px', marginBottom: '48px' }}>
            {[
              { icon: <MapPin size={22} />, label: 'Our Studio', value: '58/1 62B opposite global furniture,\nNethaji Road, Hosur - 635109' },
              { icon: <Phone size={22} />, label: 'Call Us', value: '+91 8428486205\n+91 7695886205' },
              { icon: <Mail size={22} />, label: 'Email Us', value: 'saisaravana142@gmail.com\nddecorstudio.hosur@gmail.com' },
              { icon: <Clock size={22} />, label: 'Working Hours', value: 'Mon–Fri: 9AM–7PM\nSat: 10AM–5PM' },
            ].map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{ padding: '28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
              >
                <div style={{ width: '48px', height: '48px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', marginBottom: '16px' }}>
                  {info.icon}
                </div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{info.label}</p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{info.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Fake Map embed placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', height: '300px', position: 'relative', background: 'rgba(255,255,255,0.03)' }}
          >
            <iframe
              title="Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15566.899609771075!2d77.83039269898885!3d12.73136110670886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae710d00a80467%3A0x3096ace3c92144bf!2sGlobal%20Furniture!5e0!3m2!1sen!2sin!4v1774848600479!5m2!1sen!2sin"
              style={{ border: 0, width: '100%', height: '100%', filter: 'contrast(1.2) grayscale(0.5)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Contact />

      {/* FAQ Section */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--color-bg-secondary)' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, lineHeight: 1.15 }}>
              Frequently Asked{' '}
              <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span>
            </h2>
          </motion.div>

          <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${openFaq === i ? 'rgba(201,169,110,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 0.2s', backdropFilter: 'blur(10px)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ fontSize: '22px', color: 'var(--color-gold)', flexShrink: 0, lineHeight: 1 }}
                  >+</motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ padding: '0 24px 22px', color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.8 }}>{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
