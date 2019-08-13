import React, {useState, useEffect, useRef} from 'react';
import Lottie from 'lottie-react-web';
import ReactMarkdown from 'react-markdown';

import arrows from '../../assets/arrows_red.svg';
import illustration from '../../assets/gestion_projet.json';

const Story = props => {
  const {chapters} = props.blok;

  const [playLottie, setPlayLottie] = useState(false);

  const lottie = useRef();

  useEffect(() => {
    if (lottie.current) {
      const options = {
        threshold: 0.75,
      };

      const onIntersection = entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPlayLottie(true);
          }
        }
      };

      const observer = new IntersectionObserver(onIntersection, options);

      observer.observe(lottie.current);
    }
  }, []);

  if (!chapters && chapters.length < 1) {
    return null;
  }
  return (
    <div className='story'>
      {chapters.map((chapter, index) => (
        <div className='story__chapter' key={chapter._uid}>
          <div ref={lottie} className='story__illustration'>
            <Lottie
              isPaused={!playLottie}
              segments={[0, 150]}
              options={{
                animationData: illustration,
                autoplay: false,
                loop: true,
              }}
            />
          </div>
          <div className='story__content'>
            <h3 className='story__title'>{chapter.title}</h3>
            <ul className='story__text'>{markdownToList(chapter.content)}</ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Story;

function markdownToList(markdown) {
  return (
    <ReactMarkdown
      source={markdown}
      renderers={{
        listItem: ({children}) => <li style={{backgroundImage: `url(${arrows})`}}>{children}</li>,
      }}
      allowedTypes={['text', 'listItem']}
      unwrapDisallowed={true}
    />
  );
}
