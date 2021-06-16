import './SideMenu.less';

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(['']),
    activeRoute() {
      return this.$route.name;
    },
    routerList() {
      const { options = {} } = this.$router;
      const { routes = [] } = options;
      const { config } = this.$router;
      const nextRoutes = config || routes;
      const adminRouters = nextRoutes.filter((item) => item.name === 'admin')[0] || {};
      return adminRouters.children || [];
    },
  },
  created() {},
  methods: {
    // ...mapMutations({
    // }),
    // bindClick() { },
    getAccessRoute(item = []) {
      return item.filter((item) => !!item.name) || [];
    },
    initElement(list) {
      const nextList = this.getAccessRoute(list);
      return nextList.map((item) => {
        const { name, children = [], meta } = item;
        const { title, icon } = meta || {};
        const nextChildren = this.getAccessRoute(children);
        if (nextChildren.length > 0) {
          return (
            <el-submenu index={name}>
              <template slot="title">
                <i class={icon}></i>
                <span slot="title">{title}</span>
              </template>
              {nextChildren.map((i) => this.renderMenuItem(i))}
            </el-submenu>
          );
        }
        return this.renderMenuItem(item);
      });
    },
    renderMenuItem(item) {
      const { name, path, meta } = item;
      const { title, icon } = meta || {};
      return (
        <el-menu-item index={name} route={path}>
          <i class={icon}></i>
          <span slot="title">{title}</span>
        </el-menu-item>
      );
    },
  },
  render() {
    return (
      <div>
        <el-menu
          router
          default-active={this.activeRoute}
          class="sider-menu"
          background-color="#001529"
          text-color="hsla(0,0%,100%,.65)"
          active-text-color="hsla(0,0%,100%,.85)"
        >
          {this.initElement(this.routerList)}
        </el-menu>
      </div>
    );
  },
};
