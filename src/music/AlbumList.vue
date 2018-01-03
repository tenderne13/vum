<template>
  <div class="page">
    <simple-header :title="title" ></simple-header>
    <page-content>
      <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <list>
          <list-item :link="true" v-for="item in albumList" :key="item.id" @click.native="getAlbumDetail(item)">

              <div class="item-media"><img :src="item.cover_img_url" width="88"></div>
              <div class="item-content">
                <div class="item-title-row">
                  <div class="item-title">{{item.author}}</div>
                  <!--<div class="item-after">After</div>-->
                </div>
                <!--<div class="item-subtitle">
                  Subtitle
                </div>-->
                <div class="item-text">
                  {{item.title}}
                </div>
              </div>
          </list-item>
        </list>
      </scroll>
    </page-content>
  </div>
</template>

<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import Scroll from '../components/scroll'
import api from '../lib/api'
import {setCookie} from '../lib/cookie'

export default {
  components: {
    SimpleHeader,
    'page-content': Content,
    List,
    ListItem,
    Scroll
  },
  data(){
    return {
      title:'热门歌单',
      albumList:[],
      offset:0
    }
  },
  beforeMount(){
    //this.getAlbumList();
    //setCookie('tooken','tokenStirng123456ajsodi',1000*60*60);
    this.checkAuth();
  }
  ,
  methods: {
    getAlbumList () {
      //this.
      this.$http.get(api.albumList+'offset='+this.offset+'&order=hot')
        .then((result)=>{
          this.albumList=this.albumList.concat(result.data.albumList);
          this.offset+=35;
          //this.$router.push('/');
        });
    },
    onRefresh (done){
      this.albumList=[];
      this.offset=0;
      done()
      this.getAlbumList();
    },
    onInfinite(done){
      this.getAlbumList();
      setTimeout(function () {
        done()  // call done()
      }, 2000)
    },
    getAlbumDetail(song){
      let listId = song.id;
      this.$router.push({name:'music',params:{listId:listId}});
    },
    checkAuth(){
      this.$http.get('/user/userInfo').then((result)=>{
        let data = result.data;
        let code = result.data.code;
        if(code==200){
            alert("用户名为"+data.data.user.username);
        }else if(code==403){
            alert(data.message);
            this.$router.push({
                name:'login'
            });
        }
      })
    }
  }
}
</script>
