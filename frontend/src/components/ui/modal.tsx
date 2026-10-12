"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { PillButton } from "./pill-button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: ReactNode;
  icon?: ReactNode;
  actionLabel?: string;
}

export function Modal({ open, onClose, title, message, icon, actionLabel = "ปิด" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
  <dialog
    ref={dialogRef}
    aria-labelledby={titleId}
    onClose={onClose}
    onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}
    className="m-auto w-[min(340px,calc(100vw-32px))] rounded-[20px] bg-white p-0 backdrop:bg-black/40"
  >
    <div className="relative px-6 pb-[40px] pt-[44px] text-center">
      <button
        type="button"
        onClick={onClose}
        aria-label="ปิด"
        className="absolute right-[15px] top-[15px] grid size-[26px] place-items-center text-muted"
      >
        <svg viewBox="0 0 18 18" aria-hidden className="size-[18px]">
          <path d="M2 2l14 14M16 2 2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <h2 id={titleId} className="text-[24px] font-semibold leading-none text-strong">
        {title}
      </h2>
      <div className="mt-[22px] text-[16px] leading-none text-body">{message}</div>
      <PillButton size="md" className="mx-auto mt-[38px] w-[177px]" onClick={onClose}>
        {actionLabel}
      </PillButton>
    </div>
  </dialog>
);
}