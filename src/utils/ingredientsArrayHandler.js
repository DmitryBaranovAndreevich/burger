export const ingredientsArrayHandler = (ingredientsArray, allIngredients) => {
  const ingredientsCount = ingredientsArray.reduce((priv, ingr) => {
    return { ...priv, [ingr]: ingr in priv ? priv[ingr] + 1 : 1 };
  }, {});

  const ingredientsList =
    !!ingredientsCount &&
    Object.keys(ingredientsCount).map((el) =>
      allIngredients.find((card) => card._id === el)
    );

  const price =
    ingredientsList &&
    ingredientsList.reduce((priv, el) => {
      return el.type === "bun"
        ? priv + el.price * 2
        : priv + el.price * ingredientsCount[el._id];
    }, 0);

    return { ingredientsCount, ingredientsList, price };
}