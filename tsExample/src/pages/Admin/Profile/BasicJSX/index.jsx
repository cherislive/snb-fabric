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
      frameLoading: (state) => state['@@loading'].effects['assetFixed/fetch'],
      pageLoading: (state) => state['@@loading'].effects['assetAppliances/fetch'],
    }),
    // ...mapGetters('assetDashboard', ['fetchData']),
    ...mapGetters({
      fetchData: 'fetchData',
      frameFetchData: 'assetFixed/fetchData',
      pageFetchData: 'assetAppliances/fetchData',
    }),
    // showProgress() {},
  },
  created() {},
  methods: {
    ...mapMutations({
      setToken: 'SET_TOKEN',
    }),
    onClick(path) {
      this.$store.dispatch(path);
    },
    handleClick(e) {
      // eslint-disable-next-line no-console
      console.log('handleClick', e);
    },
  },
  render() {
    return (
      <div>
        <h3>JSX 组件</h3>
        <p>
          <el-button onClick={this.handleClick}>事件</el-button>{' '}
          需要“on”前缀。例如，将onClick用于单击事件。
        </p>
      </div>
    );
  },
};
