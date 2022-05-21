import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import AppInput from "@/common/components/AppInput";
import AppButton from "@/common/components/AppButton";
import flushPromises from "flush-promises";

const localVue = createLocalVue();

localVue.component("AppInput", AppInput);
localVue.component("AppButton", AppButton);

localVue.use(Vuex);

const mockAddress = {
  id: 1,
  name: "Тестовый адрес",
  street: "улица Тестовая",
  building: "11",
  flat: "1",
  comment: "Привет",
  userId: "string"
};

describe("ProfileAddressForm", () => {
  let store;
  let wrapper;
  let propsData;

  const createComponent = options => {
    wrapper = mount(ProfileAddressForm, options);
  };

  beforeEach(() => {
    propsData = {
      addressToEdit: null
    };
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders address name if addressToEdit exists", async () => {
    propsData.addressToEdit = mockAddress;
    createComponent({ localVue, store, propsData });
    const addressName = wrapper.find("b");
    expect(addressName.text()).toBe(mockAddress.name);
  });

  it("renders 'Новый адрес' if addressToEdit doesn't exist", async () => {
    createComponent({ localVue, store, propsData });
    const addressName = wrapper.find("b");
    expect(addressName.text()).toBe("Новый адрес");
  });

  it("sets the initial model values", () => {
    propsData.addressToEdit = mockAddress;
    createComponent({ localVue, store, propsData });
    const nameInput = wrapper.find('[data-test="name-input"]');
    const streetInput = wrapper.find('[data-test="street-input"]');
    const buildingInput = wrapper.find('[data-test="building-input"]');
    const flatInput = wrapper.find('[data-test="flat-input"]');
    const commentInput = wrapper.find('[data-test="comment-input"]');
    expect(nameInput.vm.$props.value).toBe(mockAddress.name);
    expect(streetInput.vm.$props.value).toBe(mockAddress.street);
    expect(buildingInput.vm.$props.value).toBe(mockAddress.building);
    expect(flatInput.vm.$props.value).toBe(mockAddress.flat);
    expect(commentInput.vm.$props.value).toBe(mockAddress.comment);
  });

  it("name input has error message when name is empty", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.setData({
      validations: { name: { error: "Поле обязательно для заполнения" } }
    });
    const nameInput = wrapper.find('[data-test="name-input"]');
    expect(nameInput.vm.$props.errorText).toBe(
      "Поле обязательно для заполнения"
    );
  });

  it("street input has error message when street is empty", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.setData({
      validations: { street: { error: "Поле обязательно для заполнения" } }
    });
    const streetInput = wrapper.find('[data-test="street-input"]');
    expect(streetInput.vm.$props.errorText).toBe(
      "Поле обязательно для заполнения"
    );
  });

  it("building input has error message when building is empty", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.setData({
      validations: { building: { error: "Поле обязательно для заполнения" } }
    });
    const buildingInput = wrapper.find('[data-test="building-input"]');
    expect(buildingInput.vm.$props.errorText).toBe(
      "Поле обязательно для заполнения"
    );
  });

  it("renders remove button if addressToEdit exists", async () => {
    propsData.addressToEdit = mockAddress;
    createComponent({ localVue, store, propsData });
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    expect(removeButton.exists()).toBeTruthy();
  });

  it("doesn't render remove button if addressToEdit doesn't exist", async () => {
    createComponent({ localVue, store, propsData });
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    expect(removeButton.exists()).toBeFalsy();
  });

  it("calls delete action on click on remove button", async () => {
    propsData.addressToEdit = mockAddress;
    createComponent({ localVue, store, propsData });
    const spyOnRemoveAddress = jest.spyOn(wrapper.vm, "addressDelete");
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    await removeButton.trigger("click");
    expect(spyOnRemoveAddress).toHaveBeenCalled();
  });

  it("closes form after deleting address", async () => {
    propsData.addressToEdit = mockAddress;
    createComponent({ localVue, store, propsData });
    wrapper.vm.addressDelete = jest.fn(() => Promise.resolve());
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    await removeButton.trigger("click");
    await flushPromises();
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("submit button disabled when form is not valid", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.setData({ isFormValid: false });
    const submitButton = wrapper.find('[data-test="submit-btn"]');
    expect(submitButton.attributes("disabled")).toBeTruthy();
  });

  it("submit button is not disabled when form is valid", async () => {
    createComponent({ localVue, store, propsData });
    const submitButton = wrapper.find('[data-test="submit-btn"]');
    expect(submitButton.attributes("disabled")).toBeFalsy();
  });

  it("validation mixin has been called on form submit", async () => {
    createComponent({ localVue, store, propsData });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const spyPostAddress = jest.spyOn(wrapper.vm, "addressPost");
    const spyPutAddress = jest.spyOn(wrapper.vm, "addressPut");
    await wrapper.find("form").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(spyPostAddress).not.toHaveBeenCalled();
    expect(spyPutAddress).not.toHaveBeenCalled();
  });

  it("emits close event on click on cancel button", async () => {
    createComponent({ localVue, store, propsData });
    const cancelButton = wrapper.find('[data-test="cancel-btn"]');
    await cancelButton.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
