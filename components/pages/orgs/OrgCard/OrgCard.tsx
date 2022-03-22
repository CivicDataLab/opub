/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { truncate } from 'utils/helper';
import styled from 'styled-components';
import Image from 'next/image';
import placeholder from 'public/assets/images/placeholder.jpg';

const DatasetCard: React.FC<{ data: any }> = ({ data }) => {
  const router = useRouter();

  return (
    <Link href={`${router.pathname}/${data.name}`} passHref>
      <OrgCard>
        <section>
          <Count>{data.package_count}</Count>
          <figure>
            <Image
              src={data.image_display_url || placeholder}
              width={200}
              height={200}
              alt=""
              className="img-contain"
            />
          </figure>
          <div>
            <h3 className="card__heading">{data.title}</h3>
            <div className="card__content">
              <p>
                {truncate(
                  data.description ||
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla perspiciatis modi enim deleniti facere error magnam veniam. Facere, iste et dolorum numquam officia aliquid culpa laborum ex, officiis cupiditate earum!',
                  200
                )}
              </p>
            </div>
          </div>
        </section>
      </OrgCard>
    </Link>
  );
};

export default DatasetCard;

const OrgCard = styled.a`
  text-decoration: none;
  padding: 1.5rem;
  display: block;
  border-radius: 6px;
  transition: transform 200ms ease;
  height: 100%;
  border-radius: 4px;
  background-color: var(--color-background-lighter);
  position: relative;

  figure {
    margin: 0 auto;
    width: fit-content;
  }

  h3 {
    margin-top: 16px;
  }

  p {
    margin-top: 8px;
  }
`;

const Count = styled.small`
  background-color: var(--color-primary);
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--text-dark-high);
  font-weight: 600;
  position: absolute;
  right: 0;
  top: 0;
  margin-top: -4px;

`