export const GET_INGREDIENT_DETALS = "GET_INGREDIENT_DETALS";
export const DELETE_INGREDIENT_DETALS = "DELETE_INGREDIENT_DETALS";

export function getIngredientDetals(item) {
  return {
    type: GET_INGREDIENT_DETALS,
    data: item,
  };
}

export function deleteIngredientDetals() {
  return {
    type: DELETE_INGREDIENT_DETALS,
  };
}
