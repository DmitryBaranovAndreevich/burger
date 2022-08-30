import { IIngredient } from "./data";

export const ingredientsArrayHandler = (ingredientsArray: Array<string>, allIngredients: Array<IIngredient>) => {
  const ingredientsCount = ingredientsArray?.reduce((priv: {[name: string]: number}, ingr) => {
    return { ...priv, [ingr]: ingr in priv ? priv[ingr] + 1 : 1 };
  }, {});

  

  const ingredientsList =
    !!ingredientsCount &&
    Object.keys(ingredientsCount).map((el) =>
      allIngredients.find((card) => card._id === el)
    );

  const price =
    !!ingredientsList &&
    ingredientsList.reduce((priv : number, el) => {
      return el?.type === "bun"
        ? priv + el?.price * 2
        : priv + (el?.price as number) * ingredientsCount[(el?._id as string)];
    }, 0);

  return { ingredientsCount, ingredientsList, price };
};
