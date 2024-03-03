import "./LayoutMain.css";

import { ReactNode } from "react";

interface LayoutMainProps {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}

export function LayoutMain({ header, main, footer }: LayoutMainProps) {
  return (
    <>
      <div className="container">
        <div className="header">{header}</div>

        <div className="main">{main}</div>

        <div className="footer">{footer}</div>
      </div>
    </>
  );
}
