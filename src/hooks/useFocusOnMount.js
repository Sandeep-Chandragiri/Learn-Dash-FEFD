import { useEffect } from "react";

/**
 * Focuses the element referenced by `ref` on component mount.
 * Used on every page to move focus to the page heading on route changes,
 * satisfying WCAG 2.4.3 (Focus Order) for single-page applications.
 */
export function useFocusOnMount(ref) {
    useEffect(() => {
        if (ref && ref.current) {
            // tabIndex=-1 allows programmatic focus without adding to tab order
            ref.current.focus();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
