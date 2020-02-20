import React from 'react';
import { StyleSheet } from 'react-native';
import Input from '_components/Input';
import { View } from 'native-base';
import metrics from '_metrics';
import { FontAwesome } from '@expo/vector-icons';
import palette from '_palette';
import typography from '_typography';

interface Props {
  onChangeText(text: string): Function;
}

const renderSearchIcon = () => {
  return (
    <FontAwesome
      name="search"
      color={palette.grayscale.dark}
      size={22}
    />
  );
};

const FriendSearch = (props: Props) => {
  const { onChangeText } = props;
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder="Search"
        style={styles.inputStyle}
        placeholderColor={palette.grayscale.dark}
        textInputStyle={{
          fontSize: typography.fontSize.medium,
        }}
        rightIcon={renderSearchIcon}
        noOutlined
        onChangeText={(text: string) => {
          onChangeText(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    marginTop: metrics.margin.normal,
  },
  inputStyle: {
    width: '92%',
    backgroundColor: palette.grayscale.light,
  },
});

export default FriendSearch;
