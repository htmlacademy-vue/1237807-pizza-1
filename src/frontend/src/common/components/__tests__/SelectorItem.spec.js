import { shallowMount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";
import RadioButton from "@/common/components/RadioButton";

describe("SelectorItem", () => {
  const stubs = {
    RadioButton
  };

  const propsData = {
    selector: { value: "testValue", type: "testType", name: "testName" },
    checked: "testChecked"
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(SelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out selector name in span when there is not selector description", () => {
    createComponent({ stubs, propsData });
    expect(wrapper.html()).toContain("span");
    expect(wrapper.html()).toContain(propsData.selector.name);
  });

  it("renders out selector name in b when there is selector description", () => {
    propsData.selector.description = "testDescription";
    createComponent({ stubs, propsData });
    expect(wrapper.html()).toContain("b");
    expect(wrapper.html()).toContain(propsData.selector.name);
    expect(wrapper.html()).toContain(propsData.selector.description);
  });
});
