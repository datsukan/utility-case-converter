import { useState } from 'react';

const delayTime = 3000;

type AfterCaseProps = {
  label: string;
  value: string;
};

export default function AfterCase({ label, value }: AfterCaseProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const successfullyCopied = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), delayTime);
  };
  const failedToCopy = () => {
    setShowFailedMessage(true);
    setTimeout(() => setShowFailedMessage(false), delayTime);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(
      (_success) => successfullyCopied(),
      (_error) => failedToCopy()
    );
  };

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <h2 className='md:text-lg'>{label}</h2>
        <div>
          {showSuccessMessage && (
            <span className='text-xs text-green-600'>
              successfully copied 😆
            </span>
          )}
          {showFailedMessage && (
            <span className='text-xs text-red-600'>Failed to copy 😫</span>
          )}
        </div>
      </div>
      <div className='mt-2 flex items-center justify-between'>
        <div className='flex h-12 w-full items-center overflow-y-auto rounded-l-md border border-gray-200 bg-white pl-3'>
          <span className='whitespace-pre-wrap text-sm font-normal text-gray-600'>
            {value}
          </span>
        </div>
        <button
          className='h-12 w-12 rounded-r-md bg-gray-300 hover:bg-gray-200'
          onClick={() => copyToClipboard()}
        >
          <span className='align-[2px] text-xs text-gray-600'>copy</span>
        </button>
      </div>
    </div>
  );
}
