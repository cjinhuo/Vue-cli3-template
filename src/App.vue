<template lang="pug">
  #app 'test'
    .test '111'
      el-button 1231
      el-table
</template>

<script>
import axios from 'axios'
import * as A from '@fe/common-utils'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(A)
    const baseUrl = 'https://www.easy-mock.com/mock/5b7a5611f0e3593f36141420/doushu'
    axios.get(`${baseUrl}/test`)
      .then((res) => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
  },
  methods: {
    test() {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
