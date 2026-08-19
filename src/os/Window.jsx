import { motion, useDragControls } from 'framer-motion'

export default function Window({ id, title, children, x, y, width, zIndex, onClose, onFocus, dragConstraintsRef }) {
  const controls = useDragControls()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2 }}
      drag
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragConstraints={dragConstraintsRef}
      dragElastic={0}
      onPointerDownCapture={() => onFocus(id)}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        zIndex,
        maxWidth: 'calc(100vw - 32px)',
      }}
      className="os-window rounded-[12px] overflow-hidden flex flex-col"
    >
      <div
        className="os-titlebar flex items-center gap-2 px-3 py-2.5 select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => controls.start(e)}
      >
        <span className="w-[11px] h-[11px] rounded-full" style={{ background: 'var(--os-accent)' }} />
        <span className="text-[12px] font-mono-ui truncate flex-1" style={{ color: 'var(--os-text-dim)' }}>{title}</span>
        <button
          onClick={() => onClose(id)}
          aria-label="Close window"
          className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] hover:opacity-80"
          style={{ color: 'var(--os-text-dim)' }}
        >
          ✕
        </button>
      </div>
      <div className="os-window-body overflow-auto">{children}</div>
    </motion.div>
  )
}
