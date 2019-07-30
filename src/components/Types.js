import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
//        <Link href="https://www.clevelandfed.org/en/our-research/indicators-and-data/yield-curve-and-gdp-growth/background-and-resources.aspx">
//          (Federal Reserve Bank of Cleveland)
//        </Link>{" "}
//The graph compares GDP against the 10-year minus 3-month yield spread (10 year
//        yield - 3 month yield).

const curveTypes = [
  {
    slug: "normal-yield-curve",
    title: "Normal",
    color: "primary",
    description: (
      <Typography>
        As discussed in <Link href="#whatis">"What is the Yield Curve?"</Link>,
        long term bonds are associated with higher risk of inflation, price
        uncertainty, and defaulting. A Normal Yield Curve occurs when yields for
        long term bonds are higher than short term bonds, incentifying investors
        to consider taking the associated risks. This is typically seen as an
        indicator of economic growth. As seen above, rises in yield curve spread
        have historically been followed by increases in GDP.
      </Typography>
    ),
  },
  {
    slug: "flat-yield-curve",
    title: "Flat",
    color: "secondary",
    description: (
      <Typography>
        A Flat Yield Curve is necessarily an indication of a changing market
        environment. It's the transitionary stage between normal and inverted,
        so when an investor notices the curve flattening, he/she should
        investigate to understand the shifting market. Since long and short term
        bonds have similar yields in a flat yield curve, there is little
        motivation for an investor to take the risks associated with long term
        securities. This drives demand up while pulling yields down for short
        term bonds, with the inverse occuring for bonds of higher maturities.
        Under a simple model, this should bring the flat curve to a normal curve
        over time. However, the variables associated are complex, as shown in{" "}
        <Link href="#variables">'Variables of the Curve'</Link>. If investors
        are pessimistic about the market, they may be fleeing to long term
        bonds. In this case, the flat curve may become inverted.
      </Typography>
    ),
  },
  {
    slug: "inverted-yield-curve",
    title: "Inverted",
    color: "primary",
    description: (
      <Typography>
        An inverted yield curve has accurately predicted the last 7 recessions,
        although the magnitude of the inversion has not correlated to the
        magnitude of the following recession{" "}
        <Link href="https://www.forbes.com/sites/billconerly/2018/07/14/the-yield-curve-as-recession-predictor-should-we-worry-today/#3e9f4c95ba4e">
          (NY Times)
        </Link>
        . In the graph, note that each time the yield spread dipped below 0%, a
        drop in GDP soon followed. Looking past raw data, the question is how
        does the yield curve predict a recession? One factor is supply and
        demand driven by investor sentiment. If investors predict a recession
        and interest rates decreasing in the future, they are likely to lock in
        Long Term US Treasury bonds. Having predicted a recession, they seek low
        risk (of{" "}
        <Link href="https://www.fool.com/knowledge-center/what-is-a-bond-default.aspx">
          defaulting
        </Link>
        ), high quality US Treasury bonds. This demand for long term bonds
        brings the yield down. Conversely, short term bond yields increase.
        Eventually we reach a flat and then inverted yield curve. If the yield
        curve inverts, the probability of a following recession lay within the
        probability of the market being correct. This may be a self fulfilling
        prophecy. Banks will be inclined to decrease lending, investors might
        switch from stocks to bonds, and household/business confidence can
        decrease. Combine these factors and its possible for the market to sweep
        out its own feet.
      </Typography>
    ),
  },
]

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "16px",
    [theme.breakpoints.up("lg")]: {
      marginBottom: "16px",
    },
  },
  imgTitle: {
    width: "100%",
    marginBottom: "12px",
  },
  img: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    objectFit: "contain",
  },
  title: {
    marginTop: "16px",
  },
  typeDescription: {
    minHeight: "250px",
    [theme.breakpoints.up("lg")]: {
      minHeight: "380px",
    },
  },
})

const Type = props => {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${curveTypes[index].slug}`}
      aria-labelledby={`tab-${curveTypes[index].slug}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

class Types extends React.Component {
  render() {
    const { classes, value } = this.props

    return (
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6} className={classes.imgContainer}>
            <Typography
              component="h5"
              variant="h5"
              align="center"
              className={classes.imgTitle}
            >
              Yield Curve Spread and Real GDP Growth
            </Typography>
            <img
              src={require("../images/cleveland_fed_yieldcurve.png")}
              alt={"GDP year over year growth compared to yield spread"}
              className={classes.img}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Tabs
              value={value}
              onChange={(event, index) => this.props.onValueChange(index)}
              aria-label="Curve Type Tabs"
              textColor={curveTypes[value].color}
              indicatorColor={curveTypes[value].color}
              centered
            >
              {curveTypes.map((type, index) => (
                <Tab
                  label={type.title}
                  key={type.slug}
                  id={`tab-${type.slug}`}
                  aria-controls={`tabpanel-${type.slug}`}
                />
              ))}
            </Tabs>
            {curveTypes.map((type, index) => (
              <Type value={value} index={index} key={index}>
                <div className={classes.typeDescription}>
                  {type.description}
                </div>
              </Type>
            ))}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

Types.propTypes = {
  classes: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default withStyles(styles)(Types)
