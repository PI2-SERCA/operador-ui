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
  Button,
  Tooltip,
} from '@material-ui/core';
import useStyles from './home-styles';
import { base64ToUrl } from '../utils/image';
import { PanicModal } from '../components/PanicModal';
import { Ceramic } from '../types/Ceramic';
import { ConfirmationModal } from '../components/ConfirmationModal/ConfirmationModal';
import { metersToCentimeters } from '../utils/number';

const socket = io(process.env.REACT_APP_OPERADOR_API_URL as string);

export const Home: React.FC = () => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [panicModalOpened, setPanicModalOpened] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [ceramicList, setCeramicList] = useState<Ceramic[]>([] as Ceramic[]);
  const [confirmationModalOpened, setConfirmationModalOpened] = useState(false);

  const restartCut = () => {
    return true;
  };

  const cancelCut = () => {
    return true;
  };

  const updateList = (data: Ceramic[]) => {
    try {
      const newCeramicList: Ceramic[] = data;

      setCeramicList(newCeramicList);
    } catch (error) {
      console.error(error);

      setErrorMessage('Ocorreu um erro ao buscar os cortes');
    }
  };

  const startCut = () => {
    socket.emit('start-cut');
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);

      socket.emit('get-state');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      setCeramicList([]);
    });

    socket.on('state', updateList);

    socket.on('append-cut', (data: Ceramic[]) =>
      setCeramicList((prev) => [...prev, ...data])
    );

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('state');
      socket.off('append-cut');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCeramicSize = () => {
    const width = metersToCentimeters(ceramicList[0]?.width);
    const height = metersToCentimeters(ceramicList[0]?.height);

    return `${width}x${height} cm`;
  };

  const getCeramicList = () => {
    if (!ceramicList.length) {
      return (
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="textSecondary"
          style={{ margin: '32px 0' }}
        >
          Nenhum corte no momento...
        </Typography>
      );
    }

    return ceramicList.map((ceramic, idx) => (
      <Badge
        // eslint-disable-next-line react/no-array-index-key
        key={`ceramic-${idx}`}
        badgeContent={`#${idx + 1}`}
        color="primary"
        style={{ margin: 8 }}
      >
        <Card
          className={classes.ceramicCard}
          style={{
            border: idx === 0 ? '4px solid rgba(63, 81, 181, 0.75)' : '',
          }}
        >
          <CardMedia
            component="img"
            alt="Imagem corte"
            title="Imagem corte"
            image={base64ToUrl(ceramic.base64)}
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
              <strong>Comprimento:</strong> {metersToCentimeters(ceramic.width)}{' '}
              cm
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ margin: '8px 0' }}
            >
              <strong>Largura:</strong> {metersToCentimeters(ceramic.height)} cm
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ margin: '8px 0' }}
            >
              <strong>Espessura:</strong> {metersToCentimeters(ceramic.depth)}{' '}
              cm
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
    ));
  };

  return (
    <Container>
      <PanicModal
        opened={panicModalOpened}
        setOpened={setPanicModalOpened}
        cancelCut={cancelCut}
        restartCut={restartCut}
      />

      <ConfirmationModal
        opened={confirmationModalOpened}
        setOpened={setConfirmationModalOpened}
        ceramicSize={getCeramicSize()}
        confirmAction={startCut}
      />

      <Box
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            gutterBottom
            variant="h5"
            style={{
              display: 'flex',
              margin: '16px 8px',
              alignItems: 'center',
            }}
          >
            Fila de cortes
            <Tooltip
              title={
                isConnected ? 'Servidor conectado' : 'Servidor desconectado'
              }
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  marginLeft: 16,
                  borderRadius: '50%',
                  backgroundColor: isConnected ? 'green' : 'red',
                }}
              />
            </Tooltip>
          </Typography>
        </Box>

        <Button
          color="primary"
          variant="contained"
          disabled={!ceramicList.length}
          style={{ height: 40 }}
          onClick={() => setConfirmationModalOpened(true)}
        >
          Iniciar corte
        </Button>
      </Box>

      <Box className={classes.listContainer}>
        {errorMessage ? (
          <Typography
            gutterBottom
            color="error"
            variant="subtitle1"
            style={{ margin: '32px 0' }}
          >
            {errorMessage}
          </Typography>
        ) : (
          getCeramicList()
        )}
      </Box>
    </Container>
  );
};

export default Home;
