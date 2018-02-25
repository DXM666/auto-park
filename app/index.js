import { AppRegistry } from 'react-native';
import App from './App';
import { StackNavigator } from "react-navigation";
import { StartPage } from "./StartPage";

const SimpleApp = StackNavigator({
    Home: { screen: StartPage },
    HomePage: { screen: App }
})

AppRegistry.registerComponent('app', () => SimpleApp);
