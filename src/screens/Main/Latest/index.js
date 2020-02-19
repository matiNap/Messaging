import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { List } from 'native-base';
import Header from '../components/Header';
import Input from '_components/Input';
import palette from '_palette';
import { Container } from 'native-base';
import metrics from '_metrics';
import typography from '_typography';
import { FontAwesome } from '@expo/vector-icons';

class Latest extends Component {
  renderSearchIcon = () => {
    return (
      <FontAwesome
        name="search"
        color={palette.grayscale.dark}
        size={22}
      />
    );
  };
  render() {
    return (
      <Container>
        <List>
          <Header title="Chat" iconName="settings" />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Search"
              style={styles.inputStyle}
              placeholderColor={palette.grayscale.dark}
              textInputStyle={{
                fontSize: typography.fontSize.medium,
              }}
              rightIcon={this.renderSearchIcon}
              noOutlined
            />
          </View>
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    marginTop: metrics.margin.normal,
  },
  inputStyle: {
    width: '85%',
    backgroundColor: palette.grayscale.light,
  },
});

export default Latest;
