import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Section, Button } from './common';
import { useScrollReveal, useFormValidation } from '../hooks';
import { contactInfo, socialLinks } from '../data';
import { t } from '../i18n';
import { Icon } from '../assets/icons';
import { getGoogleFormUrl, buildGoogleFormData } from '../config';
import { contactFormRules } from '../utils';
import './Contact.css';

// Toast component rendered via portal to ensure fixed positioning works
const Toast = ({ type, message, isHiding }) => {
  return ReactDOM.createPortal(
    <p className={`form-status form-status--${type} ${isHiding ? 'hiding' : ''}`}>{message}</p>,
    document.body
  );
};

// Form field configuration
const formFields = [
  { name: 'name', type: 'text', placeholder: 'Jane Smith' },
  { name: 'email', type: 'email', placeholder: 'jane@company.com' },
  { name: 'subject', type: 'text', placeholder: 'New project opportunity' },
  {
    name: 'message',
    type: 'textarea',
    placeholder: 'Hi Meliha! I came across your portfolio and...',
  },
];

const initialFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const contentRef = useScrollReveal();
  const formRef = useScrollReveal();

  const { values, isValid, validate, reset, getFieldProps, hasError, getError } = useFormValidation(
    initialFormValues,
    contactFormRules
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isStatusHiding, setIsStatusHiding] = useState(false);

  // Auto-dismiss success/error message after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const hideTimer = setTimeout(() => {
        setIsStatusHiding(true);
      }, 5000);

      const removeTimer = setTimeout(() => {
        setSubmitStatus(null);
        setIsStatusHiding(false);
      }, 5300);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const googleFormData = buildGoogleFormData(values);

      await fetch(getGoogleFormUrl(), {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors',
      });

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      subtitle={t('contact.subtitle')}
      title={t('contact.title')}
      className="contact-section"
    >
      <div className="contact-content">
        <div ref={contentRef} className="contact-info scroll-reveal-left">
          <p className="contact-intro">{t('contact.intro')}</p>
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
        </div>
        <form
          ref={formRef}
          className="contact-form scroll-reveal-right"
          onSubmit={handleSubmit}
          noValidate
        >
          {formFields.map((field) => (
            <div
              key={field.name}
              className={`form-group ${hasError(field.name) ? 'form-group--error' : ''}`}
            >
              <label htmlFor={field.name}>
                {t(`contact.form.${field.name}`)}
                <span className="required-indicator">*</span>
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  rows="6"
                  placeholder={field.placeholder}
                  {...getFieldProps(field.name)}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  placeholder={field.placeholder}
                  {...getFieldProps(field.name)}
                />
              )}
              {hasError(field.name) && (
                <span id={`${field.name}-error`} className="error-message" role="alert">
                  {getError(field.name)}
                </span>
              )}
            </div>
          ))}
          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Sending...' : t('common.sendMessage')}
          </Button>
        </form>
        {submitStatus === 'success' && (
          <Toast type="success" message={t('contact.successMessage')} isHiding={isStatusHiding} />
        )}
        {submitStatus === 'error' && (
          <Toast type="error" message={t('contact.errorMessage')} isHiding={isStatusHiding} />
        )}
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={link.name}
            >
              <Icon name={link.icon} size={24} />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
