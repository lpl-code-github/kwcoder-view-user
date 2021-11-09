<!-- element对话框 -->
<template>
	<div>
		<el-dialog :visible.sync="centerDialogVisible" :width="width" center :show-close='false'>
			<div class="box">
				<div class="overlay-right">
					<SignIn v-show="status === 1" :status.sync='status' @getUserInfoHandler='getUserInfoHandler'>
					</SignIn>
					<RegisterBox v-show="status === 2" :status.sync='status'></RegisterBox>
					<UserInfo v-show="status === 3" :status.sync='status'></UserInfo>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import SignIn from './SignIn.vue'
	import RegisterBox from './RegisterBox.vue'
	import UserInfo from './UserInfo.vue'
	export default {
		name: 'BaseOverlay',
		components: {
			SignIn,
			RegisterBox,
			UserInfo
		},
		props: ['showOverlay'],
		data() {
			return {
				centerDialogVisible: false,
				width: '30%',
				status: 1 // 1 登录 2邮箱 3个人信息
			}
		},
		computed: {},
		watch: {
			showOverlay(val) {
				this.centerDialogVisible = val
			},
			centerDialogVisible(val) {
				//触发事件
				this.$emit('update:showOverlay', val)
			},
		},
		methods: {
			getUserInfoHandler() {
				this.$emit('getUserInfoHandler')
			},
			//监听客户端视窗宽度,更改dialog的宽度
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
		}
	}
</script>
<style lang='less' scoped>
	/deep/ .el-dialog__header {
		display: none;
	}

	/deep/ .el-dialog {
		display: flex;
		flex-direction: column;
		margin: 0 !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		max-height: calc(100% - 30px);
		max-width: calc(100% - 30px);

	}

	.box {
		display: flex;


		.overlay-right {
			flex: 1;
		}
	}
</style>
