import React from 'react';
import Css from './Footer.module.css';
import {BsFacebook, BsTwitter} from "react-icons/bs";


export default function Footer() {
    return (
        <footer className={Css.footer}>
            <span className={Css.brand}>Zippy</span>
            <div className={Css.footerContent}>
                <div className={Css.linkDiv}>
                    <h4 className={Css.footer_headings}>Company</h4>
                    <p className={Css.footerLinks}>Who we are </p>
                    <p className={Css.footerLinks}>Blogs </p>
                    <p className={Css.footerLinks}>Career</p>
                    <p className={Css.footerLinks}>Contact</p>
                </div>
                <div className={Css.linkDiv}>
                    <h4 className={Css.footer_headings}>For Foodies</h4>
                    <p className={Css.footerLinks}>Code of Conduct</p>
                    <p className={Css.footerLinks}>Community </p>
                    <p className={Css.footerLinks}>Blogger Help</p>
                </div>
                <div className={Css.linkDiv}>
                    <h4 className={Css.footer_headings}>For You</h4>
                    <p className={Css.footerLinks}>Privacy </p>
                    <p className={Css.footerLinks}>Terms </p>
                    <p className={Css.footerLinks}>Security</p>
                    <p className={Css.footerLinks}>Sitemap </p>
                </div>

                <div className={Css.linkDiv}>
                    <h4 className={Css.footer_headings}>Social links</h4>
                    <span className={Css.footerIcon} ><BsFacebook /></span>
                  <span className={Css.footerIcon}> <BsTwitter /></span>
                     
                </div>
            </div>
            <div className={Css.copyright_text}>Copyright 2001-2022 © Zippy <small> <sup>TM</sup></small> &nbsp;Ltd. All rights
                reserved.
            </div>
        </footer>
    )
}
