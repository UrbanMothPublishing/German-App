import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function BottomSheet({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  useEffect(() => setRoot(document.getElementById("sheet-root")), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !root) return null;
  return createPortal(
    <div className="pointer-events-auto absolute inset-0 flex flex-col justify-end">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-foreground/30 animate-in fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-label={title}
        className="animate-sheet-up relative max-h-[80%] overflow-y-auto rounded-t-[2rem] bg-card px-5 pb-8 pt-3 shadow-soft"
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        {title && <h2 className="font-display mb-3 text-xl font-bold">{title}</h2>}
        {children}
      </div>
    </div>,
    root,
  );
}
