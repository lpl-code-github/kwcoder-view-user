<!-- 登录的表单 -->
<template>
	<div class='sign-in'>
		<div class="title">登录</div>
		<el-form ref="form" :model="form" label-width="60px">
			<el-form-item label="邮箱">
				<el-input placeholder="请输入邮箱" v-model="form.email" style="width:90%"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input placeholder="请输入密码" v-model="form.password" style="width:90%"></el-input>
			</el-form-item>

			<el-button type="primary" @click.native="onSubmit"
				style="padding:0;background-color: white;border: white;margin-left : 50% ; transform: translateX(-50%);">
				<div class="ui large teal button">
					<i class="cloud upload icon"></i>
					<font style="vertical-align: inherit;">
						<font style="vertical-align: inherit;">
							登录
						</font>
					</font>
				</div>
			</el-button>
		</el-form>

		<div class="tips" @click="$emit('update:status', 2)">还没有账号，去注册</div>
	</div>
</template>

<script>
	export default {
		name: 'SignIn',
		components: {},
		data() {
			return {
				form: {
					email: '',
					password: ''
				}
			}
		},
		computed: {},
		watch: {},
		methods: {
			onSubmit() {
				//表单填写判断
				if (this.form.email === '') {
					this.$message.error('邮箱不能为空')
					return
				}
				if (this.form.password === '') {
					this.$message.error('密码不能为空')
					return
				}
				this.$request.login(this.form).then(res => {
					// 子组件向父组件传值
					this.$emit('getUserInfoHandler')
				})
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>
<style lang='less' scoped>
	@deep: ~">>>";

	.title {
		text-align: center;
		font-size: 24px;
		font-weight: bold;
		color: black;
		margin: 20px 0;
	}

	/deep/.el-form-item__content {
		text-align: center;
	}

	.tips {
		cursor: pointer;
		text-align: right;
		line-height: 50px;
		margin-right: 20px;
	}
</style>
<style>
	.el-dialog--center .el-dialog__body {
		padding: 0;
	}
</style>
