import React, { useEffect,useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from '../Components/spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [article, setarticle] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResult, settotalResult] = useState(0); 
  // constructor(props) {
  //   super(props);//without this constructor will not work.This will call super class constructor.
  //   // console.log("Hello I am Constructor");
  //   // this.state = {//here state are used to change data without loading page unlike props that we cannot change. 
      
  //   // }
  //   // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  // }
  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //This is a lifecycle method which will run after the render() method has finished executing.
  
  const  updateNews=async()=> {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setProgress(70);
    console.log(parsedata.totalResults);
    setarticle(parsedata.articles);
    setloading(false);
    settotalResult(parsedata.totalResults)
    
    props.setProgress(100);
  }

  useEffect(() => {
    // return () => {
    //   effect
    // };
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  },[]);
  // const handlePrevClick = async () => {
  // //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=17e4587e4656426690b52d4e70962001&page=${this.state.page - 1}&pageSize=${props.pageSize}`;

  // //   // this.setState({"loading":true});

  // //   // let data = await fetch(url);
  // //   // let parsedata = await data.json();
  // //   // console.log(parsedata);

  // //   // this.setState({
  // //   //   page: this.state.page - 1,
  // //   //   article: parsedata.articles,
  // //   //   loading : false
  // //   // });
   
  //   setpage(page-1);
  //   updateNews();


  // }
  // const handleNextClick = async () => {

  // //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResult / props.pageSize))){






  // //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=17e4587e4656426690b52d4e70962001&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  // //   //   this.setState({"loading":true});
  // //   //   let data = await fetch(url);

  // //   //   let parsedata = await data.json();


  // //   //   this.setState({
  // //   //     page: this.state.page + 1,
  // //   //     article: parsedata.articles,
  // //   //     loading : false
  // //   //   });


  // //   // }
    
  //   setpage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {

    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1);
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    console.log(parsedata.totalResults);
    setarticle(article.concat(parsedata.articles))
    settotalResult(parsedata.totalResults);
    
  };
  
    console.log("render")
    return (
      <>
        <h2 className='text-center my-10'>Top  {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner />}
        {/* //this line tells that show spinner when this.state.loading is true */}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalResult}
          loader={loading && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* !this.state.loadin */}

              {article.map((Element) => {
                return <div className="col-md-4" key={Element.url}>
                  {/* //key specifies what is unique in every element */}
                  <NewsItem
                    title={Element.title ? Element.title.slice(0, 50) : ""}
                    description={Element.description ? Element.description.slice(0, 88) : ""}
                    imageUrl={Element.urlToImage ? Element.urlToImage : "newsdef1.jpg"}
                    newsURL={Element.url}
                    lastupdated={Element.publishedAt}
                    author={Element.author}
                    source={Element.source.name} />

                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page <= 1} className="btn btn-success " onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / props.pageSize)} className="btn btn-success" onClick={this.handleNextClick} >Next &rarr;</button>
            </div> */}


      </>

    )
  
}

News.callerdefalutProps = {
  PropTypes: 'in',
  pageSize: 5,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
