<template>
  <div>
    <h1>请求顺序依赖</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <p>A, B, C, D 四个请求， C 依赖 B 的结果，D 依赖 ABC 的结果，最终输出 D 的结果。</p>
        <el-button type="danger" :loading="loadingA" @click="initData">Action</el-button>
        <p></p>
        <p>
          <el-button type="primary" icon="el-icon-minus" round :loading="loadingA">A</el-button>
          <el-button type="primary" icon="el-icon-minus" round :loading="loadingB">B</el-button>
          <el-button type="primary" icon="el-icon-minus" round :loading="loadingC">C</el-button>
          <el-button type="primary" icon="el-icon-minus" round :loading="loadingD">D</el-button>
        </p>
        <p>A: 1</p>
        <p>B: 3</p>
        <p>C: B + 10</p>
        <p>D: A + B + C</p>
      </el-col>
      <el-col :span="12">
        <h3>Request Response:</h3>
        <P><el-tag type="danger">A:</el-tag> {{ infoA }}</P>
        <P><el-tag type="warning">B:</el-tag> {{ infoB }}</P>
        <P><el-tag type="success">C:</el-tag>{{ infoC }}</P>
        <P><el-tag type="info">D:</el-tag> {{ infoD }}</P>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loadingA: (state) => state['@@loading'].effects['example/fetchA'],
      loadingB: (state) => state['@@loading'].effects['example/fetchB'],
      loadingC: (state) => state['@@loading'].effects['example/fetchC'],
      loadingD: (state) => state['@@loading'].effects['example/fetchD'],
    }),
    ...mapGetters({
      infoA: 'example/infoA',
      infoB: 'example/infoB',
      infoC: 'example/infoC',
      infoD: 'example/infoD',
    }),
  },
  created() {},
  methods: {
    ...mapMutations({
      setToken: 'SET_TOKEN',
    }),
    async initData() {
      // const resA = await this.fetchA();
      // const {resB, resC} = await this.fetchBC();
      const [resA, { resB, resC }] = await Promise.all([this.fetchA(), this.fetchBC()]);
      const { data: dataA = {} } = resA;
      const { value: valA = 0 } = dataA;
      const { data: dataB = {} } = resB;
      const { value: valB = 0 } = dataB;
      const { data: dataC = {} } = resC;
      const { value: valC = 0 } = dataC;
      const resD = await this.fetchD(`${valA}-${valB}-${valC}`);
      // eslint-disable-next-line no-console
      console.log(resA, resB, resC, resD);
    },
    fetchA() {
      return this.$store.dispatch('example/fetchA', {
        type: 'A',
        value: 1,
      });
    },
    fetchD(value) {
      return this.$store.dispatch('example/fetchD', {
        type: 'D',
        value,
      });
    },
    async fetchBC() {
      const resB = await this.$store.dispatch('example/fetchB', {
        type: 'B',
        value: 3,
      });
      const { data = {} } = resB;
      let { value: valB = 0 } = data;
      valB += 10;
      const resC = await this.$store.dispatch('example/fetchC', {
        type: 'C',
        value: valB,
      });
      return {
        resB,
        resC,
      };
    },
  },
};
</script>
