<template>
  <div>
    <div class="header px-3 border-bottom">
      <div class="d-flex justify-content-between align-item-center py-2">
        <div class="nav-left d-flex my-auto align-items-center">
          <div class="h5 m-1"><b>上术医学·课程</b></div>
          <div class="d-flex">
            <div class="m-1 px-2 text-primary">课程</div>
            <div class="m-1 px-2">已购</div>
            <div class="dropdown m-1">
              <div
                class="dropdown-toggle border-0 d-inline-block"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="background-color: white; color: black"
              >
                创作管理
              </div>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">课程</a></li>
                <li><a class="dropdown-item" href="#">留言</a></li>
                <li><a class="dropdown-item" href="#">素材</a></li>
                <li><a class="dropdown-item" href="#">收入</a></li>
              </ul>
            </div>
            <div class="m-1 px-2" @click="$router.go(-1)">回首页</div>
          </div>
        </div>
        <div class="nav-right d-flex">
          <div class="m-1">
            <button type="button" class="btn btn-outline-primary mr-4">
              手机登录
            </button>
          </div>
          <div class="m-1">
            <button type="button" class="btn btn-outline-success">
              微信登录
            </button>
          </div>
        </div>
      </div>
      <div class="nav-right"></div>
    </div>
    <!-- 一级列表 -->
    <div class="main">
      <div class="py-2 mx-auto">
        <div class="d-flex">
          <div class="d-flex align-item-center text-nowrap m-2 text-secondary">
            一级 :
          </div>
          <div class="d-flex flex-wrap">
            <div
              class="m-2"
              @click="getFirst(0)"
              :style="`${this.fID === 0 ? 'color: blue' : ''}`"
            >
              全部
            </div>
            <div v-for="f in LevelList" :key="f.I">
              <div
                class="m-2"
                v-if="f.PI === 0"
                @click="getFirst(f.I)"
                :style="`${this.fID === f.I ? 'color: blue' : ''}`"
              >
                {{ f.N }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 二级列表 -->
      <div v-if="fID !== 0" class="d-flex">
        <div class="d-flex align-item-center text-nowrap text-secondary m-2">二级 :</div>
        <div class="d-flex flex-wrap text-nowrap">
          <div class="m-2" @click="getFirst(fID, 0)" :style="`${this.tID === 0 ? 'color:blue' : ''}`"></div>全部
        </div>
        <div v-for="f in LevelList" :key="f.I">
          <div v-if="fID === f.PI" class="m-2" @click="getFirst(fID, f.I)" :style="`${this.tID === f.I ? 'color:blue' : ''}`"></div>
            {{ f.N }}
        </div>
      </div>
        </div>
      </div>

      <!-- 搜索栏 -->
      <div class="d-flex pt-3">
        <div class="d-flex align-item-center text-nowrap m-2 text-secondary">
          搜索 ：
        </div>
        <div class="input-group mb-3" style="width: 16rem">
          <input type="text" class="form-control" placeholder="请输入关键字" v-model="keyWord" />
          <div class="input-group-text">
            <img src="../../public/搜索.png" style="width: 20px"  @click=" getFirst(this.fID,this.tID,pageNo,keyWord)"/>
          </div>
        </div>
      </div>
    <div>
      <!-- 卡片列表 -->

      <div class="d-flex bg-light flex-wrap p-4">
        <div class="d-flex p-2" v-for="data in DataList" :key="data.id">
          <div class="d-flex flex-wrap">
            <div class="card mx-1" style="width: 230px; height: 320px">
              <img :src="data.cover" class="card-img-top border-bottom" />
              <div class="card-body p-2">
                <div class="h5 card-title">{{ data.name }}</div>
                <br />
                <div class="card-text mt-4">{{ data.author.name }}</div>
              </div>
              <div class="d-flex px-2">
                <p class="text-danger">
                  ￥<span>{{ data.price / 100 }}</span
                  >.00<span style="color: black">/年</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页符 -->
      <div class="d-flex justify-content-center py-4 bg-light">
        <nav aria-label="Page">
          <ul class="pagination">
           <!-- 上一页 -->
            <li class="page-item">    
              <div class="page-link" aria-label="Previous">
                <div v-if="pageNo>1"  @click="getFirst(this.fID,this.tID,pageNo - 1)">&laquo;</div>
                <div v-else class="text-secondary" >&laquo;</div>
              </div>
            </li>
            <!-- 当前页 -->
            <li class="page-item disabled">
              <div class="page-link" @click="getFirst(this.fID,this.tID,pageNo)">{{ pageNo }}</div>
            </li>
            <!-- 下一页 -->
            <li class="page-item">
              <div class="page-link" aria-label="Next">
                <div   v-if="hasNext"  @click="getFirst(this.fID,this.tID,pageNo + 1)">&raquo;</div>
                <div  v-else class="text-secondary" >&raquo;</div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <Footer></Footer>
  
</template>

<script>
import Footer from "../components/Footer.vue";

export default {
  name: "Lesson",
  components: {
    Footer,
  },
  data() {
    return {
      LevelList: [], // 一级
      DataList: [],
      fID: 0, //一级
      tID: 0, //二级
      pageNo: 1,  //当前页
      hasNext: false, // 默认没有下一页
      keyWord:"",

    };
  },
  mounted() {
    fetch("http://api2.shangshuyixue.com/cate/0")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        this.LevelList = res;
      })
      .catch((err) => {
        console.log(err);
      });

    this.getFirst(0);
  },
  methods: {
    getFirst(fid, tid = 0,pageNo = this.pageNo,keyWord) {
      console.log(11111, pageNo);
      this.fID = fid;
      this.tID = tid;
      this.pageNo = pageNo
      this.keyWord = keyWord
      let tag = "";
      if (tid === 0) {
        for (let i in this.LevelList) {
          if (this.fID === this.LevelList[i].PI) {
            //一级和二级相等时
            if (this.LevelList[i] / 100 === 0) {
              //I值为两位数时
              tag = tag + "0" + this.LevelList[i].I + " ";
            } else {
              //I值为三位数时
              tag = tag + this.LevelList[i].I + " ";
            }
          }
        }
      } else {
        if (parseInt(this.tID / 100 === 0)) {
          tag = "0" + this.tID;
        } else {
          tag = this.tID;
        }
      }

      // tag = '032 033 034 048'
      fetch(
        `http://api.shangshuyixue.com/set?page=${pageNo}${this.keyWord ? "&name=" + this.keyWord :""}&=1&author=1&purchased=1${
          this.fID ? "&tags=" + tag : ""
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          this.DataList = res.data;
          this.hasNext = res.has_more_page
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

