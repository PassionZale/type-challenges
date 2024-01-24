import { defineConfig } from "vitepress";
import { head } from "./config/head";
import { nav } from "./config/nav";
import { sidebar } from "./config/sidebar";

export default defineConfig({
  lang: "zh-CN",

  title: "Type Challenges",

  description: "Collection of TypeScript type challenges with OJ",

  head,

  lastUpdated: true,

  cacheDir: "../../node_modules",

  themeConfig: {
    aside: false,

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    nav,

    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/PassionZale/type-challenges" },
    ],

    lastUpdatedText: "最后更新时间",

    editLink: {
      pattern: "https://github.com/PassionZale/type-challenges/edit/main/docs/:path",
      text: "编辑此页",
    },

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Lei Zhang",
    },
  },
});
