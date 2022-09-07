import React, { Dispatch } from 'react';
import { Modal, Button, Typography, Box, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useStyles from './confirmation-modal-styles';

interface ConfirmationModalProps {
  ceramicSize: string;
  opened: boolean;
  setOpened: Dispatch<boolean>;
  confirmAction: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  opened,
  setOpened,
  ceramicSize,
  confirmAction,
}) => {
  const classes = useStyles();

  const closeModal = () => {
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

  if (!opened) return null;

  return (
    <Modal open={opened} onClose={closeModal}>
      <Paper style={getModalStyle()} className={classes.paper}>
        <Box className={classes.header}>
          <Typography variant="h5">Deseja iniciar o corte?</Typography>

          <Close className={classes.closeIcon} onClick={closeModal} />
        </Box>

        <Box className={classes.content}>
          <Typography variant="subtitle1">
            Certifique-se que a cerâmica com as dimensões corretas (
            {ceramicSize}) está posicionada corretamente na máquina.
          </Typography>
        </Box>

        <Box className={classes.actions}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: 16 }}
            onClick={() => {
              confirmAction();
              closeModal();
            }}
          >
            Sim
          </Button>

          <Button variant="contained" color="primary" onClick={closeModal}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ConfirmationModal;
