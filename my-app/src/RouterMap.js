import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import Home from './modules/Home'
import About from './modules/About'
import './RouterMap.css';
import Button from 'react-bootstrap/lib/Button';


class RouterMap extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul className="tab">
            <li><Link to="/"><Button bsStyle="info">首页</Button></Link></li>
            <li><Link to="/about"><Button bsStyle="info">关于</Button></Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default RouterMap;



