<template>
  <div class="page">
    <page-header>
      <header-link :left="true" :edge="true" v-back-link><icon icon="back"></icon>Back</header-link>
      <header-title>{{title}}</header-title>
    </page-header>
    <page-content>
      <list>
        <list-item  v-for="item in musicList" :key="item.id" @click.native="getSongAction(item)">
          <div class="item-media"><img :src="item.img_url" width="88"></div>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title">{{item.title}}</div>
            </div>
            <div class="item-text">
              {{item.artist}}
            </div>
          </div>
        </list-item>
      </list>
    </page-content>


    <actions ref="actions">
      <action-group>
        <action-button @click.native="play()">播放</action-button>
        <action-button @click.native="download()">下载</action-button>
      </action-group>
    </actions>

    <toast text="Done!" ref="t1"></toast>
    <toast text="还没做!" type="error" ref="t2"></toast>
  </div>
</template>

<script>
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import Scroll from '../components/scroll'
import { Header, HeaderLink, HeaderTitle, SecondHeader } from '../components/header'
import Icon from '../components/icons'
import { Actions, ActionButton, ActionGroup } from '../components/actions'
import Toast from '../components/toast'
import api from '../lib/api'
export default {
  components: {
    'page-header': Header,
    'page-content': Content,
    List,
    ListItem,
    Scroll,
    Icon,
    HeaderLink,
    HeaderTitle,
    Actions,
    ActionButton,
    ActionGroup,
    Toast,
  },
  data(){
    return {
      title:'',
      musicList:[],
      list_id:0,
      selectedSong:{}
    }
  },
  beforeMount(){
    this.list_id=this.$route.params.listId;
    this.getMusicList(this.list_id);
  },
  methods: {
    //获得歌单歌曲列表
    getMusicList (list_id) {
      var listId = list_id.split("_").pop();
      var tracks = [];
      var info;
      this.$http.get(api.orderList+'id='+listId).then((result)=>{
          var data = result.data;
          info = {
            'id': 'neplaylist_' + listId,
            'cover_img_url': data.result.coverImgUrl,
            'title': data.result.name,
            'source_url': 'http://music.163.com/#/playlist?id=' + listId,
          };

          for(var track_json of data.result.tracks){
            var default_track = {
              'id': '0',
              'title': '',
              'artist': '',
              'artist_id': 'neartist_0',
              'album': '',
              'album_id': 'nealbum_0',
              'source': 'netease',
              'source_url': 'http://www.xiami.com/song/0',
              'img_url': '',
              'url': ''
            };
            default_track.id = 'netrack_' + track_json.id;
            default_track.title = track_json.name;
            default_track.artist = track_json.artists[0].name;
            default_track.artist_id = 'neartist_' + track_json.artists[0].id;
            default_track.album = track_json.album.name;
            default_track.album_id = 'nealbum_' + track_json.album.id;
            default_track.source_url = 'http://music.163.com/#/song?id=' + track_json.id;
            default_track.img_url = track_json.album.picUrl;
            default_track.url = default_track.id;
            tracks.push(default_track);
          }
          this.musicList=tracks;
          this.title=info.title;
        });
    },
    //获取歌曲action
    getSongAction(song){
      this.selectedSong=song;
      this.$refs.actions.open();
    },
    //下载歌曲
    download(){
      let url = api.download+'song_id='+ this.selectedSong.id.split("_").pop() + '&songName=' + this.selectedSong.title;
      window.location.href=url;
      this.$refs.actions.close();
      //let url = var url = getRootPath() + '/api/download?song_id=' + item.id.split("_").pop() + '&songName=' + item.title;
    },
    //播放
    play(){
      this.$refs.t2.open();
      this.$refs.actions.close();
    }
  }
}
</script>
