import NewsItem from './NewsItem'
import React, { Component } from 'react'

export default class News extends Component {

  constructor(){
    super();
    this.state= {
      articles : [] ,
      loading : false 
    }
  }
  //using fetch api 
  //fetching data from the News API and store the 
  //articles in the component's state using the componentDidMount lifecycle method
  async componentDidMount(){
      let url ="https://newsapi.org/v2/top-headlines?country=us&apiKey=f1169801c4ca4a96a0fc71ecd03f2027"
      let data = await fetch(url)
      let parsedData = await data.json()
      // console.log(parsedData);
      this.setState({articles : parsedData.articles})
  }


  render() {
    const { articles } = this.state;
  
    if (!articles || articles.length === 0) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {articles.map((element) => {
            const title = element.title ? element.title.slice(0, 45) : '';
            const description = element.description ? element.description.slice(0, 88) : '';
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem title={title} description={description} imageUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
}

