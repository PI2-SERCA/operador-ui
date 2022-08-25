import React, { CSSProperties } from 'react';
import { Home } from './pages/Home';

export const App: React.FC = () => (
    <div style={{ margin: 0, padding: 0, fontFamily: 'Roboto' } as CSSProperties}>
        <Home />
    </div>
    );
