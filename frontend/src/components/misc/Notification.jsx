import React, { useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import {Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationContext from "../../context/NotificationContext";

const useStyles = makeStyles(theme => {
  return (
    {
      notification: {
        position: "absolute",
      }
    }
  )
})

export default function Notification(props) {
  const {notification, setNotification} = useContext(NotificationContext);
  const classes = useStyles();

  return (
    <div>
     {notification.message && 
      <Grid container justify="flex-end">
      <Grid item xs>
      <Alert 
        className={classes.notification}
        severity={notification.severity} 
        onClose={() => {
          setNotification({severity: undefined, message: undefined})
        }}
      >
        {notification.message}
      </Alert>
      </Grid>
      </Grid>
     }
    </div>
  )
}