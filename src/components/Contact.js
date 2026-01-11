import React, { useState, useEffect } from 'react';

import { Section, Button, Toast } from './common';
import { useScrollReveal, useFormValidation } from '../hooks';
import { contactInfo, socialLinks, formFields, getInitialFormValues } from '../data';
import { contactFormRules } from '../utils';
import { getGoogleFormUrl, buildGoogleFormData } from '../config';
import { ANIMATION_TIMING } from '../constants';
import { Icon } from '../assets/icons';
import { t } from '../i18n';

import './Contact.css';

const Contact = () => {
  const contentRef = useScrollReveal();
  const formRef = useScrollReveal();

  const { values, isValid, validate, reset, getFieldProps, hasError, getError } = useFormValidation(
    getInitialFormValues(),
    contactFormRules
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isStatusHiding, setIsStatusHiding] = useState(false);

  useEffect(() => {
    if (submitStatus) {
      const hideTimer = setTimeout(() => {
        setIsStatusHiding(true);
      }, ANIMATION_TIMING.TOAST_HIDE_DELAY);

      const removeTimer = setTimeout(() => {
        setSubmitStatus(null);
        setIsStatusHiding(false);
      }, ANIMATION_TIMING.TOAST_REMOVE_DELAY);

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
            {isSubmitting ? t('common.sending') : t('common.sendMessage')}
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
