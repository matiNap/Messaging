import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  GiftedChat,
  MessageText,
  Message,
} from 'react-native-gifted-chat';
import Bubble from './components/Bubble';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import Input from '_components/Input';
import BottomInput from './components/BottomInput';
import ChatHeader from './components/ChatHeader';

class Chat extends Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text:
            'My messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          isTyping: true,
          user: {
            _id: 2,
            name: 'React Native',
            avatar:
              'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble = props => {
    return <Bubble {...props} />;
  };

  renderMessageText = props => {
    return (
      <MessageText {...props} customTextStyle={styles.textStyle} />
    );
  };

  renderFooter = props => {
    return (
      <View style={styles.isTypingBubble}>
        <Text style={styles.isTypingText}>...</Text>
      </View>
    );
  };

  renderInput = props => {
    return <BottomInput {...props} />;
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="height"
        style={{ flex: 1 }}
      >
        <ChatHeader name="Mateusz" displayName="mati579" />
        <GiftedChat
          renderBubble={this.renderBubble}
          messagesContainerStyle={styles.messagesContainerStyle}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderMessageText={this.renderMessageText}
          renderTime={() => <View />}
          renderFooter={this.renderFooter}
          user={{
            _id: 1,
          }}
          renderInputToolbar={this.renderInput}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  messagesContainerStyle: {
    backgroundColor: palette.secondary,
    paddingHorizontal: metrics.padding.normal,
  },
  textStyle: {
    color: palette.text.primary,
    fontSize: typography.fontSize.normal,
  },
  isTypingBubble: {
    flexDirection: 'row',
    backgroundColor: palette.grayscale.light,
    borderRadius: 50,
    justifyContent: 'center',
    width: '15%',
    marginLeft: '12.6%',
    marginBottom: metrics.margin.normal,
  },
  isTypingText: {
    color: palette.text.primary,
    fontSize: typography.fontSize.big,
  },
});

export default Chat;
