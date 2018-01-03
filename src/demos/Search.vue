<template>
  <div class="my-page">
    <page-header>
       <searchbar></searchbar>
    </page-header>
    <page-content>
      <div class="content-padded">
        <p>Expressions & computed properties with transparent dependency tracking.</p>
      </div>
    </page-content>
  </div>
</template>

<script>
  import { Header} from '../components/header'
  import Content from '../components/content'
  import Searchbar from '../components/searchbar'

export default {
  components: {
    'page-header': Header,
    'page-content': Content,
    Searchbar
  }
}
</script>
