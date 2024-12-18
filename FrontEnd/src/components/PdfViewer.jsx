// import React, { useState } from 'react'
// import { Document, Page } from 'react-pdf'
// // import { pdfjs } from 'react-pdf';

// // pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/es5/build/pdf.worker.min.js';

// export const PdfViewer = ({ pdfUrl }) => {

//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [error, setError] = useState(null);

//   const onLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const onLoadError = (error) => {
//     console.error("Error loading PDF:", error);  // Log the error in the console
//     setError(error.message);  // Update the error state
//   };

//   const goToNextPage = () => {
//     if (pageNumber < numPages) {
//       setPageNumber(pageNumber+1);
//     };
//   };

//   const goToPrevPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber(pageNumber-1);
//     };
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Previous</button>
//         <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
//       </div>

//       <Document
//         file={pdfUrl}
//         onLoadSuccess={onLoadSuccess}
//         onLoadError={onLoadError}
//       >
//         <Page pageNumber={pageNumber}/>
//       </Document>

//       <div>
//         Page {pageNumber} of {numPages}
//       </div>
//     </div>
//   )
// }