import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import styled from 'styled-components';
import 'keen-slider/keen-slider.min.css';
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from 'keen-slider/react';
import Image from 'next/image';

interface Props {
  /**
   * content for the carousel
   */
  children: any;

  /**
   * previous button content (icon or text)
   */
  prevBtn: React.ReactNode;

  /**
   * next button content (icon or text)
   */
  nextBtn: React.ReactNode;

  /**
   * label for the carousel (a11y)
   */
  label: string;
  /**
   * label for the carousel (a11y)
   */
  thumbnails: any;
}

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(next);
      });
    });
  };
}

const CarouselThumb = ({
  children,
  prevBtn,
  nextBtn,
  label,
  thumbnails,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const carouselRef = useRef(null);

  // check if children prop is wrapped in a fragment container
  let carouselItems = children;
  if (children.type == React.Fragment) {
    carouselItems = children.props.children;
  }
  // if it's a single element, put it in a array
  carouselItems = !Array.isArray(carouselItems)
    ? [carouselItems]
    : carouselItems;

  function handleArrowKeys(e) {
    if (e.key == 'ArrowRight') {
      instanceRef.current?.next();
      carouselRef.current.querySelector('.carouselNextBtn').focus();
    } else if (e.key == 'ArrowLeft') {
      instanceRef.current?.prev();
      carouselRef.current.querySelector('.carouselPrevBtn').focus();
    }
  }
  useEffect(() => {
    carouselRef.current.addEventListener('keydown', handleArrowKeys);
  }, []);

  const [refCallback, instanceRef] = useKeenSlider({
    // carousel methods
    rubberband: false,
    dragSpeed: 0.1,
    defaultAnimation: {
      duration: 800,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      var slidys = carouselRef.current.querySelectorAll('.keen-slider__slide');
      slidys.forEach(function (slidy, idx) {
        if (idx === slider.track.details.rel) {
          slidy.setAttribute('data-hidden', 'false');
          slidy.setAttribute('tabindex', '0');
        } else {
          slidy.setAttribute('data-hidden', 'true');
          slidy.removeAttribute('tabindex');
        }
      });
    },
    created() {
      setLoaded(true);
      setTimeout(() => {
        var slide = carouselRef.current.querySelector('.keen-slider__slide');
        slide.setAttribute('data-hidden', 'false');
        slide.setAttribute('tabindex', '0');
      }, 10);
    },
  });

  // const [refCallback, instanceRef] = useKeenSlider<HTMLDivElement>({
  //   initial: 0,
  // })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <CarouselWrapper
      ref={carouselRef}
      role="group"
      aria-roledescription="slider"
      aria-label={label}
    >
      <span className="sr-only" aria-live="polite">{`Showing slide ${
        currentSlide + 1
      } of ${carouselItems.length}`}</span>

      <div className="keen-slider mainSlider" ref={refCallback}>
        {carouselItems.map((item, index) =>
          React.cloneElement(item, {
            key: `carouselItem-${index}`,
            className: 'keen-slider__slide',
            'data-hidden': 'true',
            'aria-roledescription': 'slide',
            role: 'group',
          })
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className="carouselBtnWrapper">
          <button
            className="carouselPrevBtn"
            aria-label="Previous Slide"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            aria-disabled={currentSlide === 0 ? 'true' : undefined}
            tabIndex={currentSlide === 0 ? -1 : undefined}
          >
            {prevBtn}
          </button>

          <div className="keen-slider thumbnail" ref={thumbnailRef}>
            {thumbnails.map((item, index) => (
              <div
                key={`carouselItem-${index}`}
                className="keen-slider__slide"
                aria-roledescription="slide"
                role="group"
              >
                <Image
                  alt=""
                  className=""
                  src={
                    item.image_display_url
                      ? item.image_display_url
                      : '/assets/images/placeholder.jpg'
                  }
                  height={100}
                  width={300}
                />
              </div>
            ))}
          </div>

          <button
            className="carouselNextBtn"
            aria-label="Next Slide"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            aria-disabled={
              currentSlide === carouselItems.length - 1 ? 'true' : undefined
            }
            tabIndex={
              currentSlide === carouselItems.length - 1 ? -1 : undefined
            }
          >
            {nextBtn}
          </button>
        </div>
      )}
    </CarouselWrapper>
  );
};

export default CarouselThumb;

export const CarouselWrapper = styled.div`
  position: relative;

  .mainSlider .keen-slider__slide {
    display: flex;

    --t: opacity 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57),
      visibility 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57);
    transition: var(--t);

    &[data-hidden='true'] {
      visibility: hidden;
      opacity: 0;
    }

    *[data-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: var(--t);
    }
  }
  .thumbnail .keen-slider__slide {
    font-size: 30px;
    margin-top: 10px;
    height: 100px;
  }
  .thumbnail .keen-slider__slide {
    cursor: pointer;
  }
  .thumbnail .keen-slider__slide.active {
    border: 2px dashed black;
  }

  .carouselBtnWrapper{
    display: flex;
  }
`;
