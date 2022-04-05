import styled from 'styled-components';
import OptPage from '../OptPage';


const HistPage = styled.main`
.pipeline {
	&__Done {
		color: green;
	}

	&__started {
		color: rgb(118, 163, 28);
	}

	&__failed {
		color: #ff605c;
	}

	&__history {
		overflow-x: auto;
		overflow-y: auto;
		max-height: 70vh;
	}

	&__title {
		margin-bottom: 1rem;
	}
}

.transform {
	&__failed {
		color: #ff605c;
	}

	&__inprogress {
		color: rgb(118, 163, 28);
		border: 2px solid rgb(118, 163, 28);
		border-radius: 4px;
		padding: 4px;
	}
}

table {
	border-collapse: collapse;
	width: 90%;
	margin: 0 auto;

	a {
		margin-bottom: 0.2rem;
	}

	td,
	th {
		border: 2px solid #000;
		padding: 0.75rem;
		text-align: left;
	}

	th {
		font-weight: bold;
		white-space: nowrap;
		background-color: #000;
		color: #fff;
	}

	tr {
		&:not(:first-of-type) {
			td:last-child {
				display: flex;
				flex-direction: column;
				border-left: none;
				height: 100%;
			}
		}
	}

	tr:first-of-type th:not(:last-child) {
		border-right-color: #fff;
		
		
	}
	tr:not(:first-of-type) td:last-child{
		display: revert;
	}
	caption {
		margin-bottom: 0.5rem;
		font-style: italic;
		text-align: left;
	}
}

`;

export default HistPage;
