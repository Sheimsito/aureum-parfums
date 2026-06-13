import React, { useEffect, useState } from 'react';

interface SuccessToastProps {
  /** Controls toast visibility. Set to true to trigger the entrance animation. */
  isVisible: boolean;
  /** Message displayed as the toast body. */
  message?: string;
  /** Duration in milliseconds before the toast auto-dismisses. Defaults to 4000. */
  duration?: number;
  /** Callback fired when the toast finishes its exit animation. */
  onDismiss: () => void;
}

/**
 * Animated success toast notification anchored to the bottom-center of the screen.
 * Uses the project's secondary-fixed palette to ensure WCAG AA contrast.
 *
 * @param isVisible - Whether the toast should be shown.
 * @param message - Body text shown inside the toast.
 * @param duration - Auto-dismiss delay in milliseconds.
 * @param onDismiss - Called after the exit animation completes.
 */
export const SuccessToast: React.FC<SuccessToastProps> = ({
  isVisible,
  message = '¡Pedido confirmado! Gracias por tu compra.',
  duration = 4000,
  onDismiss,
}) => {
  const [render, setRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setRender(true);
      // Defer one frame so the enter transition fires after mount
      const enterFrame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(enterFrame);
    } else {
      setAnimate(false);
      const exitTimer = setTimeout(() => setRender(false), 400);
      return () => clearTimeout(exitTimer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onDismiss]);

  if (!render) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: animate
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(24px)',
        opacity: animate ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#ffe08f',   /* secondary-fixed — ratio 13.3:1 with text */
        color: '#241a00',             /* on-secondary-fixed */
        border: '1px solid #e6c364', /* secondary-fixed-dim as border */
        padding: '14px 20px',
        maxWidth: 'calc(100vw - 48px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        pointerEvents: animate ? 'auto' : 'none',
      }}
    >
      {/* Check icon */}
      <span
        className="material-symbols-outlined icon-fill"
        style={{ fontSize: '20px', flexShrink: 0, color: '#241a00' }}
        aria-hidden="true"
      >
        check_circle
      </span>

      {/* Message */}
      <p
        style={{
          margin: 0,
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          lineHeight: 1.4,
          color: '#241a00',
        }}
      >
        {message}
      </p>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        aria-label="Cerrar notificación"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          marginLeft: '8px',
          color: '#241a00',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          opacity: 0.7,
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }} aria-hidden="true">
          close
        </span>
      </button>
    </div>
  );
};