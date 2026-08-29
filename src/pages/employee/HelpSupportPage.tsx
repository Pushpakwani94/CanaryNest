import React, { useState } from 'react';
import { HelpCircle, Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Button, Card } from '../../components/common/UIComponents';

export const HelpSupportPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const faqs = [
    { q: 'How do I apply for leave?', a: 'Navigate to the Apply Leave tab from the sidebar or dashboard. Select your leave type, dates, and submit for HR approval.' },
    { q: 'When are payslips generated?', a: 'Payslips are generated on the 28th of every month and available under the Payslips tab.' },
    { q: 'Who do I contact for payroll query?', a: 'Reach out to the HR Helpdesk via the support form below or email hr@canarynest.com.' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Help & HR Support</h1>
        <p className="text-xs text-slate-400 font-medium">Submit support tickets to HR or browse frequently asked questions.</p>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800">
          ✅ Support request sent! An HR representative will get back to you shortly.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Support Ticket Form */}
        <Card className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm">Submit HR Inquiry Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Tax Deduction Query"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Message Details</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 font-medium"
              />
            </div>

            <Button variant="primary" type="submit" className="w-full" icon={<Send className="w-4 h-4" />}>
              Send Inquiry
            </Button>
          </form>
        </Card>

        {/* FAQs */}
        <Card className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <p className="text-xs font-bold text-slate-800">{f.q}</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
};
