import Head from 'next/head';
import Image from 'next/image';
import OptPage from './OptPage';
import { useState, useRef, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { fetchTransformersList } from 'utils/fetch';
import Link from 'next/link';

import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useRouter } from 'next/router';

type Props = {
  variables: any;
  transformerslist: any;
};

const Transformer: React.FC<Props> = ({ transformerslist }) => {
  const router = useRouter();
  const { keycloak } = useKeycloak<KeycloakInstance>();

  // shows and hides the submenu on hover and focus
  useEffect(() => {
    //   if(keycloak.authenticated === false){
    // 	router.replace(keycloak.createLoginUrl());
    //   }
  }, []);

  // console.log(transformerslist)
  const [transformList, setTransform] = useState([
    { name: 'pipeline__transformation' },
  ]);

  let finalData = {
    data_url: '',
    name: '',
    org_name: '',
    transformers_list: [],
  };

  const transformers = transformerslist.result;
  const nameForm = useRef(null);

  const handleServiceAdd = () => {
    setTransform([...transformList, { name: 'pipeline__transformation' }]);
  };

  const handleServiceRemove = (index) => {
    const List = [...transformList];

    if (List.length <= 1) {
      alert('Atleast one transformer required!');
      alert('Select atleast 1 transformer');
    } else {
      List.splice(index, 1);
      setTransform(List);
    }
  };

  const handletransformerselect = (value, index) => {
    // 1. Make a shallow copy of the items
    let items = [...transformList];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item.name = value;
    item['order_no'] = index + 1;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    setTransform(items);
    //console.log(transformList);
  };

  const post_url = 'https://pipeline.ndp.civicdatalab.in';

  const handletransformerfill = (e, index) => {
    // 1. Make a shallow copy of the item
    let items = [...transformList];

    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };

    // 3. Replace the property you're intested in
    item['context'] = {
      ...item['context'],
      [e.target.id]:
        item.name == 'skip_column'
          ? e.target.value.split(',')
          : e.target.value,
    };

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;

    // 5. Set the state to our new copy
    setTransform(items);

    // console.log(transformList);
  };

  const handleSubmit = () => {
    const form = nameForm.current;
    let postData = {
      data_url: `${form['data_url'].value}`,
      name: `${form['name'].value}`,
      org_name: `${form['org_name'].value}`,
      transformers_list: [],
    };
    // console.log(postData);
    // console.log(transformList);
    postData.transformers_list = transformList;
    // console.log(postData);

    if (postData.transformers_list[0].name == 'pipeline__transformation') {
      alert('Select atleast 1 transformer');
    } else {
      submitData(`${post_url}/transformer/pipe_create`, postData);
    }
  };

  // post data to server
  async function submitData(url, data) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        alert('Pipeline Created');
      } else {
        alert('Error while creating Pipeline');
      }
    });
  }

  function humanize(str) {
    var i,
      frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  const [errorMessage, setErrorMessage] = useState('');

  const validate = (value) => {
    //only for http,https
    let Regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    //for http,https& www
    // /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const ver = Regex.test(value);
    if (ver) {
      setErrorMessage('Success');
    } else {
      setErrorMessage('Fail');
    }
  };

  return (
    <div>
      <Head>
        <title>Optimus</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      {keycloak?.authenticated ? (
        <OptPage>
          <div className="colo">
            <nav className="navbar">
              <ul>
                <li>
                  <Link href="/optimus">
                    <a className="active">Add New</a>
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link href="/optimus/history">
                    <a className="active">Pipelines</a>
                  </Link>
                </li>
              </ul>
            </nav>

            <form className="wrapper pipeline" id="main" ref={nameForm}>
              <label
                htmlFor="pipeline-name"
                className="pipeline__source pipeline__name"
              >
                <span>Name</span>
                <input type="text" id="name" name="name" required />
              </label>

              <label htmlFor="source" className="pipeline__source">
                <span>Source URL</span>
                <input
                  type="url"
                  id="data_url"
                  name="data_url"
                  onChange={(e) => validate(e.target.value)}
                  required
                  autoComplete="off"
                />
                <p className={`status__${errorMessage}`}>{errorMessage}</p>
                <span className="pipeline__status"></span>
              </label>

              <label
                htmlFor="pipeline-name"
                className="pipeline__source pipeline__org_name"
              >
                <span>Organization Name</span>
                <input type="text" id="org_name" name="org_name" required />
                <span className="pipeline__title">
                  Transformation Pipeline
                </span>
              </label>

              <div className="view">
                <div className="pipeline__transformation">
                  <div className="transform">
                    {transformList.map((singleTransform, index) => (
                      <div key={index} className="transform__item">
                        <button
                          className="transform__remove"
                          onClick={() => handleServiceRemove(index)}
                        >
                          &#10005;
                        </button>

                        <label
                          htmlFor="transform_1"
                          className="transform__selector"
                        >
                          <select
                            name="transform_1"
                            id="transform_1"
                            value={transformList[index].name}
                            onChange={(e) =>
                              handletransformerselect(e.target.value, index)
                            }
                          >
                            <option value="" hidden>
                              Select Transformer
                            </option>
                            {transformers.map((transformer, index) => (
                              <option value={transformer.name} key={index}>
                                {humanize(transformer.name)}
                              </option>
                            ))}
                          </select>
                        </label>

                        <div id="transform_data_1" className="transform__data">
                          {transformers.filter(
                            (x) => x.name == transformList[index].name
                          ).length > 0 &&
                            transformers
                              .filter(
                                (x) => x.name == transformList[index].name
                              )[0]
                              .context.map((input, index1) => (
                                <input
                                  onChange={(e) =>
                                    handletransformerfill(e, index)
                                  }
                                  id={input.name}
                                  type={input.type}
                                  key={index1}
                                  name={input.name}
                                  placeholder={input.desc}
                                  required
                                />
                              ))}
                        </div>

                        {transformList.length - 1 === index && (
                          <button
                            className="transform__new"
                            onClick={handleServiceAdd}
                          >
                            Add Step
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="pipeline__submit"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </form>
          </div>
        </OptPage>
      ) : (
        <p> Please login . . . .</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const transformerslist = await fetchTransformersList();
  return {
    props: {
      transformerslist,
    },
  };
};
export default Transformer;

function props(props: any) {
  throw new Error('Function not implemented.');
}
function data_url(
  data_url: any
): import('react').FormEventHandler<HTMLInputElement> {
  throw new Error('Function not implemented.');
}
