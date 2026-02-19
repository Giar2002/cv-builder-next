'use client';

import { useState, useEffect } from 'react';
import { useCVStore } from '@/store/useCVStore';

function calculateScore(state: ReturnType<typeof useCVStore.getState>) {
    const { personal, experience, education, skills } = state;
    let score = 0;
    const breakdown: { label: string; score: number; max: number }[] = [];
    const tips: string[] = [];

    // Personal info (max 30)
    let pScore = 0;
    if (personal.fullName?.length > 1) pScore += 6;
    else tips.push('Tambahkan nama lengkap');
    if (personal.jobTitle?.length > 1) pScore += 6;
    else tips.push('Tambahkan jabatan/profesi');
    if (personal.email?.length > 3) pScore += 4;
    if (personal.phone?.length > 5) pScore += 4;
    if (personal.location?.length > 2) pScore += 4;
    if (personal.summary?.length >= 30) pScore += 6;
    else if (personal.summary?.length >= 10) pScore += 3;
    else tips.push('Tulis ringkasan profil minimal 30 karakter');
    breakdown.push({ label: 'Data Pribadi', score: pScore, max: 30 });
    score += pScore;

    // Experience (max 25)
    let eScore = 0;
    if (experience.length > 0) {
        eScore += Math.min(experience.length * 8, 20);
        const filled = experience.filter(e => e.title && e.company);
        eScore += filled.length > 0 ? 5 : 0;
    } else tips.push('Tambahkan minimal 1 pengalaman kerja');
    breakdown.push({ label: 'Pengalaman', score: Math.min(eScore, 25), max: 25 });
    score += Math.min(eScore, 25);

    // Education (max 20)
    let edScore = 0;
    if (education.length > 0) {
        edScore += Math.min(education.length * 10, 15);
        const filled = education.filter(e => e.school && e.degree);
        edScore += filled.length > 0 ? 5 : 0;
    } else tips.push('Tambahkan riwayat pendidikan');
    breakdown.push({ label: 'Pendidikan', score: Math.min(edScore, 20), max: 20 });
    score += Math.min(edScore, 20);

    // Skills (max 15)
    let sScore = 0;
    if (skills.length >= 3) sScore = 15;
    else if (skills.length > 0) sScore = skills.length * 4;
    else tips.push('Tambahkan minimal 3 keahlian');
    breakdown.push({ label: 'Keahlian', score: Math.min(sScore, 15), max: 15 });
    score += Math.min(sScore, 15);

    // Extras (max 10)
    let xScore = 0;
    if (state.projects.length > 0) xScore += 4;
    if (state.certifications.length > 0) xScore += 3;
    if (state.languages.length > 0) xScore += 3;
    breakdown.push({ label: 'Tambahan', score: Math.min(xScore, 10), max: 10 });
    score += Math.min(xScore, 10);

    return { score: Math.min(score, 100), breakdown, tips };
}

function getScoreLabel(score: number) {
    if (score >= 80) return { text: 'Sangat Baik', cls: 'excellent' };
    if (score >= 60) return { text: 'Baik', cls: 'good' };
    if (score >= 40) return { text: 'Cukup', cls: 'fair' };
    return { text: 'Belum Lengkap', cls: 'poor' };
}

export default function CVScoreBadge() {
    const personal = useCVStore(s => s.personal);
    const experience = useCVStore(s => s.experience);
    const education = useCVStore(s => s.education);
    const skills = useCVStore(s => s.skills);
    const projects = useCVStore(s => s.projects);
    const certifications = useCVStore(s => s.certifications);
    const languages = useCVStore(s => s.languages);
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Only calculate score after mount to avoid SSR/client mismatch
    // (server has no localStorage, client has persisted data)
    const state = useCVStore.getState();
    const { score, breakdown, tips } = mounted ? calculateScore(state) : { score: 0, breakdown: [], tips: [] };
    const label = getScoreLabel(score);

    // SVG circle math
    const r = 35;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - score / 100);

    const rBig = 52;
    const circBig = 2 * Math.PI * rBig;
    const offsetBig = circBig * (1 - score / 100);

    return (
        <>
            <div className="cv-score-badge" onClick={() => setShowModal(true)}>
                <svg viewBox="0 0 80 80" className="badge-circle">
                    <circle className="score-bg" cx="40" cy="40" r={r} />
                    <circle className="score-fill" cx="40" cy="40" r={r}
                        style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
                </svg>
                <div className="badge-score"><span>{score}</span>%</div>
            </div>

            {showModal && (
                <div className="cv-score-modal" style={{ display: 'flex' }}>
                    <div className="modal-overlay" onClick={() => setShowModal(false)} />
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Skor CV Anda</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="score-display">
                                <div className="score-circle-big">
                                    <svg viewBox="0 0 120 120">
                                        <circle className="score-bg" cx="60" cy="60" r={rBig} />
                                        <circle className="score-fill" cx="60" cy="60" r={rBig}
                                            style={{ strokeDasharray: circBig, strokeDashoffset: offsetBig }} />
                                    </svg>
                                    <div className="score-value-big"><span>{score}</span><span>%</span></div>
                                </div>
                                <span className={`score-label ${label.cls}`}>{label.text}</span>
                            </div>
                            <div className="score-breakdown">
                                {breakdown.map(item => (
                                    <div key={item.label} className="score-row">
                                        <span className="score-row-label">{item.label}</span>
                                        <div className="score-bar-track">
                                            <div className="score-bar-fill" style={{ width: `${(item.score / item.max) * 100}%` }} />
                                        </div>
                                        <span className="score-row-val">{item.score}/{item.max}</span>
                                    </div>
                                ))}
                            </div>
                            {tips.length > 0 && (
                                <div className="score-tips">
                                    <div className="score-tips-title">Saran Perbaikan</div>
                                    <ul className="score-tips-list">
                                        {tips.map((t, i) => <li key={i}>{t}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
