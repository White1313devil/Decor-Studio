import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { isValidEmail, isValidPhone } from '../../utils/helpers';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email';
    if (form.phone && !isValidPhone(form.phone)) newErrors.phone = 'Enter valid 10-digit phone';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '69021231-6af7-4d31-86f3-702416d44dc8',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          service: form.service || 'Not specified',
          message: form.message,
          subject: `New Inquiry from ${form.name} - Interior With SAI`
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setErrors((prev) => ({ ...prev, message: 'Failed to send message. Please try again.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, message: 'Network error. Please try again later.' }));
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 8428486205', href: 'tel:+918428486205' },
    { icon: <Mail size={20} />, label: 'Email', value: 'saisaravana142@gmail.com', href: 'mailto:saisaravana142@gmail.com' },
    { icon: <MapPin size={20} />, label: 'Address', value: '58/1 62B opp global furniture, nethaji road, hosur - 635109', href: '#' },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        background: 'var(--color-bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(124,92,191,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '350px', height: '350px', background: 'rgba(201,169,110,0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.01em' }}>
            Start Your{' '}
            <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Design Journey
            </span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '17px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Ready to transform your space? Let's talk about your vision. Book a free consultation today.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left – Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.25)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <div style={{ width: '44px', height: '44px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 500 }}>{info.label}</p>
                    <p style={{ fontSize: '15px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Business hours */}
            <div style={{ padding: '24px', background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: '14px' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--color-gold)', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Business Hours
              </h4>
              {[
                { day: 'Mon - Fri', time: '9:00 AM – 7:00 PM' },
                { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
                { day: 'Sunday', time: 'By Appointment' },
              ].map((h) => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{h.day}</span>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '60px 40px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  borderRadius: '20px',
                }}
              >
                <CheckCircle size={56} color="#c9a96e" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, marginBottom: '12px' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                  Thank you for reaching out. We'll get back to you within 24 hours to schedule your free consultation.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '36px',
                  backdropFilter: 'blur(10px)',
                }}
                noValidate
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, marginBottom: '28px' }}>
                  Send Us a Message
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Input
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Input
                    label="Phone (Optional)"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', top: '8px', left: '16px', fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.02em', zIndex: 1 }}>Service</span>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: form.service ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '14px',
                          outline: 'none',
                          paddingTop: '24px',
                          paddingBottom: '8px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          appearance: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Select service</option>
                        <option value="residential">Residential Design</option>
                        <option value="commercial">Commercial Interiors</option>
                        <option value="3d">3D Visualization</option>
                        <option value="renovation">Renovation</option>
                        <option value="smart-home">Smart Home</option>
                        <option value="sustainable">Sustainable Design</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Input
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                  multiline
                  rows={5}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={submitting}
                  icon={submitting ? undefined : <Send size={16} />}
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
