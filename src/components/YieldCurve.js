import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import WarningIcon from "@material-ui/icons/Warning"
import Container from "@material-ui/core/Container"
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  makeWidthFlexible,
  Hint,
  XAxis,
  YAxis,
} from "react-vis"
import { keys } from "../data"

const FlexibleXYPlot = makeWidthFlexible(XYPlot)
const styles = theme => ({
  container: {
    paddingLeft: "0",
  },
  gridContainer: {
    padding: "16px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    display: 'inline'
  },
  date: {
    display: 'inline',
    marginLeft: '1rem'
  },
  plot: {
    padding: "16px",
  },
  divider: {
    marginBottom: "16px",
  },
  chip: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  hintContainer: {
    backgroundColor: "#444",
    borderRadius: "0.25rem",
  },
  hint: {
    padding: "0.5rem",
    fontSize: "0.875rem",
  },
})

class YieldCurve extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: props.data.pop(),
      hintValue: null,
    }

    this.handleClick = this.handleClick.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onNearestX = this.onNearestX.bind(this)
  }

  handleClick() {
    // TODO
  }

  onMouseLeave() {
    this.setState({ hintValue: null })
  }

  onNearestX(value, { index }) {
    const { entry } = this.state
    this.setState({ hintValue: entry.data[index] })
  }

  render() {
    const { hintValue, entry } = this.state
    const { classes } = this.props
    return (
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12}>
            <div className={classes.titleContainer}>
              <span>
                <Typography component="h1" variant="h3" className={classes.title}>
                  Yield Curve
                </Typography>
                <Typography variant="subtitle2" className={classes.date}>
                  {entry.date.toLocaleDateString()}
                </Typography>
              </span>
              <Button variant="contained" className={classes.button}>
                Inverted
                <WarningIcon className={classes.rightIcon} />
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <FlexibleXYPlot height={350} onMouseLeave={this.onMouseLeave}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                title="Maturity"
                tickTotal={keys.length}
                tickFormat={v => keys[v][1]}
              />
              <YAxis title="Yield" />
              <LineSeries data={entry.data.reduce((arr, val) => {
                if (val.x === keys.findIndex(key => key[0] === "d:BC_3MONTH") || val.x === keys.findIndex(key => key[0] === "d:BC_10YEAR")) {
                  arr.push(val);
                }
                return arr;
              }, [])} />
              <LineSeries data={entry.data} onNearestX={this.onNearestX} />
              {hintValue && (
                <Hint value={hintValue}>
                  <div className={classes.hintContainer}>
                    <div className={classes.hint}>
                      <p>Maturity: {keys[hintValue.x][1]}</p>
                      <p>Yield: {hintValue.y}%</p>
                    </div>
                  </div>
                </Hint>
              )}
            </FlexibleXYPlot>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(YieldCurve)
