import React from 'react'
import Subscribe from './Subscribe'
import { NavLink } from 'react-router-dom'

function SectionCTA() {
    return (
        <>
            <section id="cta" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 align-self-center">
                            <h2>A digital marketing blog</h2>
                            <p className="lead"> Aenean ut hendrerit nibh. Duis non nibh id tortor consequat cursus at mattis felis. Praesent sed lectus et neque auctor dapibus in non velit. Donec faucibus odio semper risus rhoncus rutrum. Integer et ornare mauris.</p>
                            <NavLink to="/" className="btn btn-primary">Try for free</NavLink>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <Subscribe />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionCTA
