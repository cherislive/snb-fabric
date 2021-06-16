<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="100px"
    class="mod-login-form"
  >
    <h2 style="text-align: center; padding: 0 0 20px">
      <img src="/logo.svg" height="36" /> FED.Web.Infra
    </h2>
    <el-form-item label="用户名" prop="userName">
      <el-input
        v-model="ruleForm.userName"
        type="text"
        autocomplete="off"
        placeholder="用户名：admin or user"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="密码：123456"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model.number="ruleForm.code"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="inSubmit" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.userName !== '') {
          this.$refs.ruleForm.validateField('userName');
        }
        callback();
      }
    };
    const checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      if (value.length < 4) {
        callback(new Error('请输入正确的验证码数字值'));
      } else {
        callback();
      }
      // setTimeout(() => {
      // }, 1000);
    };
    return {
      ruleForm: {
        userName: '',
        password: '123456',
        code: '6666',
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState({
      inSubmit: (state) => state['@@loading'].effects['user/login'],
    }),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.mod-login-form {
  position: relative;
  top: 50%;
  width: 460px;
  margin: 0 auto;
  padding: 50px 30px;
  background: #fff;
  transform: translate3d(0, -200px, 0);
  will-change: transform;
}
</style>
