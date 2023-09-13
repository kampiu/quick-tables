declare module "snowflake-id" {
	type Options = {
		mid?: number
		offset?: number
	}

	export default class Snowflake {
		constructor(options?: Options) {
			this.options = options
		}

		generate: () => string
	}
}

declare interface Window {
	/** 是否通过 puppeteer 访问进来的（仪表板页面导出场景） */
	isPuppeteer?: boolean

	/** 初始化页面前，puppteer 访问注册的页面镜像 JSON */
	dashboardPageInteraction?: string

	/** 用于告诉 puppeteer 仪表板页面加载完成（仪表板页面导出场景） */
	isDashboardPageLoaded?: boolean

	/** 是否被qiankun加载 */
	__POWERED_BY_QIANKUN__: boolean

	/** 被qiankun加载的应用，原来的域名 */
	INJECTED_PUBLIC_PATH_BY_QIANKUN: string

	/** config map配置 */
	CONFIG: Record<string, string>

	performance: Performance
} /// <reference types="vite/client" />

declare module "*.less" {
	const content: { [className: string]: string }
	export default content
}
