export default function Modal({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <aside
      onClick={closeModal}
      className="fixed top-0 left-0 w-full h-dvh bg-[rgba(0,0,0,.6)] grid place-content-center"
    >
      <section onClick={(e) => e.stopPropagation()}>{children}</section>
    </aside>
  );
}
