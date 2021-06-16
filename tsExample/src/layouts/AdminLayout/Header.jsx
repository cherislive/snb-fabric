import './style.less';

export default {
  methods: {
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command === 'logout') {
        const { dispatch } = this.props || {};
        if (dispatch) {
          dispatch({
            type: 'login/logout',
          });
        }
        this.jumpUrl('/login');
      }
    },
    jumpUrl(path) {
      this.$router.push(path);
    },
  },
  render() {
    return (
      <div class="admin-nav-header">
        <div class="header-logo">
          <img src="/logo.svg" alt="Infrastructure" />
          <h1 class="header-title">
            <router-link to="/">FED.Web.Infra</router-link>
          </h1>
        </div>
        <div class="header-menu"></div>
        <div class="header-components">
          <el-dropdown onCommand={this.handleCommand}>
            <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="accountCenter">
                <i class="el-icon-user"></i> 个人中心
              </el-dropdown-item>
              <el-dropdown-item command="accountSettings">
                <i class="el-icon-setting"></i> 个人设置
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <i class="el-icon-switch-button"></i> 退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    );
  },
};
