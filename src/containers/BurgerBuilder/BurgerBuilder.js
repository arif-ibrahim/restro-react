import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};


class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4.0,
        purchasing: false,
        // isOrderDisable: false,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    orderStatus(){
        const updatedIngredients = {...this.state.ingredients};
        const totalIngrAmnt = Object.keys(updatedIngredients)
            .map((ingKey) => {
                 return updatedIngredients[ingKey];
            })
            .reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            })
        if (totalIngrAmnt <= 0){
            return true;
        }
        else {
            return false;
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true,});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }
    
    render(){
        const isOrderDisable = this.orderStatus();
        const disabledIngredients = {
            ...this.state.ingredients
        };
        for (let key in disabledIngredients){
            if (disabledIngredients[key] <= 0){
                disabledIngredients[key] = true;
            }
            else {
                disabledIngredients[key] = false;
            }
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    <OrderSummery ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>

                <BuildControls ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledIngredient={disabledIngredients}
                    totalPrice={this.state.totalPrice}
                    isOrderDisable={isOrderDisable}
                    purchaseHandler={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;