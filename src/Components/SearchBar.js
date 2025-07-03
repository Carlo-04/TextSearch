import React, {useState} from 'react';

const SearchBar = () => {
    
    const data = [
        {id: 1, title: 'Article 1', date: "05/06/25", content: 'Learn about Theory of Computation'},
        {id: 2, title: 'Article 2', date: "05/09/25", content: 'Understanding CSS'},
        {id: 3, title: 'Article 3', date: "05/06/25", content: 'Introduction to JavaScript'},
        {id: 4, title: 'Article 4', date: "08/07/25", content: 'Using Hooks in React'},
        {id: 5, title: 'Article 5', date: "03/11/25", content: 'Managing state in React applications'}
    ];
    
    const [searchText, setSearchText] = useState("");
    const [numPosts, setNumPosts] = useState("No posts"); //number of posts found
    const [results, setResults] = useState([]); //search results

    return (
        <div style={{width: '100%', minHeight: '100vh', height: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#ededed'}}>
            <div style={{padding: '20px', alignItems: 'flex-start', textAlign:'left', display: 'flex', flexDirection: 'column', width: '100%', height:'100%',}}>
                <div style={{width: '100%', margin: '20px', alignItems: 'flex-start', display: 'flex', flexDirection: 'column'}}>
                    <h1>Search</h1>
                    <div style={{display: 'flex', width: '70%', height: '30px', marginBottom: '20px'}}>
                        <input type="search" placeholder='Type in a phrase (eg: "article")' onChange={(e) => search(e.target.value)} style={{width: '100%'}}/>
                    </div>
                    <div><b>{numPosts}</b> were found</div>
                </div>

                <div style={{width: '100%'}}>
                    {
                        results.map((item) => 
                            (
                                
                                <div key={item.id} style={{borderBottom: '1px solid #ccc', width: '100%'}}>
                                    <h1 style={{marginBottom: '0px', lineHeight:'1', fontSize: '24px'}}>{highlight(searchText, item.title)}</h1>
                                    <p style={{fontWeight: 'light'}}>{highlight(searchText, item.date)}</p>
                                    <p>{highlight(searchText, item.content)}</p>
                                </div>
                            
                            )
                        )
                    }
                </div>

            </div>
            <div style = {{display: 'flex', flexDirection: 'column', width: '40%', height: '100%', padding: '20px'}}>
                <div style={{marginTop: '30px', width: '80%', display: 'flex', textAlign: 'left', flexDirection: 'column', 
                    border: '1px solid #ccc', padding: '10px',}}>
                    <p><b>Bitsofcode</b>This page contains articles on several topics in computer science and front end development.</p>
                </div>
            </div>
        </div>
    );


    function search(searchStr) {    //performs the search and updates the results array
        if (searchStr.length === 0) {
            setNumPosts("No posts");
            setSearchText("");
            setResults([]);
            return;
        }
        setSearchText(searchStr);
        const filteredResults = data.filter(item => 
            item.title.toLowerCase().includes(searchStr.toLowerCase()) || 
            item.content.toLowerCase().includes(searchStr.toLowerCase()) ||
            item.date.includes(searchStr)
        );
        setResults(filteredResults);
        setNumPosts(filteredResults.length + " post(s)");
    }

    function highlight(searchStr, text) { //used to hightlight the common parts with the search string
        if (!text) return text;

        const regex = new RegExp(`(${searchStr})`, 'gi');
        const partitions = text.split(regex);

        return partitions.map((part, index) => 
            part.toLowerCase() === searchStr.toLowerCase() ? 
            (<mark key={index}>{part}</mark>) : 
            (part)
        );
    }
}



export default SearchBar;