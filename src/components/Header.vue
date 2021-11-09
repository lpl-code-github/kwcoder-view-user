<!-- 头部导航 -->
<template>
	<div>
		<div class='header'>
			<div class="header-left-box">
				<img src="../assets/img/logo.jpg" alt="">
				<div style="font-size: 20px;"> 实干青年</div>
			</div>
			<div v-if="!isLogin" @click="showOverlay=true" style="font-size: 18px;">请登录</div>
			<div v-else style="display: flex;font-size: 14px;">

				<el-dropdown style="color: white;">
					<span class="el-dropdown-link">
						<div>欢迎您，{{userInfo.studentName}}<i class="el-icon-arrow-down el-icon--right"></i></div>
					</span>
					<el-dropdown-menu slot="dropdown" style="padding: 0;">
						<el-card class="box-card" style="margin:0 !important;background-color: #EBEEF5 !important;">
							<div class="text item">
								<div>学号：{{userInfo.studentId}}</div>
								<div>性别：{{userInfo.studentSex}}</div>
								<div>年级：{{userInfo.studentGrade}}</div>
								<div>专业：{{userInfo.studentMajor}}</div>
							</div>
						</el-card>

						<div class="two ui mini  buttons">
							<button class="ui  teal button" @click="showOverlayEditPwd=true">
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">修改密码</font>
								</font>
							</button>

							<div class="or"></div>
							<button class="ui grey button" @click="loginOutHandler">
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">退出登陆</font>
								</font>
							</button>
						</div>
						<div></div>
						<div></div>
					</el-dropdown-menu>
				</el-dropdown>


			</div>
		</div>
		<BaseOverlay :showOverlay.sync='showOverlay' @getUserInfoHandler='getUserInfoHandler'></BaseOverlay>
		<EditPassword :showOverlayEditPwd.sync='showOverlayEditPwd'></EditPassword>
	</div>
</template>

<script>
	import BaseOverlay from './BaseOverlay.vue'
	import EditPassword from './EditPassword.vue'
	export default {
		name: 'Header',
		components: {
			BaseOverlay,
			EditPassword
		},
		data() {
			return {
				userInfo: {
					studentName: '',
					studentId: '',
					studentSex: '',
					studentGrade: '',
					studentMajor: ''
				},
				isLogin: false, // 是否登陆
				showOverlay: false, // 是否展开登陆遮罩
				showOverlayEditPwd: false, // 是否展开修改密码遮罩
				cookie: {
					email: "",
					token:""
				}
			}
		},
		computed: {},
		watch: {},
		methods: {
			loginOutHandler() {
				this.isLogin = false
				//删除cookie
				this.$cookies.remove("token");
				this.$cookies.remove("email");
				this.$message({
					message: '退出成功',
					type: 'success'
				});
			},
			getUserInfoHandler() {
				//获取客户段的cookie
				this.cookie.email = this.$cookies.get("email")
				this.showOverlay = false
				this.$request.findStuInfo({
					email: this.cookie.email
				}).then(res => {
					this.isLogin = true
					this.userInfo = res[0]
				})
			},
			// 初始化header
			initHandler() {
				// 获取客户端的cookie
				this.cookie.email = this.$cookies.get("email")
				this.cookie.token = this.$cookies.get("token")
				// console.log(this.cookie.email)
				// 判断是否有cookie 
				if (this.cookie.email == null && this.cookie.token == null) {
					// 没有cookie，非登录状态
					this.isLogin = false
				}else{
					// 有cookie，登录状态，并重新获取header相关信息userInfo
					this.isLogin = true
					this.getUserInfoHandler()
				}
			}
		},
		created() {

		},
		mounted() {
			// 在组件初始化时 初始化数据
			this.initHandler()
		}
	}
</script>
<style lang='less' scoped>
	.header {
		display: flex;
		align-items: center;
		color: whitesmoke;
		justify-content: space-between;
		background-color: Transparent;
		background-repeat: no-repeat;
		border: none;
		cursor: pointer;
		overflow: hidden;

		.text {
			font-size: 14px;
		}

		.item {
			padding: 18px 0;
		}

		.el-card {
			border: 0px !important;
			background-color: white !important;
		}

		.box-card {
			width: 480px;

		}

		/* background-color: #1b1c1d; */
		.header-left-box {
			display: flex;
			align-items: center;
			font-size: 18px;
			font-weight: bold;

			img {
				width: 45px;
				height: 45px;
				border-radius: 50%;
			}

			div {
				margin-left: 10px;
			}
		}
	}
</style>
