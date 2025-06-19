import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function AlertModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 fixed inset-0 z-40" />
        <AlertDialog.Content className="bg-[#2f2d2d] text-white p-6 rounded-xl fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 shadow-lg border border-dark-gray">
          <AlertDialog.Title className="text-lg font-bold mb-2 text-primary-color">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-gray-300 mb-4">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="bg-dark-gray hover:bg-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="bg-primary-color hover:opacity-80 px-4 py-2 rounded"
              >
                Confirm
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
