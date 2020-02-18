import React, { CSSProperties } from 'react';
import {
  Container,
  Item,
  Input as BaseInput,
  View,
} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import palette from '_palette';
import { StyleSheet } from 'react-native';
import metrics from '_metrics';
import typography from '_typography';

interface Props {
  onChangeText(text: string): void;
  value?: string;
  type?: 'none' | 'emailAddress' | 'name' | 'password';
  placeholder?: string | '';
  style: CSSProperties;
  secondary: boolean;
  primary: boolean;
  secureTextEntry: boolean;
  textInputStyle: CSSProperties;
}

const Input = (props: Props) => {
  const {
    placeholder,
    style,
    type,
    secureTextEntry,
    textInputStyle,
    secondary,
    onChangeText,
    value,
  } = props;
  const borderColor = secondary ? palette.secondary : palette.primary;
  const color = secondary
    ? palette.text.secondary
    : palette.grayscale.medium;
  return (
    <View style={[styles.container, { borderColor }, style]}>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        textContentType={type}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.textInput, { color }, textInputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: palette.primary,
    borderWidth: 2,
    borderRadius: metrics.borderRadius.medium,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: typography.fontSize.normal,
    padding: 5,
    marginLeft: metrics.margin.small,
    flexGrow: 2,
  },
});

export default Input;
