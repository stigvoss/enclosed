import type { Component } from 'solid-js';
import { useI18n } from '@/modules/i18n/i18n.provider';
import { onCleanup, onMount } from 'solid-js';

export const ImagePreviewDialog: Component<{ file: File; onClose: () => void }> = (props) => {
  const { t } = useI18n();
  // The file is decrypted in memory only, the blob URL is never persisted and revoked on close
  const url = URL.createObjectURL(props.file);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      props.onClose();
    }
  };

  onMount(() => document.addEventListener('keydown', onKeyDown));
  onCleanup(() => {
    document.removeEventListener('keydown', onKeyDown);
    URL.revokeObjectURL(url);
  });

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={props.file.name}
      onClick={() => props.onClose()}
    >
      <button
        class="absolute top-4 right-4 text-white text-3xl cursor-pointer"
        onClick={() => props.onClose()}
        aria-label={t('view.assets.close-preview')}
      >
        <div class="i-tabler-x"></div>
      </button>
      <img
        src={url}
        alt={props.file.name}
        referrerpolicy="no-referrer"
        class="max-w-full max-h-full object-contain"
        onClick={event => event.stopPropagation()}
      />
    </div>
  );
};
