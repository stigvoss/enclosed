import type { Component } from 'solid-js';
import { onCleanup, onMount } from 'solid-js';
import { useI18n } from '@/modules/i18n/i18n.provider';

export const ImagePreviewDialog: Component<{ file: File; onClose: () => void }> = (props) => {
  const { t } = useI18n();
  // The file is decrypted in memory only, the blob URL is never persisted and revoked on close
  const url = URL.createObjectURL(props.file);
  let dialogRef: HTMLDialogElement | undefined;

  // A native modal dialog makes the background inert, traps Tab/Shift+Tab,
  // closes on Escape and restores focus to the previously focused element on close
  onMount(() => dialogRef?.showModal());
  onCleanup(() => URL.revokeObjectURL(url));

  return (
    <dialog
      ref={dialogRef}
      class="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-black/80 p-4 open:flex backdrop:bg-transparent"
      aria-label={props.file.name}
      onClose={() => props.onClose()}
      onClick={event => event.target === event.currentTarget && dialogRef?.close()}
    >
      <button
        class="absolute top-4 right-4 text-white text-3xl cursor-pointer"
        onClick={() => dialogRef?.close()}
        aria-label={t('view.assets.close-preview')}
      >
        <div class="i-tabler-x"></div>
      </button>
      <img
        src={url}
        alt={props.file.name}
        referrerpolicy="no-referrer"
        class="max-w-full max-h-full object-contain"
      />
    </dialog>
  );
};
