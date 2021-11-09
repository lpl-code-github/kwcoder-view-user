<!-- 注册时填写个人信息的表单 -->
<template>
	<div class='user-info'>
		<div class="content">
			<div class="title">填写个人信息</div>
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="姓名">
					<el-input v-model="form.studentName" placeholder='请输入姓名' style="width:90%"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="form.studentSex" placeholder="请选择性别" style="width:90%">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="QQ">
					<el-input v-model="form.qq" placeholder='请输入QQ号' style="width:90%"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="form.studentId" placeholder='请输入学号' style="width:90%"></el-input>
				</el-form-item>
				<el-form-item label="年级">
					<el-select v-model="form.studentGrade" placeholder="请选择年级" style="width:90%">
						<el-option label="2019" value="2019"></el-option>
						<el-option label="2020" value="2020"></el-option>
						<el-option label="2021" value="2021"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="专业">
					<el-select v-model="form.studentMajor" placeholder="请选择专业" style="width:90%">
						<el-option v-for="(item, index) in studentMajorList" :key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" placeholder='请输入密码' style="width:90%"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-input v-model="form.repeatPassword" placeholder='请再次输入密码' style="width:90%"></el-input>
				</el-form-item>
				<el-button type="primary" @click.native="onSubmit"
					style="padding:0;background-color: white;border: white;margin-left : 50% ; transform: translateX(-50%);">
					<div class="ui large teal button">
						<i class="paperclip icon"></i>
						<font style="vertical-align: inherit;">
							<font style="vertical-align: inherit;">
								注册
							</font>
						</font>
					</div>
				</el-button>
			</el-form>
			<div class="tips" @click="$emit('update:status', 1)">已经有账号，去登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserInfo',
		props: ['status'],
		components: {},
		data() {
			return {
				registerBoxForm: {},
				studentMajorList: [
					'数据科学与大数据技术',
					'软件工程1',
					'软件工程2',
					'软件工程3',
					'智能科学与技术'
				],
				form: {
					studentName: '',
					studentSex: '',
					studentId: '',
					studentGrade: '',
					studentMajor: '',
					password: '',
					repeatPassword: '',
					qq: '',
				}
			}
		},
		computed: {},
		watch: {},
		methods: {
			onSubmit() {
				if (this.verificationHandler()) {
					//密码和重复密码判断
					if (this.form.password !== this.form.repeatPassword) {
						this.$message.error('密码输入不一致');
					} else {
						// ...是将两个表单的数据合并提交数据
						this.$request.register({
							...this.form,
							...this.registerBoxForm
						})
						.then(val => {
							this.$message({
								message: val,
								type: 'success'
							})
							setTimeout(() => {
								// 子组件向父组件传值,注册成功3秒后修改显示状态至登录页(1)
								this.$emit('update:status', 1)
							}, 3000)
						})
					}
				} else {
					this.$message.error('表单信息填写不完整')
				}
			},
			// 验证字段
			verificationHandler() {
				const filterArr = Object.keys(this.form).filter(v => this.form[v] === '')
				if (filterArr && filterArr.length) return false
				return true
			},
		},
		created() {

		},
		mounted() {
			// 监听bus.on事件
			this.$bus.$on('registerBoxForm', val => {
				this.registerBoxForm = val
			})
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

	/deep/.el-form-item__content {
		text-align: center;
	}

	.tips {
		cursor: pointer;
		text-align: right;
		line-height: 50px;
		margin-right: 20px;
	}
	
	/* /deep/ .el-dialog--center .el-dialog__body {
		padding: 0;
		overflow-y: scroll !important;
	} */
</style>
<style>
	.el-dialog--center .el-dialog__body {
		padding: 0;
		/* 防止表单过长溢出 */
		overflow-y: auto;
	}
</style>
