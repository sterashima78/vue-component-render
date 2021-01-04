import { VNodeData, CreateElement, VNode } from "vue";

export type EleNode = {
  id: string;
  name?: string;
  slot?: string;
  tag: string;
  attributes?: {
    [name: string]: string | boolean | number;
  };
  style?: {
    [name: string]: string;
  };
  classes?: string[];
  on?: {
    [event: string]: <T>(event: T) => void;
  };
  domProps?: {
    [name: string]: string;
  };
};

export type Node = EleNode | string;

export type GetNodeName = (node: Node) => string;

export type NodeTreeChildren = Array<string | NodeTree>;

export type NodeTree = {
  value: Readonly<EleNode>;
  forest: NodeTreeChildren;
};

export type NodeData = {
  tag: string;
  data: VNodeData;
};

export type MakeNodeTree = (
  value: EleNode,
  children: NodeTreeChildren
) => NodeTree;

export const makeNodeTree: MakeNodeTree = (value, children) => ({
  value,
  forest: children
});

type ToNodeData = (node: EleNode) => NodeData;
type PostPrecesser = (before: NodeData) => NodeData;
type NodeDataConverterFactory = (processer?: PostPrecesser) => ToNodeData;
export const nodeDataConverterFactory: NodeDataConverterFactory = processer => node => {
  const { tag, id, attributes, style, classes, slot, domProps, on } = node;
  const styles = style || {};
  const nodeData = {
    tag,
    data: {
      attrs: {
        ...domProps,
        id
      },
      props: attributes,
      style: styles,
      class: classes,
      slot,
      on
    }
  };
  return processer ? processer(nodeData) : nodeData;
};
type NodeRender = (data: NodeTree) => VNode;
type NodeRenderFactory = (
  h: CreateElement,
  converter: ToNodeData
) => NodeRender;
export const nodeRenderFactory: NodeRenderFactory = (h, converter) => {
  const render = (d: NodeTree): VNode => {
    const { tag, data } = converter(d.value);
    return h(
      tag,
      {
        ...data
      },
      d.forest.map(i => (typeof i === "string" ? i : render(i)))
    );
  };
  return render;
};
