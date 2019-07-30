import React from "react"

import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  footer: {
    marginTop: "12vh",
    marginBottom: "0",
    backgroundColor: theme.palette.primary.dark,
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "2rem",
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    color: "white",
  },
  cta: {
    width: "100%",
    paddingBottom: "10px",
  },
  mark: {
    marginTop: "16px",
  },
  disclaimer: {
    maxWidth: '400px',
    [theme.breakpoints.down("md")]: {
      marginTop: "1rem"
    }
  }
})

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <Typography
          align="center"
          color="inherit"
          component="h4"
          variant="h4"
          className={classes.cta}
        >
          Talk to a developer
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          href="https://abstraconsulting.com/contact"
        >
          Contact us
        </Button>
      </div>
      <div className={classes.itemContainer}>
        <Typography variant="body2" className={classes.disclaimer}>
          Please be aware that any information found on InvertedYieldCurve.net
          may be innaccurate or misleading. We recommend meeting with a
          financial advisor before making investments.
        </Typography>
        <Typography className={classes.mark}>&copy; Abstra LLC</Typography>
      </div>
    </div>
  </footer>
)

export default withStyles(styles)(Footer)
