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
      className="m-auto w-[min(85vw,280px)] rounded-2xl bg-white p-0 shadow-xl backdrop:bg-black/40"
    >
      <div className="relative px-6 pb-6 pt-8 text-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-xl text-muted hover:bg-neutral-100"
        >
          ×
        </button>
        {icon && <div className="mb-3 flex justify-center">{icon}</div>}
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        <div className="mt-1 text-sm text-muted">{message}</div>
        <PillButton size="md" className="mt-5 w-full" onClick={onClose}>
          {actionLabel}
        </PillButton>
      </div>
    </dialog>
  );
}