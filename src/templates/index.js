import React, { Component } from "react"
import PropTypes from "prop-types"

import "react-vis/dist/style.css"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Collapse from "@material-ui/core/Collapse"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import IconButton from "@material-ui/core/IconButton"

import Subtitle from "../components/Subtitle"
import YieldCurve from "../components/YieldCurve"
import Variables from "../components/Variables"
import Layout from "../components/Layout";
import Link from "@material-ui/core/Link"
import Types from "../components/Types"
import { keys } from "../data"

const styles = theme => ({
  important: {
    backgroundColor: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  importantTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  importantTitle: {
    marginBottom: 0,
    marginRight: "16px",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  keyboardIcon: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  whatisTitle: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    padding: "16px",
    display: "inline-block",
  },
  whatisItem: {
    [theme.breakpoints.up("md")]: {
      borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
  whatisTypo: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
  },
  whatisFirst: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    marginTop: "16px",
  },
  variables: {},
})

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      importantOpen: false,
      value: 0,
    }

    this.onImportantClick = this.onImportantClick.bind(this)
  }

  onImportantClick() {
    this.setState({
      importantOpen: !this.state.importantOpen,
    })
  }

  onValueChange(value) {
    this.setState({ value })
  }

  render() {
    const { importantOpen, value } = this.state
    const { pageContext, classes } = this.props
    const { updated, entry } = pageContext.data.feed
    console.log(updated) // TODO use this elsewhere
    const entries = entry.map(item => {
      const properties = item.content["m:properties"]
      const data = keys.reduce((aggr, key, index) => {
        aggr.push({ x: index, y: properties[key[0]] })
        return aggr
      }, [])

      return {
        id: properties["d:Id"],
        date: new Date(properties["d:NEW_DATE"]),
        data,
      }
    })
    entries.sort((a, b) => a.id - b.id)

    return (
      <Layout>
        <Grid container spacing={8}>
          <Grid item xs={12} lg={8} id="yield-curve">
            <YieldCurve data={entries} />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            className={classes.important}
            id="important"
          >
            <div className={classes.importantTitleContainer}>
              <Subtitle styleClass={classes.importantTitle}>
                Why it's Important.
              </Subtitle>
              <IconButton
                onClick={this.onImportantClick}
                className={classes.keyboardIcon}
              >
                {importantOpen ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
            <Collapse in={importantOpen} timeout="auto" unmountOnExit>
              <Typography>
                As a recession indicator and general activity and growth
                predictor, the yield curve is used to get a quick glance at the
                state of the economy. Although the idea behind the graph is
                simple, comparing interest rates of bonds with different
                maturities, the complexity lay in the underlying{" "}
                <Link href="#variables">variables</Link> that move the yield
                curve between{" "}
                <Link href="#types">normal, flat, and inverted</Link>. The
                snapshot has proven beneficial because of it's accurate
                prediction of recessions and economic activity in the past.
              </Typography>
            </Collapse>
          </Grid>
          <Grid item xs={12} id="whatis">
            <Subtitle styleClass={classes.whatisTitle}>
              What is the Yield Curve?
            </Subtitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} className={classes.whatisItem}>
                <Typography className={classes.whatisTypo}>
                  The yield curve plots the interest rates (yields) of US
                  Treasury Bonds against the maturity date of the bond. Long
                  term bonds have higher risk involved than short term bonds,
                  and so we expect long term bonds to have higher interest rates
                  to incentify investors. What are these risks? At least two
                  factors should be considered.
                </Typography>
                <Typography className={classes.whatisFirst}>
                  First, there is inflation. If a purchased bond has a yield
                  lower than the average inflation rate over it's duration, then
                  the investor will actually lose buying power. For these
                  reasons, we can see that risk increases with the maturity of a
                  bond, and therefor long term bonds should have higher interest
                  rates to incentify investorys to take such a risk.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.whatisTypo}>
                  Second, interest rates and bond prices have an inverse
                  relationship (for an indepth explanation checkout this{" "}
                  <Link href="https://www.sec.gov/files/ib_interestraterisk.pdf">
                    SEC article
                  </Link>
                  ). To see this remember that when a bond is purchased, the
                  interest rate is fixed until it's call or maturity date. After
                  purchase, imagine that new bonds being issued are at a higher
                  interest rate. In order for that bond to sell on a market with
                  higher interest rates, the price has to be adjusted
                  appropriately (in this case a decrease) for the expected
                  interest rate on the old bond to be higher. Since investors
                  purchase the old bond at a discount, they see a higher return
                  at the call or maturity date and therefor can calculate an
                  adjusted yield that matches the yield of new bonds being
                  issued. Since the uncertainty of the yield of newly issued
                  bonds increases with time, long term bonds inherintly have a
                  higher risk because investors may see the price of their bond
                  decrease.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: 0 }}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} id="types">
            <Types
              value={value}
              onValueChange={this.onValueChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} id="variables" className={classes.variables}>
            <Variables value={value} />
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default withStyles(styles)(IndexPage)
