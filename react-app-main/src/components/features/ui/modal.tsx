import type { ReactNode } from "react";
import { Button } from "./button";

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  small?: boolean;
}

export function Modal({ title, subtitle, onClose, children, footer }: ModalProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-stretch justify-center bg-emerald-950/60 backdrop-blur-sm lg:items-center lg:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="rb-modal flex h-full w-full flex-col bg-[#eef3e8] text-emerald-950 lg:h-auto lg:max-h-[90vh] lg:max-w-2xl lg:rounded-2xl lg:border lg:border-emerald-900/15"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-emerald-900/15 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-medium">{title}</h2>
          <Button variant="tertiary" onClick={onClose} type="button">
            Close
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {subtitle ? <p className="mb-4 text-sm text-emerald-950/65">{subtitle}</p> : null}
          {children}
          {footer ? <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
