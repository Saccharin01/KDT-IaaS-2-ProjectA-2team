import axios from 'axios';

// const tags = ['#전기', '#영어', '#예술', '#기독교', '#향수', '#청소', '#소설', '#인공지능', '#육아', '#자연', '#요리', '#학습', '#야구', '#감성', '#여행', '#미스터리', '#추억', '#긴장감'];

// export default function Tags() {
//   const handleTagClick = async (tag) => {
//     const response = await axios.get(`/api/books/tags?tag=${tag}`);
//     console.log(response.data);
//   };

//   return (
//     <div>
//       {tags.map(tag => (
//         <button key={tag} onClick={() => handleTagClick(tag)}>{tag}</button>
//       ))}
//     </div>
//   );
// }

import React from 'react';
import styles from '@/styles/Tags.module.css';
import { useRouter } from 'next/router';

const Tags = ({ tags }) => {
  const router = useRouter();

  const handleTagClick = (tag) => {
    router.push(`/books/${encodeURIComponent(tag)}`);
  };

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <button key={tag} onClick={() => handleTagClick(tag)}>
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
