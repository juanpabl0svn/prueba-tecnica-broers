export const handleCloseModal = (close: () => void) => {
  const modal = document.getElementById("modal");

  if (!modal) return;

  modal.classList.add("hide-modal");

  setTimeout(() => {
    close();
  }, 280);
};

export default function Modal({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <aside
      onClick={() => handleCloseModal(closeModal)}
      className="fixed top-0 left-0 w-full h-dvh bg-[rgba(0,0,0,.6)] grid place-content-center z-10"
    >
      <section
        id="modal"
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </aside>
  );
}
