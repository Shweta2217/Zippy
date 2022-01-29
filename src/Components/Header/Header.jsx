import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import Css from './Header.module.css';
import { RiUser6Fill } from 'react-icons/ri';
import { BsCartFill } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import MyContext from '../../Context/Context';
import { useContext } from 'react';

export default function Header() {
  let Context = useContext(MyContext);
  const [userData,setData] =useState("");
  const [cartCount, setCount]= useState(0);
  const profileUrl = "https://zippylog.herokuapp.com/api/auth/userPofile";

  useEffect(()=>{    
  if (Context.isLogin) {
    fetch(profileUrl, {
      method: "GET", headers:
        { "content-type": "application/json", "access-token": window.localStorage.getItem("Token") }
    }).then((res) => { return res.json() })
      .then((data) => {
        setData(data);
        
       let userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
      window.sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));

    });
      setCount(Context.cartCount)

  }
  },[Context.isLogin ,Context.cartCount ])


  return (
    <header className={Css.header}>
      <span  className={Css.IconContainer}>
      <Link className={Css.Link} to="/"><h1 className={Css.mainIcon}>Zippy</h1></Link>
      </span>
      
      <span className={Css.btnContainer}>
        {Context.isLogin ?
          <>
            <Link className={Css.Link} to="/cart"><span className={Css.Icon}><BsCartFill /><sup className={Css.cartCount}>{cartCount}</sup></span></Link>
            <Link className={Css.Link} to="/profile"><span className={Css.Icon}><RiUser6Fill /></span></Link>
          </>
          :
          <Link className={Css.Link} to="/login"><span className={Css.loginIcon}>
            <AiOutlineLogin />Login</span>            
          </Link>
        }
      </span>
    </header>
  )
}
