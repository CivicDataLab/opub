import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import HistPage from "./Histpage";
import OptPage from "../OptPage";
import {useEffect} from "react";
import {fetchpipelineList} from 'utils/fetch';
import { GetServerSideProps } from 'next';
import dateFormat, { masks } from "dateformat";
 

	type Props = {
	variables: any;
	pipelinelist: any;
	};

	const pipeline: React.FC<Props> = ({ pipelinelist }) => {
	console.log(pipelinelist)

	const Pipelines = pipelinelist.result;
	
	//  remove '_' and Capitalise
	function humanize(str) {
		var i,
			frags = str.split('_')
		for (i = 0; i < frags.length; i++) {
			frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
		}
		return frags.join(' ')
		
	}

	function addClass(status) {
		if (status.includes('Failed')) return 'failed'
		else return status.toLowerCase().replace(/ /g, '')
	}

	


  return (
    <div>
      <Head>
        <title>Optimus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <OptPage>
			<HistPage>
				<div className="colo">
						<nav className="navbar">
									<ul>
										<li><a href='/optimus' >Add New</a></li>
										<li><a href='/optimus/history' className="active">Pipelines</a></li>
									</ul>
						</nav>

						<div className="wrapper pipeline" id="main">
								<span className="pipeline__title">Pipeline History</span>
								<div
									className="pipeline__history"
									//tabIndex="0"
									role="group"
									aria-labelledby="caption"
								>
									<table id="table">
										<caption className="" id="caption">
											List of pipelines created by the user
										</caption>
									<tbody>	
										<tr>
											<th>Date </th>
											<th>Name</th>
											<th>Pipeline</th>
											<th>Status</th>
											<th>Output</th>
                                       	</tr>
										   {Object.keys(Pipelines).map((key,Index) =>(
													<tr>
														<td>
															<span>{dateFormat(Pipelines[key]["date"],"longDate",true)}</span>
														</td>
														<td>
															<span >{humanize(Pipelines[key]["name"])}</span>
														</td>
														<td>
															<span className={ `transform__${addClass(Pipelines[key]['status'])}`}>{Pipelines[key]["pipeline"].map((value,index)=>(
																<p>
																	{humanize(value["name"])}
																	</p>
															))}</span>
														</td>
														<td>
															<span className={ `pipeline__${addClass(Pipelines[key]['status'])}`}>{Pipelines[key]["status"]}</span>
														</td>
														<td>
															{Pipelines[key]["pipeline"].map((value,index)=>(
																<a href={humanize(value["result"])} target='_blank' rel="noopener">
																	<p>
																		{humanize(value["name"])}
																	</p>
																</a>
															))}
														</td>
													</tr>
												// use keyName to get current key's name
												// and a[keyName] to get its value
											  ))}
										</tbody>
									</table>
							</div>
						</div>
					</div>
			</HistPage>
 		</OptPage>
   	 </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
	const pipelinelist = await fetchpipelineList();
	return {
	  props: {
		pipelinelist,
	 },
	};
  };
    
export default pipeline;