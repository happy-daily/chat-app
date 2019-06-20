import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import images from '../resource/images';
import {WINDOW_WIDTH} from "../constant/PlatformConstant";

export default class ExploreRoomItem extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    title: 'hello',
    data: []
  };

  static propTypes = {

  };

  renderChatRoom() {
    const content = this.props.data.map((item) => {
      return (
        <TouchableOpacity
          style={{
            borderRadius: 8,
            paddingHorizontal: 5,
            paddingTop: 5,
            marginHorizontal: 3,
            marginVertical: 5,
            width: WINDOW_WIDTH/2 - 11,
            height: 150,
          }}
        >
          <Image
            style={{
              resizeMode: 'stretch',
              position: 'absolute',
              width: WINDOW_WIDTH/2 - 11,
              height: 150,
              borderRadius: 8,
            }}
            source={images.bg_store}
          />
          <View style={{
            position: 'absolute',
            width: WINDOW_WIDTH/2 - 11,
            height: 150,
            borderRadius: 8,
            backgroundColor: '#00000020'
          }}/>
          <View syle={{  }}>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>{item.status}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35 }}>
            <Image
              source={images.ic_delete}
              style={{ width: 25, height: 25, borderWidth: 2, borderRadius: 25/2, borderColor: 'tomato' }}
            />
            <View style={{ width: 80, height: 20, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 1/2, borderColor: '#ffffff', borderRadius: 16/2 }}>
                  <Image
                    source={images.ic_delete}
                    style={{ width: 15, height: 15, resizeMode: 'stretch' }}
                  />
                </View>
                <View style={{ borderWidth: 1/2, borderColor: '#ffffff', borderRadius: 15/2, marginLeft: -5 }}>
                  <Image
                    source={images.ic_delete}
                    style={{ width: 15, height: 15, resizeMode: 'stretch' }}
                  />
                </View>
                <View style={{ borderWidth: 1/2, borderColor: '#ffffff', borderRadius: 15/2, marginLeft: -5 }}>
                  <Image
                    source={images.ic_delete}
                    style={{ width: 15, height: 15, resizeMode: 'stretch' }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <View style={{ width: 5, height: 5, borderRadius: 5/2, backgroundColor: 'green' }}/>
                <Text style={{ marginLeft: 5, color: '#ffffff' }}>{item.numPeople}</Text>
              </View>
            </View>
          </View>
          <View style={{
            backgroundColor: '#ffffff',
            height: 23,
            width: WINDOW_WIDTH/2 - 11,
            position: 'absolute',
            marginHorizontal: -5,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingLeft: 5,
            bottom: 0,
            left: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image
              style={{ width: 13, height: 13 }}
              source={item.topicImg}
            />
            <Text style={{ marginLeft: 8, fontSize: 12 }}>{item.topic}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {content}
      </View>
    )
  }

  renderBottom() {
    return (
      <View
        style={{
          height: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 25 / 2,
          backgroundColor: '#ffffff80',
          marginVertical: 10
        }}
      >
        <TouchableOpacity>
          <Text style={{ color: '#ffffff80', fontSize: 14 }}>See All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: '#ffffff80', fontSize: 14 }}>Refresh</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const title = this.props.title;
    const data  = this.props.data;
    return (
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', marginLeft: 3 }}>{title}</Text>
        {this.renderChatRoom()}
        {this.renderBottom()}
      </View>
    )
  }
}
