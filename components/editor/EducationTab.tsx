'use client';

import { useCVStore } from '@/store/useCVStore';
import { Education } from '@/types/cv';
import { X, Plus } from 'lucide-react';

function EntryCard({ edu, onUpdate, onRemove }: {
    edu: Education;
    onUpdate: (data: Partial<Education>) => void;
    onRemove: () => void;
}) {
    return (
        <div className="entry-card">
            <div className="entry-header">
                <span className="entry-number">{edu.school || 'Pendidikan Baru'}</span>
                <button className="btn-remove" onClick={onRemove}><X size={14} /></button>
            </div>
            <div className="entry-fields">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Institusi</label>
                    <input type="text" placeholder="contoh: Universitas Indonesia" value={edu.school}
                        onChange={e => onUpdate({ school: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Gelar / Jurusan</label>
                    <input type="text" placeholder="contoh: S1 Teknik Informatika" value={edu.degree}
                        onChange={e => onUpdate({ degree: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Mulai</label>
                    <input type="text" placeholder="2018" value={edu.startDate}
                        onChange={e => onUpdate({ startDate: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Selesai</label>
                    <input type="text" placeholder="2022" value={edu.endDate}
                        onChange={e => onUpdate({ endDate: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Deskripsi</label>
                    <textarea rows={2} placeholder="IPK, penghargaan, kegiatan..." value={edu.description}
                        onChange={e => onUpdate({ description: e.target.value })} />
                </div>
            </div>
        </div>
    );
}

export default function EducationTab() {
    const education = useCVStore(s => s.education);
    const addEducation = useCVStore(s => s.addEducation);
    const updateEducation = useCVStore(s => s.updateEducation);
    const removeEducation = useCVStore(s => s.removeEducation);

    return (
        <div>
            <div className="section-header">
                <h2>Pendidikan</h2>
                <p className="section-desc">Tambahkan riwayat pendidikan Anda</p>
            </div>
            <div className="entries-list">
                {education.map(edu => (
                    <EntryCard key={edu.id} edu={edu}
                        onUpdate={data => updateEducation(edu.id, data)}
                        onRemove={() => removeEducation(edu.id)} />
                ))}
            </div>
            <button className="btn-add" onClick={addEducation}>
                <Plus size={16} /> Tambah Pendidikan
            </button>
        </div>
    );
}
