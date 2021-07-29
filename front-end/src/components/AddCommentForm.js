import React, { useState } from 'react';
import axios from 'axios';

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const addComment = async () => {
    const result = await axios
      .post(`/api/articles/${articleName}/add-comment`, {
        userName,
        comment: commentText,
      })
      .catch(function (error) {
        console.log(error);
      });
    const body = result.data;
    setArticleInfo(body);
    setCommentText('');
    setUserName('');

    // fetch(`/api/articles/${articleName}/add-comment`, {
    //   method: 'post',
    //   body: JSON.stringify({ userName, comment: commentText }),
    // });
  };
  return (
    <form className='shadow rounded px-8 pt-6 pb-8 mb-4'>
      <h3 className='text-xl font-bold mb-4 text-gray-900'>Add a Comment</h3>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor='name'
      >
        Name
      </label>
      <input
        type='text'
        name='name'
        id=''
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor='name'
      >
        Comment :{' '}
      </label>
      <textarea
        cols='50'
        rows='4'
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-lg'
        onClick={() => addComment()}
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
