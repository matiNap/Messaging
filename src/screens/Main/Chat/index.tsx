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
  Send,
} from 'react-native-gifted-chat';
import Bubble from './components/Bubble';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import Input from '_components/Input';
import ChatHeader from './components/ChatHeader';
import Touchable from '_components/Touchable';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { UserChat, Message as MessageType } from '_types';
import { sendMessage, readMessage } from '_actions/creators/chat';
import reactotron from 'reactotronConfig';

interface Props {
  user: UserChat;
  readMessage: typeof readMessage;
  sendMessage: typeof sendMessage;
  messages: MessageType[];
  navigation: any;
}

class Chat extends Component<Props> {
  componentDidMount() {
    const { user } = this.getParms();
    this.props.readMessage(user.uid);
  }

  getParms = () => {
    return this.props.navigation.state.params;
  };

  onSend(message: any) {
    const { text } = message[0];
    const { user } = this.getParms();
    this.props.sendMessage(text, user.uid);
  }

  renderBubble = (props: any) => {
    const { currentMessage } = props;
    return <Bubble key={currentMessage.iid} {...props} />;
  };

  renderMessageText = (props: any) => {
    return (
      <MessageText
        {...props}
        customTextStyle={{
          fontSize: typography.fontSize.small,
          fontFamily: typography.fonts.primary,
        }}
        textStyle={{
          left: { color: palette.text.primary },
          right: {
            color: palette.text.secondary,
          },
        }}
      />
    );
  };

  renderFooter = (props: any) => {
    const { isTyping } = props;
    if (isTyping) {
      return (
        <View style={styles.isTypingBubble}>
          <Text style={styles.isTypingText}>...</Text>
        </View>
      );
    } else {
      return <View />;
    }
  };

  renderInput = props => {
    return <BottomInput {...props} />;
  };

  renderSend = props => {
    const { onSend, text, isTyping } = props;

    return (
      <Touchable
        onPress={() => {
          if (text && onSend) {
            onSend({ text: text.trim() }, true);
          }
        }}
        style={{ margin: 5 }}
      >
        <MaterialIcons name="send" style={styles.sendIcon} />
      </Touchable>
    );
  };

  renderActions = () => {
    return (
      <Touchable style={{ padding: 5 }}>
        <SimpleLineIcons name="emotsmile" style={styles.icon} />
      </Touchable>
    );
  };

  render() {
    const { messages } = this.props;

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
          messages={messages}
          onSend={messages => this.onSend(messages)}
          renderMessageText={this.renderMessageText}
          renderTime={() => <View />}
          renderFooter={this.renderFooter}
          renderSend={this.renderSend}
          user={{
            _id: 1,
          }}
          renderActions={this.renderActions}
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
  sendIcon: {
    color: palette.primary,
    fontSize: 30,
  },
  icon: {
    color: palette.text.primary,
    fontSize: 30,
  },
});

const mapStateToProps = (state: RootState, ownProps: Props) => {
  const { uid } = ownProps.navigation.state.params.user;
  console.log(uid);
  return {
    messages: state.chat.chats[uid].messages.reverse(),
  };
};

export default connect(mapStateToProps, { sendMessage, readMessage })(
  Chat,
);
