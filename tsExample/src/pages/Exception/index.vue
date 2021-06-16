/** * 错误提示页面 */
<template>
  <div class="mod-error">
    <div class="mod-error-shadow tc">
      <h1 v-if="!query.status">{{ status }}</h1>
      <h1 v-else class="iconfont">&#xe620;</h1>
      <div v-if="!query.status" class="mod-error-subinfo">{{ statusText }}</div>
      <div class="mod-error-quickarea">
        <el-button type="primary" icon="el-icon-back" @click="routerGo('back')"> 返回 </el-button>
        <el-button icon="el-icon-s-home" @click="routerGo('/')"> 首页 </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { formatStatus } from '@/utils/request';

export default {
  data() {
    return {
      query: {},
    };
  },
  computed: {
    status() {
      return this.$route.params.status;
    },
    statusText() {
      return formatStatus(this.$route.params.status);
    },
  },
  mounted() {
    this.query = this.$route.query || {};
  },
  methods: {
    routerGo(path) {
      if (path === 'back') {
        this.$router.go(-1);
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style lang="less">
.mod-error .min-footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
.mod-error-shadow {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  text-align: center;
  transform: translate(-50%, -50%);
}
.mod-error-shadow h1 {
  margin: 0;
  color: #fff;
  font-size: 32px;
  text-shadow: 0 1px 0 #dee5e7, 0 2px 0 #fcfdfd, 0 5px 10px rgba(0, 0, 0, 0.125),
    0 10px 20px rgba(0, 0, 0, 0.2);
}
.mod-error-subinfo {
  padding: 5px 0;
  font-size: 12px;
}
.mod-error-subinfo,
.mod-error-subinfo a {
  color: #98a6ad;
}
.mod-error-subinfop a:hover {
  color: #19a9d5;
}
.mod-error-quickarea {
  padding: 10px;
  .m-btn {
    margin: 0 5px;
  }
}
</style>
