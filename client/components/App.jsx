import React from 'react';
import Topbar from './Topbar.jsx';
import MainContent from './MainContent.jsx';
import Sidebar from './Sidebar.jsx';
import Cards from './Cards.jsx';
import Pagination from './Pagination.jsx';
import GlobalStyles from '../globalStyles.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      swatches: [],
      currentPage: 1,
      totalPages: 1,
      view: 'grid'
    }
  }

  componentDidMount() {
    axios.get('/swatches', {
      params: {
        page: this.state.currentPage
      }
    })
      .then((res) => {
        console.log(res)
        this.setState({ swatches: res.data.swatches, totalPages: res.data.pages });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleChangePage(e) {
    const clickedPage = e.target.innerText;

    axios.get('/swatches', {
      params: {
        page: clickedPage
      }
    })
      .then((res) => {
        console.log(res)
        this.setState({ swatches: res.data.swatches, totalPages: res.data.pages });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="wrapper">
        <Topbar />
        <div id="main">
          <MainContent
            swatches={this.state.swatches}
            totalPages={this.state.totalPages}
            handleChangePage={this.handleChangePage.bind(this)}
          />
          <Sidebar />
        </div>
      </div>

    )
  }
}

export default App;