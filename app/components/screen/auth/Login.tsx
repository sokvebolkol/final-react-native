import React from 'react';
import { View, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../..";
import { color, spacing, typography } from "../../../theme";
import TelInput from './TelInput';

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

export const Login = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          leftIcon="back"
          onLeftPress={goBack}
          />
      </Screen>
      <View style={BODY}>
        <Text style={BODY_TITLE} tx="login.enter-phone-number" />
        <TelInput />
        <View style={BUTTON}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
          // onPress={nextScreen}
          />
        </View>
      </View>
    </View>
  )
});

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginHorizontal: spacing[2],
  backgroundColor: color.palette.deepPurple,
  borderRadius: 15

}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const BODY: ViewStyle = {
  flex: 2,
  backgroundColor: color.background,
  borderRadius: 40,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const BODY_TITLE: TextStyle = {
  fontSize: 16,
  lineHeight: 50,
  textAlign: "center",
  color: color.dim
}

const BUTTON: TextStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 50,
}
