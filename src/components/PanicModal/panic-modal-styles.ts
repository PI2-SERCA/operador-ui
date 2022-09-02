import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 600,
      borderRadius: 8,
      position: 'absolute',
      boxShadow: theme.shadows[5],
      // alignItems: 'space-between',
      backgroundColor: theme.palette.background.paper,
    },
    header: {
      padding: 16,
      display: 'flex',
      color: '#FFFFFF',
      borderRadius: '8px 8px 0 0',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.secondary.main,
    },
    content: {
      padding: '24px 32px 16px 32px',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '16px 32px',
    },
    closeIcon: {
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.75,
      },
    },
  })
);

export default useStyles;
