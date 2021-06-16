<template>
  <div>
    <h1>约定式的数据流</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>Action:</h3>
        <el-button type="danger" :loading="loading" @click="onClick('fetch')">[fetch]</el-button>
        <el-button
          type="warning"
          :loading="adminLoading"
          @click="onClick('admin/fetch')"
        >[admin/fetch]</el-button>
        <el-button
          type="info"
          :loading="pageLoading"
          @click="onClick('dashboard/fetch', { stamp: 'sfc test...' })"
        >[dashboard/fetch]</el-button>
        <p></p>
        <h1>异常</h1>
        <el-button
          v-for="code in [401, 404, 500, 504]"
          :key="code"
          @click="onClick('admin/exception', { code })"
        >
          {{ code }}
        </el-button>
      </el-col>
      <el-col :span="12">
        <h3>Request Response:</h3>
        <P><el-tag type="danger">Global:</el-tag> {{ fetchData }}</P>
        <P><el-tag type="warning">Admin:</el-tag> {{ adminData }}</P>
        <P><el-tag type="info">Scope:</el-tag> {{ pageFetchData }}</P>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      token: '', // 用户token
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state['@@loading'].effects.fetch,
      adminLoading: (state) => state['@@loading'].effects['admin/fetch'],
      pageLoading: (state) => state['@@loading'].effects['dashboard/fetch'],
    }),
    // ...mapGetters('assetDashboard', ['fetchData']),
    ...mapGetters({
      fetchData: 'fetchData',
      adminData: 'admin/fetchData',
      pageFetchData: 'dashboard/fetchData',
    }),
  },
  created() {},
  methods: {
    ...mapMutations({
      setToken: 'SET_TOKEN',
    }),
    onClick(path, data = {}) {
      this.$store.dispatch(path, {
        ...data,
      });
    },
  },
};
</script>
