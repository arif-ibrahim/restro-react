import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {

    const orderIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return(
                <li>{igKey}: {props.ingredients[igKey]}</li>
            )
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients...</p>
            <ul>
                {orderIngredients}
            </ul>
            <p><strong>Total price: {props.totalPrice}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummery;