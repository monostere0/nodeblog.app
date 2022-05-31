import React, { createRef, useEffect } from 'react';
import { Toaster, Position, Intent } from '@blueprintjs/core';

type ToastEvent = Event & { message: string; intent?: Intent };

export const showToast = (message: string, intent?: Intent): void => {
  const toastEvent = new Event('toast') as ToastEvent;
  toastEvent.message = message;
  toastEvent.intent = intent || Intent.PRIMARY;
  window.dispatchEvent(toastEvent);
};

const Toasts: React.FC = () => {
  const toaster = createRef<Toaster>();

  useEffect(() => {
    const listener = (e: any) => {
      console.log(e.message);
      toaster.current?.show({
        message: e.message,
      });
    };
    window.addEventListener('toast', listener);

    return () => {
      window.removeEventListener('toast', listener);
    };
  }, []);

  return (
    <Toaster
      canEscapeKeyClear
      position={Position.TOP}
      usePortal
      maxToasts={2}
      ref={toaster}
    />
  );
};

export default Toasts;
