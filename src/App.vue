<template lang="pug">
  #app 'test'
    .test '111'
      el-button 1231
      el-table
      TestElTransfer(
        filterable
        v-model="value"
        :props="{key: 'value',label: 'desc'}"
        :titles="['yi', 'er']"
        :data="data"
        @emitInputChange="receiveInputChange"
      )
</template>

<script>
import axios from 'axios'
import * as A from '@fe/common-utils'
import HelloWorld from './components/HelloWorld.vue'
import TestElTransfer from '@/components/TestElTransfer/index'
export default {
  name: 'App',
  components: {
    HelloWorld,
    TestElTransfer
  },
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 2, 3, 4, 5, 6],
      filterMethod(query, item) {
        console.log(query, item)
        return []
      }
    }
  },
  mounted() {
    const baseUrl =
            'https://www.easy-mock.com/mock/5b7a5611f0e3593f36141420/doushu'
    axios
      .post(`http://localhost:3000/parse/build`, {
        template: '',
        formatter: '',
        include: ['get /ops/supply/getSupplyById/{supplyId}'],
        url: 'http://test-simba-ops.startdtapi.com/swagger-ui.html#/3227979357972036323376'
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  methods: {
    receiveInputChange(val) {
      console.log('input', val)
    },
    test(a) {
      return a
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
