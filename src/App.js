import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import logo from './logo.svg';
import './App.css';

// const Headline = () => {
//   return(
//     <h1>Hello World</h1>
//   )
// }

// const Greetings = (props) => {
//   const {name, age} = props;
//   return (
//     <p>Surprise Motherfucker {name}! {age}</p>
   
//   )
// }

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      buyItems: ['milk', 'bread', 'fruit'],
      message: ''
    }
  }

addItem(e){
  //Pour que le formulaire ne provoque pas un refresh de la page
  e.preventDefault();
  //Définition de ce qui constitue l'ancien contenu
  const {buyItems} = this.state;
  //Définition de ce qui constitue la nouvelle valeur
  const newItem = this.newItem.value;

  const isOnTheList = buyItems.includes(newItem);

  if(isOnTheList){
    this.setState({
      message: 'This item is already on the list !'
    })
  }
  else{
    //On pousse le nouveau contenu concaténé
    // Overide buyItems // Ancienne valeur + nouvelle valeur
    //Check que newItem ne soit pas vide
    newItem !== '' && this.setState({
      buyItems: [...this.state.buyItems, newItem],
      message: ''
    })
  }

  
  //On reset le formulaire après la soumission
  this.addForm.reset();
}

removeItem(item){
  const newBuyItems = this.state.buyItems.filter(buyItems => {
    return buyItems !== item;
  })
  this.setState({
    buyItems: [...newBuyItems]
  })

  if(newBuyItems.length === 0){
    this.setState({
      message: 'No items on your list. Add some !'
    })
  }
}

clearAll(){
  this.setState({
    buyItems: [],
    message: 'No items on your list, Add some !'
  })
}

  render() {
    const { buyItems, message } = this.state;
    return(
      <div className="content">

        <header>
            {
              (message !== '' || buyItems.length === 0) && <p className="message text-danger">{message}</p>
            }
            <h1>Shoping list</h1>

          <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
              <input ref={input => this.newItem = input} type="text" placeholder="Bread" className="form-control" id="newItemInput" />
            </div>
            <button type="submit" className="btn btn-primary">add</button>
          </form>
        </header>
        {
        buyItems.length > 0 &&
        <table className="table">
          <caption>Shopping List</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              buyItems.map(item => {
                return(
                  <tr key={item}>
                    <th scope="row">1</th>
                    <td>{item}</td>
                    <td className="text-right">
                      <button onClick={(e) => this.removeItem(item)} type="button" className="btn btn-default btn-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                ) 
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">&nbsp;</td>
              <td className="text-right">
                <button onClick={(e) => this.clearAll()} className="btn btn-default btn-sm">Clear list</button>
              </td>
            </tr>
          </tfoot>
        </table>
        }
      </div>
    )
  }

}


// Greetings.propTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number
// };

export default App;
