import React from 'react'

const NewsItem = (props)=> {

 
    let { title, description, imageUrl, newsURL, lastupdated, author,source } = props;

    return (
      <>
        <div className='my-3'>
          <div className="card" >
            <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span class="badge rounded-pill bg-danger" >
                {source}
              </span>
              </div>
            <img src={imageUrl} style={{ height: '30vh' }} className="card-img-top" alt="..." />
            <div className="card-body">
              
              <p className="card-text"><small className="text-body-secondary">Author {author ? author : "Unknown"} on {new Date(lastupdated).toGMTString()}</small></p>
              {/* <span class="badge rounded-pill text-bg-success">New</span> */}
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsURL} 
                className="container btn btn-sm btn-dark " rel="noreferrer">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  
}

export default NewsItem
