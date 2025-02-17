import { useContext } from "react";
import { ContentContext } from "../context/contentContext";
import { AnimatedSpan, Terminal, TypingAnimation } from "../components/magicui/terminal";

export function TerminalDemo() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("TerminalDemo must be used within a ContentProvider");
  }

  const { content } = context;

  return (
    <Terminal>
      <TypingAnimation>{`> ${content}`}</TypingAnimation>
    </Terminal>
  );
}
