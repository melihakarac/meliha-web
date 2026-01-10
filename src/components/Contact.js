import React, { useState } from 'react';
import Section from './common/Section';
import Button from './common/Button';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
  const contentRef = useScrollReveal();
  const formRef = useScrollReveal();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: '✉️', label: 'Email', value: 'meliha.karacc@gmail.com', link: 'mailto:meliha.karacc@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+387 62 888 224', link: 'tel:+38762888224' },
    { icon: '📍', label: 'Location', value: 'Bosnia and Herzegovina', link: '#' }
  ];

  return (
    <Section 
      id="contact" 
      subtitle="Get In Touch" 
      title="Let's Work Together"
      className="contact-section"
    >
      <div className="contact-content">
        <div ref={contentRef} className="contact-info scroll-reveal-left">
          <p className="contact-intro">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to collaborate. Feel free to reach out!
          </p>
          <div className="contact-details">
            {contactInfo.map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                className="contact-detail-item"
                {...(item.link === '#' ? { onClick: (e) => e.preventDefault() } : {})}
              >
                <span className="contact-icon">{item.icon}</span>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">{item.label}</span>
                  <span className="contact-detail-value">{item.value}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="social-links">
            <a href="https://linkedin.com/in/melihakarac/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        <form ref={formRef} className="contact-form scroll-reveal-right" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <Button type="submit" variant="primary" size="lg">
            Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default Contact;
