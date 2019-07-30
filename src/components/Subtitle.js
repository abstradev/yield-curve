import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: '1rem',
    color: '#444'
  }
});

const Subtitle = ({ children, classes, styleClass, ...other }) => (
  <Typography
    component="h2"
    variant="h4"
    align="center"
    className={classes.root + ' ' + styleClass}
  >
    {children}
  </Typography>
);

export default withStyles(styles)(Subtitle);
