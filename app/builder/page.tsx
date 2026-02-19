'use client';

import AppHeader from '@/components/layout/AppHeader';
import EditorPanel from '@/components/layout/EditorPanel';
import PreviewPanel from '@/components/layout/PreviewPanel';

export default function BuilderPage() {
    return (
        <div className="app-wrapper">
            <AppHeader />
            <main className="app-main">
                <EditorPanel />
                <PreviewPanel />
            </main>
        </div>
    );
}
