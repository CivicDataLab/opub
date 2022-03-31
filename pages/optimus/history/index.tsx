import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import HistPage from "./Histpage";
import OptPage from "../OptPage";
import {useEffect} from "react";
	


function IndexPage( ) {
	
	

  return (
    <div>
      <Head>
        <title>Optimus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <OptPage>
<HistPage>
  <div className="colo">
     
     <Image
      src='/assets/images/cdl_logo.png'
        alt="cdl"
        width={100}
        height={120}
      />

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
					tabIndex="0"
					role="group"
					aria-labelledby="caption"
				>
					<table id="table">
						<caption className="" id="caption">
							List of pipelines created by the user
						</caption>

						<tr>
							<th>Date</th>
							<th>Name</th>
							<th>Pipeline</th>
							<th>Status</th>
							<th>Output</th>
						</tr>
					</table>
				</div>
			</div>
              
        </div>
 </HistPage>
 </OptPage>
    </div>
  )
}


    
export default IndexPage;