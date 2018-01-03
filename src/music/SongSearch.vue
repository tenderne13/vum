<template>
  <div class="page">
    <simple-header title="歌曲搜索"></simple-header>
    <page-content>
      <searchbar @input="input" @keyup.enter="search"></searchbar>
    </page-content>

    <toast :text="searchInput" ref="msg"></toast>
  </div>
</template>
<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Searchbar from '../components/searchbar'
import Toast from '../components/toast'

export default {
  components: {
    SimpleHeader,
    'page-content': Content,
    Searchbar,
    Toast
  },
  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    input (v) {
      this.searchInput=v;
    },
    search (){
      alert(this.searchInput);
    }
  }
}
</script>
