<template>
  <div class="Menu text-center">
     <div class="d-flex flex-wrap mb-2 ml-4">
       <div v-for="(item,index) in list" :key="index">
         <div class="card mx-2 mb-4 align-content-center rounded-2"
         :style="`height:145px;width:250px;background-color:${item.bgColor}`">
            <div v-if="item.name === '课程'" class="text-white fs-5 my-auto" @click="$router.push(`${item.link}`)">{{ item.name }}</div>
            <a v-else class="text-white fs-5 my-auto" style="text-decoration:none;" :href="item.link">{{ item.name }}</a>
         </div>
 
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data:() => ({
      list: [
        {
          name: '课程',
          bgColor: 'green',
          link: './lesson'
        },
        {
          name: '医考',
          bgColor: 'red',
          link:'http://h5.zhukao.com.cn/index1.php?g=zhukao&agentId=2015&f=Browser'
        },
        {
          name: '图书',
          bgColor:'blue',
        },
        {
          name: '医学公众号',
          bgColor: 'skyblue',
        },
        {
          name: '图库',
          bgColor: 'yellow',
          link:'http://www.taishuai.cn/'
        },
        {
          name: '医护招聘',
          bgColor: 'orange',
          link:'https://www.mingyipin.cn/'
        },
        {
          name:' 医护规培',
          bgColor: 'red',
          link:'http://www.guipeibao.com'
        },
        {
          name: "健康科普",
          bgColor: 'gray',
          link: 'http://pic.shangshuyixue.com/jk'
        },
      ],
    })
}
</script>

<style>

</style>