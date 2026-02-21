import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-body">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <span>EasY CV</span>
          </div>
          <Link href="/builder" className="btn btn-primary nav-cta">Buka App</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-content">
          <span className="hero-badge">✨ Versi 2.0 Kini Tersedia</span>
          <h1>Buat CV Profesional <span className="gradient-text">Dalam Hitungan Menit</span></h1>
          <p className="hero-desc">Platform pembuat CV gratis dengan 7 template premium. Tanpa login, data tersimpan aman di browser Anda. Hasil export PDF siap kirim, lolos ATS.</p>
          <div className="hero-actions">
            <Link href="/builder" className="btn btn-lg btn-primary pulse-anim">
              Mulai Buat Sekarang
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="#features" className="btn btn-lg btn-secondary">Pelajari Fitur</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><span className="stat-num">100%</span><span className="stat-label">Gratis</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">7</span><span className="stat-label">Template</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">ATS</span><span className="stat-label">Friendly</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="cv-stack">
            {/* Card 1 */}
            <div className="cv-card card-1">
              <div className="cv-card-content">
                <div className="cvc-header">
                  <div className="cvc-photo" />
                  <div className="cvc-info">
                    <div className="cvc-line name" />
                    <div className="cvc-line title" />
                    <div className="cvc-line contact" />
                  </div>
                </div>
                <div className="cvc-divider" />
                <div className="cvc-section">
                  <div className="cvc-line heading" />
                  <div className="cvc-line body w90" />
                  <div className="cvc-line body w80" />
                  <div className="cvc-line body w85" />
                </div>
                <div className="cvc-section">
                  <div className="cvc-line heading" />
                  <div className="cvc-line body w95" />
                  <div className="cvc-line body w75" />
                </div>
                <div className="cvc-section">
                  <div className="cvc-line heading" />
                  <div className="cvc-skills">
                    <div className="cvc-skill" /><div className="cvc-skill" /><div className="cvc-skill" /><div className="cvc-skill" />
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2 - Sidebar */}
            <div className="cv-card card-2">
              <div className="cv-card-content layout-sidebar">
                <div className="cvc-sidebar">
                  <div className="cvc-photo small" />
                  <div className="cvc-line white w80" />
                  <div className="cvc-line white w60" />
                  <div className="cvc-line white w70" />
                </div>
                <div className="cvc-main">
                  <div className="cvc-line name dark" />
                  <div className="cvc-line title dark" />
                  <div className="cvc-section">
                    <div className="cvc-line heading dark" />
                    <div className="cvc-line body dark w90" />
                    <div className="cvc-line body dark w80" />
                  </div>
                  <div className="cvc-section">
                    <div className="cvc-line heading dark" />
                    <div className="cvc-line body dark w85" />
                    <div className="cvc-line body dark w75" />
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3 - Center */}
            <div className="cv-card card-3">
              <div className="cv-card-content">
                <div className="cvc-header-center">
                  <div className="cvc-line name center" />
                  <div className="cvc-line title center" />
                  <div className="cvc-line contact center" />
                </div>
                <div className="cvc-divider accent" />
                <div className="cvc-section">
                  <div className="cvc-line heading" />
                  <div className="cvc-line body w90" />
                  <div className="cvc-line body w85" />
                  <div className="cvc-line body w80" />
                </div>
                <div className="cvc-section">
                  <div className="cvc-line heading" />
                  <div className="cvc-line body w95" />
                  <div className="cvc-line body w70" />
                </div>
                <div className="cvc-section">
                  <div className="cvc-line heading" />
                  <div className="cvc-line body w80" />
                  <div className="cvc-line body w90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Kenapa Memilih EasY CV?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon icon-ats">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3>ATS Friendly</h3>
              <p>Template khusus yang dioptimalkan agar mudah dibaca oleh sistem Applicant Tracking System (ATS) perusahaan besar.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-templates">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3>7 Pilihan Template</h3>
              <p>Dari gaya modern, eksekutif, hingga minimalis. Sesuaikan tampilan CV dengan industri dan kepribadian Anda untuk memukau HRD.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-privacy">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Privasi Terjamin</h3>
              <p>Data Anda 100% tersimpan di browser (localStorage). Tidak ada data yang diupload ke server kami. Aman dan rahasia.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-live">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Live Preview</h3>
              <p>Lihat perubahan CV secara real-time saat Anda mengetik. Edit dengan mudah dan cepat tanpa refresh halaman.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="templates-showcase">
        <div className="section-container">
          <h2 className="section-title">Koleksi Template Premium</h2>
          <p className="section-subtitle">Pilih gaya yang mencerminkan profesionalisme Anda</p>
          <div className="showcase-grid">
            {/* Modern */}
            <div className="showcase-item">
              <div className="showcase-preview preview-modern">
                <div className="sc-header"><div className="sc-photo" /><div className="sc-lines"><div className="sc-line w70 accent" /><div className="sc-line w50" /></div></div>
                <div className="sc-line w100 accent thin" />
                <div className="sc-section"><div className="sc-line w35 accent" /><div className="sc-line w90" /><div className="sc-line w80" /></div>
                <div className="sc-section"><div className="sc-line w35 accent" /><div className="sc-line w85" /><div className="sc-line w75" /></div>
              </div>
              <span>Modern</span>
            </div>
            {/* Creative */}
            <div className="showcase-item">
              <div className="showcase-preview preview-creative">
                <div className="sc-split"><div className="sc-sidebar"><div className="sc-photo-sm" /><div className="sc-line w60 white" /><div className="sc-line w50 white" /></div><div className="sc-main"><div className="sc-line w80 bold big" /><div className="sc-line w60 blue" /><div className="sc-section"><div className="sc-line w90" /><div className="sc-line w80" /></div></div></div>
              </div>
              <span>Creative</span>
            </div>
            {/* Executive */}
            <div className="showcase-item">
              <div className="showcase-preview preview-executive">
                <div className="sc-exec-header"><div className="sc-line w70 white bold" /><div className="sc-line w50 white" /></div>
                <div className="sc-section"><div className="sc-line w30 bold" /><div className="sc-line w100 border-b" /><div className="sc-line w95" /><div className="sc-line w85" /></div>
                <div className="sc-section"><div className="sc-line w30 bold" /><div className="sc-line w90" /><div className="sc-line w80" /></div>
              </div>
              <span>Executive</span>
            </div>
            {/* Tech */}
            <div className="showcase-item">
              <div className="showcase-preview preview-tech">
                <div className="sc-tech-header"><div className="sc-line w60 blue bold" /><div className="sc-line w40 green" /></div>
                <div className="sc-section"><div className="sc-line w20 green bold" /><div className="sc-line w90" /><div className="sc-line w85" /></div>
                <div className="sc-section"><div className="sc-line w20 green bold" /><div className="sc-line w80" /><div className="sc-line w75" /></div>
              </div>
              <span>Tech</span>
            </div>
            {/* Minimalist */}
            <div className="showcase-item">
              <div className="showcase-preview preview-minimalist">
                <div className="sc-left"><div className="sc-line w70 bold" /><div className="sc-line w50" /></div>
                <div className="sc-spacer" />
                <div className="sc-section"><div className="sc-line w25 accent" /><div className="sc-line w90" /><div className="sc-line w85" /></div>
                <div className="sc-section"><div className="sc-line w25 accent" /><div className="sc-line w80" /><div className="sc-line w75" /></div>
              </div>
              <span>Minimalist</span>
            </div>
          </div>
          <div className="center-cta">
            <Link href="/builder" className="btn btn-lg btn-outline">Lihat Semua 7 Template</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo"><span>EasY CV</span></div>
          <div className="footer-links">
            <Link href="/builder">Buat CV</Link>
            <a href="#">Tentang</a>
            <a href="#">Privasi</a>
          </div>
          <div className="footer-copyright">&copy; 2026 EasY CV. Dibuat dengan ❤️ untuk pencari kerja.</div>
        </div>
      </footer>
    </div>
  );
}
