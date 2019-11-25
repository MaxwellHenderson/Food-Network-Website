'use strict';

import React, {Component} from 'react';
import NavBar from './NavBar.js';
import SideBar from './SideBar.js';
import CardList from './CardList.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      foodItems: [
        {
          name: 'Sushi',
          imgUrl: 'imgs/makisushi.jpg'
        },
        {
          name: 'Pizzatime',
          imgUrl: 'imgs/itsapizza.jpg'
        },
        {
          name: 'Sausages',
          imgUrl: 'imgs/Sausages_large.jpg'
        },
        {
          name: 'Lasagna',
          imgUrl: 'imgs/lasagna.jpg'
        },
        {
          name: 'Mondays',
          imgUrl: 'imgs/lasagna.jpg'
        },
        {
          name: 'Taco Tuesday!',
          imgUrl: 'imgs/tacos.jpg'
        },  
        {
          name: 'Mmmmmm, Ramen!',
          imgUrl: 'imgs/ramen.jpg'
        },
        {
            name: 'Sushi',
          imgUrl: 'imgs/makisushi.jpg'
        },
        {
          name: 'Not pho',
          imgUrl: 'imgs/ramen.jpg'
        },
        {
          name: 'Sushi',
          imgUrl: 'imgs/makisushi.jpg'
        },
        {
          name: 'Give me the sauce',
          imgUrl: 'imgs/Sausages_large.jpg'
        },
        {
          name: 'Pizza',
          imgUrl: 'imgs/itsapizza.jpg'
        }
        ,
        {
          name: 'Taco Tuesday!',
          imgUrl: 'imgs/tacos.jpg'
        },  
        {
          name: 'Mmmmmm, Ramen!',
          imgUrl: 'imgs/ramen.jpg'
        },
        {
            name: 'Sushi',
          imgUrl: 'imgs/makisushi.jpg'
        },
        {
          name: 'Not pho',
          imgUrl: 'imgs/ramen.jpg'
        }
      ]
    }
  }


  render() {
    return (
      <div className="App">
        <NavBar />
        <SideBar />
        <CardList foodItems={this.state.foodItems} />
      </div>
    );
  }
}

export default App;
