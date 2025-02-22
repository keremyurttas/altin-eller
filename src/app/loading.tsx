export default function RootLoading() {
  return (
    <div
      role="status"
      aria-label="Yükleniyor"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>
  );
}
