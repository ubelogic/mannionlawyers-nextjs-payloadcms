'use client'

import { useRef, useState } from 'react'

export function SidebarConsultationForm({ formAction }: { formAction: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const nextInvalid = new Set<string>()
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]').forEach((field) => {
      let ok = field.type === 'checkbox' ? (field as HTMLInputElement).checked : field.value.trim() !== ''
      if (field.type === 'email' && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      if (!ok) nextInvalid.add(field.name)
    })
    setInvalidFields(nextInvalid)

    if (nextInvalid.size > 0) {
      const firstInvalidName = Array.from(nextInvalid)[0]
      form.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus()
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(formAction, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        window.location.href = '/thank-you'
      } else {
        setSubmitting(false)
        alert('Something went wrong. Please try again or call us directly.')
      }
    } catch {
      setSubmitting(false)
      alert('Could not send. Please call us on (02) 4704 9977.')
    }
  }

  return (
    <form ref={formRef} className="sidebar-form" onSubmit={handleSubmit} noValidate>
      <div className={`field${invalidFields.has('name') ? ' invalid' : ''}`}>
        <label htmlFor="s-name">Your name</label>
        <input type="text" id="s-name" name="name" autoComplete="name" required />
        <p className="field-error">Please enter your name.</p>
      </div>
      <div className={`field${invalidFields.has('phone') ? ' invalid' : ''}`}>
        <label htmlFor="s-phone">Phone</label>
        <input type="tel" id="s-phone" name="phone" autoComplete="tel" required />
        <p className="field-error">Please enter a phone number.</p>
      </div>
      <div className={`field${invalidFields.has('email') ? ' invalid' : ''}`}>
        <label htmlFor="s-email">Email</label>
        <input type="email" id="s-email" name="email" autoComplete="email" required />
        <p className="field-error">Please enter a valid email.</p>
      </div>
      <div className="field">
        <label htmlFor="s-message">
          What&apos;s happening? <span style={{ fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea id="s-message" name="message" rows={3} placeholder="A sentence is plenty." />
      </div>
      <div className={`field${invalidFields.has('consent') ? ' invalid' : ''}`}>
        <label className="consent">
          <input type="checkbox" name="consent" required />
          <span>
            I agree to the <a href="/privacy">privacy policy</a> and consent to being contacted.
          </span>
        </label>
        <p className="field-error">Please tick to continue.</p>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
        {submitting ? 'Sending…' : 'Request a consultation'}
      </button>
      <p className="field-hint" style={{ textAlign: 'center' }}>
        We respond within one business day.
      </p>
    </form>
  )
}
