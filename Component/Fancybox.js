import React, { useRef, useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
// import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

function Fancybox({ options, delegate, children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegateSelector = delegate || '[data-fancybox]';
    const optionsObject = options || {};

    NativeFancybox.bind(container, delegateSelector, optionsObject);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, [options, delegate]);

  return <div ref={containerRef}>{children}</div>;
}

export default Fancybox;
