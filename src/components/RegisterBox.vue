<!-- 注册验证码的表单  -->
<template>
	<div class='register-box'>
		<div class="title">注册</div>
		<el-form label-width="60px" label-position="left" style="margin-left: 20px;margin-right: 20px;">
			<el-form-item label="邮箱">
				<el-input v-model="form.email" placeholder="请输入邮箱" style="width:95%"></el-input>
			</el-form-item>
			<el-form-item label="验证码">
				<div class="code-box">
					<el-input v-model="form.emailCode" placeholder="请输入验证码" style="width:55%"></el-input>
					<div class="label"></div>
					<div class="ui button code-btn" v-show="count === 60" @click="codeBtnHandler">获取验证码</div>
					<!-- 当获取验证码后，按钮禁用并显示倒计时 -->
					<div class="ui disabled button code-btns" v-show="count !== 60">{{count}}秒重新发送</div>
				</div>
			</el-form-item>
			<el-button type="primary" @click="jumpUserInfoHandler"
				style="padding:0;background-color: white;border: white;margin-left : 50% ; transform: translateX(-50%);margin-top: 10px;">
				<div class="ui large teal button">
					<i class="address card outline icon"></i>
					<font style="vertical-align: inherit;">
						<font style="vertical-align: inherit;">
							去填写个人信息
						</font>
					</font>
				</div>
			</el-button>
		</el-form>
		<div class="tips" @click="$emit('update:status', 1)">已经有账号，去登录</div>
	</div>
</template>

<script>
	export default {
		name: 'RegisterBox',
		props: ['status'],
		components: {},
		data() {
			return {
				timeId: null, // 定时器
				count: 60, // 倒计时
				form: {
					email: '',
					emailCode: ''
				},
				code:''
			}
		},
		computed: {},
		watch: {},
		methods: {
			// 去个人信息表单
			jumpUserInfoHandler() {
				//判断邮箱是否为空
				if (this.form.email === '') {
					this.$message.error('邮箱不能为空')
					return
				}
				// 判断验证码是否为空
				if (this.form.emailCode === '') {
					this.$message.error('验证码不能为空')
					return
				}
				//判断验证码是否输入正确
				if(this.form.emailCode != this.code){
					this.$message.error('验证码错误,请重新输入')
					return
				}
				
				//子组件向父组件传值,修改dialog状态至(3)个人信息填写
				this.$emit('update:status', 3)
				// 发射事件
				this.$bus.$emit('registerBoxForm', this.form)
			},
			// 点击按钮
			codeBtnHandler() {
				if (this.form.email === '') {
					this.$message.error('邮箱不能为空')
					return
				}
				this.$request.sendCode({
					email: this.form.email
				}).then(res => {
					this.$message({
						message: '发送成功',
						type: 'success'
					});
					// 验证码
					this.code = res
					
					this.countDown()
				})
			},
			// 倒计时
			countDown() {
				if (this.timeId !== null) {
					return false
				}
				this.timeId = setInterval(() => {
					if (this.count === 1) {
						this.count = 60
						clearInterval(this.timeId)
						this.timeId = null
					} else {
						this.count = this.count - 1
					}
				}, 1000)
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>
<style lang='less' scoped>
	.title {
		text-align: center;
		font-size: 24px;
		font-weight: bold;
		color: black;
		margin: 20px 0;
	}

	.item {
		display: flex;
		align-items: center;

		.label {
			width: 60px;
			text-align: center;
		}
	}

	/deep/.el-form-item__content {
		text-align: center;
	}

	.user-info {
		text-align: center;
		margin-top: 20px;
	}

	.code-box {
		display: flex;
		align-items: center;
		margin-left: 10px;
		margin-right: 10px;

		/* margin-top: 20px; */
		.code-btn {
			font-size: 12px;
			margin-left: 10px;
			background: #00b5ad;
			height: 40px;
			line-height: 40px;
			color: white;
			border-radius: 4px;
			padding: 0 4px;
			width: 40%;
			text-align: center;
		}

		.code-btns {
			font-size: 12px;
			margin-left: 10px;
			background: #e0e1e2 none;
			height: 40px;
			line-height: 40px;
			color: rgba(0, 0, 0, .6);
			border-radius: 4px;
			padding: 0 4px;
			width: 40%;
			text-align: center;
		}
	}

	.tips {
		cursor: pointer;
		text-align: right;
		line-height: 50px;
		margin-right: 20px;
	}
</style>
