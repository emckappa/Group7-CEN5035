import React from 'react'

const header = () => {
  return (

        <header className="p-3 mb-3 border-bottom main-background-color white-text">
    <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">

        <img src="/owlhead-logo.png" alt="fau owl owlhead-logo" className="header-logo"></img>

        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        {/* <li><a href="/home" className="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="/applications" className="nav-link px-2 link-body-emphasis">Applications</a></li>
        <li><a href="/courses" className="nav-link px-2 link-body-emphasis">Courses</a></li>
        <li><a href="/jobposting" className="nav-link px-2 link-body-emphasis">Job Posting</a></li> */}
        </ul>

        {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
        </form> */}

        <div className="dropdown text-end">
        {/* <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://e7.pngegg.com/pngimages/716/738/png-clipart-silhouette-male-person-silhouette-animals-head-thumbnail.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
        </a> */}

        {/* <ul className="dropdown-menu text-small grey-text">  

            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="/settings">Settings</a></li>
            <li><a className="dropdown-item" href="/profile">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="/signout">Sign out</a></li>
        </ul> */}
        </div>
    </div>
    </div>
    </header>
  )
}

export default header

