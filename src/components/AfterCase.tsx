type AfterCaseProps = {
  label: string;
  value: string;
};

export default function AfterCase({ label, value }: AfterCaseProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(
      (success) => alert('successfully copied 😆'),
      (error) => alert('Failed to copy 😫')
    );
  };

  return (
    <div>
      <h2 className='md:text-lg'>{label}</h2>
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
