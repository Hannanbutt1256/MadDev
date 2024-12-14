/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";

// Define the shape of the serialized node
export interface SerializedYoutubeNode extends SerializedLexicalNode {
  id: string;
}

// Helper function to create a YoutubeNode
export const $createYoutubeNode = ({ id }: { id: string }) => {
  return new YoutubeNode({ id });
};

const ID_ATTR = "data-lexical-youtube";

const convertYoutubeElement = (
  domNode: HTMLElement
): DOMConversionOutput | null => {
  const id = domNode?.getAttribute(ID_ATTR);
  if (!id) return null;
  const node = $createYoutubeNode({ id });
  return { node };
};

const HEIGHT = "315px";
const WIDTH = "560px";
const getYoutubeLink = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}`;

export class YoutubeNode extends DecoratorNode<JSX.Element> {
  __id: string;

  constructor({ id, key }: { id: string; key?: NodeKey }) {
    super(key);
    this.__id = id;
  }

  getId(): string {
    return this.__id;
  }

  static getType(): string {
    return "youtube";
  }

  static clone(node: YoutubeNode): YoutubeNode {
    return new YoutubeNode({ id: node.__id, key: node.__key });
  }

  // Export the node data to a JSON object
  exportJSON(): SerializedYoutubeNode {
    return {
      type: "youtube",
      version: 1,
      id: this.__id,
    };
  }

  // Create a node instance from a JSON object
  static importJSON(serializedNode: SerializedYoutubeNode): YoutubeNode {
    return new YoutubeNode({ id: serializedNode.id });
  }

  decorate(): JSX.Element {
    return (
      <iframe
        height={HEIGHT}
        width={WIDTH}
        src={getYoutubeLink(this.__id)}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    return div;
  }

  exportDOM(): DOMExportOutput {
    const iframe = document.createElement("iframe");
    iframe.setAttribute(ID_ATTR, this.__id);
    iframe.setAttribute("height", HEIGHT);
    iframe.setAttribute("width", WIDTH);
    iframe.setAttribute("src", getYoutubeLink(this.__id));
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.setAttribute("allowfullscreen", "true");

    return { element: iframe };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: (_node: Node) => {
        return { conversion: convertYoutubeElement, priority: 0 };
      },
    };
  }
}
