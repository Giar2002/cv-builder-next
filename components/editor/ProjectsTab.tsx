'use client';

import { useCVStore } from '@/store/useCVStore';
import { Project } from '@/types/cv';
import { X, Plus } from 'lucide-react';

export default function ProjectsTab() {
    const projects = useCVStore(s => s.projects);
    const addProject = useCVStore(s => s.addProject);
    const updateProject = useCVStore(s => s.updateProject);
    const removeProject = useCVStore(s => s.removeProject);

    return (
        <div>
            <div className="section-header">
                <h2>Proyek</h2>
                <p className="section-desc">Tampilkan portofolio dan proyek relevan</p>
            </div>
            <div className="entries-list">
                {projects.map((proj) => (
                    <div key={proj.id} className="entry-card">
                        <div className="entry-header">
                            <span className="entry-number">{proj.name || 'Proyek Baru'}</span>
                            <button className="btn-remove" onClick={() => removeProject(proj.id)}><X size={14} /></button>
                        </div>
                        <div className="entry-fields">
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Nama Proyek</label>
                                <input type="text" placeholder="contoh: E-Commerce App" value={proj.name}
                                    onChange={e => updateProject(proj.id, { name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Peran</label>
                                <input type="text" placeholder="contoh: Frontend Lead" value={proj.role}
                                    onChange={e => updateProject(proj.id, { role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Link (Opsional)</label>
                                <input type="text" placeholder="https://..." value={proj.link}
                                    onChange={e => updateProject(proj.id, { link: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Mulai</label>
                                <input type="text" placeholder="Jan 2023" value={proj.startDate}
                                    onChange={e => updateProject(proj.id, { startDate: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Selesai</label>
                                <input type="text" placeholder="Des 2023" value={proj.endDate}
                                    onChange={e => updateProject(proj.id, { endDate: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Deskripsi</label>
                                <textarea rows={3} placeholder="Deskripsi proyek dan teknologi yang digunakan..." value={proj.description}
                                    onChange={e => updateProject(proj.id, { description: e.target.value })} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-add" onClick={addProject}>
                <Plus size={16} /> Tambah Proyek
            </button>
        </div>
    );
}
