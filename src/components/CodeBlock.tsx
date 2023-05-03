import { highlightHast } from "tree-sitter-highlight";

const SUPPORTED_LANGUAGES = ["eclair"] as const;

interface CodeBlockProps {
  language: (typeof SUPPORTED_LANGUAGES)[number];
  code: string;
}

type ASTNode =
  | {
    type: "element";
    tagName: "span";
    properties: {
      className: string;
    };
  }
  | {
    type: "text";
    value: string;
  };

type AST = ASTNode & {
  children?: AST[];
};

const tokenToClass = (token: string) => {
  switch (token) {
    case "keyword":
      return "text-violet-500 ";
    case "punctuation bracket":
    case "punctuation delimiter":
    case "punctuation special":
      return "text-violet-400";
    // return "text-[#fa8d3e]";
    case "type":
      return "text-[#fa8d3e]";
    case "constant":
      return "text-[#a37acc]";
    case "string":
      return "text-[#86b300]";
    case "number":
      return "text-[#ff9940]";
    case "operator":
      return "text-[#ed9366]";
    case "comment":
      return "text-[#607880]";
    case "variable":
      return "";
    case "function":
      return "text-[#f2ae49]";
    default:
      return "text-[#575f66]";
  }
};

const renderAST = (ast: AST, i?: number) => {
  switch (ast.type) {
    case "element": {
      return (
        <span key={i} className={tokenToClass(ast.properties.className)}>
          {ast.children?.map(renderAST)}
        </span>
      );
    }
    case "text": {
      return ast.value;
    }
  }
};

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const ast = highlightHast(code.trim()) as AST;
  return (
    <pre className="bg-[#fafafa] p-4 rounded-md shadow-md">
      <code className={`language-${language}`}>{renderAST(ast)}</code>
    </pre>
  );
};

export default CodeBlock;
