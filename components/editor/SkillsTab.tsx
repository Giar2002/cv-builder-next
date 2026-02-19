'use client';

import { useCVStore } from '@/store/useCVStore';
import { Skill } from '@/types/cv';
import { X, Plus } from 'lucide-react';

const SKILL_LEVELS = [
    { value: 1, label: '1 — Pemula' },
    { value: 2, label: '2 — Menengah' },
    { value: 3, label: '3 — Mahir' },
    { value: 4, label: '4 — Sangat Mahir' },
    { value: 5, label: '5 — Ahli' },
];

export default function SkillsTab() {
    const skills = useCVStore(s => s.skills);
    const addSkill = useCVStore(s => s.addSkill);
    const updateSkill = useCVStore(s => s.updateSkill);
    const removeSkill = useCVStore(s => s.removeSkill);

    return (
        <div>
            <div className="section-header">
                <h2>Keahlian</h2>
                <p className="section-desc">Tambahkan skill dan kompetensi Anda</p>
            </div>
            <div className="entries-list">
                {skills.map((skill) => (
                    <div key={skill.id} className="entry-card">
                        <div className="entry-header">
                            <span className="entry-number">{skill.name || 'Keahlian Baru'}</span>
                            <button className="btn-remove" onClick={() => removeSkill(skill.id)}><X size={14} /></button>
                        </div>
                        <div className="entry-fields">
                            <div className="form-group">
                                <label>Nama Keahlian</label>
                                <input type="text" placeholder="contoh: JavaScript" value={skill.name}
                                    onChange={e => updateSkill(skill.id, { name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Level (1-5)</label>
                                <select value={skill.level}
                                    onChange={e => updateSkill(skill.id, { level: Number(e.target.value) as Skill['level'] })}>
                                    {SKILL_LEVELS.map(l => (
                                        <option key={l.value} value={l.value}>{l.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-add" onClick={addSkill}>
                <Plus size={16} /> Tambah Keahlian
            </button>
        </div>
    );
}
