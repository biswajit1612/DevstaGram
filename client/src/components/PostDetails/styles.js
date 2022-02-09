import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    //height: '10%',
    maxHeight: '500px',
    margin: '0px auto',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    //alignItems: 'center',
  },
  section: {
    width: '60%',
    borderRadius: '20px',
    margin: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    //flex: 1,
  },
  imageSection: {
    display: 'flex-top',
    width: '40%',
    marginTop: '100px',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginTop: '0px',
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));