// import Authorized from '@/utils/Authorized';
import Header from './Header';
import SideMenu from './SideMenu.jsx';

export default {
  name: 'admin-layout',
  data() {
    return {};
  },
  computed: {},
  created() {
    // const menuData = Authorized.check(['item.authority'], 'localItem', null);
    // console.log(menuData);
  },
  methods: {},
  render() {
    return (
      <el-container style="position:relative; height: 100%">
        <el-header style="margin: 0; padding: 0; height: auto">
          <Header />
        </el-header>
        <el-container>
          <el-aside width="208px">
            <SideMenu />
          </el-aside>
          <el-container>
            <el-main>
              <router-view />
            </el-main>
            <el-footer style="text-align: center; height: 52px; padding: 10px 0; line-height: 32px; color: rgba(0,0,0,.45)">
              &copy; 2021 Produced by 360 Teams FED.
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    );
  },
};
