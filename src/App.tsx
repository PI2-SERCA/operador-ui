import { CSSProperties } from 'react';
import { Home } from './pages/Home';

const listaCeramicas = [
        {
            width: 41,
            length: 46,
            depth: 3.5,
            numberOfTimes: 23,
        },
        {
            width: 53,
            length: 46.6,
            depth: 5.67,
            numberOfTimes: 73,
        },
        {
            width: 47.5,
            length: 48.6,
            depth: 3.885,
            numberOfTimes: 13,
        },
        {
            width: 25.5,
            length: 12.46,
            depth: 5.78,
            numberOfTimes: 4,
        },
];

export const App = () => (
    <div style={{ margin: 0, padding: 0, fontFamily: 'Roboto' } as CSSProperties}>
        <Home ceramica={listaCeramicas} />
    </div>
    );
