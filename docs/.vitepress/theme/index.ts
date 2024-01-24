import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import Logo from "./components/Logo.vue";
import "./styles/reset.css";

type Module = { [key: string]: any };

const modules = import.meta.glob(["./components/**/*.vue"], {
  eager: true,
});

const components: Component[] = [];

for (const path in modules) {
  components.push((modules[path] as Module).default);
}

export default {
  ...DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      /**
       * 插槽参考
       *
       * @see layout-slots https://vitepress.dev/guide/extending-default-theme#layout-slots
       */
      "nav-bar-title-before": () =>
        h(Logo, {
          width: 40,
          height: 40,
          style: { marginRight: "10px", display: "block" },
        }),
    });
  },

  enhanceApp({ app }: { app: App }) {
    components.forEach((component) => {
      if (component.name) {
        app.component(component.name, component);
      }
    });
  },
};
