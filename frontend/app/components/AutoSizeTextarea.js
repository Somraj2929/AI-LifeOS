import { useEffect, useRef } from "react";

export default function AutoSizeTextarea({ value }) {
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      readOnly
      className="w-full p-2 border rounded text-gray-800 text-[16px] resize-none overflow-hidden"
      value={value}
    />
  );
}
