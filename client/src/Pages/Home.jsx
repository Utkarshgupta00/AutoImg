import { React, useState, useEffect } from "react";
import { Card, FormField, Loader } from "../Components/index";

const RenderCards = ({ data, title }) =>{
  if(data?.length>0){
      return data.map((post) => <Card key={post._id} {...post}/>)
  }

  
  return(
    <h2 className="mt-5 font-bold text-[#6429ff] text-xl uppercase">
      {title}
    </h2>
  )
}
    



const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null)



  useEffect(() => {
    const fetchPost = async() =>{
      setLoading(true);

      try{
        const response = await fetch('http://localhost:3000/api/v1/post',{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
          },
        })

        if(response.ok){
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }

      }catch(error){
        alert(error);

      }finally{
        setLoading(false);
      }
    }

    fetchPost();
  }, []);

  const handleSearchChange = (e) => {
    
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
        setTimeout(()=>{
          const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchResults(searchResult);
          },500)

        

    );


  }

  return (
    <section className='max-w-7xl mx-auto' >
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create amazing AI art</h1>
      </div>
      <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px] ">
        Generate Original Images In No Time With Autoimg
      </p>
      
      <img src="images/banner.svg" alt="" className="" />

      <div className="mt-16">
        <FormField
          labelName = "search posts"
          type = "text"
          name = "text"
          placeholder = "search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {
          loading ? (
            <div className="flex justify-center items-center">
              <Loader/>
              
            </div>
          )
          : (
            <>
              {searchText && (
                <h2
                className="font-medium text-[#666e75]">
                  Showing result for <span className='text-[#222328]'>{searchText}</span>
                </h2>
              )}

              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5">
                {searchText ? (
                  <RenderCards
                   data={searchResults}
                   title="No search results found"
                  />
                ) : (
                  <RenderCards
                    data={allPosts}
                    title="No posts found"
                  />
                )}

              </div>
            </>
          )
        }
      </div>

    </section>
  )
}

export default Home