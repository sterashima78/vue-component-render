import { mount, createLocalVue } from "@vue/test-utils";
import {
  nodeRenderFactory,
  nodeDataConverterFactory,
  makeNodeTree as make
} from "..";
import Hoge from "./test.vue";
describe("nodeRenderFactory", () => {
  test("test", () => {
    const localVue = createLocalVue();
    localVue.component("hoge", Hoge);
    const mockFn = jest.fn();
    const wrapper = mount(
      {
        render: h =>
          nodeRenderFactory(
            h,
            nodeDataConverterFactory(d => ({
              ...d,
              data: {
                ...d.data,
                attrs: {
                  ...d.data.attrs,
                  "data-append": "true"
                }
              }
            }))
          )(
            make(
              {
                tag: "hoge",
                id: "hoge",
                style: {
                  background: "#aaa",
                  color: "#fff"
                },
                classes: ["a", "b", "c"],
                domProps: {
                  "data-test": "test"
                },
                attributes: {
                  msg: "hoge"
                },
                on: {
                  hogehoge: mockFn
                }
              },
              [
                "foo",
                make(
                  {
                    id: "foo",
                    tag: "span",
                    domProps: {
                      "data-test": "test"
                    }
                  },
                  ["bar"]
                ),
                "bar",
                make(
                  {
                    id: "foo",
                    tag: "span",
                    domProps: {
                      "data-test": "test"
                    },
                    slot: "not-default"
                  },
                  ["bar"]
                )
              ]
            )
          )
      },
      { localVue }
    );
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <button data-test="test" id="hoge" data-append="true" class="a b c" style="background: rgb(170, 170, 170); color: rgb(255, 255, 255);">
        <h1>hoge</h1>
        <div class="one">foo<span data-test="test" id="foo" data-append="true">bar</span>bar</div>
        <div class="two"><span data-test="test" id="foo" data-append="true">bar</span></div>
      </button>
    `);
    wrapper.find("button").trigger("click");
    expect(mockFn.mock.calls).toEqual([[1]]);
  });
});
