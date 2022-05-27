import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import BurgerIngredients from "../burgerIngredients/burgerIngredients.jsx";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";

class App extends React.Component {
  render() {
    return (
      <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
        <AppHeader />
        <div className={appStyles.main}>
          <BurgerIngredients cards={this.props.data} />
          <BurgerConstructor data={this.props.dataBurgerConstructor} />
        </div>
      </div>
    );
  }
}

export default App;
