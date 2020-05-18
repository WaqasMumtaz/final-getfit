import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../Components/screens/Login';
import Signup from '../Components/screens/SignUp';
import ResetpasswordScreen from '../Components/screens/ResetPasswrd';
import ConfirmResetPassword from '../Components/screens/CheckResetPasswrd';
import BottomTabe from './tabNav';
import Setupscreen1 from '../Components/screens/SetUpScreen1';
import Setupscreen from '../Components/screens/SetUpScreen';
import AddExercise from '../Components/screens/AddExercise';
import Exerciselog from '../Components/screens/ExerciseLog';
import LogMeasurementsScreen from '../Components/screens/LogMeasurements';
import ShowMeasurementsScreen from '../Components/screens/ShowMeasurements';
import Macrocalculator from '../Components/screens/MacroCalculator';
import SettingScreen from '../Components/screens/Setting';
import BMICalculator from '../Components/screens/CalculateBMI';
import Profile from '../Components/screens/ProfilScreen';
import Payment from '../Components/screens/PaymentScreen';
import Invoices from '../Components/screens/InvoicesScreen';
import Chatscreen from '../Components/screens/Chat';
import StepCountScreen from '../Components/screens/StepCountScreen';
import PackagesScreen from '../Components/screens/Packages';
import EditProfileScreen from '../Components/screens/EditableProfileScreen';



const MainNavigator = createStackNavigator({
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    ResetpasswordScreen: {
      screen: ResetpasswordScreen
    },
    ConfirmResetPassword:{
         screen:ConfirmResetPassword
    },
    BottomTabe: {
        screen: BottomTabe,
        navigationOptions: {
          header: null,
        }
      },
        Setupscreen1: {
    screen: Setupscreen1
  },
  StepCountScreen: {
    screen: StepCountScreen
  },
  Setupscreen: {
    screen: Setupscreen
  },
  ChatBox: {
    screen: Chatscreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  PackagesScreen: {
    screen: PackagesScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
      AddExercise: {
        screen: AddExercise,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      Macrocalculator: {
        screen: Macrocalculator,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      
      LogMeasurementsScreen: {
        screen: LogMeasurementsScreen,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      ShowMeasurementsScreen: {
        screen: ShowMeasurementsScreen,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      Exerciselog: {
        screen: Exerciselog,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      BMICalculator: {
        screen: BMICalculator,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },
      Payment:{
      screen:Payment,
      navigationOptions: {
        headerStyle: {
          elevation: 0,
        }
      }
      },
      Invoices:{
       screen:Invoices,
       navigationOptions: {
        headerStyle: {
          elevation: 0,
        }
      }
      },
      SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
          headerStyle: {
            elevation: 0,
          }
        }
      },  
});

const App = createAppContainer(MainNavigator);

export default App;