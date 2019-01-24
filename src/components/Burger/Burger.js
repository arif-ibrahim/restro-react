import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
                return <BurgerIngredient key={igkey + i} type={igkey} />;
            });
        })
        .reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue)
        },[]);
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>start adding ingredients</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
}

export default burger;