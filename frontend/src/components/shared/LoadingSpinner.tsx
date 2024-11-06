
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-48 w-48 border-t-4 border-r-4 border-unitedPrimary"></div>
    </div>
  );
};

