import type { CDCodeEditorLanguage } from "./types";

interface TokenRule {
  type: string;
  regex: RegExp;
}

const JS_TS_RULES: TokenRule[] = [
  { type: "comment", regex: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g },
  { type: "string", regex: /(`[\s\S]*?`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
  { type: "keyword", regex: /\b(import|export|from|as|default|const|let|var|function|return|if|else|switch|case|break|for|while|do|try|catch|finally|throw|new|class|extends|interface|type|enum|implements|async|await|typeof|instanceof|void|yield)\b/g },
  { type: "boolean", regex: /\b(true|false|null|undefined)\b/g },
  { type: "number", regex: /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/g },
  { type: "type", regex: /\b(string|number|boolean|any|unknown|never|void|Record|Array|Promise|Set|Map|ReactNode|ReactElement)\b/g },
  { type: "function", regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g },
  { type: "operator", regex: /(=>|===|!==|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||[+\-*/%&|^!~?:=<>])/g },
];

const PYTHON_RULES: TokenRule[] = [
  { type: "comment", regex: /(#[^\n]*)/g },
  { type: "string", regex: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
  { type: "keyword", regex: /\b(def|class|import|from|as|return|if|elif|else|for|while|try|except|finally|raise|with|pass|break|continue|lambda|yield|async|await|is|in|not|and|or)\b/g },
  { type: "boolean", regex: /\b(True|False|None)\b/g },
  { type: "number", regex: /\b\d+(?:\.\d+)?\b/g },
  { type: "function", regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g },
];

const SQL_RULES: TokenRule[] = [
  { type: "comment", regex: /(--[^\n]*|\/\*[\s\S]*?\*\/)/g },
  { type: "string", regex: /('(?:''|[^'])*')/g },
  { type: "keyword", regex: /\b(SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|CREATE|TABLE|DROP|ALTER|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|AND|OR|NOT|IN|LIKE|IS|NULL|AS|UNION|ALL|DISTINCT|CASE|WHEN|THEN|ELSE|END)\b/gi },
  { type: "number", regex: /\b\d+(?:\.\d+)?\b/g },
];

const CSS_RULES: TokenRule[] = [
  { type: "comment", regex: /(\/\*[\s\S]*?\*\/)/g },
  { type: "string", regex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
  { type: "keyword", regex: /(@[a-zA-Z-]+|!important)/g },
  { type: "number", regex: /\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|deg)?\b/g },
  { type: "type", regex: /([a-zA-Z-]+)(?=\s*:)/g },
];

const HTML_RULES: TokenRule[] = [
  { type: "comment", regex: /(<!--[\s\S]*?-->)/g },
  { type: "string", regex: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
  { type: "tag", regex: /(<\/?[a-zA-Z0-9-]+|\/?>)/g },
  { type: "keyword", regex: /\b([a-zA-Z-]+)(?=\s*=)/g },
];

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function highlightCode(code: string, language: CDCodeEditorLanguage): string {
  if (language === "plaintext" || !code) {
    return escapeHtml(code);
  }

  let rules = JS_TS_RULES;
  if (language === "python") rules = PYTHON_RULES;
  else if (language === "sql") rules = SQL_RULES;
  else if (language === "css") rules = CSS_RULES;
  else if (language === "html") rules = HTML_RULES;
  else if (language === "json") {
    return escapeHtml(code)
      .replace(/(&quot;.*?&quot;)(?=\s*:)/g, '<span class="cinder-tok-key">$1</span>')
      .replace(/:\s*(&quot;.*?&quot;)/g, ': <span class="cinder-tok-string">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="cinder-tok-boolean">$1</span>')
      .replace(/\b(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/g, '<span class="cinder-tok-number">$1</span>');
  }

  let escaped = escapeHtml(code);

  rules.forEach(({ type, regex }: TokenRule) => {
    escaped = escaped.replace(regex, (match: string) => {
      return `<span class="cinder-tok-${type}">${match}</span>`;
    });
  });

  return escaped;
}
