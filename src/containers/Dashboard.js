import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import { secondaryListItems } from "../components/ListItems";
import MainListItems from "../components/ListItems";
import Chart from "../components/Chart";
import Summary from "../components/Summary";
import RecentTransactions from "../components/RecentTransactions";
import { Route } from "react-router-dom";
import Transactions from "./Transactions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Profile from "./Profile";
import Tooltip from "@material-ui/core/Tooltip";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/muazzamnashat">
        Muazzam Nashat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

// receive prop from app component

export default function Dashboard({ match, transactions }) {
  // debugger
  const classes = useStyles();
  // use state to keep drawer open or close
  const [open, setOpen] = React.useState(true);
  const sortedData = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const displayHeader = () => {
    switch (window.location.pathname) {
      case "/":
        return "Overview";

      case "/transactions":
        return "Transactions";

      case "/profile":
        return "Profile";

      default:
        break;
    }
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {/* This is the heading, change heading according to the url  */}
            {displayHeader()}
          </Typography>

          {/* For now not gonna user notifications */}

          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          {/* logout button */}
          <Tooltip title="Log Out">
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* This is the menu */}
          <MainListItems />
        </List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* Here we are loading the landing page and list with appropriate routing */}
          <Grid container spacing={3}>
            <Route exact path="/transactions" render={() => <Transactions />} />
            <Route
              exact
              path={match.url}
              render={() => <Chart transactions={transactions} />}
            />
            <Route exact path={match.url} render={() => <Summary />} />
            <Route
              exact
              path={match.url}
              render={() => (
                <RecentTransactions transactions={sortedData.slice(0, 6)} />
              )}
            />
            <Route exact path="/profile" render={() => <Profile />} />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
