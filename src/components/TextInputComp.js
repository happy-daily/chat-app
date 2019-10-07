import React, { Component } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, View } from 'react-native';

type Props = {
  onChangeText: (text: string) => void,
  placeholder: string,
  style: any,
};

type State = {
  text: string
};

export default class TextInputComp extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  render() {
    const {
      style,
      placeholder,
      onChangeText,
    } = this.props;
    return (
      <View style={{
        height: 50,
        width: '100%',
        ...style,
      }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            borderRadius: 5,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#333333',
          }}
        >
          <TextInput
            placeholder={placeholder}
            value={this.state.text}
            onChangeText={(text: string) => {
              this.setState({
                text,
              });
              onChangeText && onChangeText(text);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
