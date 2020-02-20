import React, { CSSProperties } from 'react';
import { View } from 'native-base';
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
  noOutlined: boolean;
  secureTextEntry: boolean;
  textInputStyle: CSSProperties;
  color?: string | undefined;
  placeholderColor: string;
  rightIcon: React.Component;
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
        placeholderTextColor={placeholderColor}
        value={value}
        secureTextEntry={secureTextEntry}
        textContentType={type}
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
  },
  rightIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: metrics.margin.normal,
  },
});

export default Input;
