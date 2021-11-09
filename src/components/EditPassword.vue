<!-- 修改密码的表单 -->
<template>
	<div class='EditPassword'>
		<el-dialog title="" :visible.sync="dialogVisible" :width="width">
			<el-form ref="form" :model="form" label-width="90px">
				<el-form-item label="旧密码">
					<el-input v-model="form.oldPassword" placeholder="请输入旧密码"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="重复新密码">
					<el-input v-model="form.repeatNewPassword" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-button type="primary" @click="onSubmit" style="padding:0;background-color: white;border: white;">
					<div class="ui large teal button">
						<i class="facebook icon"></i>
						<font style="vertical-align: inherit;">
							<font style="vertical-align: inherit;">
								修改密码
							</font>
						</font>
					</div>
				</el-button>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'EditPassword',
		props: ['showOverlayEditPwd'],
		components: {},
		data() {
			return {
				dialogVisible: false,
				width: '30%',
				form: {
					newPassword: '',
					oldPassword: '',
					repeatNewPassword: '',
				},
				cookie: {
					email: ""
				}
			}
		},
		computed: {},
		watch: {
			showOverlayEditPwd(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				this.$emit('update:showOverlayEditPwd', val)
			},
		},
		methods: {
			// 验证字段
			verificationHandler() {
				const filterArr = Object.keys(this.form).filter(v => this.form[v] === '')
				if (filterArr && filterArr.length) return false
				return true
			},
			// 提交
			onSubmit() {
				this.cookie.email = this.$cookies.get("email")
				if (this.verificationHandler()) {
					if (this.form.newPassword !== this.form.repeatNewPassword) {
						this.$message.error('密码输入不一致');
					} else {
						this.$request.changePassword({
							...this.form,
							email:this.cookie.email
						}).then(() => {
							this.$message({
								message: '修改成功',
								type: 'success'
							})
							this.$emit('update:showOverlayEditPwd', false)
						})
					}
				} else {
					this.$message.error('表单信息填写不完整')
				}
			},
			bodySizeHandler() {
				const width = document.body.offsetWidth
				if (width <= 1024) {
					this.width = '50%'
					if (width <= 768) {
						this.width = '80%'
					}
				} else {
					this.width = '30%'
				}
			}
		},
		created() {

		},
		mounted() {
			this.bodySizeHandler()
			window.addEventListener('resize', () => this.bodySizeHandler(), false)
			this.email = this.$cookies.get("email")
		}
	}
</script>
<style lang='less' scoped>
</style>
