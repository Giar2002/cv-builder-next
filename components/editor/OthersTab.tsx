'use client';

import { useCVStore } from '@/store/useCVStore';
import { Language } from '@/types/cv';
import { X, Plus } from 'lucide-react';

const LANGUAGE_LEVELS: Language['level'][] = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic'];

export default function OthersTab() {
    const certifications = useCVStore(s => s.certifications);
    const addCertification = useCVStore(s => s.addCertification);
    const updateCertification = useCVStore(s => s.updateCertification);
    const removeCertification = useCVStore(s => s.removeCertification);

    const languages = useCVStore(s => s.languages);
    const addLanguage = useCVStore(s => s.addLanguage);
    const updateLanguage = useCVStore(s => s.updateLanguage);
    const removeLanguage = useCVStore(s => s.removeLanguage);

    return (
        <div>
            <div className="section-header">
                <h2>Sertifikat & Bahasa</h2>
                <p className="section-desc">Kualifikasi tambahan yang mendukung</p>
            </div>

            <h3 className="subsection-title">Sertifikat / Lisensi</h3>
            <div className="entries-list">
                {certifications.map((cert) => (
                    <div key={cert.id} className="entry-card">
                        <div className="entry-header">
                            <span className="entry-number">{cert.name || 'Sertifikat Baru'}</span>
                            <button className="btn-remove" onClick={() => removeCertification(cert.id)}><X size={14} /></button>
                        </div>
                        <div className="entry-fields">
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Nama Sertifikat</label>
                                <input type="text" placeholder="contoh: AWS Certified" value={cert.name}
                                    onChange={e => updateCertification(cert.id, { name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Penerbit</label>
                                <input type="text" placeholder="contoh: Amazon" value={cert.issuer}
                                    onChange={e => updateCertification(cert.id, { issuer: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Tanggal</label>
                                <input type="text" placeholder="2023" value={cert.date}
                                    onChange={e => updateCertification(cert.id, { date: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Link (Opsional)</label>
                                <input type="text" placeholder="Credential URL" value={cert.link}
                                    onChange={e => updateCertification(cert.id, { link: e.target.value })} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-add" onClick={addCertification}>
                <Plus size={16} /> Tambah Sertifikat
            </button>

            <h3 className="subsection-title" style={{ marginTop: '2rem' }}>Bahasa</h3>
            <div className="entries-list">
                {languages.map((lang) => (
                    <div key={lang.id} className="entry-card">
                        <div className="entry-header">
                            <span className="entry-number">{lang.name || 'Bahasa Baru'}</span>
                            <button className="btn-remove" onClick={() => removeLanguage(lang.id)}><X size={14} /></button>
                        </div>
                        <div className="entry-fields">
                            <div className="form-group" style={{ flex: 2 }}>
                                <label>Bahasa</label>
                                <input type="text" placeholder="contoh: Inggris" value={lang.name}
                                    onChange={e => updateLanguage(lang.id, { name: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Level</label>
                                <select value={lang.level}
                                    onChange={e => updateLanguage(lang.id, { level: e.target.value as Language['level'] })}>
                                    {LANGUAGE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-add" onClick={addLanguage}>
                <Plus size={16} /> Tambah Bahasa
            </button>
        </div>
    );
}
