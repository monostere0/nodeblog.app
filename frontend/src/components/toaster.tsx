import React, { createContext, createRef } from 'react';
import { Toast, Toaster, Position, Intent, IToaster } from '@blueprintjs/core';

const Toasts: React.FC = () => {
  const toaster = createRef<Toaster>();

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
