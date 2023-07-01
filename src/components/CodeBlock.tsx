import { Language, highlightHast } from "tree-sitter-highlight";

const SUPPORTED_LANGUAGES = [
  "eclair",
  "haskell",
  "bash",
  "c",
  "llvm",
  "typescript",
  "rust",
  "lua",
] as const;

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

const toLanguage = (str: (typeof SUPPORTED_LANGUAGES)[number]) => {
  switch (str) {
    case "eclair":
      return Language.Eclair;
    case "haskell":
      return Language.Haskell;
    case "bash":
      return Language.Bash;
    case "c":
      return Language.C;
    case "llvm":
      return Language.LLVM;
    case "typescript":
      return Language.TS;
    case "rust":
      return Language.Rust;
    case "lua":
      return Language.Lua;
    default:
      throw new Error(`Unsupported language: ${str}`);
  }
};

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const ast = highlightHast(code.trim(), toLanguage(language)) as AST;
  return (
    <div className="w-full">
      <pre className="not-prose max-w-prose overflow-x-auto p-4 rounded-md shadow-md bg-[#fafafa]">
        <code className={`not-prose language-${language}`}>
          {renderAST(ast)}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
