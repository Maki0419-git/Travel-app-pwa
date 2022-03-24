import { HashRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Component/NavBar";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import RecentPhoto from "./Component/RecentPhoto/RecentPhoto";
import MyTravel from "./Component/MyTravel/MyTravel";
import Arrangement from "./Component/Arrangement/Arrangement";
import TravelRecord from "./Component/TravelRecord/TravelRecord";
const theme = createTheme({
  palette: {
    primary: {
      main: "#9a0036"
    },

    secondary: {
      main: "#e33371"
    }
  },
  typography: {
    fontFamily: [
      'Noto Serif TC',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function NoPage() {
  return (
    <div>
      <NavBar />
      123
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route path="/TravelRecord" component={TravelRecord} />
          <Route path="/MyTravel" component={MyTravel} />
          <Route path="/Arrangement" component={Arrangement} />
          <Route exact path="/" component={RecentPhoto} />
          <Route component={NoPage} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

