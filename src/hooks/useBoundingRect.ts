import { useLayoutEffect, useRef, useState } from "react"
import { debounce } from "@/helpers/debounce"

interface Listener {
  (event?: UIEvent): void
}

export const useBoundingRect = () => {
  const container = useRef<HTMLDivElement>(null)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const instantUpdate: Listener = () => {
      if (container.current) {
        const { width, height } = container.current.getBoundingClientRect()
        setWidth(width)
        setHeight(height)
      }
    }

    // initialize
    instantUpdate()

    // on resize
    const debouncedUpdate = debounce(instantUpdate, 600)
    window.addEventListener("resize", debouncedUpdate)

    return () => window.removeEventListener("resize", debouncedUpdate)
  }, [])

  return {
    container,
    width,
    height,
  }
}
