
import React, { useState, useRef } from 'react';
import { Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', travelers: '', message: '' });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters, spaces, and '.-";
    }

    // Phone validation (10-digit Indian mobile numbers)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    
    // Travelers validation (optional, but must be a positive number if entered)
    if (formData.travelers) {
        const travelersNum = Number(formData.travelers);
        if (isNaN(travelersNum) || travelersNum <= 0 || !Number.isInteger(travelersNum)) {
             newErrors.travelers = "Please enter a valid number (e.g., 1, 2).";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    if (status === 'submitting') return;

    setStatus('submitting');
    setFeedbackMessage('');

    // This is a mock submission for demonstration.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate a successful submission
    setStatus('success');
    setFeedbackMessage("Thank you! Your enquiry has been sent. We'll be in touch soon.");
    setFormData({ name: '', phone: '', travelers: '', message: '' });
    setErrors({});
  };

  return (
    <section className="py-20 px-4 bg-slate-50" id="contact" ref={sectionRef}>
        <div className={`max-w-xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h2 style={styles.headerFont} className="text-3xl font-bold text-slate-800 mb-2">Have Questions?</h2>
            <p className="text-slate-500">Fill out the form below and we'll get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`} placeholder="Enter your name" required aria-invalid={!!errors.name} />
              {errors.name && <p className="text-red-600 text-xs mt-1 animate-fade-in">{errors.name}</p>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${errors.phone ? 'border-red-500' : 'border-slate-200'} focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`} placeholder="10-digit number" required aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-red-600 text-xs mt-1 animate-fade-in">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">No. of Travelers</label>
                <input type="number" name="travelers" value={formData.travelers} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${errors.travelers ? 'border-red-500' : 'border-slate-200'} focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`} placeholder="e.g. 2" min="1" aria-invalid={!!errors.travelers} />
                {errors.travelers && <p className="text-red-600 text-xs mt-1 animate-fade-in">{errors.travelers}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Any specific queries?"></textarea>
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
