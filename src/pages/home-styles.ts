import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: '90%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    ceramicCard: {
      margin: 8,
      width: 260,
      padding: 16,
    },
    cutImage: {
      maxWidth: 260,
      maxHeight: 120,
      margin: '0 auto',
      objectFit: 'contain',
      width: 'fit-content',
      height: 'fit-content',
    },
  })
);

export default useStyles;
