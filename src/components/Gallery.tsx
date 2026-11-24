import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { carFallback, site } from '../config/site';

const photos = site.images.gallery;
const imageError = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = carFallback;
};

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = selected !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null); }
      if (event.key === 'ArrowRight') { event.preventDefault(); setSelected(index => index === null ? null : (index + 1) % photos.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSelected(index => index === null ? null : (index - 1 + photos.length) % photos.length); }
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll<HTMLElement>('.a-lightbox__control')];
        const first = controls[0], last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  const lightbox = selected !== null ? (
    <div
      className="a-lightbox"
      onPointerDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}
    >
      <div
        className="a-lightbox__panel"
        role="dialog"
        aria-modal="true"
        aria-label={'Фотография: ' + photos[selected].title}
      >
        <div className="a-lightbox__bar">
          <span>{photos[selected].title}</span>
          <button type="button" ref={closeRef} className="a-lightbox__control" onClick={() => setSelected(null)} aria-label="Закрыть фотографию">✕</button>
        </div>
        <img src={photos[selected].url} alt={photos[selected].alt} onError={imageError} />
        <div className="a-lightbox__foot">
          <button type="button" className="a-lightbox__control" onClick={() => setSelected((selected - 1 + photos.length) % photos.length)} aria-label="Предыдущая фотография">← Назад</button>
          <span>{selected + 1} из {photos.length}</span>
          <button type="button" className="a-lightbox__control" onClick={() => setSelected((selected + 1) % photos.length)} aria-label="Следующая фотография">Вперёд →</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <section id="gallery" className="a-gallery-section a-cream" aria-labelledby="gallery-heading">
        <div className="a-shell">
          <div className="a-gallery-heading">
            <div>
              <span className="a-eyebrow">Фотогалерея</span>
              <h2 id="gallery-heading" className="a-h2 a-h2--compact">АВТОМОБИЛИ <span className="a-accent">В ДЕТАЛЯХ</span></h2>
            </div>
            <p>Подборка автомобильных изображений. Нажмите на снимок, чтобы открыть его крупнее.</p>
          </div>
          <div className="a-gallery-grid">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={photo.url}
                className={'a-gallery-tile a-gallery-tile--' + (index + 1)}
                onClick={(event) => { openerRef.current = event.currentTarget; setSelected(index); }}
                aria-label={'Открыть фотографию: ' + photo.title}
              >
                <img src={photo.url} alt={photo.alt} loading="lazy" decoding="async" onError={imageError} />
                <span className="a-gallery-tile__caption"><span>{photo.title}</span><span aria-hidden="true">↗</span></span>
              </button>
            ))}
          </div>
          <div className="a-gallery-source">
            <p>Демонстрационные изображения автомобилей, не фотографии выполненных работ А500. Реальные снимки организации доступны в Яндекс Картах.</p>
            <a className="a-btn a-btn--dark" href={site.contacts.mapUrl} target="_blank" rel="noopener noreferrer">Фото А500 на Яндекс Картах ↗</a>
          </div>
        </div>
      </section>
      {lightbox && typeof document !== 'undefined' && createPortal(lightbox, document.body)}
    </>
  );
}
