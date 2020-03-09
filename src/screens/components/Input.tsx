import React, { CSSProperties } from 'react';
import { View } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import palette from '_palette';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import metrics from '_metrics';
import typography from '_typography';

interface Props {
  onChangeText(text: string): void;
  value?: string;
  type?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  placeholder?: string | '';
  style: CSSProperties;
  secondary: boolean;
  primary: boolean;
  noOutlined: boolean;
  secureTextEntry: boolean;
  textInputStyle: CSSProperties;
  color?: string | undefined;
  placeholderColor: string;
  rightIcon: React.Component;
  autoCapitalize?: 'none' | 'words' | 'letters' | 'characters';
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
    noOutlined,
    color,
    placeholderColor,
    autoCapitalize,
  } = props;
  const borderColor = secondary ? palette.secondary : palette.primary;
  const customContainerStyle = {
    borderColor: noOutlined ? null : borderColor,
    borderWidth: noOutlined ? 0 : 2,
  };
  const inputThemeColor = secondary
    ? palette.text.secondary
    : palette.grayscale.medium;
  const inputColor = color ? color : inputThemeColor;
  const RightIcon = props.rightIcon;
  return (
    <View style={[styles.container, customContainerStyle, style]}>
      {RightIcon && (
        <View style={styles.rightIcon}>
          <RightIcon />
        </View>
      )}
      <TextInput
        keyboardType=""
        placeholderTextColor={placeholderColor}
        value={value}
        secureTextEntry={secureTextEntry}
        textContentType="username"
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          styles.textInput,
          textInputStyle,
          { color: inputColor },
          { color },
        ]}
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
    color: palette.text.primary,
  },
  rightIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: metrics.margin.normal,
  },
});

export default Input;
