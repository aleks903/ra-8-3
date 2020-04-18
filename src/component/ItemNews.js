import React from 'react';

export default function ItemNews(props) {
  const {news} = props;
  
  return (
    <div className="item-news" id={news.id}>
      <img src={news.image} />
      <h3>{news.title}</h3>
      <p>{news.content}</p>
    </div>
  );
}
