<!-- 内容组件 -->
<template>
	<div class='article'>
		<div class="ui items">
			<div class="item">
				<div class="image">
					<img src="../assets/img/coder.png">
				</div>
				<div class="content">
					<a class="header">
						<font style="vertical-align: inherit;">
							<font style="vertical-align: inherit;">工作室介绍</font>
						</font>
					</a>
					<div class="meta">
						<span>
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">科文学院双创楼411室</font>
							</font>
						</span>
					</div>
					<div class="description">
						<p></p>
					</div>
					<div class="extra">
						<font style="vertical-align: inherit;">
							<font style="vertical-align: inherit;">
								【基本介绍】：实干青年工作室是由19数据王建文组织信工系的同学而成，主要工作方向是蓝桥杯指导训练、比赛指导、学习指导等，同时团队也正在积极准备比赛。
							</font><br />
							<font style="vertical-align: inherit;">
								【人员配置】：成员主要来自于信工系有较强技术能力的同学，拥有独立的工作地点进行比赛交流、项目开发等事宜。
							</font><br />
							<font style="vertical-align: inherit;">
								【团队定位】：取得进步的首先要感谢石玲老师的指导，我们会不断提升自己的能力，共同努力进步，提供共同学习的平台。
							</font><br />

						</font>

					</div>
				</div>
			</div>

			<el-divider></el-divider>
			<div class="title">工作室成员</div>
			<!-- pc端显示的 -->
			<div class="ui four cards moiblie-hide">
				<div class="card" v-for="(item,index) in list">
					<div class="image">
						<img :src="item.img">
					</div>

					<div class="content">
						<div class="header">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">{{item.name}}</font>
							</font>
						</div>
						<div class="meta">
							<a>
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">{{item.class}}</font>
								</font>
							</a>
						</div>
						<div class="description">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">
									{{item.content}}
								</font>
							</font>
						</div>
					</div>
					<div class="extra content">
						<span class="right floated">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">
									<div>
										<span class="ui teal tag mini label">
											<font style="vertical-align: inherit;">
												<font style="vertical-align: inherit;">{{item.tags}}</font>
											</font>
										</span>
									</div>
								</font>
							</font>
						</span>

					</div>
				</div>
			</div>
			<!-- 移动端显示的 -->
			<div class="ui two cards pc-hide">
				<div class="card" v-for="(item,index) in list">

					<div class="image">
						<img :src="item.img">
					</div>

					<div class="content">
						<div class="header">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">{{item.name}}</font>
							</font>
						</div>
						<div class="meta">
							<a>
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">{{item.class}}</font>
								</font>
							</a>
						</div>
						<div class="description">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">
									{{item.content}}
								</font>
							</font>
						</div>
					</div>
					<div class="extra content">
						<span class="right floated">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">
									<div>
										<span class="ui teal tag mini label">
											<font style="vertical-align: inherit;">
												<font style="vertical-align: inherit;">{{item.tags}}</font>
											</font>
										</span>
									</div>
								</font>
							</font>
						</span>

					</div>
				</div>
			</div>

		</div>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'Article',
		components: {},
		data() {
			return {
				list: [{
					name: "王建文",
					class: "19数据",
					content: "熟悉前后端主流框架及微服务架构，具有Spring Cloud Alibaba等相关框架经验，了解缓存技术及机制，有丰富的比赛经验和项目经历，能够负责项目的整体把控",
					tags: "架构",
					img: "https://semantic-ui.com/images/avatar/large/elliot.jpg"
				}, {
					name: "马思宇",
					class: "20汉语言",
					content: "能够理解软件的交互性以及逻辑性，有良好的产品分析及设计能力，能够提出产品需求方案，规划产品发展方向，撰写功能的设计及相关文档",
					tags: "产品",
					img: "https://semantic-ui.com/images/avatar/large/helen.jpg"
				}, {
					name: "李鹏龙",
					class: "19软件2",
					content: "熟悉前后端主流框架等技术，有前后端分离开发经历，了解并使用过一些互联网相关中间件技术，有服务器端经验，了解分布式系统设计",
					tags: "前后端",
					img: "https://semantic-ui.com/images/avatar/large/jenny.jpg"
				}, {
					name: "陆雪艳",
					class: "19软件2",
					content: "熟悉vue全家桶及常用的UI框架，了解Node.js、ES6、Webpack等web知识，能够按需配置vue-cil等脚手架，能完成前端模块化的搭建",
					tags: "前端",
					img: "https://semantic-ui.com/images/avatar/large/veronika.jpg"
				}, {
					name: "张浩健",
					class: "20软件1",
					content: "对前后端框架有一定的掌握和应用经验，有机器学习项目经验，有Linux系统使用经验，熟悉常用命令，及故障判断和解决能力",
					tags: "前后端",
					img: "https://semantic-ui.com/images/avatar/large/steve.jpg"
				}, {
					name: "陈蝶",
					class: "20软件2",
					content: "扎实的数理基础和计算机软件开发基础，掌握数据结构、算法、计算机网络等知识，思维活跃，有比较强的问题分析及解决能力",
					tags: "算法",
					img: "https://semantic-ui.com/images/avatar/large/stevie.jpg"
				}, {
					name: "张彦伟",
					class: "20软件2",
					content: "熟悉后端框架，有一定的前端基础，熟悉web页面架构和布局，能合理的分解任务并独立完成系统功能模块，能够分析并解决软件开发过程中的问题",
					tags: "后端",
					img: "https://semantic-ui.com/images/avatar/large/elliot.jpg"
				}, {
					name: "包祥龙",
					class: "20软件1",
					content: " 基础扎实，熟练掌握并常用后端技术框架，能编写高质量简洁清晰的代码，能够使用Git等版本工具参与多人开发，掌握数据结构、算法等知识",
					tags: "算法",
					img: "https://semantic-ui.com/images/avatar/large/jenny.jpg"
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
	@media only screen and (min-width: 768px) {
		.article {
			margin-top: 20px;
			margin-left: 250px;
			margin-right: 250px;
			border-bottom: 1px solid #d9d9d9;
			padding-bottom: 30px;
			text-align: left;
		}

		.title {
			font-size: 18px;
			font-weight: bold;
			text-align: left;
			margin: 10px 0;
		}

		.pc-hide {
			display: none;
		}



	}



	@media only screen and (max-width: 768px) {
		.article {
			padding: 0 10px 20px;
			margin: 1.875rem;
		}

		.poster {
			img {
				width: 100%;
				height: 150px;
				object-fit: cover;
				display: block;
			}
		}

		.title {
			font-size: 18px;
			font-weight: bold;
			text-align: left;
			margin: 10px 0;
		}

		.moiblie-hide {
			display: none;
		}
	}



	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
</style>
