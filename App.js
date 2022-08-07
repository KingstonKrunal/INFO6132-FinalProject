import { Provider } from "react-redux";
import RootNavigation from './app/navigation/RootNavigation';
import store from "./app/redux/stores";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
