module.exports = {
	productionSourceMap: false,//防止打包生成map文件
	publicPath: './', // 基本路径
	// publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //打包app需要修改
	lintOnSave: false, // 取消校验代码
	outputDir: 'dist' // 输出文件目录
}
