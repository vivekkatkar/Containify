import { createContext, useState, ReactNode } from "react";

interface ContentContextType {
  content: string;
  setContent: (value: string) => void;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [content, setContent] = useState<string>("Sample test");

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};
