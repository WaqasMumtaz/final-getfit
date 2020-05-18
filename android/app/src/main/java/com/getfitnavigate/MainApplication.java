package com.getfitnavigate;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

// Added New Files 
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactnative.googlefit.GoogleFitPackage;
import com.sensormanager.SensorManagerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.sha1lib.Sha1Package;
import com.horcrux.svg.SvgPackage;
//import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.filepicker.FilePickerPackage;
import com.rnfs.RNFSPackage;
import com.kevinresol.react_native_sound_recorder.RNSoundRecorderPackage;
import com.imagepicker.ImagePickerPackage;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;  
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import io.invertase.firebase.admob.RNFirebaseAdMobPackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      
      // Added new packeges
          //  new SplashScreenReactPackage(),
          //  new RNFirebasePackage(),
          //   //new AsyncStoragePackage()
            // new GoogleFitPackage(BuildConfig.APPLICATION_ID),
            // new SensorManagerPackage(),
          //   new ReactVideoPackage(),
          //   new Sha1Package(),
          //   new SvgPackage(),
          //   //new RNFileViewerPackage(),
          //   new FilePickerPackage(),
          //  new RNFSPackage(),
          //   new RNSoundRecorderPackage(),
          //   // new RNFirebaseAdMobPackage(),
          //   new AsyncStoragePackage(),
          //   new ImagePickerPackage(),
            // new RNFirebaseMessagingPackage(),
            // new RNFirebaseNotificationsPackage()
        // end
        // packages.add(new SensorManagerPackage())
        // packages.add(new GoogleFitPackage(BuildConfig.APPLICATION_ID));
        // packages.add(new RNFirebasePackage());
        packages.add(new RNFirebaseNotificationsPackage());
        packages.add(new RNFirebaseMessagingPackage());
        // package.add(new RNFirebaseNotificationsPackage());
       return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
