'use client';

import { useState, useRef } from 'react';
import { useCVStore } from '@/store/useCVStore';

const PROMPT_TEMPLATE = `Tolong buatkan data CV saya dalam format JSON dengan struktur berikut:

Format JSON:
{
  "personal": {
    "fullName": "Nama lengkap",
    "jobTitle": "Posisi/jabatan yang diinginkan",
    "email": "email@example.com",
    "phone": "081234567890",
    "location": "Kota, Negara",
    "website": "https://linkedin.com/in/username atau URL portfolio",
    "summary": "Ringkasan profesional 2-3 kalimat tentang expertise dan pengalaman"
  },
  "experience": [
    {
      "title": "Posisi/Jabatan",
      "company": "Nama Perusahaan",
      "startDate": "Jan 2020",
      "endDate": "Sekarang",
      "description": "• Pencapaian 1\\n• Pencapaian 2\\n• Pencapaian 3"
    }
  ],
  "education": [
    {
      "school": "Nama Universitas/Sekolah",
      "degree": "Gelar (S1/S2/D3/SMA)",
      "fieldOfStudy": "Jurusan",
      "startDate": "2016",
      "endDate": "2020"
    }
  ],
  "skills": [
    {
      "name": "Nama Skill",
      "proficiency": 4
    }
  ],
  "projects": [
    {
      "name": "Nama Proyek",
      "role": "Peran di proyek",
      "startDate": "Jan 2021",
      "endDate": "Jun 2021",
      "description": "Deskripsi singkat proyek",
      "link": "https://github.com/username/project"
    }
  ],
  "certifications": [
    {
      "name": "Nama Sertifikasi",
      "issuer": "Lembaga Penerbit",
      "date": "2023",
      "link": "https://credential-url.com"
    }
  ],
  "languages": [
    {
      "name": "Bahasa Indonesia",
      "level": "Native"
    }
  ]
}

Data saya:
[GANTI DENGAN DATA ANDA - contoh: Nama saya Ahmad, lulusan Teknik Informatika, pernah kerja sebagai Frontend Developer di PT ABC selama 3 tahun, skill utama React dan Vue...]

Tolong generate dalam format JSON yang valid, siap untuk di-copy-paste.`;

const SCHEMA_TEMPLATE = `{
  "personal": {
    "fullName": "string (required)",
    "jobTitle": "string (required)",
    "email": "string",
    "phone": "string",
    "location": "string",
    "website": "string (URL)",
    "summary": "string (min 30 karakter untuk skor maksimal)"
  },
  "experience": [
    {
      "title": "string (required)",
      "company": "string (required)",
      "startDate": "string (format: 'Jan 2020')",
      "endDate": "string ('Sekarang' atau 'Des 2023')",
      "description": "string (gunakan \\\\n untuk bullet points)"
    }
  ],
  "education": [
    {
      "school": "string (required)",
      "degree": "string",
      "fieldOfStudy": "string",
      "startDate": "string (tahun atau 'Jan 2020')",
      "endDate": "string"
    }
  ],
  "skills": [
    {
      "name": "string (required)",
      "proficiency": "number (1-5, opsional, default: 3)"
    }
  ],
  "projects": [
    {
      "name": "string",
      "role": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string",
      "link": "string (URL, opsional)"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string",
      "link": "string (URL, opsional)"
    }
  ],
  "languages": [
    {
      "name": "string",
      "level": "string (Native/Fluent/Professional/Intermediate/Basic)"
    }
  ]
}`;

export default function AIImportModal({ onClose }: { onClose: () => void }) {
    const importData = useCVStore(s => s.importData);
    const [activeTab, setActiveTab] = useState<'prompt' | 'schema' | 'import'>('prompt');
    const [jsonInput, setJsonInput] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

    const copy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopyFeedback(label);
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    const handleImport = () => {
        try {
            let cleaned = jsonInput.trim();
            // Extract JSON from markdown code block
            const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (match) cleaned = match[1].trim();
            const data = JSON.parse(cleaned);
            if (!data.personal && !data.experience && !data.education && !data.skills) {
                setStatus({ type: 'error', msg: 'JSON tidak memiliki field CV yang valid (personal, experience, dll)' });
                return;
            }
            importData(data);
            setStatus({ type: 'success', msg: '✅ Data berhasil diimport! Silakan cek preview CV Anda.' });
            setTimeout(onClose, 1500);
        } catch {
            setStatus({ type: 'error', msg: '❌ JSON tidak valid. Pastikan format JSON benar.' });
        }
    };

    return (
        <div className="ai-import-modal" style={{ display: 'flex' }}>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content modal-large">
                <div className="modal-header">
                    <h3>🤖 Import Json dari AI Chat</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div className="import-tabs">
                        <button className={`import-tab ${activeTab === 'prompt' ? 'active' : ''}`} onClick={() => setActiveTab('prompt')}>📝 Prompt Template</button>
                        <button className={`import-tab ${activeTab === 'schema' ? 'active' : ''}`} onClick={() => setActiveTab('schema')}>📋 JSON Schema</button>
                        <button className={`import-tab ${activeTab === 'import' ? 'active' : ''}`} onClick={() => setActiveTab('import')}>⬇️ Import Data</button>
                    </div>

                    {/* Prompt */}
                    {activeTab === 'prompt' && (
                        <div className="import-tab-content active">
                            <div className="import-section">
                                <h4>Cara Pakai:</h4>
                                <ol className="import-steps">
                                    <li>Copy prompt di bawah ini</li>
                                    <li>Paste ke ChatGPT / Claude / AI lainnya</li>
                                    <li>Ganti [DATA ANDA] dengan informasi pribadi Anda</li>
                                    <li>Copy hasil JSON yang di-generate AI</li>
                                    <li>Klik tab &quot;Import Data&quot; dan paste JSON</li>
                                </ol>
                                <div className="prompt-box">
                                    <button className="copy-btn" onClick={() => copy(PROMPT_TEMPLATE, 'prompt')}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                        {copyFeedback === 'prompt' ? '✓ Copied!' : 'Copy'}
                                    </button>
                                    <pre>{PROMPT_TEMPLATE}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Schema */}
                    {activeTab === 'schema' && (
                        <div className="import-tab-content active">
                            <div className="import-section">
                                <h4>Struktur JSON:</h4>
                                <div className="schema-box">
                                    <button className="copy-btn" onClick={() => copy(SCHEMA_TEMPLATE, 'schema')}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                        {copyFeedback === 'schema' ? '✓ Copied!' : 'Copy'}
                                    </button>
                                    <pre>{SCHEMA_TEMPLATE}</pre>
                                </div>
                                <div className="schema-notes">
                                    <p><strong>Catatan:</strong></p>
                                    <ul>
                                        <li>Field dengan <code>(required)</code> wajib diisi</li>
                                        <li>Proficiency: 1 = Beginner, 3 = Intermediate, 5 = Expert</li>
                                        <li>Minimal 3 skills untuk skor CV optimal</li>
                                        <li>Experience &amp; Education bisa multiple entries (array)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Import */}
                    {activeTab === 'import' && (
                        <div className="import-tab-content active">
                            <div className="import-section">
                                <h4>Paste JSON dari AI:</h4>
                                <textarea id="jsonInput" value={jsonInput} onChange={e => setJsonInput(e.target.value)}
                                    placeholder={'Paste JSON hasil AI di sini, contoh:\n{\n  "personal": {\n    "fullName": "Ahmad Rizki",\n    ...\n  },\n  "experience": [...],\n  ...\n}'} />
                                <div className="import-actions">
                                    <button className="btn btn-ghost" onClick={() => { setJsonInput(''); setStatus(null); }}>Hapus</button>
                                    <button className="btn btn-primary" onClick={handleImport}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                        Import Data
                                    </button>
                                </div>
                                {status && <div className={`import-status ${status.type}`}>{status.msg}</div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
