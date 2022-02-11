import JWTService from "@/services/jwt.service";
import Error from "@/plugins/error";
import { createResources } from "@/common/helpers";

export default function (store) {
  store.$jwt = JWTService;
  store.$error = new Error(store);
  store.$api = createResources(store.$error, store);
}
