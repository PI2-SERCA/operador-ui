import '../components/styling/home.css';
import {tipoCeramica} from '../types/Ceramica';

export const Home: React.FC<tipoCeramica> = (prop: tipoCeramica) => (
        <div className='container'>
            <h1 className='tituloPagina'>Página do operador</h1>
            <hr />
            <h2 className='titulo'>Fila de cerâmicas cortadas</h2>
            <section className='lista-corte'>
                {prop.ceramica.map(
                    (ceramica) => (
                        <div className='corte'>
                            <p className='numeroCorte'>{ceramica.order}</p>

                            <svg>
                                <polygon points='200,10 250,190 160,210' />
                            </svg>
                            <section className='informacoes'>
                                <hr />
                                <h3>Informações da cerâmica</h3>
                                <p>
                                    Largura:
                                    {ceramica.width}
                                    cm
                                </p>
                                <p>
                                    Comprimento:
                                    {ceramica.length}
                                    cm
                                </p>
                                <p>
                                    Espessura:
                                    {ceramica.depth}
                                    cm
                                </p>
                                <p>
                                    Número de repetições:
                                    {ceramica.numberOfTimes}
                                </p>
                            </section>
                            <div className='acao'>
                                <button className='restart' type='button'>Restart</button>
                                <button className='panic' type='button'>PANIC</button>
                            </div>
                        </div>
                    ),
                )}
            </section>
        </div>
    );
