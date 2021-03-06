package com.reactnativesuperapptemplate;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.reactlibrary.SuperReactActivity;

import java.util.List;

public class MainActivity extends SuperReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeSuperAppTemplate";
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return ((MainApplication) this.getApplication()).getPackageList();
    }
}
