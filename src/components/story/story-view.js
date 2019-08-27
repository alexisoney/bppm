import React, {createRef, Component} from 'react';
import {Power2, TweenLite, TimelineLite} from 'gsap';
import lottie from 'lottie-web';
import ReactMarkdown from 'react-markdown';
import {TransitionGroup, Transition} from 'react-transition-group';

import arrows from '../../assets/arrows_red.svg';
import illustrationFR from '../../assets/gestion_projet_FR.json';
import illustrationENG from '../../assets/gestion_projet_ENG.json';
import {breakpoints} from '../../variables';

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChapter: 0,
      windowWidth: 0,
    };

    this.isAnimating = false;

    this.svgAnimation = undefined;
    this.svgAnimationSegments = [[0, 150], [150, 315], [315, 470], [470, 930]];

    this.chapterHeight = undefined;
    this.wrapperPosition = {
      top: undefined,
      bottom: undefined,
    };

    this.illustration = createRef();
    this.scene = createRef();
    this.wrapper = createRef();

    this.chapterEntering = this.chapterEntering.bind(this);
    this.chapterExiting = this.chapterExiting.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.initComponent = this.initComponent.bind(this);
    this.markdownToList = this.markdownToList.bind(this);
  }

  componentDidMount() {
    const illustrationJSON = this.props.blok.english ? illustrationENG : illustrationFR;
    this.svgAnimation = lottie.loadAnimation({
      container: this.illustration.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: illustrationJSON,
    });

    this.initComponent();

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.initComponent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.initComponent);
  }

  chapterEntering(el) {
    if (window.innerWidth >= breakpoints.medium) {
      const tl = new TimelineLite();
      const title = el.querySelector('.story__title');
      const text = el.querySelector('.story__text');

      // prettier-ignore
      tl.set(el, {position: 'absolute'})
      .fromTo(title, 0.4, {y: 400, opacity: 0},{y: 0, opacity: 1, ease: Power2.easeOut},0.4)
      .fromTo(text, 0.4, {y: 400, opacity: 0},{y: 0, opacity: 1, ease: Power2.easeOut}, '-=0.2')
    }
  }

  chapterExiting(el) {
    const tl = new TimelineLite();
    const title = el.querySelector('.story__title');
    const text = el.querySelector('.story__text');

    // prettier-ignore
    tl.set(el, {position: 'absolute'})
      .to(title, 0.4, {y: -200, opacity: 0, ease: Power2.easeInOut})
      .to(text, 0.4, {y: -200, opacity: 0, ease: Power2.easeInOut}, '-=0.35')
  }

  handleScroll() {
    if (window.innerWidth >= breakpoints.medium) {
      const scrollYTop = window.pageYOffset;
      const scrollYBottom = window.pageYOffset + window.innerHeight;

      if (navigator.userAgent.indexOf('Safari') > -1 || navigator.userAgent.indexOf('Firefox') > -1) {
        if (scrollYBottom >= this.wrapperPosition.bottom) {
          window.requestAnimationFrame(() => {
            TweenLite.set(this.scene.current, {position: 'absolute', bottom: 0, top: ''});
          });
        } else if (scrollYTop >= this.wrapperPosition.top) {
          window.requestAnimationFrame(() => {
            TweenLite.set(this.scene.current, {position: 'fixed', top: 0, bottom: ''});
          });
        } else if (this.scene.current.style.position === 'fixed') {
          window.requestAnimationFrame(() => {
            TweenLite.set(this.scene.current, {position: 'absolute', top: 0, bottom: ''});
          });
        }
      }

      if (!this.isAnimating) {
        this.isAnimating = true;
        setTimeout(() => {
          this.isAnimating = false;
        }, 50);

        let activeChapter;

        if (
          scrollYBottom > this.wrapperPosition.top + this.chapterHeight * 0.75 &&
          scrollYBottom < this.wrapperPosition.top + this.chapterHeight * 0.76
        ) {
          this.svgAnimation.playSegments(this.svgAnimationSegments[0], true);
        }

        if (scrollYBottom < this.wrapperPosition.top + this.chapterHeight * 1.5) {
          activeChapter = 0;
        } else if (
          scrollYBottom >= this.wrapperPosition.top + this.chapterHeight * 1.5 &&
          scrollYBottom < this.wrapperPosition.top + this.chapterHeight * 2.5
        ) {
          activeChapter = 1;
        } else if (
          scrollYBottom >= this.wrapperPosition.top + this.chapterHeight * 2.5 &&
          scrollYBottom < this.wrapperPosition.top + this.chapterHeight * 3.5
        ) {
          activeChapter = 2;
        } else if (scrollYBottom >= this.wrapperPosition.top + this.chapterHeight * 3.5) {
          activeChapter = 3;
        }

        if (this.state.activeChapter !== activeChapter) {
          this.setState({activeChapter});

          this.svgAnimation.playSegments(this.svgAnimationSegments[activeChapter], true);
        }
      }
    }
  }

  initComponent() {
    this.setState({windowWidth: window.innerWidth});

    if (window.innerWidth >= breakpoints.medium) {
      TweenLite.set(this.wrapper.current, {height: '400vh'});
      TweenLite.set(this.scene.current, {position: 'sticky', top: 0, left: 0, height: '100vh', width: '100%'});
      TweenLite.set(this.illustration.current, {display: 'block', position: 'absolute', top: 0, left: 0});

      const wrapperRelativeTop = this.wrapper.current.getBoundingClientRect().top;
      const wrapperRelativeBottom = this.wrapper.current.getBoundingClientRect().bottom;
      const pageYOffset = window.pageYOffset;

      this.wrapperPosition.top = wrapperRelativeTop + pageYOffset;
      this.wrapperPosition.bottom = wrapperRelativeBottom + pageYOffset;

      this.chapterHeight = this.wrapper.current.offsetHeight / 4;

      this.handleScroll();
    } else {
      this.wrapper.current.removeAttribute('style');
      this.scene.current.removeAttribute('style');
      this.illustration.current.removeAttribute('style');
      Array.from(document.querySelectorAll('.story__chapter,.story__title,.story__text')).forEach(el =>
        el.removeAttribute('style')
      );

      this.svgAnimation.playSegments(
        [this.svgAnimationSegments[0][0], this.svgAnimationSegments[this.svgAnimationSegments.length - 1][1]],
        true
      );
    }
  }

  markdownToList(markdown) {
    return (
      <ReactMarkdown
        source={markdown}
        renderers={{
          listItem: ({children}) => <li style={{backgroundImage: `url(${arrows})`}}>{children}</li>,
        }}
        allowedTypes={['text', 'listItem', 'strong']}
        unwrapDisallowed={true}
      />
    );
  }

  render() {
    return (
      <div ref={this.wrapper} className='story'>
        <div ref={this.scene} className='story__scene'>
          <div ref={this.illustration} className='story__illustration' />

          <TransitionGroup component={null}>
            {this.props.blok.chapters.map((chapter, index) => {
              if (index !== this.state.activeChapter && this.state.windowWidth >= breakpoints.medium) return null;

              return (
                <Transition
                  key={chapter._uid}
                  timeout={{
                    exit: 400,
                    enter: 800,
                  }}
                  onExiting={this.chapterExiting}
                  onEntering={this.chapterEntering}
                >
                  <div className='story__chapter'>
                    <div className='story__content'>
                      <h3 className='story__title'>
                        <ReactMarkdown
                          source={chapter.title}
                          allowedTypes={['text', 'strong']}
                          unwrapDisallowed={true}
                        />
                      </h3>
                      <ul className='story__text'>{this.markdownToList(chapter.content)}</ul>
                    </div>
                  </div>
                </Transition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default Story;
