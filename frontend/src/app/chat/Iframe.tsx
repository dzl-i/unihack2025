"use client";

import { JSX } from "react";
import { Suspense, useLayoutEffect, useRef, useState } from "react";

type IFrameProps = React.ComponentPropsWithRef<"iframe"> & {
  fallback?: JSX.Element;
};

interface AwaiterRef {
  promise: Promise<void> | null;
  resolve: () => void;
  reject: () => void;
}

export function IFrame(props: IFrameProps) {
  const { fallback, ...rest } = props;

  return (
    <Suspense fallback={fallback}>
      <IFrameImplementation {...rest} />
    </Suspense>
  );
}

function IFrameImplementation(props: React.ComponentPropsWithRef<"iframe">) {
  const awaiter = useRef<AwaiterRef | null>(null);
  // Use void instead of _ to avoid the unused variable warning
  const [, setLoading] = useState(false);

  if (awaiter.current?.promise) {
    throw awaiter.current.promise;
  }

  useLayoutEffect(() => {
    if (awaiter.current === null) {
      const newAwaiter: Partial<AwaiterRef> = {};

      newAwaiter.promise = new Promise<void>((resolve, reject) => {
        newAwaiter.resolve = resolve;
        newAwaiter.reject = reject;
      });

      awaiter.current = newAwaiter as AwaiterRef;
      setLoading(true);
    }
  }, []);

  const { title } = props;

  return (
    <iframe
      {...props}
      title={title}
      onLoad={(e) => {
        if (awaiter.current) {
          awaiter.current.promise = null;
          awaiter.current.resolve();
        }
        props.onLoad?.(e);
      }}
      onError={(err) => {
        if (awaiter.current) {
          awaiter.current.promise = null;
          awaiter.current.reject();
        }
        props.onError?.(err);
      }}
    />
  );
}

export default IFrame;
