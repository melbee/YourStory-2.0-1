' use strict ';
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

import d3PieChart from '../d3PieChart';

const getCatDataFromBackground = () => {
  const data = {
    type: 'get-cat-data',
  };
  return data;
};

class Categories extends React.Component {
  componentWillMount() {
    this.props.dispatch(getCatDataFromBackground());
  }

  componentDidMount() {
    if (this.props.catData !== 'no catData') {
      const el = ReactDom.findDOMNode(this);
      d3PieChart.create(el, this.props.catData);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.catData === 'no catData' && nextProps.catData !== 'no catData') {
      const el = ReactDom.findDOMNode(this);
      d3PieChart.create(el, nextProps.catData);
      return true;
    }
    return false;
  }

  handleRefreshCatDataChart() {
    const el = ReactDom.findDOMNode(this);
    d3PieChart.update(el, this.props.catData);
  }

  render() {
    return (
      <div id="catDataChart">
        <button id="refreshCatDataChart" className="btn btn-primary btn-small" onClick={this.handleRefreshCatDataChart.bind(this)}>Start Over</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    catData: state.catData,
    timecatDataLastFetched: state.timecatDataLastFetched,
  };
};

export default connect(mapStateToProps)(Categories);