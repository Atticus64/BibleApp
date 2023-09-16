/**
 * Dispatch event on click outside of node
 * @param {HTMLElement & CustomEventInit} node
 */
export function clickOutside(node) {
  const handleClick = (/** @type {{ target: any; defaultPrevented: boolean; }} */ event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}
