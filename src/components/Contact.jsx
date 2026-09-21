import React, { useState } from 'react';
import './Contact.css';

const FORM_ID = 'YOUR_FORM_ID';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (FORM_ID === 'YOUR_FORM_ID') {
      setError('The contact form is being connected. Please email me directly for now.');
      return;
    }

    setLoading(true);

    try {
      // Using FormSubmit.co for free form submissions
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Something went wrong. Please try again or email me directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Unable to send your message right now. Please email me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Let's Work Together</h2>
          <p>Got a project idea or just want to chat? Reach out!</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>I'm always interested in new projects, collaborations, and innovative ideas. Whether it's a quick question or a major project, I'd love to hear from you.</p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:syedbrahim36258@gmail.com">
                  syedbrahim36258@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <a href="tel:+918688515677">+91 86885 15677</a>
              </div>

              <div className="contact-item">
                <span className="contact-label">GitHub</span>
                <a href="https://github.com/IIGGRRIISS" target="_blank" rel="noopener noreferrer">
                  github.com/IIGGRRIISS
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span>Hyderabad, India</span>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/IIGGRRIISS" target="_blank" rel="noopener noreferrer" className="social-icon">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/syed-ibrahim-29a50a36b" target="_blank" rel="noopener noreferrer" className="social-icon">
                LinkedIn
              </a>
               <a
    href="/Ibrahim's_resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    Resume
  </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
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
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows="6"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Thanks for reaching out! I'll get back to you soon.
              </div>
            )}
            {error && <div className="form-error" role="alert">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
