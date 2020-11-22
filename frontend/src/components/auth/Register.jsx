import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import NotificationContext from "../../context/NotificationContext";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  // State hooks
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  // Other hooks
  const {setUserData} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const history = useHistory();
  const classes = useStyles();

  // Submit register form function
  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password, passwordCheck };
      await Axios.post(
        "/api/user/register", 
        newUser
        );
        const loginRes = await Axios.post(
          "/api/user/login",
          {email, password}
          );
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
    } catch (err) {
      setNotification({severity: "error", message: err.response.data.msg});
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={submitRegister} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(e) => {setUsername(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="Password Check"
                type="password"
                id="passwordCheck"
                onChange={(e) => {setPasswordCheck(e.target.value)}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/user/login" variant="body2">
                Already have an account? Login here
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}