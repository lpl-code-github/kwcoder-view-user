<!-- 首页 -->
<!-- 这个组件内容过长,应该拆开 -->
<template>
	<div>
		<div class='main'>
			<div class="header">
				<Header></Header>
			</div>
			<div class="title">实干青年工作室</div>
			<div class="sub-title">守初心，担使命，争做实干青年<span class="caret"></span></div>
			<div class="wave1"></div>
			<div class="wave2"></div>
			<div>
				<el-button class="order-btn" type="primary" @click="orderHandler">点击预约</el-button>
				<el-button class="order-btn" type="primary" @click="findHandler">查看预约</el-button>
			</div>
			<el-drawer title="查询预约" style="text-align: left; font-size: 20px;line-height: 40px;" :visible.sync="drawer"
				:size="size">
				<el-divider class="divider1" content-position="left"><i class="el-icon-help"></i> 查询可预约时间</el-divider>
				<!-- 查询预约的表单 -->
				<div style="line-height: 0px !important;">
					<el-form ref="form" :model="form" label-width="20px" label-position="left" size="mini">
						<el-form-item label="">
							<el-col :span="6">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
									v-model="form.date" style="width: 100%;"></el-date-picker>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="6">
								<el-select v-model="form.time" placeholder="选择节">
									<el-option label="第一节课" value="第一节课"></el-option>
									<el-option label="第二节课" value="第二节课"></el-option>
									<el-option label="第三节课" value="第三节课"></el-option>
									<el-option label="第四节课" value="第四节课"></el-option>
								</el-select>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click.native="onSubmit"
									style="padding:0;background-color: white;border: white; margin-left: 20px;">
									<div class="mini ui teal button">
										<font style="vertical-align: inherit;">
											<font style="vertical-align: inherit;">查询</font>
										</font>
									</div>
								</el-button>
							</el-col>

						</el-form-item>
					</el-form>
				</div>
				<!-- 显示查询可预约结果的的表格 -->
				<el-table :data="tableData" v-show="showTable" style="width: 100%">
					<el-table-column prop="date" label="日期">
					</el-table-column>
					<el-table-column prop="time" label="时间段">
					</el-table-column>
					<el-table-column prop="place" label="总空位">
					</el-table-column>
					<el-table-column prop="handler" label="已预约">
					</el-table-column>
					<el-table-column prop="surplus" label="剩余可预约">
					</el-table-column>
				</el-table>
				<!-- 分割条 -->
				<el-divider class="divider2" content-position="left"><i class="el-icon-zoom-in"></i> 我的预约记录</el-divider>
				<!-- 如果没有内容则显示空状态 -->
				<el-empty v-show="nullStatus" description="暂无数据 , 快去预约吧"></el-empty>
				<!-- 查询个人预约记录 -->
				<el-timeline v-show="isShow">
					<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.date">
						预约时间：{{activity.time}}
					</el-timeline-item>
				</el-timeline>
			</el-drawer>
		</div>
		<!-- 内容组件 -->
		<Article></Article>
		<!-- 表格组件 -->
		<TableBox></TableBox>
		<!-- 预约弹窗 -->
		<OrderOverlay :showOrderOverlay.sync='showOrderOverlay'></OrderOverlay>
	</div>
</template>

<script>
	import Article from '@/components/Article.vue'
	import TableBox from '@/components/TableBox.vue'
	import OrderOverlay from '@/components/OrderOverlay.vue'
	import Header from '@/components/Header.vue'

	export default {
		name: 'Main',
		components: {
			Article,
			TableBox,
			OrderOverlay,
			Header
		},
		data() {
			return {
				nullStatus: false, // 默认不显示空状态
				isShow:true,
				showTable: false, //默认先不显示表格
				size: "40%",
				style: {},
				showOrderOverlay: false, // 是否展示预约弹窗
				drawer: false,
				tableData: [{
					date: '',
					time: '',
					place: '',
					handler: '',
					surplus: ''
				}],
				value: '',
				form: {
					date: '',
					time: '',
				},
				activities: [{
					id: '',
					email: '',
					date: '',
					time: ''
				}],

				cookie: {
					email: ''
				}
			}
		},
		computed: {},
		watch: {},
		methods: {
			orderHandler() {
				//获取客户段的cookie，
				this.cookie.email = this.$cookies.get("email")
				if (!this.cookie.email) {
					return this.$message.error('请先登陆')
				}
				this.showOrderOverlay = true
			},
			findHandler() {
				//获取客户段的cookie，
				this.cookie.email = this.$cookies.get("email")
				if (!this.cookie.email) {
					return this.$message.error('请先登陆')
				}
				console.log()
				this.$request.findAll(this.cookie).then(res => {
					// 判断后端有没有返回个人预约列表
					if (res.length == 0) {
						this.nullStatus = true // 开启无状态展示组件
						this.isShow =false // 关闭个人预约展示列表
					}else {
						this.nullStatus = false // 关闭无状态组件
						this.isShow =true // 打开个人预约展示列表
						this.activities = res
						for (var i = 0; i < res.length; i++) {
							//后端返回的日期带了时区，所以只截取后端传来的date的前11位
							this.activities[i].date = res[i].date.substring(0, 10)
							this.activities[i].time = this.formatTime(res[i].time)
						}
					}
				})
				this.drawer = true
			},
			// 验证字段
			verificationHandler() {
				const filterArr = Object.keys(this.form).filter(v => this.form[v] === '')
				if (filterArr && filterArr.length) return false
				return true
			},
			onSubmit() {
				//查询数据
				if (this.verificationHandler()) {
					this.$request.query(this.form).then(res => {
						this.$message({
							message: '查询成功',
							type: 'success'
						})
						this.showTable = true;
						this.tableData[0].date = res[0].date.substring(0, 10)
						this.tableData[0].time = this.formatTime(res[0].time)
						this.tableData[0].place = res[0].place
						this.tableData[0].handler = res[0].handler
						// 剩余预约数用减法做,这里需要后端返回的数据正确的
						this.tableData[0].surplus = res[0].place - res[0].handler
					},err =>{
						this.showTable = false
					})
					
				} else {
					this.$message.error('表单信息填写不完整')
				}
			},
			bodySizeHandler() {
				const width = document.body.offsetWidth
				if (width <= 1024) {
					this.size = '60%'
					if (width <= 768) {
						this.size = '80%'
					}
				} else {
					this.size = '40%'
				}
			},
			// 格式化后端传来的time
			formatTime(time) {
				let timeStr = ""
				if (time == 1) {
					timeStr = "第一节课"
				}
				if (time == 2) {
					timeStr = "第二节课"
				}
				if (time == 3) {
					timeStr = "第三节课"
				}
				if (time == 4) {
					timeStr = "第四节课"
				}
				return timeStr
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
	.main {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		color: white;
		position: relative;

		.title {
			font-size: 40px;
		}

		/deep/.divider1 {
			margin-top: 10px;
		}

		/deep/.divider2 {
			margin-top: 50px;
		}

		.order-btn {
			margin-top: 50px;
			background-color: Transparent;
			background-repeat: no-repeat;
			border: none;
			cursor: pointer;
			overflow: hidden;
			border: 0.1rem white solid;
			font-weight: 800;
		}

		.order-btn:hover {
			background-color: white;
			color: black
		}

		.caret {
			animation-name: flash;
			width: 4px;
			height: 25px;
			background-color: #fff;
			margin-left: 5px;
			margin-bottom: 12px;
			animation-duration: 3s;
			animation-fill-mode: both;
			animation-iteration-count: infinite;
			display: inline-block;
			vertical-align: bottom;
		}

		@keyframes flash {

			from,
			50%,
			to {
				opacity: 1;
			}

			25%,
			75% {
				opacity: 0;
			}
		}

		.wrapper {
			position: absolute;
			width: 100px;
			bottom: 150px;
			left: 0;
			right: 0;
			margin: auto;
			font-size: 26px;
			z-index: 100;

		}

		.wrapper i {
			font-size: 60px;
			opacity: 0.5;
			cursor: pointer;
			position: absolute;
			top: 55px;
			left: 20px;
			animation: opener .5s ease-in-out alternate infinite;
			transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
		}

		.wrapper i:hover {
			opacity: 1;
		}

		.sub-title {
			font-size: 16px;
			margin: 10px auto 10px;
		}

		.wave1,
		.wave2 {
			position: absolute;
			bottom: 0;
			transition-duration: .4s, .4s;
			z-index: 80;
		}

		.wave1 {
			background: url('https://cdn.jsdelivr.net/gh/yoyling/JsDelivr/bg/wave1.png') repeat-x;
			height: 75px;
			width: 100%;
			animation-name: flash;
			animation-duration: 10s;
			animation-fill-mode: both;
			animation-iteration-count: infinite;
			display: inline-block;
			vertical-align: bottom;
		}

		.wave2 {
			background: url('https://cdn.jsdelivr.net/gh/yoyling/JsDelivr/bg/wave2.png') repeat-x;
			height: 90px;
			width: calc(100% + 100px);
			left: -100px;
			animation-name: flash;
			animation-duration: 5s;
			animation-fill-mode: both;
			animation-iteration-count: infinite;
			display: inline-block;
			vertical-align: bottom;
		}
	}

	// PC
	@media only screen and (min-width: 768px) {
		.main {
			width: 100%;
			height: 80vh;
			line-height: 50px;
			background: url("https://cdn.jsdelivr.net/gh/yoyling/JsDelivr/bg/bg-04.png") no-repeat;
			/* background: url("../assets/img/background.jpg") no-repeat; */
			background-size: 100% 100%;
			object-fit: contain;

			.header {
				top: 0;
				position: absolute;
				width: 100%;
				padding: 20px 150px;
			}
		}
	}

	// 移动端
	@media only screen and (max-width: 768px) {
		.main {
			width: 100%;
			height: 60vh;
			background: url("https://cdn.jsdelivr.net/gh/yoyling/JsDelivr/bg/bg-04.png") no-repeat;
			background-size: 100% 100%;
			line-height: 50px;
			object-fit: contain;

			.header {
				top: 0;
				position: absolute;
				width: 100%;
				padding: 20px 40px;

			}
		}
	}
</style>
