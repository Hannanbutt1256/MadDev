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
export interface ImageNodePayload {
  src: string;
  altText: string;
  maxWidth: number;
  width?: "inherit" | number;
  height?: "inherit" | number;
}

export interface SerializedImageNode
  extends SerializedLexicalNode,
    ImageNodePayload {}

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __height: "inherit" | number;
  __width: "inherit" | number;
  __maxWidth: number;

  constructor({
    src,
    altText,
    maxWidth,
    width,
    height,
    key,
  }: {
    src: string;
    altText: string;
    maxWidth: number;
    width?: "inherit" | number;
    height?: "inherit" | number;
    key?: NodeKey;
  }) {
    super(key);
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__maxWidth = maxWidth;
    this.__src = src;
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({
      altText: node.__altText,
      src: node.__src,
      height: node.__height,
      width: node.__width,
      maxWidth: node.__maxWidth,
    });
  }

  // Export the node data to a JSON object
  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
      height: this.__height,
      width: this.__width,
      maxWidth: this.__maxWidth,
    };
  }

  // Create a node instance from a JSON object
  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const {
      src,
      altText,
      height = "inherit",
      width = "inherit",
      maxWidth,
    } = serializedNode;
    return new ImageNode({ src, altText, height, width, maxWidth });
  }

  getSrc(): string {
    return this.__src;
  }

  getAlt(): string {
    return this.__altText;
  }

  decorate(): JSX.Element {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{
          width: this.__width,
          height: this.__height,
          maxWidth: this.__maxWidth,
        }}
      />
    );
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const image = document.createElement("img");
    image.setAttribute("src", this.__src);
    image.setAttribute("alt", this.__altText);
    if (this.__width !== "inherit")
      image.setAttribute("width", `${this.__width}`);
    if (this.__height !== "inherit")
      image.setAttribute("height", `${this.__height}`);
    return { element: image };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_node: Node) => {
        return { conversion: convertImageElement, priority: 0 };
      },
    };
  }
}

// Helper function to create an ImageNode
export const $createImageNode = ({
  altText,
  height,
  maxWidth = 400,
  src,
  width,
}: ImageNodePayload) => {
  return new ImageNode({ altText, height, maxWidth, src, width });
};

// Conversion function for DOM import
const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt } = domNode;
    const node = $createImageNode({
      src,
      altText: alt,
      maxWidth: 400,
    });
    return { node };
  }
  return null;
};
