import React, { useState, useRef, ComponentProps } from 'react';
import { fileSize } from '@/utils';

interface FileInputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export default function FileInput({
  className,
  name,
  label,
  accept,
  error,
  onChange
}: FileInputProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleBrowse() {
    fileInput?.current?.click();
  }

  function handleRemove() {
    setFile(null);
    onChange?.(null);

    fileInput.current.value = null;
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const file = e.target?.files[0];
    setFile(file);
    onChange?.(file);
  }

  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className={`form-input p-0 ${error && 'error'}`}>
        <input
          id={name}
          ref={fileInput}
          accept={accept}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
        {!file && (
          <div className="p-2">
            <BrowseButton text="Browse" onClick={handleBrowse} />
          </div>
        )}
        {file && (
          <div className="flex items-center justify-between p-2">
            <div className="flex-1 pr-1">
              {file?.name}
              <span className="ml-1 text-xs text-gray-600">
                ({fileSize(file?.size)})
              </span>
            </div>
            <BrowseButton text="Remove" onClick={handleRemove} />
          </div>
        )}
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

interface BrowseButtonProps extends ComponentProps<'button'> {
  text: string;
}

function BrowseButton({ text, onClick, ...props }: BrowseButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
