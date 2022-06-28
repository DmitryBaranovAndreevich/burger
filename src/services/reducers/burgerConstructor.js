import {
  GET_ITEMS_BURGER_CONSTRUCTOR,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CHANGE_INGREDIENT,
  SORT_INGREDIENTS,
  SET_CURRENT_CARD,
} from "../actions/burgerConstructor";

const ingredients = {
  constructorItems: [],
  constructorItemsFailed: true,
  currentCard: {}
};

export const burgerConstructorReducer = (state = ingredients, action) => {
  switch (action.type) {
    case GET_ITEMS_BURGER_CONSTRUCTOR:
      return {
        ...state,
        constructorItems: [...state.constructorItems,{...action.data, count: action.data.type==='bun'?2:1, order: state.constructorItems.length}],
        constructorItemsFailed: false,
      };
    
    case INCREASE_COUNT: 
    return {  
      ...state,
      constructorItems: state.constructorItems.map(element => {
        if(element._id === action.data._id){
        return { ...element, count: element.count + 1};
        }
        return element
      })
    };
    case DECREASE_COUNT: 
    if (action.data.count === 1) {
      return {
        ...state,
        constructorItems: state.constructorItems.filter((element) => element._id !== action.data._id)
      };
    }
      return {
        ...state,
        constructorItems: state.constructorItems.map((element) => {
          if (element._id === action.data._id) {
            return { ...element, count: element.count - 1 };
          }
          return element;
        }),
      };

      case CHANGE_INGREDIENT: 
      return {
        ...state,
        constructorItems: state.constructorItems.map((element) =>{ 
          if(element.type==='bun') return {
            ...action.data,
            count: 2
          }
          return  element
        })
      };
      case SET_CURRENT_CARD:
        return {
          ...state,
          currentCard: action.data
        };
      case SORT_INGREDIENTS:
        return {
          ...state,
          constructorItems: [...action.newList]
        }

    default:
      return state;
  }  
};
