/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Footer from "./Footer"
import Seo from './Seo';

const styles = theme => ({
  title: {
    flexGrow: 1,
    color: theme.palette.common.white,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  github: {
    height: "32px",
    width: "32px",
    filter: `invert(100)`,
    "-webkit-filter": `invert(100)`,
  },
})

const Layout = ({ classes, children }) => {
  return (
    <React.Fragment>
      <Seo />
      <AppBar color="primary" position="static">
        <Toolbar className={classes.toolbar}>
          <Tooltip title="Visit Website">
            <Button href="https://abstraconsulting.com/">
              <Typography variant="h4" className={classes.title}>
                Abstra
              </Typography>
            </Button>
          </Tooltip>
          <div>
            <Button href="https://github.com/abstra-llc/yield-curve">
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
                alt="github logo"
                className={classes.github}
              />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div
        style={{
          marginTop: "64px",
          marginLeft: "2vw",
          marginRight: "2vw",
        }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Layout)
