<template>
  <div class="page">
    <simple-header title="今日头条登录"></simple-header>
    <page-content>
      <form-list class="login-padding">
        <div slot="title">你关心的才是头条</div>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="text" placeholder="手机号">
            </div>
          </div>
        </form-item>
        <form-item>
          <!--<div class="item-media">
            <img src="../assets/images/form/i-form-name.png" alt="" width="30" />
          </div>-->
          <div class="item-content">
            <!--<div class="item-title label">E-mail</div>-->
            <div class="item-input">
              <input type="email" placeholder="验证码">
            </div>
            <div class="item-after">
              <m-button @click.native="getCommonInfo">获取</m-button>
            </div>
          </div>
        </form-item>
        <div class="content-block content-padded">
          <div class="row">
            <!--<div class="col-50"><m-button type="danger" size="large">Cancel</m-button></div>-->
            <div class="col-100"><m-button size="large" @click.native="search()">登录</m-button></div>
          </div>
        </div>
        <!--<div slot="append">The usage of Form is just the same as List.</div>-->
      </form-list>
    </page-content>

    <toast :text="searchInput" ref="msg"></toast>
  </div>
</template>
<style>
  .login-padding{
    padding-top: 10%;
  }

</style>
<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Searchbar from '../components/searchbar'
import Toast from '../components/toast'
import { Button } from '../components/buttons'
import { Form, FormItem } from '../components/form'
import Switcher from '../components/switcher'
import {setCookie,getCookie} from '../lib/cookie'

export default {
  components: {
    SimpleHeader,
    'page-content': Content,
    Searchbar,
    Toast,
    'm-button': Button,
    Switcher,
    'form-list': Form,
    FormItem
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
      this.$http.get('/user/login').then((result)=>{
        let data = result.data;
        let code = result.data.code;
        if(code==200){
          alert("登录成功");
          let token = data.data.token;
          setCookie('token',token,7);
          this.$router.push("/");
        }else{
          alert("登录失败请重新登录");
        }
      })
    },
    getCommonInfo(){
      this.$http.get('/common/commonInfo').then((result)=>{
        alert(result.data);
        console.log(result);
      });
    }
  }
}
</script>
