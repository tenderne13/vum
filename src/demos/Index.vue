<template>
  <div class="page">

    <router-view></router-view>

    <page-footer>
      <footer-item v-bind:class="{ 'active' : currentView === 'album' }" @click.native="changeView('album')">
        <span class="icon demo-icon-home"></span>
        <label>首页</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'search' }" @click.native="changeView('search')">
        <span class="icon demo-icon-search"></span>
        <label>搜索</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'demo' }" @click.native="changeView('demo')">
        <span class="icon demo-icon-noti"></span>
        <span class="badge">2</span>
        <label>demo</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'login' }" @click.native="changeView('login')">
        <span class="icon demo-icon-noti"></span>
        <label>今日头条</label>
      </footer-item>
      <!--<footer-item v-bind:class="{ 'active' : currentView === 'about' }" @click.native="changeView('about')">
        <span class="icon demo-icon-me"></span>
        <label>About</label>
      </footer-item>-->
    </page-footer>
    <!--<keep-alive>
      <component :is="currentView"></component>
    </keep-alive>-->
  </div>
</template>

<script>
import Page from '../components/page'
import { Footer, Item, FooterItem } from '../components/footer'
import Home from './Home'
import Search from './Search'
import Noti from './Noti'
import About from './About'
import Album from '../music/AlbumList'
import Content from '../components/content'
export default {
  components: {
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    'home': Home,
    'search': Search,
    'noti': Noti,
    'about': About,
    'album':Album,
    'page-content': Content,
  },
  beforeMount(){
    let tab = this.$route.name;
    this.currentView=tab;
  },
  data () {
    return {
      currentView: 'album'
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view;
      this.$router.push({name:view});
    }
  }
}
</script>

<style lang="less">
.my-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 2.8rem;
}
.demo-icon-home {
  background-image: url("../assets/images/home/home.png");
  background-size: 100%;
}
.demo-icon-search {
  background-image: url("../assets/images/home/search.png");
  background-size: 100%;
}
.demo-icon-noti {
  background-image: url("../assets/images/home/button.png");
  background-size: 100%;
}
.demo-icon-me {
  background-image: url("../assets/images/home/person.png");
  background-size: 100%;
}
</style>
