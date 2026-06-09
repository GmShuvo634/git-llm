'use client';

import { useState } from "react";
import { CheckCircle2, GraduationCap, Heart, Trophy, Users } from "lucide-react";

const qualifications = [
  { icon: Heart, title: "Love training", body: "You should love training — teaching energizes you, not drains you." },
  { icon: Users, title: "Love your students", body: "You should love your students, mentor them, push them, and stand by them." },
  { icon: Trophy, title: "Celebrate their success", body: "You should celebrate your student's success as your own — every IIM call is a shared victory." },
  { icon: GraduationCap, title: "IIM graduate", body: "You should be a graduate from an IIM. Lived experience matters as much as expertise." },
];

export function Recruitment() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", iim: "", batch: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-[80vh] pixel-grid-light px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-5xl mx-auto relative z-2">
        <div className="text-center mb-14">
          <div className="inline-block pixel-border-silver px-5 py-2 mb-6 bg-[#050505] anim-pop">
            <span className="font-accent text-[10px] silver-text">[ HIRING ]</span>
          </div>
          <h1 className="font-heading text-xl md:text-3xl lg:text-4xl silver-text-dark leading-relaxed mb-6 anim-fade-up">
            WE ARE RECRUITING TRAINERS
          </h1>
          <p className="font-body text-2xl text-[#050505] max-w-3xl mx-auto leading-snug anim-fade-up recruit-delay-200">
            &gt; Join an elite team of IIM graduates shaping India's next batch of CAT toppers. We believe great trainers are born from genuine love for the craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {qualifications.map((q, i) => {
            const Icon = q.icon;
            return (
              <div key={i} className="pixel-card-light p-7 anim-fade-up recruit-delay-320" >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center recruit-card-icon-bg">
                    <Icon className="w-6 h-6 text-[#f4f4f6]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[11px] silver-text-dark mb-3 leading-relaxed">
                      {q.title.toUpperCase()}
                    </h3>
                    <p className="font-body text-xl text-[#5a5d66] leading-snug">{q.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-10">
          <button onClick={() => setOpen(true)} className="pixel-btn text-sm">
            ◆ APPLY NOW ◆
          </button>
          <p className="font-body text-lg text-[#5a5d66] mt-4">
            &gt; Applications reviewed within 5 business days
          </p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 overflow-y-auto anim-fade-in">
          <div className="pixel-card-light p-8 max-w-2xl w-full my-10 anim-pop">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-[#050505] anim-pop" />
                <h2 className="font-heading text-base silver-text-dark mb-4">APPLICATION RECEIVED</h2>
                <p className="font-body text-2xl text-[#050505] mb-8">
                  &gt; Thank you, {form.name || "applicant"}! We'll be in touch shortly.
                </p>
                <button onClick={() => { setOpen(false); setSubmitted(false); }} className="pixel-btn">CLOSE</button>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-base silver-text-dark mb-2">APPLY: TRAINER</h2>
                <p className="font-body text-xl text-[#5a5d66] mb-6">&gt; Tell us about yourself_</p>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-heading text-[10px] silver-text-dark mb-2 block">FULL NAME</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="pixel-input-light" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="font-heading text-[10px] silver-text-dark mb-2 block">EMAIL</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="pixel-input-light" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="font-heading text-[10px] silver-text-dark mb-2 block">IIM</label>
                      <select required value={form.iim} onChange={(e) => setForm({ ...form, iim: e.target.value })} className="pixel-input-light" aria-label="Select IIM">
                        <option value="">Select...</option>
                        <option>IIM Ahmedabad</option><option>IIM Bangalore</option>
                        <option>IIM Calcutta</option><option>IIM Lucknow</option>
                        <option>IIM Indore</option><option>IIM Kozhikode</option>
                        <option>Other IIM</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-heading text-[10px] silver-text-dark mb-2 block">BATCH YEAR</label>
                      <input required value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} placeholder="2020" className="pixel-input-light" aria-label="Batch year" />
                    </div>
                  </div>
                  <div>
                    <label className="font-heading text-[10px] silver-text-dark mb-2 block">SUBJECT STRENGTH</label>
                    <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="pixel-input-light" aria-label="Select subject strength">
                      <option value="">Select...</option>
                      <option>Quantitative Aptitude</option>
                      <option>Verbal &amp; Reading Comprehension</option>
                      <option>Data Interpretation &amp; LR</option>
                      <option>GD/PI Preparation</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-heading text-[10px] silver-text-dark mb-2 block">WHY DO YOU WANT TO TRAIN?</label>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="pixel-input-light textarea-resize-vertical" placeholder="Share your motivation and past experience" aria-label="Why do you want to train?" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setOpen(false)} className="pixel-btn pixel-btn-dark flex-1">CANCEL</button>
                    <button type="submit" className="pixel-btn flex-1">SUBMIT APPLICATION</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recruitment;
