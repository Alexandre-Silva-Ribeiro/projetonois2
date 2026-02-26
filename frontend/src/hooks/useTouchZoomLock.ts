import { useCallback, useRef, type TouchEvent } from "react";

type Toque = {
  tempo: number;
  x: number;
  y: number;
};

function useTouchZoomLock() {
  const ultimoToqueRef = useRef<Toque | null>(null);

  const onTouchEndCapture = useCallback((event: TouchEvent<HTMLElement>) => {
    if (!event.cancelable || event.changedTouches.length !== 1) {
      return;
    }

    const toque = event.changedTouches[0];
    const agora = Date.now();
    const atual: Toque = {
      tempo: agora,
      x: toque.clientX,
      y: toque.clientY,
    };

    const ultimo = ultimoToqueRef.current;
    if (ultimo) {
      const intervalo = atual.tempo - ultimo.tempo;
      const dx = Math.abs(atual.x - ultimo.x);
      const dy = Math.abs(atual.y - ultimo.y);

      if (intervalo < 280 && dx < 26 && dy < 26) {
        event.preventDefault();
      }
    }

    ultimoToqueRef.current = atual;
  }, []);

  return { onTouchEndCapture };
}

export default useTouchZoomLock;
