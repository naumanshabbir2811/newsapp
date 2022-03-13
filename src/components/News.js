import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {
    
    constructor(){
        super();
        this.state={
         articles: [],
         loading: true,
         page:1
        }
    }
   async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=617b0bda7b6b4d2185c02c6e5809e31a&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData)
        this.setState({articles: parseData.articles, totalResults:parseData.totalResults,loading:false})
    }
  handlePrevClick=  async ()=>{
      console.log("previous")
      let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=617b0bda7b6b4d2185c02c6e5809e31a&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData)
 
  
        this.setState({
          page: this.state.page-1,
          articles: parseData.articles,
          loading:false
        })

    }
 handleNextClick=  async ()=>{
   if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

   }
   else{
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=617b0bda7b6b4d2185c02c6e5809e31a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData)
      console.log("next")

      this.setState({
        page: this.state.page+1,
        articles: parseData.articles,
        loading:false
      })
    }
  }
  render() {
    return (
      <div className="container my-2">
          <h1 className="text-center">TaZaNews - Top News</h1>
         { this.state.loading && <Spinner/>}
          <div className="row mx-2">
          {!this.state.loading && this.state.articles.map((element)=>{
              return(
                <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title.slice(0,45)} description={element.description? element.description.slice(0,40):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
              )
            })}
    
        </div>
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
    )
  }
}

export default News