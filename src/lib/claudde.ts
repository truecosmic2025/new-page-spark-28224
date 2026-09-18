declare global {
  interface Window {
    Claudde?: {
      open?: () => void;
    };
  }
}

/** Opens the hosted Claudde widget without affecting other CTA behavior. */
export function openClauddeWidget(maxWaitMs = 5000): void {
  const start = Date.now();

  const attempt = () => {
    window.Claudde?.open();

    if (!window.Claudde?.open && Date.now() - start < maxWaitMs) {
      window.setTimeout(attempt, 100);
    }
  };

  attempt();
}
