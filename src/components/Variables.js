import React, { Component } from "react"
import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core/styles"
import Collapse from "@material-ui/core/Collapse"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import Divider from "@material-ui/core/Divider"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ShowChartIcon from "@material-ui/icons/ShowChart"
import SwapHorizIcon from "@material-ui/icons/SwapHoriz"
import BuildIcon from "@material-ui/icons/Build"
import Typography from "@material-ui/core/Typography"

const variables = [
  {
    slug: "inflation",
    name: "Inflation",
    icon: <ShowChartIcon />,
    description: classes => (
      <>
        <Typography className={classes.variableText}>
          Inflation decreases the return on investment received by yield, and
          it's possible to go negative on the actual purchasing power by the
          maturity date. Whereas other securities such as stocks have the
          ability to adjust with inflation, basic US Treasury bonds do not.
        </Typography>
        <Typography className={classes.secondVariableText}>
          If an investor purchases a 10 year bond at 4% yield, and the inflation
          rate over the same period is 3%. Once the bond is called or matures,
          the investor will only have made 1% in purchasing power instead of the
          perceived 4%. For this reason, investors can look at expected return
          on investment over a given period with variables such as inflation to
          estimate what their real return might look like.
        </Typography>
      </>
    ),
  },
  {
    slug: "demand",
    name: "Demand",
    icon: <SwapHorizIcon />,
    description: classes => (
      <Typography className={classes.variableSingle}>
        As stated in{" "}
        <Link href="#whatis" className={classes.link}>
          "What is the Yield Curve?"
        </Link>
        , Bond values and interest rates have an inverse correlation. If
        investor sentiment is negative, demand for long term bonds will
        increase, which in turn relates to a decrease in interest rates for
        them. Interest rates can then be lowered, because investors will accept
        more risk as they seek the security associated with long term bonds. The
        opposite occurs if investors have a positive view of the future for the
        economy.
      </Typography>
    ),
  },
  {
    slug: "federal-funds-rate",
    name: "Federal Funds Rate",
    icon: <BuildIcon />,
    description: classes => (
      <>
        <Typography className={classes.variableText}>
          Banks are required to maintain a reserve of money mandated by the
          Federal Reserve's Board of Governers. When a bank predicts it's
          reserves will dip below the requirement, it can borrow from another
          bank at an agreed upon interest rate.
        </Typography>
        <Typography className={classes.secondVariableText}>
          The Federal Funds Rate is the target rate at which the{" "}
          <Link
            className={classes.link}
            href="https://www.investopedia.com/terms/f/fomc.asp"
          >
            FOMC
          </Link>{" "}
          wants banks to lend money to each other. It does not enforce this
          rate. Instead, the Fed buys or sells securities from it's member
          banks. This direct manipulation of supply and demand on securities
          indirectly affects interest rates and inflation. Read this{" "}
          <Link
            className={classes.link}
            href="https://www.thebalance.com/fed-funds-rate-definition-impact-and-how-it-works-3306122"
          >
            "thebalance" article
          </Link>{" "}
          for more information.
        </Typography>
      </>
    ),
  },
]

const styles = theme => ({
  pseudo: {
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    width: "80%",
    border: "2px solid white",
    borderRadius: "0.25rem",
    height: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    "&::before": {
      content: `""`,
      position: "absolute",
      width: "50%",
      height: "75%",
      top: "-24px",
      left: "-24px",
      display: "block",
      zIndex: -1,
      border: "2px solid white",
      borderRadius: "0.25rem",
    },
    "&::after": {
      content: `""`,
      position: "absolute",
      width: "50%",
      bottom: "-24px",
      right: "-24px",
      height: "75%",
      display: "block",
      zIndex: -1,
      border: "2px solid white",
      borderRadius: "0.25rem",
    },
  },
  rootPrimary: {
    backgroundColor: theme.palette.primary.main,
    "&::before": {
      backgroundColor: theme.palette.primary.main,
    }
  },
  rootSecondary: {
    backgroundColor: theme.palette.secondary.dark,
    "&::before": {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
  root: {
    padding: "0",
    width: "100%",
    height: "100%",
    color: theme.palette.common.white,
    "&::before": {
      content: `""`,
      display: "block",
      position: "absolute",
      zIndex: -2,
      overflowX: "hidden",
      left: "-50%",
      top: "-50%",
      height: "180%",
      [theme.breakpoints.between("sm", "lg")]: {
        top: "-110%",
        height: "250%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "220%",
        top: "-80%",
      },
      width: "200%",
      transform: "rotate(-3deg)",
      "-ms-transform": "rotate(-3deg)",
      "-webkit-transform": "rotate",
    },
  },
  list: {
    padding: "24px",
  },
  link: {
    color: "#e57375",
    fontWeight: "bold",
  },
  subHeader: {
    color: theme.palette.common.white,
    position: "relative",
    fontSize: "1.75rem",
    marginBottom: "10px",
    display: "inline-block",
    "&::after": {
      content: `""`,
      bottom: "0%",
      right: "0px",
      width: "160px",
      height: "3px",
      position: "absolute",
      backgroundColor: "#c4c4c4",
    },
  },
  container: {
    padding: "14px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  icon: {
    color: theme.palette.common.white,
  },
  divider: {
    backgroundColor: "#c4c4c4",
  },
  variableSingle: {
    width: "85%",
  },
  variableText: {
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
  },
  secondVariableText: {
    marginTop: "1rem",
    [theme.breakpoints.up("lg")]: {
      width: "40%",
      marginTop: 0,
      marginLeft: "1rem",
    },
  },
})

class Variables extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: null,
    }
  }

  handleClick(index) {
    this.setState({
      open: this.state.open === index ? null : index,
    })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state
    const colorClass = this.props.value === 1 ? classes.rootSecondary : classes.rootPrimary;

    return (
      <div className={classes.pseudo}>
        <div className={classes.root + " " + colorClass}>
          <List
            aria-labelledby="variables-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="variables-subheader"
                className={classes.subHeader}
              >
                Influencial Variables
              </ListSubheader>
            }
            className={classes.list}
          >
            {variables.map((variable, index) => (
              <div key={index}>
                <ListItem button onClick={() => this.handleClick(index)}>
                  <ListItemIcon className={classes.icon}>
                    {variable.icon}
                  </ListItemIcon>
                  <ListItemText primary={variable.name} />
                  {open === index ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <div className={classes.container}>
                    {variable.description(classes)}
                  </div>
                </Collapse>
                <Divider className={classes.divider} />
              </div>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

Variables.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
}

export default withStyles(styles)(Variables)
