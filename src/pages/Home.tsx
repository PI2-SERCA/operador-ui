import '../components/styling/home.css';
import {PanicModal} from '../components/home/PanicModal';
import { Ceramics } from '../components/home/Ceramics';

export const Home: React.FC = () => (
    <div>
        <PanicModal />
        <Ceramics />
    </div>
    );
