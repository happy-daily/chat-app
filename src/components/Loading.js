import React, { Component } from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
} from 'react-native';

type Props = {
  visible: boolean,
};

type State = {

};

export default class Loading extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      visible,
    } = this.props;
    return (
      <Modal
        transparent
        visible={visible}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="large"
          />
        </View>
      </Modal>
    );
  }
}
