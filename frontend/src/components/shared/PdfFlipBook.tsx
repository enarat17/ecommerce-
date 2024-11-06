import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFFlipbookProps {
  pdfName: string;
}

const PDFFlipbook: React.FC<PDFFlipbookProps> = ({ pdfName }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const bookRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber(prevPage => prevPage + 1);
      } else if (e.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber(prevPage => prevPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pageNumber, numPages]);

  return (
    <div className="flex flex-col items-center p-4">
      <div 
        ref={bookRef} 
        className="border border-gray-300 shadow-lg"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: `rotateY(${(pageNumber % 2 === 0 ? -5 : 5)}deg)`,
          }}
        >
          <Document
            file={pdfName}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={500} />
          </Document>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => setPageNumber(prevPage => Math.max(prevPage - 1, 1))}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => setPageNumber(prevPage => Math.min(prevPage + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PDFFlipbook;