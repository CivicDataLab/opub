import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import OptPage from "./OptPage";
import { useState } from "react";
import { GetServerSideProps } from 'next';
import {
	fetchTransformersList,
  } from 'utils/fetch';

type Props = {
	variables: any;
	transformerslist: any;
  };
 
const Pipeline: React.FC<Props> = ({ transformerslist }) => {
	console.log(transformerslist)
	const [transformList, SetTransform] = useState(["pipeline__transformation"]);
	const handleServiceAdd = () => {
		SetTransform([...transformList, "pipeline__transformation"]);
	};

	const handleServiceRemove = (index) => {
		const List = [...transformList];
		List.splice(index, 1);
		SetTransform(List)
	};

	const transformers = transformerslist.result;
		
	
	function humanize(str) {
		var i,
			frags = str.split('_')
		for (i = 0; i < frags.length; i++) {
			frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
		}
		return frags.join(' ')
	}
	
	return (
    <div>
      <Head>
        <title>Optimus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
					
		<OptPage>
				<div className="colo">
					
					<Image
					src='/assets/images/cdl_logo.png'
						alt="cdl"
						width={100}
						height={120}	/>

					       <nav className="navbar">
								<ul>
									<li><a href='/optimus' className="active">Add New</a></li>
									<li><a href='/optimus/history'>Pipelines</a></li>
								</ul>
					     </nav>

					<form className="wrapper pipeline" id="main">
								<label htmlFor="pipeline-name" className="pipeline__source pipeline__name">
									<span>Name</span>
									<input type="text" id="pipeline-name" required />
								</label>
					
								<label htmlFor="source" className="pipeline__source">
									<span>Source URL</span>
									<input type="url" id="source" required autoComplete="off" />
									<span className="pipeline__status"></span>
								</label>
								
								<span className="pipeline__title">Transformation Pipeline</span>


	  {transformList.map((singleTransform,index) => (

		<div key={index} className="pipeline__transformation">
			<div className="transform">
				<div className="transform__item">
					<button className="transform__remove" 
							onClick={() => handleServiceRemove(index+1)}>&#10005;</button>
								
							<label htmlFor="transform_1" className="transform__selector">
									<select name="transform_1" id="transform_1">
									<option value=""  hidden>Select Transformer</option>
								    {transformers.map((transformer,index) => (
									<option value={transformer.name} key={index} >{humanize(transformer.name)}</option>
									))}
																				
									</select>
							</label>
						

							{(transformers.filter(x => x.name == "skip_column"))[0].context.map((input,index) => (
							  	<input type={input.type} key={index} name={input.name} placeholder={input.desc} required/>
							))}						

						<div id="transform_data_1" className="transform__data"></div>
						{transformList.length -1 === index && 
						<button className="transform__new" onClick={handleServiceAdd}>
							Add Step</button>}
				</div>
			</div>
		</div>
		))}

							<button type="submit" className="pipeline__submit">Submit</button>
		
					</form>				
						
				</div>
		</OptPage>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
	const transformerslist = await fetchTransformersList();
	return {
	  props: {
		transformerslist,
	 },
	};
  };
export default Pipeline;

/*export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://13.233.49.245`)
	const data = await res.json()
  
	// Pass data to the page via props
	
	return { props: { data } }
  }*/
  
    
