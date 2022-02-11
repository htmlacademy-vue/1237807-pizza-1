import Vue from "vue";
import JWTService from "@/services/jwt.service";
import Error from "@/plugins/error";
import store from "@/store";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $error: () => new Error(store),
        $api() {
          return createResources(this.$error, store);
        },
      },
    });
  },
};

Vue.use(plugins);
