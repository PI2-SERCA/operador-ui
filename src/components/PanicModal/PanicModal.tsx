import React, { Dispatch } from 'react';
import { Modal, Button, Typography, Box, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useStyles from './panic-modal-styles';

interface PanicModalProps {
  opened: boolean;
  setOpened: Dispatch<boolean>;
  cancelCut: () => void;
  restartCut: () => void;
}

export const PanicModal: React.FC<PanicModalProps> = ({
  opened,
  setOpened,
  cancelCut,
  restartCut,
}) => {
  const classes = useStyles();

  if (!opened) return null;

  const handleClose = () => {
    setOpened(false);
  };

  const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };

  return (
    <Modal open={opened} onClose={handleClose}>
      <Paper style={getModalStyle()} className={classes.paper}>
        <Box className={classes.header}>
          <Typography variant="h5">Pânico acionado</Typography>

          <Close className={classes.closeIcon} onClick={handleClose} />
        </Box>

        <Box className={classes.content}>
          <Typography variant="subtitle1">
            O botão de pânico foi acionado. Por favor selecione a ação que
            deseja para o corte atual.
          </Typography>
        </Box>

        <Box className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 16 }}
            onClick={restartCut}
          >
            Reiniciar
          </Button>

          <Button variant="contained" color="secondary" onClick={cancelCut}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PanicModal;
