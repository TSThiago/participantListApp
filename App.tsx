import { StatusBar } from "react-native";
import { Home } from "./src/screens/Home";

const App = () => {
  return (
    <>
      <StatusBar 
      barStyle="light-content"
      translucent
      />
      <Home />
    </>
  );
};

export default App;