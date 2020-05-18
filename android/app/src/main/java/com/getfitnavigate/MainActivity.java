package com.getfitnavigate;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // required for react-native-splash-screen


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        SplashScreen.show(this);
        return "getFitNavigate";
    }
    //Add stepcounter code start here 
//     @Override
//     public void onCreate(Bundle bundle) {
//         super.onCreate(bundle);
//         Boolean can = StepCounterOldService.deviceHasStepCounter(this.getPackageManager());
// /* if the device has a step counter sensor on board, activate a service that uses it */
//         if (!can) {
//             startService(new Intent(this, StepCounterService.class));
//         } else {
// /* otherwise, start up a service that uses the step counter*/
//             startService(new Intent(this, StepCounterOldService.class));
//         }
//     }
}
