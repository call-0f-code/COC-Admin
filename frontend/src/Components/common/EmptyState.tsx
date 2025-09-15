export const EmptyState = ({ icon: Icon, message }) => (
  <div className="bg-gray-200 border-4 border-black p-8 text-center">
    <Icon className="w-16 h-16 text-black mx-auto mb-4" />
    <p className="text-xl font-black text-black">{message}</p>
  </div>
);