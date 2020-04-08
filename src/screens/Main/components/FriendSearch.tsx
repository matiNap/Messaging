import React from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Input from '_components/Input';
import { View } from 'native-base';
import metrics from '_metrics';
import { FontAwesome } from '@expo/vector-icons';
import palette from '_palette';
import typography from '_typography';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onChangeText?(text: string): Function;
  onFocus?: NativeSyntheticEvent<TextInputFocusEventData>;
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
  const { navigate } = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate('searchFriend');
      }}
    >
      <View style={styles.inputContainer} pointerEvents="none">
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
    </TouchableWithoutFeedback>
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
