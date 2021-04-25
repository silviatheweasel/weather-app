import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const SearchBar = ({ setSearchTerm, searchTerm, handleSubmit }) => {

      
    return (
        <div>
            <form 
                id="search-bar" 
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <GooglePlacesAutocomplete
                        apiKey="AIzaSyBZrejx_2seANji9k--cgRvzep2KIfJrrw"
                        selectProps={{
                            searchTerm,
                            onChange: setSearchTerm,
                            autoFocus: true,
                            isClearable: true,
                            placeholder: "City or address",
                            className: "react-select-container",
                            theme: theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                  ...theme.colors,
                                  primary25: 'hotpink',
                                  primary: 'black',
                                },
                              })}
                          }
                    />

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