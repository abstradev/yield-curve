import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid"
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
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
  titleTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  title: {
    display: 'inline'
  },
  date: {
    display: 'inline',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0.5rem'
    },
    marginLeft: '1rem',
    whiteSpace: 'nowrap'
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
  inverted: {
    backgroundColor: theme.palette.error.main
  },
  normal: {
    backgroundColor: '#4caf50'
  },
  flat: {
    backgroundColor: '#ffeb3b'
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

    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onNearestX = this.onNearestX.bind(this)
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

    const slope = entry.data.reduce((sum, val) => val.y + sum, 0) / entry.data.length;

    let yieldBtn;
    if (slope > 0.5) {
      yieldBtn = {
        className: classes.inverted,
        text: 'inverted',
        icon: (<TrendingUpIcon className={classes.rightIcon} />)
      };
    } else if (slope < -0.5) {
      yieldBtn = {
        className: classes.normal,
        text: 'normal',
        icon: (<TrendingDownIcon className={classes.rightIcon} />)
      };
    } else {
      yieldBtn = {
        className: classes.flat,
        text: 'flat',
        icon: (<TrendingFlatIcon className={classes.rightIcon} />)
      };
    }

    return (
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12}>
            <div className={classes.titleContainer}>
              <span className={classes.titleTextContainer}>
                <Typography component="h1" variant="h3" className={classes.title}>
                  Yield Curve
                </Typography>
                <Typography variant="subtitle2" className={classes.date}>
                  Data From: {entry.date.toLocaleDateString()}
                </Typography>
              </span>
              <Tooltip title={`slope: ${slope.toFixed(2)}`}>
                <Button variant="contained" className={classes.button + " " + yieldBtn.className} href="#types">
                  {yieldBtn.text}
                  {yieldBtn.icon}
                </Button>
              </Tooltip>
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
              <LineSeries data={entry.data} onNearestX={this.onNearestX} curve="curveMonotoneX" />
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
