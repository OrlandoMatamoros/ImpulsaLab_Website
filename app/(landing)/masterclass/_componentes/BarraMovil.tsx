"use client";

import { useEffect, useState } from "react";
import BotonReservar from "./BotonReservar";

/**
 * Botón fijo para reservar. En celular y tableta es una barra abajo; en escritorio, una tarjeta
 * flotante abajo a la derecha. Aparece siempre que el botón del héroe no está en pantalla (antes
 * o después de él) y se esconde cuando están a la vista el botón del cierre o el pie de página.
 */
export default function BarraMovil({
  precio,
  detalle,
}: {
  precio: number;
  detalle: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroe = document.getElementById("reservar-heroe");
    const ocultadores = [
      document.getElementById("reservar-cierre"),
      document.getElementById("pie"),
    ].filter((x): x is HTMLElement => x !== null);
    if (!heroe || typeof IntersectionObserver === "undefined") return;
    const vistos = new Map<Element, boolean>();
    const obs = new IntersectionObserver(
      (entradas) => {
        // El botón del héroe cuenta como «a la vista» solo si se ve al menos el 60 %: si asoma unos
        // píxeles por el borde de abajo, igual hace falta la barra.
        for (const e of entradas)
          vistos.set(
            e.target,
            e.target === heroe ? e.intersectionRatio >= 0.6 : e.isIntersecting,
          );
        const heroeVisible = vistos.get(heroe) ?? true;
        const algoQueLaTapa = ocultadores.some((el) => vistos.get(el) ?? false);
        // También antes de llegar al botón: en celulares pequeños queda debajo del primer pantallazo.
        setVisible(!heroeVisible && !algoQueLaTapa);
      },
      { threshold: [0, 0.6, 1] },
    );
    obs.observe(heroe);
    ocultadores.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#001B3D]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur transition-[transform,opacity] duration-300 motion-reduce:transition-none lg:inset-x-auto lg:bottom-6 lg:right-6 lg:w-[360px] lg:rounded-2xl lg:border lg:p-5 lg:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[120%] opacity-0"
      }`}
    >
      <p className="mb-2 text-center text-[13px] font-medium text-white/80">
        {detalle}
      </p>
      <BotonReservar precio={precio} lugar="barra-movil" />
    </div>
  );
}
