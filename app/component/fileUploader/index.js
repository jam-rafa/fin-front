import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploader() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/*': [], // Aceita qualquer tipo de arquivo, você pode especificar se quiser
    },
    onDrop: (acceptedFiles) => {
      // Handle file drop
      console.log(acceptedFiles);
    },
  });

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-4">
      <div
        {...getRootProps()}
        className='border-dashed border-primary  border-2 p-10  rounded flex justify-center items-center flex-col'
      >
        <input {...getInputProps()} id="file-input" className="hidden" />
        <p className="text-center">
          {isDragActive ? 'Drop the files here ...' : 'Arrste e solte arquivos aqui ou clique no botão'}
        </p>
        <div>
            <button
            type="button"
            onClick={handleButtonClick}
            className="mt-4 bg-primary py-2 px-4 rounded "
            >
            Abrir pasta de arquivos
            </button>
        </div>
      </div>
    </div>
  );
};
