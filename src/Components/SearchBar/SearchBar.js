export const SearchBar = ({ handleChange, searchTerm, handleSubmit }) => {
    return (
        <div>
            <form 
                id="search-bar" 
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <input 
                    type="text" 
                    name="search"
                    id="search-input"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="London, England Weather"
                >
                </input>
                <button 
                    id="search-btn"
                    type="submit"               
                >
                    <i className="fas fa-search"></i> 
                </button>
            </form>
        </div>
    )
}