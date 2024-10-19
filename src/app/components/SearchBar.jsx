export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    );
  }
  