import React, { useState, useRef  } from "react";
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

const TelInput: React.FC = () => {

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView>

          <View style={{ alignItems:'center'}}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="KH"
            layout="first"
            withShadow={false}
            textInputProps={{
              keyboardType:"numeric"
            }}
            onChangeText={(text) => {
              setValue(text);
            }}
            // onChangeFormattedText={(text) => {
            //   setFormattedValue(text);
            // }}
            // withDarkTheme
            autoFocus
          />
          </View>
          </KeyboardAvoidingView>

    </>
  );
};

export default TelInput;
