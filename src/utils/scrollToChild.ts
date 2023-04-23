// Scroll to last child found in DOM with a delay
export type ScrollToLastChildOptions = {
  delay: number;
  offset: number;
};

const defaultOptions: ScrollToLastChildOptions = {
  delay: 100,
  offset: 0,
};

export function scrollToLastChild(
  element: HTMLElement | null,
  selector: string,
  options: Partial<ScrollToLastChildOptions>
) {
  if (!element) return;

  const opts: ScrollToLastChildOptions = {
    ...defaultOptions,
    ...options,
  };

  setTimeout(() => {
    const childElements = element.querySelectorAll(selector);
    const lastChildElement = childElements?.[childElements.length - 1];

    lastChildElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, opts.delay);
}
