import { useApp } from "../context/AppContext";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen dark bg-gray-900">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
};
