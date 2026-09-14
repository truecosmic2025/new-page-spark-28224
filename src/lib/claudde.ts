/**
 * Opens the Claudde chat widget by clicking its launcher button.
 * The widget mounts as a shadow-DOM host; we search the document for an
 * element with a non-null shadowRoot, retrying for a few seconds while the
 * deferred script loads.
 */
export function openClauddeWidget(maxWaitMs = 5000): void {
  const start = Date.now();

  const attempt = () => {
    const host = Array.from(document.querySelectorAll<HTMLElement>("*")).find(
      (el) => el.shadowRoot !== null
    );

    if (host?.shadowRoot) {
      const launcher = host.shadowRoot.querySelector<HTMLElement>("button");
      if (launcher) {
        launcher.click();
        return;
      }
    }

    if (Date.now() - start < maxWaitMs) {
      setTimeout(attempt, 250);
    }
  };

  attempt();
}
