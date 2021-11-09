<!-- 表格及友情链接 -->
<template>
	<div class='table-box'>
		<div class="title">队长经历</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="year" label="时间"></el-table-column>
			<el-table-column prop="user" label="姓名"></el-table-column>
			<el-table-column prop="competitionname" label="比赛"></el-table-column>
			<el-table-column prop="detail" label="成果"></el-table-column>
		</el-table>
		<!-- 这里不再写新的组件了 -->
		<el-divider></el-divider>
		<div class="title">友情链接</div>
		<div class="herf">

			<div class="ui relaxed divided list" v-for="item in list">
				<div class="item">
					<i :class="item.icon"></i>
					<div class="content">
						<a class="header">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;color: black;">{{item.name}}</font>
							</font>
						</a>
						<div class="description">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;"><a :href="item.url" target="view_window"
										style="color:#4183c4;">{{item.url}}</a></font>
							</font>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TableBox',
		components: {},
		data() {
			return {
				tableData: [{
						year: '2021',
						user: '王建文',
						competitionname: '第十二届蓝桥杯全国软件和信息技术专业人才大赛',
						detail: '江苏赛区JavaB组一等奖'
					}, {
						year: '2021',
						user: '王建文',
						competitionname: '第十二届蓝桥杯全国软件和信息技术专业人才大赛',
						detail: '全国总决赛JavaB组优秀奖'
					}, {
						year: '2020',
						user: '王建文',
						competitionname: '工学院职业生涯规划大赛奖',
						detail: '一等奖'
					}, {
						year: '2020',
						user: '王建文',
						competitionname: '第十七届“挑战杯”全国大学生课外学术科技作品竞赛院内选拔赛',
						detail: '二等奖'
					}, {
						year: '2020',
						user: '王建文',
						competitionname: '第六届“东软睿道杯”软件设计大赛',
						detail: '二等奖'
					}, {
						year: '2020',
						user: '王建文',
						competitionname: '科文学院第七届互联网+比赛',
						detail: '二等奖'
					},
					{
						year: '2020',
						user: '王建文',
						competitionname: '科文学院第五期创业路演大赛',
						detail: '一等奖'
					}
				],
				list: [{
					name: "19数据王建文的Github",
					url: "https://github.com/zhinushannan",
					icon: "large github icon"
				}, {
					name: "19软件2李鹏龙的个人博客",
					url: "http://developer-help.cn",
					icon: "large home icon"
				}, {
					name: "20软件2张浩健的CSDN",
					url: "https://blog.csdn.net/weixin_44684069",
					icon: "large paper plane icon"
				}]
			}
		},
		computed: {},
		watch: {},
		methods: {

		},
		created() {

		},
		mounted() {

		}
	}
</script>
<style lang='less' scoped>
	/* pc端 */
	@media only screen and (min-width: 768px) {
		.table-box {
			margin-top: 20px;
			margin-left: 250px;
			margin-right: 250px;
			margin-bottom: 20px;
		}

		.title {
			font-size: 18px;
			font-weight: bold;
			text-align: left;
			margin: 10px 0;
		}

		.herf {

			text-align: left;
			padding: 20px;
		}

	}

	/* 移动端 */
	@media only screen and (max-width: 768px) {
		.table-box {
			margin-top: 20px;
			margin-left: 30px;
			margin-right: 40px;
			margin-bottom: 20px;
		}

		.title {
			font-size: 18px;
			font-weight: bold;
			text-align: left;
			margin: 10px 10px;
		}

		.herf {
			text-align: left;
			padding: 20px;
		}
	}
</style>
