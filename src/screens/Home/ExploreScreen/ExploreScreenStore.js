import { observable, action } from 'mobx';
import images from '../../../resource/images';

export default class ExploreScreenStore {
  @observable itemData = [{
    title: 'BOOKS',
    data:[{
      title: 'hahaha',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Warriors',
      topicImg: images.ic_delete,
    },{
      title: 'hahaha',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Warriors',
      topicImg: images.ic_delete,
    },{
      title: 'hahaha',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Warriors',
      topicImg: images.ic_delete,
    },{
      title: 'hahaha',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Warriors',
      topicImg: images.ic_delete,
    }]
  }, {
    title: 'ART',
    data: [{
      title: 'Random',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Marvel',
      topicImg: images.ic_delete,
    },{
      title: 'Random',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Marvel',
      topicImg: images.ic_delete,
    },{
      title: 'Random',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Marvel',
      topicImg: images.ic_delete,
    },{
      title: 'Random',
      status: 'ACTIVE',
      roomBg: images.bg_store,
      numPeople: 9,
      hostAvatar: images.ic_delete,
      topic: 'Marvel',
      topicImg: images.ic_delete,
    }]
  }];
}
