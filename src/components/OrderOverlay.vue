<!-- 预约弹窗 -->
<template>
	<div class='OrderOverlay'>
		<el-dialog title="" :visible.sync="dialogVisible" :width="width">
			<el-form ref="form" :model="form" label-width="60px" label-position="left">
				<el-form-item label="时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.date"
							style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-select v-model="form.time" placeholder="选择节">
							<el-option label="第一节课" value="第一节课"></el-option>
							<el-option label="第二节课" value="第二节课"></el-option>
							<el-option label="第三节课" value="第三节课"></el-option>
							<el-option label="第四节课" value="第四节课"></el-option>
						</el-select>
					</el-col>

					<el-col :span="24" style="margin-top: 20px !important;">
						<el-button type="primary" @click.native="onSubmit" class="fluid ui button"
							style="padding:0;background-color: white;border: white;">
							<div class="fluid ui teal button">
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">预约</font>
								</font>
							</div>
						</el-button>
					</el-col>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'OrderOverlay',
		props: ['showOrderOverlay'],
		components: {},
		data() {
			return {
				dialogVisible: false,
				width: '35%',
				form: {
					date: '',
					time: '',
				}
			}
		},
		computed: {},
		watch: {
			showOrderOverlay(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				this.$emit('update:showOrderOverlay', val)
			},
		},
		methods: {
			// 验证字段
			verificationHandler() {
				const filterArr = Object.keys(this.form).filter(v => this.form[v] === '')
				if (filterArr && filterArr.length) return false
				return true
			},
			onSubmit() {
				if (this.verificationHandler()) {
					this.$request.order(this.form).then(() => {
						this.$message({
							message: '预约成功',
							type: 'success'
						})
						//子组件向父组件传值,将预约的dialog关闭
						this.$emit('update:showOrderOverlay', false)
					})
				} else {
					this.$message.error('表单信息填写不完整')
				}
			},
			bodySizeHandler() {
				// 根据客户端浏览器视窗宽度修改弹窗宽度
				const width = document.body.offsetWidth
				if (width <= 1024) {
					this.width = '50%'
					if (width <= 768) {
						this.width = '80%'
					}
				} else {
					this.width = '35%'
				}
			}
		},
		created() {

		},
		mounted() {
			this.bodySizeHandler()
			window.addEventListener('resize', () => this.bodySizeHandler(), false)
		}
	}
</script>
<style lang='less' scoped>
	/deep/ .el-dialog {
		display: flex;
		flex-direction: column;
		margin: 0 !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/*height:600px;*/
		max-height: calc(100% - 30px);
		max-width: calc(100% - 30px);

	}
</style>
