import { CVData } from '@/types/cv';

// Shared helper - render multiline text with line breaks
export function nl2br(text: string) {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
        <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
    ));
}

// SVG icons matching the original app
const emailIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const phoneIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.86.7 2.74a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.34-1.34a2 2 0 0 1 2.11-.45c.88.34 1.8.57 2.74.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const locationIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const websiteIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

// Contact item with SVG icon - matching original app
export function ContactItem({ type, value }: { type: 'email' | 'phone' | 'location' | 'website'; value: string }) {
    if (!value) return null;
    const icons = { email: emailIcon, phone: phoneIcon, location: locationIcon, website: websiteIcon };
    return (
        <div className="cv-contact-item">
            {icons[type]}
            <span>{value}</span>
        </div>
    );
}

// Contact row combining all contacts
export function ContactInfo({ personal }: { personal: CVData['personal'] }) {
    const hasContacts = personal.email || personal.phone || personal.location || personal.website;
    if (!hasContacts) return null;
    return (
        <div className="cv-contact">
            <ContactItem type="email" value={personal.email} />
            <ContactItem type="phone" value={personal.phone} />
            <ContactItem type="location" value={personal.location} />
            <ContactItem type="website" value={personal.website} />
        </div>
    );
}

// Skill item with dots matching original app
export function SkillDots({ name, level }: { name: string; level: number }) {
    return (
        <div className="cv-skill-item">
            <span>{name}</span>
            <span className="cv-skill-level">
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`cv-skill-dot${i < level ? ' filled' : ''}`} />
                ))}
            </span>
        </div>
    );
}

export function SkillBar({ level, color }: { level: number; color?: string }) {
    return (
        <div className="cv-skill-bar-wrap">
            <div className="cv-skill-bar-track">
                <div className="cv-skill-bar-fill" style={{ width: `${(level / 5) * 100}%`, background: color || 'var(--cv-accent)' }} />
            </div>
        </div>
    );
}

interface TemplateProps {
    data: CVData;
}
export type { TemplateProps };
