import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";

const ConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  isLoading,
  title = "Apakah anda yakin?",
  description = "Anda yakin ingin menghapus?",
  confirmText = "Ya, hapus",
  cancelText = "Tidak, batalkan",
  confirmColor = "failure",
  cancelColor = "gray",
}) => {
  return (
    <Modal show={show} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex justify-center gap-4">
            <Button color={confirmColor} onClick={onConfirm} disabled={isLoading}>
              {confirmText}
            </Button>
            <Button color={cancelColor} onClick={onClose} disabled={isLoading}>
              {cancelText}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
