import React from 'react';
import { connect } from 'react-redux';

import History from './barGraph';
import Categories from './pieGraph';
import LineGraphParent from './line-graph/lineGraphParent';
import SplashLandingPage from './splashLandingpage';
import Footer from './footer';

// ********************************************************
// *************** START MOCK ACTIONS *********************

const getChromeIDFromBackground = () => {
  const data = {
    type: 'get-chromeid',
  };

  return data;
};

// const getTimeHistoryLastFetchedFromBackground = () => {
//   const data = {
//     type: 'get-time-history-last-fetched',
//   };

//   return data;
// };

// const getHistoryByDateFromBackground = () => {
//   const data = {
//     type: 'get-history-by-date',
//   };

//   return data;
// };

// ************** END MOCK ACTIONS ************************
// ********************************************************
function FormattedDate(props) {
  return <h2>{props.date.toLocaleTimeString()}</h2>;
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentWillMount() {
    // console.log('chrome id props', this.props.chromeID)
        //if chrome)ID does not exsists, dispatch getChromeID    
    if (this.props.chromeID === 'no chromeID') {
      this.props.dispatch(getChromeIDFromBackground());
    }
  }

  componentDidMount() {  
    this.timerID = setInterval(
      () => { console.log("inside set interval"); this.tick()},
      1000
    );
  }


  shouldComponentUpdate(nextProps, nextState) {
    // console.log("App componentWillReceiveProps this.props.chromeID: ", this.props.chromeID); 
    // console.log("App componentWillReceiveProps nextProps: ", nextProps.chromeID);    

    //if chromeID changes,re-render
    if(this.props.chromeID !== nextProps.chromeID) {
      return true;
    } else if (nextState.date !== this.state.date) {
      return true;
    }
    //else if chromeID does not change return false
    return false;
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    console.log("inside tick ...");
    console.log("ci --", this.props.chromeID);
    this.setState({
      date: new Date(),
    });
  }


  render() {
    console.log("rendering");
    if (this.props.chromeID !== 'no chromeID') {
      return (
        <div>
          <br />
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                  <img src="./assets/logo-yourstory.png" height="40px" />
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-3 name-welcome">
                  <FormattedDate date={this.state.date} />
                  Welcome back, Melba!
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-11">
                  <h5>Most Visited Sites</h5>
                  <div className="data-parent-container">
                  <History />
                  </div>
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-11">
                  <h5>Sites By Category</h5>
                  <div className="data-parent-container">
                    <Categories />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>     
          <br />
          <br />

          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                  <h5>Sites Visited This Week</h5>
                  <LineGraphParent />
                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
          </div>
          <br />
          <br />
          
          <center>
            <Footer />
          </center>
        </div>
      );
    } else {
      return (
        <div>
          <SplashLandingPage />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    chromeID: state.chromeID,
  };
};

export default connect(mapStateToProps)(App);
