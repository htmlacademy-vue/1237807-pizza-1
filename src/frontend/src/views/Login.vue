<template>
  <div class="wrapper">
    <div class="sign-form">
      <router-link class="close close--white" to="/">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form @submit.prevent="login">
        <div class="sign-form__input">
          <Input
            ref="email"
            v-model="email"
            type="email"
            name="email"
            label="E-mail"
            placeholder="example@mail.ru"
            data-test="email-input"
            :error-text="validations.email.error"
          />
        </div>
        <div class="sign-form__input">
          <Input
            ref="password"
            v-model="password"
            type="password"
            name="password"
            label="Пароль"
            placeholder="***********"
            data-test="password-input"
            :error-text="validations.password.error"
          />
        </div>
        <Button type="submit">Авторизоваться</Button>
      </form>
    </div>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";

export default {
  name: "Login",
  mixins: [validator],
  data: () => ({
    email: "",
    password: "",
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
  methods: {
    async login() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      await this.$store.dispatch("fetchAuthorizedOnlyData");
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}
.sign-form {
  position: fixed;
}
</style>
