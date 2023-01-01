import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AiOutlineClear } from "react-icons/ai";
import axios from "axios";
const Main = () => {
	const [text,settext]=useState("")
	const [text2,settext2]=useState()
	const [error, setError] = useState("");
	const [response,setresponse] = useState([]);
	const clear = async (e) => {
		e.preventDefault();
		try {
			const data=null
			const url = "http://localhost:8080/api/remove";
			const { data: res } = await axios.post(url, data);
			window.location.reload();
			
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	function reverseString(s) {
		var temp=[];
		var str=s.split('');
		var x=0;
		for (var i = 0; i < s.length; i++) {
			if (s[i] >= 'a' && s[i] <= 'z'
				|| s[i] >= 'A' && s[i] <= 'Z') {
				// storing elements in array
				temp[x] = s[i];
				x++;
			}
		}
		temp =temp.reverse();
		x = 0;
		for (var i = 0; i < str.length; i++) {
			if (str[i] >= 'a' && str[i] <= 'z'
				|| str[i] >= 'A' && str[i] <= 'Z') {
				// updating the original string
				console.log(temp[x]);
				str[i] = temp[x];
				x++;
			}
		}
		console.log(str.join(''));
		return str.join('');
	  }
	const reverse = (event) => {
	   
	   settext(event.target.value)
	   settext2(reverseString(event.target.value))
	};
	useEffect(()=>{
		async function fetchdata(){
		try {
            const data ={"data":null}
			const url = "http://localhost:8080/api/admin";
			const { data: res } =await axios.post(url, data);
			setresponse(res.data)

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	} setInterval(()=>fetchdata(),5000)
},[]);

	return (
		<div className={styles.main_container}>
            <nav className={styles.navbar}>
				<h3>Welcome Yoda Youhou</h3>
			</nav>
            <div>
                <table className={styles.rwd_table}>
				<tbody>
         <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Email ID</th>
		   <th>Date</th>
         </tr>  
       
         {
         response.map( (items,key) =>
         <tr key={key}>
             <td data-th="Firstname">{items.firstName }</td>
             <td data-th="Lastname">{items.lastName }</td>
             <td data-th="Email">{items.email }</td>
			 <td data-th="Date">{Date(items.date) }</td>
         </tr>
         )
       }
       </tbody>
     </table>

	 <button className={styles.blue_btn} onClick={clear}>
					<span>Clear records</span><AiOutlineClear className={styles.icon} size={'20'}/>
				</button> 
            </div><br/>
			<div className={styles.container}>
				<h2>Reverse a string:</h2><br/>
				Input:<input type="text" value={text} className={styles.inputs} onChange={reverse}></input><br/>
				Output:<input type="text" value={text2} className={styles.inputs2} onChange={reverse}></input>
				
			</div>
		</div>
		
	);
};

export default Main;
