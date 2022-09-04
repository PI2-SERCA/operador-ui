import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Box,
  Card,
  Badge,
  Container,
  CardMedia,
  Typography,
  CardContent,
} from '@material-ui/core';
import useStyles from './home-styles';
import { base64ToUrl } from '../utils/image';
import { PanicModal } from '../components/PanicModal';
import { Ceramic } from '../types/Ceramic';

const REMOTE_SERVER = 'http://localhost:3001';
const socket = io(REMOTE_SERVER);

export const Home: React.FC = () => {
  const classes = useStyles();

  const [panicModalOpened, setPanicModalOpened] = useState(false);
  const [ceramicList, setCeramicList] = useState<Ceramic[]>([] as Ceramic[]);
  useEffect(() => {
    socket.on('connect', () => console.log(`Connected to ${REMOTE_SERVER} ..`));
    const updateList = (newCeramic: Ceramic) =>
      setCeramicList([...ceramicList, newCeramic]);

    socket.on('ceramicList', updateList);
    console.log(ceramicList, typeof ceramicList);
    return () => {
      socket.off('connect');
      socket.off('ceramicList');
    };
  }, []);

  const cancelCut = () => {
    console.log('Cancelamento selecionado');
  };

  const restartCut = () => {
    console.log('Reiniciamento selecionado');
  };
  console.log(ceramicList);
  return (
    <Container>
      <PanicModal
        opened={panicModalOpened}
        setOpened={setPanicModalOpened}
        cancelCut={cancelCut}
        restartCut={restartCut}
      />

      <Typography gutterBottom variant="h5" style={{ margin: '16px 0' }}>
        Fila de cortes
      </Typography>

      <Box className={classes.listContainer}>
        {ceramicList.map((ceramic) => (
          <Badge
            key={ceramic.order}
            badgeContent={`#${ceramic.order}`}
            color="primary"
          >
            <Card className={classes.ceramicCard}>
              <CardMedia
                component="img"
                alt="Imagem corte"
                title="Imagem corte"
                image={ceramic.cutImage}
                className={classes.cutImage}
              />

              <hr />

              <CardContent style={{ padding: 0 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  Informações cerâmica
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ margin: '8px 0' }}
                >
                  <strong>Largura:</strong> {ceramic.length} cm
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ margin: '8px 0' }}
                >
                  <strong>Comprimento:</strong> {ceramic.width} cm
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ margin: '8px 0' }}
                >
                  <strong>Espessura:</strong> {ceramic.depth} cm
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ margin: '8px 0' }}
                >
                  <strong>Repetições:</strong> {ceramic.repetitions}
                </Typography>
              </CardContent>
            </Card>
          </Badge>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
