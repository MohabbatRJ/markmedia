import React from 'react'
import Subscribe from '../../components/Global/Subscribe'
import AdImage from '../../components/Sidebar/AdImage/AdImage'
import adImage from "../../assets/upload/banner_03.jpg"
import { useParams } from 'react-router-dom'
import BreadCrumb from '../../components/Global/Breadcrumb/BreadCrumb'

function ContactForm() {
    const { slug } = useParams();
    // console.log(slug, 'cont')
    return (
        <>
            <BreadCrumb name={slug} />
            <section className="section lb">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="sidebar">
                                <div className="widget-no-style">
                                    <Subscribe />
                                </div>

                                <div id="" className="widget">
                                    <div className="banner-spot clearfix">
                                        <AdImage image={adImage} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <div className="page-wrapper">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4>Who we are</h4>
                                        <p>Markedia is a personal blog for handcrafted, cameramade photography content, fashion styles from independent creatives around the world.</p>
                                    </div>

                                    <div className="col-lg-6">
                                        <h4>How we help?</h4>
                                        <p>If you’d like to write for us, <a href="#">advertise with us</a> or just say hello, fill out the form below and we’ll get back to you as soon as possible.</p>
                                    </div>
                                </div>

                                <hr className="invis" />

                                <div className="row">
                                    <div className="col-lg-12">
                                        <form className="form-wrapper">
                                            <h4>Contact form</h4>
                                            <input type="text" className="form-control" placeholder="Your name" />
                                            <input type="text" className="form-control" placeholder="Email address" />
                                            <input type="text" className="form-control" placeholder="Phone" />
                                            <input type="text" className="form-control" placeholder="Subject" />
                                            <textarea className="form-control" placeholder="Your message"></textarea>
                                            <button type="submit" className="btn btn-primary">Send <i className="fa fa-envelope-open-o"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactForm
