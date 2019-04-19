import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import {toJS} from 'mobx';
import { observer } from 'mobx-react/native';
import { ExploreRoomItem } from '../../../components';
import ExploreScreenStore from "./ExploreScreenStore";

@observer
export default class ExploreScreen extends Component {

  constructor(props) {
    super(props);
    this.stateStore = new ExploreScreenStore();
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item, index }) {
    return (
      <ExploreRoomItem
        title={item.title}
        data={item.data}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#003B80' }}>
        <FlatList
          style={{ marginTop: 50,}}
          data={toJS(this.stateStore.itemData)}
          initialNumToRender={10}
          keyExtractor={(item) => `${item.key}`}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
