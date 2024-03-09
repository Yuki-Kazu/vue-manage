<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="form" :rules="rules" ref="formRef" label-width="0px" class="ms-content">

                <el-form-item prop="number">
                    <el-input v-model="form.number" placeholder="number">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input placeholder="password" v-model="form.password" :type="passwordType"
                        @keyup.enter="handleLogin()">
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                        <template #append>
                            <!-- <el-icon @click="changeType">
                                <View />
                            </el-icon> -->
                            <svg-icon
                            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
                            @click="changeType"
                            ></svg-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="handleLogin()">登录</el-button>
                </div>
                <!-- <el-checkbox class="login-tips" v-model="checked" label="记住密码" size="large" /> -->
            </el-form>
        </div>
    </div>
</template>



<script setup>
import { ref, reactive } from 'vue';
// import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';

//获取本地保存的登录记录
// const lgStr = localStorage.getItem('login-param');
// const defParam = lgStr ? JSON.parse(lgStr) : null;
// const checked = ref(lgStr ? true : false);

// const router = useRouter()

const form = ref({
    number: '',
    password: ''
})

//表单验证
const rules = reactive({
    number: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ],
})

const store = useStore()
const formRef = ref(null)
const handleLogin = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            console.log("sumbit")
            store.dispatch('app/login', form.value)
            ElMessage.success('登录成功');
        } else {
            console.log('error submit!!!')
            ElMessage.error('登录失败');
            return false
        }
    })
}

const passwordType = ref('password')
const changeType = () => {
    if (passwordType.value === 'password') {
        passwordType.value = 'text'
    } else {
        passwordType.value = 'password'
    }
}
</script>



<style lang="scss" scoped>
.login-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}

.ms-title {
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    font-weight: bold;
    padding-top: 10px;
}

.ms-login {
    width: 350px;
    border-radius: 5px;
    background: #fff;
}

.ms-content {
    padding: 10px 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #333;
}
</style>
