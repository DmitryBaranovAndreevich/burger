// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useHistory,
//   useLocation,
//   useParams
// } from "react-router-dom";

// import Modal from "../components/modal/modal";
// import IngredientDetails from '../components/ingredientDetails/IngredientDetails';
// import OrderDetails from "../components/orderDetails/orderDetails";
// import Spinner from "../components/spinner/spinner";

// export default function ModalGalleryExample() {
//   return (
//     <Router>
//       <ModalSwitch />
//     </Router>
//   );
// }

// function ModalSwitch() {
//   let location = useLocation();

//   // This piece of state is set when one of the
//   // gallery links is clicked. The `background` state
//   // is the location that we were at when one of
//   // the gallery links was clicked. If it's there,
//   // use it as the location for the <Switch> so
//   // we show the gallery in the background, behind
//   // the modal.
//   let background = location.state && location.state.background;

//   return (
//     <div>
//       <Switch location={background || location}>
//         <Route path="/ingredients/:id" children={<IngredientDetails />} />
//       </Switch>
//       </div>)
// }