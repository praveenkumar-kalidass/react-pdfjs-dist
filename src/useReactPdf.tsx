import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import * as pdfjs from 'pdfjs-dist';
import { RefObject, useCallback, useEffect, useState } from 'react';

interface UseReactPdfProps {
  containerRef: RefObject<HTMLDivElement>;
}

interface UseReactPdfResponse {
  renderPdf: (url: string | URL) => void;
  unmountPdf: () => void;
  pdf: PDFDocumentProxy | undefined;
}

const useReactPdf = ({ containerRef }: UseReactPdfProps): UseReactPdfResponse => {
  const [pdf, setPdf] = useState<PDFDocumentProxy>();

  const renderPdf = useCallback((url: string | URL) => {
    pdfjs.getDocument({ url }).promise.then(
      (loadedDocument) => setPdf(loadedDocument),
      (error) => console.error('error', error),
    );
  }, []);

  const drawDocument = useCallback((index: number, page: PDFPageProxy) => {
    const viewport = page.getViewport({ scale: 1, rotation: 0 });
    if (!containerRef.current) return;
    const canvasPages = containerRef.current.childNodes;
    const canvasEl = canvasPages[index] as HTMLCanvasElement;
    const canvasContext = canvasEl.getContext('2d');
    if (!canvasContext) return;

    const scale = containerRef.current.clientWidth / viewport.width;
    canvasEl.height = viewport.height * scale;
    canvasEl.width = containerRef.current.clientWidth || viewport.width;
    canvasContext.scale(scale, scale);

    return page
      .render({
        canvasContext,
        viewport,
      })
      .promise.then(
        () => {},
        (error) => console.error(error),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unmountPdf = useCallback(() => {
    setPdf(undefined);
  }, []);

  useEffect(() => {
    if (pdf) {
      for (let index = 0; index < pdf.numPages; index++) {
        pdf.getPage(index + 1).then(
          (loadedPage) => drawDocument(index, loadedPage),
          (error) => console.error(error),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;
  }, []);

  return {
    renderPdf,
    unmountPdf,
    pdf,
  };
};

export default useReactPdf;
