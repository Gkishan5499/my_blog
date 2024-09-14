import React from 'react'
import { Link } from 'react-router-dom'
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink,
   FooterLinkGroup, FooterTitle } from 'flowbite-react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterCom = () => {
  return (

    <Footer container className=' border border-t-8 border-orange-500 '>

      <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full sm:flex justify-between md:grid-cols-1'>
        <div>
          <Link to='/' className='self-center flex-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded' >Gautam's</span>
            Blog
          </Link>
        </div>


        <div className='grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3 sm:gap-6' >
          <div>
            <Footer.Title title='About' />
            <FooterLinkGroup col>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>10+Projects</FooterLink>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>Kishan's Blog</FooterLink>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>Read News</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <Footer.Title title='Follow us ' />
            <FooterLinkGroup col>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>GitHub</FooterLink>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>LinkedIn</FooterLink>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>Read News</FooterLink>
            </FooterLinkGroup>

          </div>
          <div>
          <Footer.Title title='Conditions' />
          <FooterLinkGroup col>
            <FooterLink href='#' target='_blank' rel='noopener noreferrer'>Terms & Condition</FooterLink>
            <FooterLink href='#'>Privacy Policy</FooterLink>
            <FooterLink href='#'>FAQs</FooterLink>

          </FooterLinkGroup>
          </div>


        </div>

        </div>
        <FooterDivider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright 
          href='#'
          by="Gautam's blogs"
          year={new Date().getFullYear()}
          />
          <div className='flex mt-4 gap-6 sm:mt-0 sm:justify-center'>
            <FooterIcon href='#' icon={FaFacebook}/>
            <FooterIcon href='#' icon={FaInstagram}/>
            <FooterIcon href='#' icon={FaLinkedin}/>
            <FooterIcon href='#' icon={FaGithub}/>
          </div>

          
        </div>
      </div>

      


    </Footer>

  )
}

export default FooterCom