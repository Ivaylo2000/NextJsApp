import styles from "./Modal.module.css";
import Image from "next/image";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Image
            width={40}
            height={40}
            className={styles.closeImage}
            src="/icons/close.svg"
            alt="Close Modal"
          />
        </button>
        {children}
      </div>
    </div>
  );
}
