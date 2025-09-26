import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm : string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder : string;
}

export const SearchBar : React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, placeholder = "SEARCH..." }) => (
  <div className="mb-6">
    <div className="relative">
      <div className="absolute left-3 top-3 w-8 h-8 bg-black border-2 border-black flex items-center justify-center">
        <Search className="w-4 h-4 text-white" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-14 pr-4 py-4 bg-white border-4 border-black text-black font-bold text-lg placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
      />
    </div>
  </div>
);