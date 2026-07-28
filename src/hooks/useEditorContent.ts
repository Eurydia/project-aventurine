import { useCallback, useState } from "react";

export const useEditorContent = (hrefURL: string, localStorageKey: string) => {
  const [editorContent, setEditorContentInner] = useState(() => {
    const url = new URL(hrefURL);

    const content = url.searchParams.get("content");
    if (content !== null) {
      window.localStorage.setItem(localStorageKey, content);
      return content;
    }

    const savedContent = window.localStorage.getItem(localStorageKey);
    if (savedContent !== null) {
      try {
        return JSON.parse(savedContent);
      } catch {
        return savedContent;
      }
    }
    return `\
// PROCESSES      :   #; <- end the line with a semicolon
// IF_ELSE        :   if (#) { # } else { # } 
// FOR_LOOP       :   for (#) { # } 
// WHILE_LOOP     :   while (#) { # }
// DO_WHILE_LOOP  :   do { # } while (#);
// FUNCTION       :   # #(#) {} Like this -> int func_name(int x, int y) {}`;
  });

  const setEditorContent = useCallback(
    (content: string) => {
      setEditorContentInner(content);
      window.localStorage.setItem(localStorageKey, JSON.stringify(content));
    },
    [localStorageKey],
  );

  return { editorContent, setEditorContent };
};
