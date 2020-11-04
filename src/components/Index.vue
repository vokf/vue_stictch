<template>
  <div>
    <div class="index">
      <!--        推荐<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->

      <el-button style="margin-top: 20px;" @click="click5">
        {{ button.tuijian }}
      </el-button>

      <template>
        <el-button @click="click1" class="click1"
          >{{ button.houduan }}
        </el-button>
        <div v-show="java" class="java">
          <el-button @click="click(button.java)">{{ button.java }}</el-button>
          <el-button @click="click(button.c)">{{ button.c }}</el-button>
        </div>
      </template>
      <template>
        <el-button @click="click2" class="click2"
          >{{ button.qianduan }}
        </el-button>
        <div v-show="show" class="show">
          <el-button @click="click(button.html)">{{ button.html }}}</el-button>
          <el-button @click="click(button.css)">{{ button.css }}</el-button>
          <el-button @click="click(button.JavaScript)">{{
            button.JavaScript
          }}</el-button>
          <el-button @click="click(button.Node)">{{ button.Node }}</el-button>
        </div>
      </template>
      <template>
        <el-button @click="click3" class="click3"
          >{{ button.android }}
        </el-button>
        <div v-show="android" class="android">
          <el-button @click="button.android">{{ button.android }}</el-button>
          <el-button @click="button.Kotlin">{{ button.Kotlin }}</el-button>
          <el-button @click="button.Gradle">{{ button.Gradle }}</el-button>
        </div>
      </template>
      <template>
        <el-button @click="click4" class="click4">
          {{ button.gongju }}
        </el-button>
        <div v-show="idea" class="idea">
          <el-button @click="click(button.IDEA)">{{ button.IDEA }}</el-button>
          <el-button @click="click(button.Sub)">{{ button.Sub }}</el-button>
          <el-button @click="click(button.VsCode)">{{
            button.VsCode
          }}</el-button>
        </div>
      </template>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    dd: String
  },
  data() {
    return {
      button: {
        android: 'Android',
        qianduan: '前端',
        houduan: '后端',
        java: 'Java',
        tuijian: '推荐',
        c: 'C语言',
        html: 'HTML',
        css: 'CSS',
        JavaScript: 'JavaScript',
        Node: 'Node',
        Kotlin: 'Kotlin',
        Gradle: 'Gradle',
        gongju: '开发工具',
        IDEA: 'IDEA',
        Sub: 'Sub',
        VsCode: 'VsCode'
      },
      show: false,
      java: false,
      idea: false,
      android: false
    }
  },
  methods: {
    click1() {
      this.java = true
      this.show = false
      this.android = false
      this.idea = false
    },
    click2() {
      this.java = false
      this.show = true
      this.android = false
      this.idea = false
    },
    click3() {
      this.java = false
      this.show = false
      this.android = true
      this.idea = false
    },
    click4() {
      this.java = false
      this.show = false
      this.android = false
      this.idea = true
    },
    click5() {
      this.java = false
      this.show = false
      this.android = false
      this.idea = false
    },
    click(val) {
      this.$axios({
        baseURL: '',
        url: '',
        params: { search: val }
      })
    }
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.click1 {
  position: relative;
  top: 20px;
  left: 40px;
}

.click2 {
  position: relative;
  top: 20px;
  left: 80px;
}

.click3 {
  position: relative;
  top: 20px;
  left: 120px;
}

.click4 {
  position: relative;
  top: 20px;
  left: 160px;
}

.el-link {
  display: block;
  list-style: none;
  margin: {
    top: 15px;
    left: 45px;
  }
  float: left;
}

.index-button {
  margin: {
    top: 20px;
    left: 50px;
  }
}

.el-button {
  float: left;
}

.java {
  position: relative;
  top: 70px;
  right: 260px;
  display: inline-flex;
}

.show {
  position: relative;
  display: inline-flex;
  top: 70px;
  right: 200px;
}

.android {
  display: inline-flex;
  position: relative;
  top: 70px;
  right: 90px;
}

.idea {
  display: inline-flex;
  position: relative;
  top: 70px;
  right: -50px;
}

.index {
  height: 110px;
}

.index-div {
  height: 10px;
  width: 10px;
}
</style>
