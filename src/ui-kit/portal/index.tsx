import { useState, useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom"
import type { Ref } from "../click-outside";

const Portal: FC<{children: ReactNode}> = ({ children }) => {
  const [container, setContainer] = useState<Ref>(null)

  useEffect(() => {
    if (!container) {
      setContainer(document.createElement('div'))
      return
    }

    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return container ? ReactDOM.createPortal(children, container) : null
}

export default Portal