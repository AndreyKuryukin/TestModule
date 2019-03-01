package com.testmodule;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HelloManager extends ReactContextBaseJavaModule {

    public HelloManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "HelloManager";
    }

    @ReactMethod
    public void greetUser(String name, Boolean isAdmin, Callback callback) {
        String result = "User name: " + name + ", Admin: " + (isAdmin ? "Yes" : "No");
        System.out.println(result);
        callback.invoke(result);
    }
}