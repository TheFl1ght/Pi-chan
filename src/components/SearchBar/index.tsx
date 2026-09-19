import type { SearchBarProps } from './SearchBar';
import './SearchBar.css';

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="search-wrap">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
