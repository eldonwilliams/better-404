import { Architecture, Brush, Build, Carpenter, Colorize, Construction, Handyman, Hardware, Plumbing, SquareFoot } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Motion, spring } from "react-motion";
import useMousePosition from "../hooks/useMousePosition";

const toolIcons = [
	Build, Plumbing, Architecture, Brush, Carpenter, Colorize, Construction, Handyman, Hardware, SquareFoot,
];

// Helper Func
const randElemFromArr = array => array[Math.floor(Math.random() * array.length)];
const randInt = (a, b) => Math.floor(Math.random() * (Math.floor(b) - Math.ceil(a) + 1)) + Math.ceil(a);
//

const ToolComponent = ({ Icon }) => {
	const [style, setStyle] = useState({
		opacity: 1,
		x: randInt(0, window.innerWidth),
		y: randInt(0, window.innerHeight),
	});

	const mousePosition = useMousePosition();

	useEffect(() => {
		let distance = Math.sqrt(((mousePosition.x - style.x) ^ 2) + ((mousePosition.y - style.y) ^ 2));
		
		if (distance < 10) setStyle({
			...style,
			x: randInt(0, window.innerWidth),
			y: randInt(0, window.innerHeight),
		});
	}, [mousePosition])

	useEffect(() => {
		const handleWindowResize = () => setStyle({
			...style,
			x: randInt(0, window.innerWidth),
			y: randInt(0, window.innerHeight),
		});
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return (<Motion defaultStyle={{
		opacity: 0,
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	}} style={{
		opacity: spring(style.opacity),
		x: spring(style.x),
		y: spring(style.y),
	}}>
		{style => (<div style={{
			position: 'absolute',
			transform: `translate(${style.x}px, ${style.y}px) translate(-50%, -50%)`,
			opacity: style.opacity,
			height: 'min-content',
			width: 'min-content',
		}}>
			<Icon />
		</div>)}
	</Motion>);
}

const ToolBackground = ({ propNumber }) => {

	const [toolComponents, setToolComponents] = useState([]);
	const [number, setNumber] = useState(0);

	useEffect(() => {
		var constructedToolComponents = [...new Array(number).keys()].map((value, index) => {
			if (toolComponents[index]) return toolComponents[index]; // This will make sure only NEW numbers are added, and if the number has been decreased the element will be popped
			return { Icon: randElemFromArr(toolIcons) }
		});

		setToolComponents(constructedToolComponents);
	}, [number]);

	useEffect(() => {
		if (propNumber !== number) {
			setTimeout(() => {
				setNumber(number + 1);
			}, randInt(10, 200));
		}
	}, [propNumber, number])

	return (<div>
		{toolComponents.map((value, index) => <ToolComponent key={index} {...value} />)}
	</div>);
}

export default ToolBackground;