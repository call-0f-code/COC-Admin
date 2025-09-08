interface ToastEvent {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

class GlobalToast {
  private eventTarget = new EventTarget();

  // Methods to trigger toasts from anywhere
  success(message: string, duration?: number) {
    this.emit({ type: 'success', message, duration });
  }

  error(message: string, duration?: number) {
    this.emit({ type: 'error', message, duration });
  }

  info(message: string, duration?: number) {
    this.emit({ type: 'info', message, duration });
  }

  warning(message: string, duration?: number) {
    this.emit({ type: 'warning', message, duration });
  }

  // Internal methods
  private emit(toast: ToastEvent) {
    const event = new CustomEvent('toast', { detail: toast });
    this.eventTarget.dispatchEvent(event);
  }

  // Subscribe to toast events (used by ToastProvider)
  subscribe(callback: (toast: ToastEvent) => void) {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEvent>;
      callback(customEvent.detail);
    };
    
    this.eventTarget.addEventListener('toast', handler);
    
    // Return cleanup function
    return () => {
      this.eventTarget.removeEventListener('toast', handler);
    };
  }
}

export const globalToast = new GlobalToast();