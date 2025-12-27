
import React, { useState, useRef } from 'react';
import { Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { saveEnquiry } from '../services/supabaseService';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', travelers: '', message: '' });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const validateField = (name: string, value: string) => {
    if (name === 'name') {
      if (!value.trim()) return "Full name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      if (!/^[a-zA-Z\s.'-]+$/.test(value)) return "Please enter a valid name (letters only).";
    }
    if (name === 'phone') {
      if (!value.trim()) return "Phone number is required.";
      if (!/^[6-9]\d{9}$/.test(value)) return "Enter a valid 10-digit Indian mobile number.";
    }
    if (name === 'travelers' && value) {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 1) return "Must be at least 1 traveler.";
      if (num > 50) return "For large groups, please contact us directly.";
      if (!Number.isInteger(Number(value))) return "Travelers must be a whole number.";
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate in real-time if the field was already touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, phone: true, travelers: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (status === 'submitting') return;

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      await saveEnquiry(formData);
      setStatus('success');
      setFeedbackMessage("Thank you! Your enquiry has been sent. We'll be in touch soon.");
      setFormData({ name: '', phone: '', travelers: '', message: '' });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
      setFeedbackMessage("Sorry, something went wrong. Please try again or contact us directly.");
    }
  };

  const getInputClass = (fieldName: string) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full px-4 py-3 rounded-xl border bg-slate-50 ${
      hasError ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
    } focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`;
  };

  return (
    <section className="py-20 px-4 bg-slate-50" id="contact" ref={sectionRef}>
        <div className={`max-w-xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h2 style={styles.headerFont} className="text-3xl font-bold text-slate-800 mb-2">Have Questions?</h2>
            <p className="text-slate-500">Fill out the form below and our trek experts will guide you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl" noValidate>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="name">Full Name</label>
              <input 
                id="name"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                onBlur={handleBlur}
                className={getInputClass('name')} 
                placeholder="John Doe" 
                required 
                aria-invalid={!!errors.name} 
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && touched.name && (
                <p id="name-error" className="text-red-600 text-xs mt-1 animate-fade-in flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="phone">Phone Number</label>
                <input 
                  id="phone"
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  className={getInputClass('phone')} 
                  placeholder="9876543210" 
                  required 
                  aria-invalid={!!errors.phone} 
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && touched.phone && (
                  <p id="phone-error" className="text-red-600 text-xs mt-1 animate-fade-in flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="travelers">No. of Travelers</label>
                <input 
                  id="travelers"
                  type="number" 
                  name="travelers" 
                  value={formData.travelers} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  className={getInputClass('travelers')} 
                  placeholder="e.g. 2" 
                  min="1" 
                  aria-invalid={!!errors.travelers} 
                  aria-describedby={errors.travelers ? "travelers-error" : undefined}
                />
                {errors.travelers && touched.travelers && (
                  <p id="travelers-error" className="text-red-600 text-xs mt-1 animate-fade-in flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.travelers}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="message">Message (Optional)</label>
              <textarea 
                id="message"
                name="message" 
                value={formData.message} 
                onChange={handleInputChange} 
                rows={3} 
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl border bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
                placeholder="Any special requests or questions?"
              ></textarea>
              <p className="text-right text-[10px] text-slate-400 mt-1">{formData.message.length}/500</p>
            </div>
            
            <div className="pt-2">
                {status === 'success' && (
                  <div className="flex items-center gap-3 bg-green-100 text-green-800 p-4 rounded-xl border border-green-200 animate-fade-in mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">{feedbackMessage}</p>
                  </div>
                )}
                {status === 'error' && (
                   <div className="flex items-center gap-3 bg-red-100 text-red-800 p-4 rounded-xl border border-red-200 animate-fade-in mb-4">
                      <AlertTriangle className="w-5 h-5" />
                      <p className="text-sm font-medium">{feedbackMessage}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                      <>
                          <Loader className="w-5 h-5 animate-spin" /> Submitting...
                      </>
                  ) : (
                      <>
                          <Send className="w-5 h-5" /> Send Enquiry
                      </>
                  )}
                </button>
            </div>
          </form>
        </div>
      </section>
  );
};

export default ContactFormSection;
