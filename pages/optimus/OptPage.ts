import styled from 'styled-components';

const OptPage = styled.main`
.colo{
  background-color: #fff;
  margin: 5%;
  width: 90%;
  hieght: 100%;
}
:root {
	font-size: calc(1rem+0.5vw);
	margin: 1rem;
}

:focus-visible {
	outline-width: 3px;
	outline-color: #78aeda;
	outline-style: solid;
}

a {
	color: #0069ed;
}

span {
	font-weight: 500;
	color: #585757;
}

button {
	display: inline-block;
	border: none;
	padding: 0.7rem 1.5rem;
	margin: 0;
	border-radius: 4px;
	text-decoration: none;
	background: #0069ed;
	color: #ffffff;
	font-family: sans-serif;
	font-size: 1rem;
	line-height: 1;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
}

button:hover,
button:focus {
	background: #0053ba;
}

button:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
}

button:active {
	transform: scale(0.99);
}

input {
	border: 1px solid rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
	border-radius: 4px;
}

.view{
	margin-bottom: 1rem;
    overflow-y: auto;
}


select {
	font-size: 1rem;
	line-height: 1.5;
	padding: 0.3rem;
	width: 12rem;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	color: #444;
	box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
	border-radius: 0.5em;

	appearance: none;
	background-color: #fff;
	background-image: url("data:image/svg+xml,%3Csvg width='20.4' height='12.4' viewBox='0 0 10.4 6.4' fill='%23000000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.800013 0.933349L4.00001 4.13335L7.20001 0.93335' stroke='white' stroke-linecap='square'/%3E%3C/svg%3E%0A");
	background-repeat: no-repeat, repeat;
	background-position: right 0 top 60%, 0 0;
	border: 1px solid rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
	border-radius: 4px;
}

.wrapper {
	padding: 0 2rem 1rem;
}

.container {
	width: clamp(300px, 90vw, 1260px);
	background-color: #ffffff;
	border-radius: 4px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.navbar {
	background-color: #222222;
	color: white;
	margin-bottom: 1rem;

	a {
		color: white;
		text-decoration: none;
		width: inherit;
		display: block;
		padding: 1rem 0;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: space-evenly;
	}

	li {
		width: 100%;
		text-align: center;
		transition: background 100ms ease-in-out;

		&:hover {
			background-color: #71a8ec;
		}
	}

	.active {
		background-color: #0069ed;
	}
}

.pipeline {
	display: grid;
	height: 80vh;
	max-height: 1440px;
	grid-template-rows: repeat(3, max-content) 1fr max-content;

	&__source {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		margin: 1rem 0 2rem;

		input {
			height: 1.8rem;
			width: 100%;
			padding: 0.5rem;

			@media (min-width: 769px) {
				width: calc(100% - 105px);
			}
		}
	}

	&__name {
		margin: 1rem 0;
		input {
			@media (min-width: 769px) {
				width: calc(100% - 65px);
			}
		}
	}

	&__status {
		font-size: 0.8rem;

		&--true {
			color: green;
		}

		&--false {
			color: #ff605c;
			overflow-y: auto;
		}
	}

	&__transformation {
		margin-bottom: 1rem;
		overflow-y: auto;
	}

	&__title {
		margin: 1rem 0 0.3rem;
		display: block;
	}

	.transform {
		margin-bottom: 1rem;

		&__item {
			min-height: 120px;
			display: flex;
			flex-direction: column;
			border: 1px solid #dddddd;
			padding: 1rem;
			margin-bottom: 1.5rem;
			gap: 1rem;
			position: relative;
		}

		&__remove {
			width: max-content;
			padding: 0.6rem;
			background-color: #ff605c;
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
			font-size: 0.8rem;
		}

		&__enabler {
			position: absolute;
			right: 0.5rem;
			top: 4rem;
			font-size: 0.8rem;

			select {
				width: 6rem;
				font-size: 0.8rem;
			}

			@media (min-width: 585px) {
				right: 4rem;
				top: 0.5rem;
			}
		}

		&__new {
			padding: 0.6rem 0.9rem;
			align-self: center;
			background: #4e74a1;
			align-self: flex-end;
			margin: -2rem auto 0;
			position: absolute;
			bottom: -1rem;
			left: 50%;
			transform: translateX(-50%);
		}

		&__data {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin-bottom: 2rem;

			input {
				height: 2rem;
				margin-right: 1rem;
				padding: 0 0.5rem;
			}
		}
	}

	&__submit {
		width: 120px;
		align-self: flex-end;
		justify-self: flex-end;
	}
}
`;

export default OptPage;
