import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  NativeScrollEvent,
} from 'react-native';
import { GiftedChat, MessageText } from 'react-native-gifted-chat';
import Bubble from './components/Bubble';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import ChatHeader from './components/ChatHeader';
import Touchable from '_components/Touchable';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { UserChat, Message as MessageType } from '_types';
import {
  sendMessage,
  readMessage,
  fetchChatOnScroll,
} from '_actions/creators/chat';

interface Props {
  user: UserChat;
  readMessage: typeof readMessage;
  sendMessage: typeof sendMessage;
  fetchChatOnScroll: typeof fetchChatOnScroll;
  messages: MessageType[];
  navigation: any;
}

const isCloseToTop = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  return (
    parseInt(contentOffset.y) ===
    parseInt(contentSize.height - layoutMeasurement.height)
  );
};

class Chat extends Component<Props> {
  state = {
    fetchedOnScroll: false,
  };

  componentDidMount() {
    const { user } = this.getParms();
    this.props.readMessage(user.uid);
  }

  getParms = () => {
    return this.props.navigation.state.params;
  };

  onSend(messages: any) {
    const { text, _id } = messages[0];
    const { user } = this.getParms();

    this.props.sendMessage(text, user.uid, _id);
  }

  renderBubble = (props: any) => {
    return <Bubble key {...props} />;
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
    const { onSend, text } = props;

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

  onScroll = ({
    nativeEvent,
  }: {
    nativeEvent: NativeScrollEvent;
  }) => {
    const {
      layoutMeasurement,
      contentOffset,
      contentSize,
    } = nativeEvent;
    const { fetchedOnScroll } = this.state;
    const { uid } = this.props.user;
    if (
      isCloseToTop({
        layoutMeasurement,
        contentOffset,
        contentSize,
      }) &&
      !fetchedOnScroll
    ) {
      this.props.fetchChatOnScroll(uid);
    }
  };

  render() {
    const { user } = this.getParms();
    const { messages } = this.props;
    return (
      <KeyboardAvoidingView
        enabled
        behavior="height"
        style={{ flex: 1 }}
      >
        <ChatHeader
          name={user.fname}
          displayName={user.displayName}
        />
        <GiftedChat
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: this.onScroll,
          }}
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

  const currentChat = state.chat.chats ? state.chat.chats[uid] : null;
  return {
    messages:
      currentChat && currentChat.messages ? currentChat.messages : [],
    user: currentChat && currentChat.user ? currentChat.user : {},
  };
};

export default connect(mapStateToProps, {
  sendMessage,
  readMessage,
  fetchChatOnScroll,
})(Chat);
